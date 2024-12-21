import ChartTwoColumn from "@/Components/ChartTwoColumn";
import ChartStitchingQuanlity from "@/Components/ChartStitchingQuanlity";
import TableIssue from "@/Components/TableIssue";
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import getCurrentDate from "../../../utilities/getCurrentDate";
import generateTimeSlots from "../../../utilities/generateTimeSlots";
import getWorkHoursMax from "../../../utilities/getWorkHoursMax";
import calculateTotalWorkHours from "../../../utilities/calculateTotalWorkHours";

export default function KPIBoard() {
    const [isLoading, setLoading] = useState(false);
    const [actualQuantity, setActualQuantity] = useState([
        0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [targetQuantity, setTargetQuantity] = useState(0);
    const getActualQuantity = useMemo(
        function () {
            return actualQuantity.reduce((a, b) => Number(a) + Number(b));
        },
        [actualQuantity]
    );
    const isQuantityPassed = useMemo(() => {
        if (targetQuantity == 0) return false;

        return (getActualQuantity / targetQuantity) * 100 >= 100;
    }, [getActualQuantity]);

    const [actualQuality, setActualQuality] = useState([]);
    const [targetQuality, setTargetQuality] = useState([]);

    const [actualStitchingQuanlity, setActualStitchingQuanlity] = useState("")

    const [actualAllQuality, setActualAllQuality] = useState(0);
    const [targetAllQuality, setTargetAllQuality] = useState(100);

    const width = document.body.clientWidth;

    const isQualityPassed = useMemo(() => {
        if (targetAllQuality == 0) return false;

        // return (actualAllQuality / targetQuality[0]) * 100 >= targetQuality[0];
        return actualAllQuality >= targetQuality[0] || actualStitchingQuanlity >= targetQuality[0];
    }, [actualAllQuality]);

    const [listDepartment, setListDepartment] = useState([]);
    const { deptBoardChild } = usePage().props;
    const [staffDepartment, setStaffDepartment] = useState("");
    const [department, setDepartment] = useState("");

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [labelsChartColumn, setLabelsChartColumn] = useState([])
    const [totalWorkHours, setTotalWorkHours] = useState(8)

    const isValid = useMemo(() => {
        if (from === "" && to === "") {
            return 1;
        }
        const fromDate = new Date(from);
        const toDate = new Date(to);
        if (Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) < 0) {
            return -1;
        } else if (
            Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) <= 7
        ) {
            return 1;
        }

        return 0;
    }, [from, to]);

    useEffect(() => {
        const currentDate = getCurrentDate()
        setFrom(currentDate)
        setTo(currentDate)

        const timeoutId = setTimeout(() => {
            setLoading(true)
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [])

    // tính toán số lượng các cột target
    const getTargetQuantity = useMemo(() => {
        return new Array(labelsChartColumn.length).fill(
            Math.trunc(Number(targetQuantity) / totalWorkHours)
        );
    }, [targetQuantity, labelsChartColumn, totalWorkHours]);

    const handleSetTargetQuality = (dept) => {
        if (dept.includes("S")) {
            setTargetQuality(new Array(12).fill(90));
        } else if (dept.includes("L")) {
            setTargetQuality(new Array(12).fill(88));
        } else {
            setTargetQuality([]);
        }
    };

    const handleCalculateWorkHour = (listWorkHours) => {
        if(listWorkHours.length <= 0) {
            // nếu không lấy được các khung giờ làm việc của chuyền trong database thì mặc định là 11 khung giờ
            setLabelsChartColumn([
                "07:30-08:30",
                "08:30-09:30",
                "09:30-10:30",
                "10:30-12:00",
                "12:00-13:30",
                "13:30-14:30",
                "14:30-15:30",
                "15:30-16:30"
            ])
            // "16:30-17:30",
            // "17:30-18:30",
            // "18:30-20:30"
        } else {
            // lấy ra thời gian sáng và chiều trong mảng thời gian làm việc
            let startTime = ""
            let endTime = ""
            let findTypeAM = listWorkHours.find(item => item.datetype === "am")
            let findTypePM = listWorkHours.find(item => item.datetype === "pm")

            // gán thời gian bắt đầu và thời gian kết thúc để tính toán khung giờ
            startTime = findTypeAM ? findTypeAM.f_hour : findTypePM.f_hour
            endTime = findTypePM ? findTypePM.t_hour : findTypeAM.t_hour

            // format lại thời gian lấy được để có thể generate ra các khung giờ
            let [hoursStart, minutesStart] = startTime ? startTime.split(":") : "";
            let [hoursEnd, minutesEnd] = endTime ? endTime.split(":") : "";
            hoursStart = hoursStart.padStart(2, "0");
            minutesStart = minutesStart.padStart(2, "0");
            hoursEnd = hoursEnd.padStart(2, "0");
            minutesEnd = minutesEnd.padStart(2, "0");

            let formattedTimeStart = `${hoursStart}:${minutesStart}`;
            let formattedTimeEnd = `${hoursEnd}:${minutesEnd}`;

            // thực hiện gọi hàm generate các khung giờ
            let resultLabels = generateTimeSlots(formattedTimeStart, formattedTimeEnd)

            setLabelsChartColumn(resultLabels)
        }
    }

    // xử lý lấy dữ liệu của 2 chart
    const handleGetDataChart = () => {
        handleSetTargetQuality(department);
        async function ListenHandle(e) {
            setActualQuantity(() => e.data.result[0]);
            setTargetQuantity(() => e.data.target);
            setActualQuality(() => e.data.result[1]);
            setActualAllQuality(() => e.data.actualAllRFT);
            setActualStitchingQuanlity(() => [parseInt(String(e.data.actualStitchingQuanlity).replace("%", ""))])
            await handleCalculateWorkHour(e.data.workHours)
            if(e.data.workHours.length > 0) {
                let totalWorkHoursTemp = calculateTotalWorkHours(e.data.workHours)
                setTotalWorkHours(totalWorkHoursTemp)
            } else {
                setTotalWorkHours(8)
            }
        }

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        const formattedToday = yyyy + "-" + mm + "-" + dd;
        
        if (from === to && (from === formattedToday || from === "")) {
            window.Echo.channel("department." + department).listen(
                "RealTimeChart",
                ListenHandle
            );
        } else {
            window.Echo.leaveChannel("department." + department);
            if (isValid === 1) {
                axios
                    .get(
                        "/api/query?department=" +
                        department +
                        "&from=" +
                        from +
                        "&to=" +
                        to
                    )
                    .then((res) => {
                        setActualQuantity(() => res.data[0]);
                        setTargetQuantity(() => res.data[2]);
                        setActualQuality(() => res.data[1]);
                        setActualAllQuality(() => res.data[3]);
                        setActualStitchingQuanlity(() => res.data[4] ? res.data[4] : 0)
                        const resultWorkHoursMax = getWorkHoursMax(res.data[5])
                        handleCalculateWorkHour(resultWorkHoursMax)
                        if(resultWorkHoursMax.length > 0) {
                            let totalWorkHoursTemp = calculateTotalWorkHours(resultWorkHoursMax)
                            setTotalWorkHours(totalWorkHoursTemp)
                        } else {
                            setTotalWorkHours(8)
                        }
                    })
            }
        }
    }

    useEffect(() => {
        handleGetDataChart()

        return function () {
            window.Echo.leaveChannel("department." + department);
        };
    }, [isValid, department]);

    useEffect(() => {
        if(deptBoardChild) {
            setDepartment(deptBoardChild)
        }
    }, [deptBoardChild])

    useEffect(() => {
        axios.get("/api/get-department").then((res) =>
            setListDepartment(
                res.data.map((item) => ({
                    value: item.department_code,
                    name: item.dep_sap,
                }))
            )
        );

        // axios.get("/api/get-user").then((res) => {
        //     setStaffDepartment(res.data.staff_department);
        // });
    }, []);

    // handle khi click nút tìm kiếm
    const handleSearch = () => {
        if ((from && !to) || (!from && to)) {
            const key = enqueueSnackbar(
                "Không truy vấn được, phải chọn cả 2 ngày, hoặc để trống cả 2 ngày",
                {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    action: (
                        <div
                            className="text-white cursor-pointer hover:text-gray-100 active:text-gray-200"
                            onClick={() => closeSnackbar(key)}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="-80 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                            </svg>
                        </div>
                    ),
                }
            );
            return;
        }

        if (isValid === 0) {
            const key = enqueueSnackbar(
                "Lỗi ngày cách nhau hơn 7 ngày, không thể truy vấn như vậy được",
                {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    action: (
                        <div
                            className="text-white cursor-pointer hover:text-gray-100 active:text-gray-200"
                            onClick={() => closeSnackbar(key)}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="-80 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                            </svg>
                        </div>
                    ),
                }
            );
            return;
        }

        if (isValid === -1) {
            const key = enqueueSnackbar(
                "Ngày trước không được lớn hơn ngày sau",
                {
                    variant: "warning",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    action: (
                        <div
                            className="text-white cursor-pointer hover:text-gray-100 active:text-gray-200"
                            onClick={() => closeSnackbar(key)}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="-80 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                            </svg>
                        </div>
                    ),
                }
            );
            return;
        }

        handleGetDataChart()
    };

    // useEffect(() => {
    //     console.log(actualQuantity);
    // }, [actualQuantity])

    // useEffect(() => {
    //     console.log(actualStitchingQuanlity);
    // }, [actualStitchingQuanlity]);

    return (
        <Fragment>
            {/* {isLoading && (
                <div className="absolute inset-0 bg-gray-800/90 flex items-center justify-center backdrop-blur-sm z-20">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )} */}
            <div className="h-screen flex flex-col select-none zoom-70 xl:zoom-100">
                <div className="flex justify-between pt-1 pb-1 xl:pt-3 xl:pb-3 flex-row items-center gap-2">
                    <div className="bg-gray-500/90 px-3 py-1 xl:px-5 xl:py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-xl xl:text-3xl uppercase font-bold text-white">
                            Bảng KPI dữ liệu
                        </p>
                    </div>
                    <div className="flex items-center flex-wrap w-1/2 xl:w-auto">
                        <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
                            <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                <span className="flex-1">Chuyền</span>
                            </span>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-0.5 xl:px-2.5 xl:py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={department}
                                onChange={(event) => {
                                    setDepartment(event.target.value);
                                }}
                            >
                                {listDepartment.map((item, index) => (
                                    <option key={index} value={item.value}>
                                        {item.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
                            <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                <span className="flex-1">Từ</span>
                            </span>
                            <input
                                type="date"
                                id="website-admin"
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 px-1 py-0.5 xl:px-2.5 xl:py-1.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={from}
                                onChange={(e) => {
                                    setFrom(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1">
                            <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                <span className="flex-1">Đến</span>
                            </span>
                            <input
                                type="date"
                                id="website-admin"
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 px-1 py-0.5 xl:px-2.5 xl:py-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={to}
                                onChange={(e) => {
                                    setTo(e.target.value);
                                }}
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 xl:px-5 py-0.5 xl:py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-0 dark:focus:ring-blue-800 outline-none ring-0 ring-offset-0 active:outline-none"
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="me-5">
                            <Link href={route("KPIBoardGrid")}>
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm  px-3 py-0.5 xl:px-7 xl:py-1.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]"
                                >
                                    Xem nhiều bảng
                                </button>
                            </Link>
                        </div>
                        <div className="me-5">
                            <button
                                onClick={() => {
                                    window.history.back();
                                }}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm  px-3 py-0.5 xl:px-7 xl:py-1.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]"
                            >
                                Trở về
                            </button>
                        </div>
                        <div>
                            <img
                                className="w-[40px] xl:w-[60px]"
                                src="/images/apache.png"
                                alt="logo-apache"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 bg-gray-100">
                    <div className="w-4/12 xl:w-2/12 flex flex-col p-5 justify-around gap-5">
                        <div
                            onClick={null}
                            className="flex-1 bg-white rounded-xl shadow flex flex-col"
                        >
                            <div className="px-1 py-1 xl:px-2 xl:py-3 bg-gray-500 rounded-xl text-base xl:text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Giao hàng
                            </div>
                            <div
                                className={`text-3xl xl:text-5xl font-bold flex flex-1 justify-center items-center ${isQuantityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {getActualQuantity}/{targetQuantity}
                            </div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow flex flex-col">
                            <div className="px-1 py-1 xl:px-2 xl:py-3 bg-gray-500 rounded-xl text-base xl:text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Phẩm chất
                            </div>
                            <div
                                className={`text-3xl xl:text-5xl font-bold flex flex-1 justify-center items-center ${isQualityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {department.includes("S") ? actualStitchingQuanlity : actualAllQuality}/{targetQuality[0]}
                            </div>
                            <div className="flex items-center justify-center pb-1">
                                <div className={`text-[24px] xl:text-[30px] font-bold ${isQualityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}>
                                    % RFT
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-2 xl:space-y-5 relative">
                        {
                            !isLoading &&
                            <div className='absolute inset-0 z-[1000] rounded-xl [background:_rgba(255,255,255,0.1)] [backdrop-filter:_blur(5px)] flex items-center justify-center'>
                                <div role="status">
                                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        {
                            isLoading &&
                            <>
                                <div className="flex-1 flex">
                                    <div className="[&_canvas]:h-full flex-1 pr-5">
                                        <ChartTwoColumn
                                            name="Bảng biểu sản lượng"
                                            labels={labelsChartColumn}
                                            actual={actualQuantity}
                                            target={getTargetQuantity}
                                            nameActual="Sản lượng thực tế"
                                            nameTarget="Mục tiêu sản lượng"
                                            isSmall={width <= 800}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex">
                                    <div className="[&_canvas]:h-full flex-1 pr-5">
                                        {
                                            department.includes("L")
                                            ?
                                                <ChartTwoColumn
                                                    name="Bảng biểu chất lượng"
                                                    labels={labelsChartColumn}
                                                    actual={actualQuality}
                                                    target={targetQuality}
                                                    nameActual="Chất lượng thực tế"
                                                    nameTarget="Mục tiêu chất lượng"
                                                    isSmall={width <= 800}
                                                />
                                            :
                                                <ChartStitchingQuanlity
                                                    name="Bảng biểu chất lượng"
                                                    labels={labelsChartColumn}
                                                    actual={actualStitchingQuanlity}
                                                    target={targetQuality}
                                                    nameActual="Chất lượng thực tế"
                                                    nameTarget="Mục tiêu chất lượng"
                                                    isSmall={width <= 800}
                                                />
                                        }
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 mt-2 px-5">
                    <TableIssue />
                </div>
            </div>
        </Fragment>
    );
}
import ChartTwoColumn from "@/Components/ChartTwoColumn";
import TableIssue from "@/Components/TableIssue";
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useMemo, useState } from "react";
import generateTimeSlots from "../../../utilities/generateTimeSlots";
import getWorkHoursMax from "../../../utilities/getWorkHoursMax";
import calculateTotalWorkHours from "../../../utilities/calculateTotalWorkHours";
import ChartStitchingQuanlity from "@/Components/ChartStitchingQuanlity";

const KPIBoardGridChild = forwardRef(({ departmentTemp, fromDate, toDate, udf01, onSearch, searchTrigger }, ref) => {
    const [timeRefresh, setTimeRefresh] = useState(0);
    const [actualQuantity, setActualQuantity] = useState([
        0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [targetQuantity, setTargetQuantity] = useState(0)
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

    const [actualAllQuality, setActualAllQuality] = useState(0);
    const [targetAllQuality, setTargetAllQuality] = useState(100);

    const [actualStitchingQuanlity, setActualStitchingQuanlity] = useState("")

    const width = document.body.clientWidth;

    const [listDepartment, setListDepartment] = useState([]);
    const [staffDepartment, setStaffDepartment] = useState("");
    const [department, setDepartment] = useState(departmentTemp);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [labelsChartColumn, setLabelsChartColumn] = useState([])
    const [totalWorkHours, setTotalWorkHours] = useState(8)

    const isQualityPassed = useMemo(() => {
        if (targetAllQuality == 0) return false;

        return (department.includes("L") ? actualAllQuality : actualStitchingQuanlity) >= targetQuality[0];
    }, [department, actualAllQuality, actualStitchingQuanlity]);

    useEffect(() => {
        // Khi searchTrigger thay đổi, thực hiện hàm handleSearchChild
        if (searchTrigger) {
            if (from !== undefined && to !== undefined || from !== "" && to !== "") {
                handleSearchChild();
            }

            // Gọi hàm onSearch khi đã thực hiện search xong
            if (onSearch) {
                onSearch();
            }
        }
    }, [searchTrigger]);

    // tính toán số lượng các cột target
    const getTargetQuantity = useMemo(() => {
        return new Array(labelsChartColumn.length).fill(
            Math.trunc(Number(targetQuantity) / totalWorkHours)
        );
    }, [targetQuantity, labelsChartColumn, totalWorkHours]);

    useEffect(() => {
        setDepartment(departmentTemp);
    }, [departmentTemp]);

    useEffect(() => {
        setFrom(fromDate);
    }, [fromDate]);

    useEffect(() => {
        setTo(toDate);
    }, [toDate]);

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
                "15:30-16:30",
                "16:30-17:30",
                "17:30-18:30",
                "18:30-20:30"
            ])
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
    // Cách 1
    // const handleGetDataChart = () => {
    //     handleSetTargetQuality(department);

    //     async function ListenHandle(e) {
    //         setActualQuantity(() => e.data.result[0]);
    //         setTargetQuantity(() => e.data.target);
    //         setActualQuality(() => e.data.result[1]);
    //         setActualAllQuality(() => e.data.actualAllRFT);
    //         setActualStitchingQuanlity(() => [parseInt(String(e.data.actualStitchingQuanlity).replace("%", ""))])
    //         await handleCalculateWorkHour(e.data.workHours)
    //         if(e.data.workHours.length > 0) {
    //             let totalWorkHoursTemp = calculateTotalWorkHours(e.data.workHours)
    //             setTotalWorkHours(totalWorkHoursTemp)
    //         } else {
    //             setTotalWorkHours(8)
    //         }
    //     }

    //     return new Promise((resolve, reject) => {
    //         const today = new Date();
    //         const yyyy = today.getFullYear();
    //         const mm = String(today.getMonth() + 1).padStart(2, '0');
    //         const dd = String(today.getDate()).padStart(2, '0');

    //         const formattedToday = yyyy + "-" + mm + "-" + dd;
            
    //         if (from === to && (from === formattedToday || from === "")) {
    //             window.Echo.channel("department." + department).listen(
    //                 "RealTimeChart",
    //                 ListenHandle
    //             );
    //             resolve();
    //         } else {
    //             window.Echo.leaveChannel("department." + department);
    //             if (isValid === 1) {
    //                 axios
    //                     .get(
    //                         "/api/query?department=" +
    //                         department +
    //                         "&from=" +
    //                         from +
    //                         "&to=" +
    //                         to
    //                     )
    //                     .then((res) => {
    //                         setActualQuantity(() => res.data[0]);
    //                         setTargetQuantity(() => res.data[2]);
    //                         setActualQuality(() => res.data[1]);
    //                         setActualAllQuality(() => res.data[3]);
    //                         setActualStitchingQuanlity(() => res.data[4] ? res.data[4] : 0)
    //                         const resultWorkHoursMax = getWorkHoursMax(res.data[5])
    //                         handleCalculateWorkHour(resultWorkHoursMax)
    //                         if(resultWorkHoursMax.length > 0) {
    //                             let totalWorkHoursTemp = calculateTotalWorkHours(resultWorkHoursMax)
    //                             setTotalWorkHours(totalWorkHoursTemp)
    //                         } else {
    //                             setTotalWorkHours(8)
    //                         }
    //                         resolve();
    //                     })
    //                     .catch(reject);
    //             } else {
    //                 resolve(); // Nếu isValid !== 1, vẫn resolve để không gây lỗi chờ Promise
    //             }
    //         }
    //     })
    // }

    const handleGetDataChart = () => {
        handleSetTargetQuality(department);
    
        return new Promise((resolve, reject) => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
    
            const formattedToday = yyyy + "-" + mm + "-" + dd;
            
            if (from === to && (from === formattedToday || from === "")) {
                const channel = window.Echo.channel("department." + department);
                
                const ListenHandle = async (e) => {
                    setActualQuantity(() => e.data.result[0]);
                    setTargetQuantity(() => e.data.target);
                    setActualQuality(() => e.data.result[1]);
                    setActualAllQuality(() => e.data.actualAllRFT);
                    setActualStitchingQuanlity(() => [parseInt(String(e.data.actualStitchingQuanlity).replace("%", ""))]);
                    
                    await handleCalculateWorkHour(e.data.workHours);
    
                    if (e.data.workHours.length > 0) {
                        let totalWorkHoursTemp = calculateTotalWorkHours(e.data.workHours);
                        setTotalWorkHours(totalWorkHoursTemp);
                    } else {
                        setTotalWorkHours(8);
                    }

                    resolve();
                };
    
                // Đăng ký sự kiện và đợi dữ liệu từ socket
                channel.listen("RealTimeChart", ListenHandle);
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
                            setActualStitchingQuanlity(() => res.data[4] ? res.data[4] : 0);
                            const resultWorkHoursMax = getWorkHoursMax(res.data[5]);
                            handleCalculateWorkHour(resultWorkHoursMax);
    
                            if (resultWorkHoursMax.length > 0) {
                                let totalWorkHoursTemp = calculateTotalWorkHours(resultWorkHoursMax);
                                setTotalWorkHours(totalWorkHoursTemp);
                            } else {
                                setTotalWorkHours(8);
                            }
    
                            resolve();
                        })
                        .catch(reject);
                } else {
                    resolve(); // Nếu isValid !== 1, vẫn resolve để không gây lỗi chờ Promise
                }
            }
        });
    };

    useEffect(() => {
        handleGetDataChart()

        return function () {
            window.Echo.leaveChannel("department." + department);
        };
    }, [department]);

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
        //     // console.log(res.data.staff_department);
        //     setStaffDepartment(res.data.staff_department);
        // });
    }, []);

    // Dùng useImperativeHandle để cho phép cha gọi hàm này
    useImperativeHandle(ref, () => ({
        triggerChildFunction: handleGetDataChart,
    }));

    const handleSearchChild = () => {
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
    };

    // useEffect(() => {
    //     console.log(targetQuantity, labelsChartColumn);
    // }, [targetQuantity, labelsChartColumn]);

    return (
        <Fragment>
            <div className="flex flex-1 bg-gray-100">
                <div className="flex flex-1">
                    <div className="flex flex-col p-5 gap-5">
                        <div
                            onClick={null}
                            className="flex-1 w-full rounded-xl shadow flex flex-col"
                        >
                            <div className="px-2 py-1 xl:px-5 xl:py-3 bg-gray-500 rounded-t-xl text-base xl:text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Giao hàng
                            </div>
                            <div
                                className={`bg-white px-2 text-xl xl:text-3xl rounded-b-xl font-bold flex flex-1 justify-center items-center ${isQuantityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                            >
                                {getActualQuantity}/{targetQuantity}
                            </div>
                        </div>
                        <div className="flex-1 rounded-xl shadow flex flex-col">
                            <div className="!w-full px-2 py-1 xl:px-5 xl:py-3 bg-gray-500 rounded-t-xl text-base xl:text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Phẩm chất
                            </div>
                            <div
                                className={`bg-white px-2 text-xl xl:text-3xl rounded-b-xl font-bold flex flex-col gap-5 flex-1 justify-center items-center ${isQualityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                            >
                                <div>
                                    {department.includes("L") ? actualAllQuality : actualStitchingQuanlity}/{targetQuality[0]}
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
                    </div>
                    <div className="flex-1 flex flex-col space-y-2 xl:space-y-5">
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
                    </div>
                </div>
            </div>
        </Fragment>
    );
})

export default KPIBoardGridChild;
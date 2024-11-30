import ChartTwoColumn from "@/Components/ChartTwoColumn";
import TableIssue from "@/Components/TableIssue";
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";
import React, { Fragment, useEffect, useMemo, useState } from "react";

export default function KPIBoardGridChild({ departmentTemp, fromDate, toDate, onSearch, searchTrigger }) {
    const [isLoading, setLoading] = useState(false);
    const [timeRefresh, setTimeRefresh] = useState(0);
    const [actualQuantity, setActualQuantity] = useState([
        0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [targetQuantity, setTargetQuantity] = useState(0);
    const getTargetQuantity = useMemo(() => {
        return new Array(actualQuantity.length).fill(
            Math.trunc(Number(targetQuantity) / actualQuantity.length)
        );
    }, [targetQuantity]);
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

    const width = document.body.clientWidth;

    const isQualityPassed = useMemo(() => {
        if (targetAllQuality == 0) return false;

        // return (actualAllQuality / targetQuality[0]) * 100 >= targetQuality[0];
        return actualAllQuality >= targetQuality[0];
    }, [actualAllQuality]);

    const [listDepartment, setListDepartment] = useState([]);

    const [department, setDepartment] = useState(departmentTemp);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const [staffDepartment, setStaffDepartment] = useState("");


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

    useEffect(() => {
        const index = listDepartment.findIndex(
            (item) => item.value === staffDepartment
        );
        if (index > -1) {
            setDepartment(staffDepartment);
            setTimeRefresh(Date.now());
        }
    }, [staffDepartment, listDepartment]);

    const handleSetTargetQuality = (dept) => {
        if (dept.includes("S")) {
            setTargetQuality(new Array(11).fill(90));
        } else if (dept.includes("L")) {
            setTargetQuality(new Array(11).fill(88));
        } else {
            setTargetQuality([]);
        }
    };

    useEffect(() => {
        handleSetTargetQuality(department);

        function ListenHandle(e) {
            setActualQuantity(() => e.data.result[0]);
            setTargetQuantity(() => e.data.target);
            setActualQuality(() => e.data.result[1]);
            setActualAllQuality(() => e.data.actualAllRFT);
            setLoading(false);
        }

        const today = new Date();
        const dd = today.getDate();
        let mm = today.getMonth() + 1; // Months start at 0!
        const yyyy = today.getFullYear();

        const formattedToday = yyyy + "-" + mm + "-" + dd;

        if (from === to && (from === formattedToday || from === "")) {
            setLoading(true);
            window.Echo.channel("department." + department).listen(
                "RealTimeChart",
                ListenHandle
            );
        } else {
            if (isValid === 1) {
                setLoading(true);
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
                        setLoading(false);
                    });
            }
        }

        return function () {
            if (from === to) {
                window.Echo.leaveChannel("department." + department);
            }
        };
    }, [timeRefresh, department]);

    useEffect(() => {
        axios.get("/api/get-department").then((res) =>
            setListDepartment(
                res.data.map((item) => ({
                    value: item.department_code,
                    name: item.dep_sap,
                }))
            )
        );
        axios.get("/api/get-user").then((res) => {
            setStaffDepartment(res.data.staff_department);
        });
    }, []);

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

        if (!isLoading) setTimeRefresh(Date.now());
    };

    // useEffect(() => {
    //     console.log(targetQuality);
    // }, [targetQuality]);

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
                                className={`bg-white px-2 text-xl xl:text-3xl rounded-b-xl font-bold flex flex-1 justify-center items-center ${isQualityPassed
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                            >
                                {actualAllQuality}/{targetQuality[0]}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col space-y-2 xl:space-y-5">
                        <div className="flex-1 flex">
                            <div className="[&_canvas]:h-full flex-1 pr-5">
                                <ChartTwoColumn
                                    name="Bảng biểu sản lượng"
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
                                <ChartTwoColumn
                                    name="Bảng biểu chất lượng"
                                    actual={actualQuality}
                                    target={targetQuality}
                                    nameActual="Chất lượng thực tế"
                                    nameTarget="Mục tiêu chất lượng"
                                    isSmall={width <= 800}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

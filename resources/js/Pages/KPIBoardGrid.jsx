import ChartTwoColumn from "@/Components/ChartTwoColumn";
import TableIssue from "@/Components/TableIssue";
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import KPIBoardGridChild from "./KPIBoardGridChild";

export default function KPIBoardGrid() {

    const [isLoading, setLoading] = useState(false);
    const [timeRefresh, setTimeRefresh] = useState(0);
    const width = document.body.clientWidth;


    const [listDepartment, setListDepartment] = useState([]);

    const [department, setDepartment] = useState("4001APL01");
    const [department2, setDepartment2] = useState("4001APL02");
    const [department3, setDepartment3] = useState("4001APL03");
    const [department4, setDepartment4] = useState("4001APL05");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [searchTrigger, setSearchTrigger] = useState(false);

    const [staffDepartment, setStaffDepartment] = useState("");

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



    useEffect(() => {

        function ListenHandle(e) {
            console.log(e);
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
                        setLoading(false);
                    });
            }
        }

        return function () {
            if (from === to) {
                window.Echo.leaveChannel("department." + department);
            }
        };
    }, [timeRefresh]);

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

        if (!isLoading) setTimeRefresh(Date.now());
        setSearchTrigger(true);
    };

    useEffect(() => {
        console.log(from);
    }, [from]);

    return (
        <Fragment>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-800/30 flex items-center justify-center backdrop-blur-sm z-20">
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
            )}
            <div className="h-screen flex flex-col select-none zoom-70  xl:zoom-100">
                {/* ... (Header section) */}
                <div className="flex justify-between pt-1 pb-1 xl:pt-3 xl:pb-3 flex-row items-center gap-2">
                    <div className="bg-gray-500/90 px-3 py-1 xl:px-5 xl:py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-xl xl:text-3xl uppercase font-bold text-white">
                            Bảng KPI dữ liệu
                        </p>
                    </div>
                    <div className="flex items-center flex-wrap w-1/2 xl:w-auto">
                        {/* <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
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
                        </div> */}
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
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 xl:px-5 py-0.5 xl:py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
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
                {/* Main content divided into a 2x2 grid */}
                <div className="flex-1 bg-gray-100 grid grid-cols-2 grid-rows-2 gap-4 gap-y-4">
                    {/* First cell */}
                    <div className="col-span-1 row-span-1 w-full flex flex-col space-y-2 xl:space-y-5 border-2 border-red-400">
                        {/* ... (Giao hàng content) */}
                        <div className="flex flex-1 flex-col bg-gray-100">
                            <div className="pl-6 pt-2">
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
                            </div>                           
                            <KPIBoardGridChild
                                departmentTemp={department}
                                fromDate={from}
                                toDate={to}
                                onSearch={() => setSearchTrigger(false)}  // Đặc biệt, bạn có thể thực hiện các hành động sau khi search xong ở đây
                                searchTrigger={searchTrigger}
                            />
                        </div>
                    </div>

                    {/* Second cell */}
                    <div className="col-span-1 row-span-1 w-full flex flex-col space-y-2 xl:space-y-5  border-2 border-red-400">
                        {/* ... (ChartTwoColumn for Sản lượng) */}
                        <div className="flex flex-1 flex-col bg-gray-100">
                            <div className="pl-6 pt-2">
                                <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
                                    <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                        <span className="flex-1">Chuyền</span>
                                    </span>
                                    <select
                                        id="countries"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-0.5 xl:px-2.5 xl:py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={department2}
                                        onChange={(event) => {
                                            setDepartment2(event.target.value);
                                        }}
                                    >
                                        {listDepartment.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <KPIBoardGridChild
                                departmentTemp={department2}
                                fromDate={from}
                                toDate={to}
                                onSearch={() => setSearchTrigger(false)}  // Đặc biệt, bạn có thể thực hiện các hành động sau khi search xong ở đây
                                searchTrigger={searchTrigger}
                            />
                        </div>
                    </div>

                    {/* Third cell */}
                    <div className="col-span-1 row-span-1 w-full flex flex-col space-y-2 xl:space-y-5  border-2 border-red-400">
                        {/* ... (ChartTwoColumn for Chất lượng) */}
                        <div className="flex flex-1 flex-col bg-gray-100">
                            <div className="pl-6 pt-2">
                                <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
                                    <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                        <span className="flex-1">Chuyền</span>
                                    </span>
                                    <select
                                        id="countries"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-0.5 xl:px-2.5 xl:py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={department3}
                                        onChange={(event) => {
                                            setDepartment3(event.target.value);
                                        }}
                                    >
                                        {listDepartment.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <KPIBoardGridChild
                                departmentTemp={department3}
                                fromDate={from}
                                toDate={to}
                                onSearch={() => setSearchTrigger(false)}  // Đặc biệt, bạn có thể thực hiện các hành động sau khi search xong ở đây
                                searchTrigger={searchTrigger}
                            />
                        </div>
                    </div>

                    {/* Fourth cell */}
                    <div className="col-span-1 row-span-1 w-full flex flex-col space-y-2 xl:space-y-5  border-2 border-red-400">
                        {/* ... (TableIssue or other component) */}
                        <div className="flex flex-1 flex-col bg-gray-100">
                            <div className="pl-6 pt-2">
                                <div className="flex w-1/2 text-xs xl:text-sm xl:w-[220px] pr-1 mb-1 xl:mb-0">
                                    <span className="flex items-center px-1 xl:px-3 text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap text-center">
                                        <span className="flex-1">Chuyền</span>
                                    </span>
                                    <select
                                        id="countries"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-1 py-0.5 xl:px-2.5 xl:py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={department4}
                                        onChange={(event) => {
                                            setDepartment4(event.target.value);
                                        }}
                                    >
                                        {listDepartment.map((item, index) => (
                                            <option key={index} value={item.value}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <KPIBoardGridChild
                                departmentTemp={department4}
                                fromDate={from}
                                toDate={to}
                                onSearch={() => setSearchTrigger(false)}  // Đặc biệt, bạn có thể thực hiện các hành động sau khi search xong ở đây
                                searchTrigger={searchTrigger}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    );
}

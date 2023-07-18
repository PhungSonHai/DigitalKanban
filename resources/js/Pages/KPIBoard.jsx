import ChartTwoColumn from "@/Components/ChartTwoColumn";
import TableIssue from "@/Components/TableIssue";
import axios from "axios";
import React, { Fragment, useEffect, useMemo, useState } from "react";

export default function KPIBoard() {
    const [isLoading, setLoading] = useState(false);
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

        return (getActualQuantity / targetQuantity) * 100 >= 90;
    }, [getActualQuantity]);

    const [actualQuality, setActualQuality] = useState([]);
    const [targetQuality, setTargetQuality] = useState([]);

    const [actualAllQuality, setActualAllQuality] = useState(0);
    const [targetAllQuality, setTargetAllQuality] = useState(100);

    const isQualityPassed = useMemo(() => {
        if (targetAllQuality == 0) return false;

        return (actualAllQuality / targetAllQuality) * 100 >= 90;
    }, [actualAllQuality]);
    
    const [listDepartment, setListDepartment] = useState([]);

    const [department, setDepartment] = useState("APL01");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleSetTargetQuality = (dept) => {
        if(dept.includes("S")) {
            setTargetQuality(new Array(8).fill(90))
        } else if(dept.includes("L")) {
            setTargetQuality(new Array(8).fill(88))
        } else {
            setTargetQuality([])
        }
    }

    useEffect(() => {
        handleSetTargetQuality(department);

        // setLoading(true);
        function ListenHandle(e) {
            // console.log(e);
            setActualQuantity(() => e.data.result[0]);
            setTargetQuantity(() => e.data.target);
            setActualQuality(() => e.data.result[1]);
            setActualAllQuality(() => e.data.actualAllRFT)
            setLoading(false);
        }
        window.Echo.channel("department.4001" + department).listen(
            "RealTimeChart",
            ListenHandle
        );
        return function () {
            window.Echo.leaveChannel("department.4001" + department);
        };
    }, [department]);

    useEffect(() => {
        axios
            .get("/api/get-department")
            .then((res) =>
                setListDepartment(res.data.map((item) => item.dep_sap))
            );
    }, []);

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
            <div className="h-screen flex flex-col select-none">
                <div className="flex justify-between pt-3 mb-3 flex-row items-center">
                    <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-3xl uppercase font-bold text-white">
                            Bảng KPI dữ liệu
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-1 w-[220px]">
                            <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                                Chuyền
                            </span>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={department}
                                onChange={(event) => {
                                    setDepartment(event.target.value);
                                }}
                            >
                                {listDepartment.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-1 w-[220px]">
                            <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-20 text-center">
                                <span className="flex-1">Từ</span>
                            </span>
                            <input
                                type="date"
                                id="website-admin"
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-1.5   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="elonmusk"
                            />
                        </div>
                        <div className="flex flex-1 w-[220px]">
                            <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-20 text-center">
                                <span className="flex-1">Đến</span>
                            </span>
                            <input
                                type="date"
                                id="website-admin"
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 px-2.5 py-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="elonmusk"
                            />
                        </div>
                        <div>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]"
                            >
                                Trở về
                            </button>
                        </div>
                        <div>
                            <img
                                width={60}
                                src="/images/apache.png"
                                alt="logo-apache"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 bg-gray-100">
                    <div className="w-2/12 flex flex-col p-5 justify-around gap-5">
                        <div
                            onClick={null}
                            className="flex-1 bg-white rounded-xl shadow flex flex-col"
                        >
                            <div className="px-2 py-3 bg-gray-500 rounded-xl text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Giao hàng
                            </div>
                            <div
                                className={`text-5xl font-bold flex flex-1 justify-center items-center ${
                                    isQuantityPassed
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {getActualQuantity}/{targetQuantity}
                            </div>
                        </div>
                        <div className="flex-1 bg-white rounded-xl shadow flex flex-col">
                            <div className="px-2 py-3 bg-gray-500 rounded-xl text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                                Phẩm chất
                            </div>
                            <div className={`text-5xl font-bold flex flex-1 justify-center items-center ${isQualityPassed ? "text-green-500" : "text-red-500"}`}>
                                {actualAllQuality}/{targetAllQuality}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col space-y-5">
                        <div className="flex-1 flex">
                            <div className="[&_canvas]:h-full flex-1 pr-5">
                                <ChartTwoColumn
                                    name="Bảng biểu sản lượng"
                                    actual={actualQuantity}
                                    target={getTargetQuantity}
                                    nameActual="Sản lượng thực tế"
                                    nameTarget="Mục tiêu sản lượng"
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
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-gray-100 mt-2 px-5">
                    <TableIssue />
                </div>
            </div>
        </Fragment>
    );
}

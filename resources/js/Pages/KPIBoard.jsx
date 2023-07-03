import ChartTwoColumn from "@/Components/ChartTwoColumn";
import TableIssue from "@/Components/tableIssue";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

export default function KPIBoard() {
    const [actual, setActual] = useState([]);
    const [target, setTarget] = useState([]);
    const [listDepartment, setListDepartment] = useState([]);
    const [department, setDepartment] = useState("APL01");

    useEffect(() => {
        setTarget(new Array(8).fill(100));

        function ListenHandle(e) {
            console.log(e);
            setActual(() => e.data.result);
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

    function handleRandom() {
        setActual(
            new Array(8).fill(0).map(() => Math.trunc(Math.random() * 100))
        );
    }

    return (
        <div className="h-screen flex flex-col select-none">
            <div className="flex justify-between pt-3 mb-3 flex-row items-center">
                <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-3xl uppercase font-bold text-white">
                        Bảng KPI dữ liệu
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center bg-gray-500 text-white">
                        <div className="px-2">Xưởng</div>
                        <div>
                            <select
                                value={department}
                                className="p-0.5 pl-2 pr-8 text-black"
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
                    </div>
                    {/* <div className="flex items-center bg-gray-500 text-white">
                        <div className="px-2">Chuyền</div>
                        <div>
                            <select
                                name=""
                                id=""
                                className="p-0.5 pl-2 pr-8 text-black"
                            >
                                <option value="">S1</option>
                            </select>
                        </div>
                    </div> */}
                    <div className="flex items-center bg-gray-500 text-white">
                        <div className="px-2">Từ</div>
                        <div>
                            <input
                                type="date"
                                className="p-0.5 pl-2 text-black"
                            />
                        </div>
                    </div>
                    <div className="flex items-center bg-gray-500 text-white">
                        <div className="px-2">Đến</div>
                        <div>
                            <input
                                type="date"
                                className="p-0.5 pl-2 text-black"
                            />
                        </div>
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
                        onClick={handleRandom}
                        className="flex-1 bg-white rounded-xl shadow flex flex-col"
                    >
                        <div className="px-2 py-3 bg-gray-500 rounded-xl text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                            Phẩm chất
                        </div>
                        <div className="text-5xl font-bold flex flex-1 justify-center items-center">
                            100/100
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl shadow flex flex-col">
                        <div className="px-2 py-3 bg-gray-500 rounded-xl text-xl font-bold text-center text-white shadow-lg shadow-gray-400">
                            Giao hàng
                        </div>
                        <div className="text-5xl font-bold flex flex-1 justify-center items-center">
                            100/100
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col space-y-5">
                    <div className="flex-1 flex">
                        <div className="[&_canvas]:h-full flex-1 pr-5">
                            <ChartTwoColumn
                                name="Bảng biểu sản lượng"
                                actual={actual}
                                target={target}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex">
                        <div className="[&_canvas]:h-full flex-1 pr-5">
                            <ChartTwoColumn
                                name="Bảng biểu chất lượng"
                                actual={actual}
                                target={target}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-gray-100 mt-2 px-5">
                <TableIssue />
            </div>
        </div>
    );
}

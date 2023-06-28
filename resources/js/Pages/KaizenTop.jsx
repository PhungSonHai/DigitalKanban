import { Link, Head } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";

export default function KaizenTop() {
    const [month, setMonth] = useState(0);
    const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const listCategory = [
        { id: 0, name: "Phẩm chất" },
        { id: 1, name: "Năng suất" },
        { id: 2, name: "Tiết kiệm" },
        { id: 3, name: "An Toàn" },
        { id: 4, name: "Sáng tạo" },
        { id: 5, name: "6S" },
        { id: 6, name: "Toàn diện" },
    ];
    const [listChecked, setListChecked] = useState([]);
    const listKaizen = ["01", "02", "03"];
    const [currentKaizen, setCurrentKaizen] = useState(0);

    useEffect(() => {
        setMonth(new Date().getMonth());
        setListChecked(new Array(listCategory.length).fill(false));
    }, []);

    function handlePreviousMonth() {
        if (month - 1 < 0) {
            setMonth(11);
            return;
        }

        setMonth(month - 1);
    }

    function handleNextMonth() {
        if (month + 1 > 11) {
            setMonth(0);
            return;
        }
        setMonth(month + 1);
    }

    function handleSetKaizen(index) {
        return () => setCurrentKaizen(index);
    }

    const getMonth = useMemo(() => listMonth[month], [month]);
    const getCategory = useMemo(() => {
        var result = [];
        listCategory.push(...new Array(3).fill({ id: null, name: "T" }));
        for (var i = 0; i < listCategory.length; i += 5) {
            result.push(listCategory.slice(i, i + 5));
        }
        return result;
    }, [listCategory]);

    return (
        <div className="bg-white h-screen w-full pt-3 select-none flex flex-col">
            <div className="flex justify-between items-center">
                <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-3xl uppercase font-bold text-white">
                        TOP 3 KAIZEN CỦA THÁNG
                    </p>
                </div>

                <div className="bg-blue-500 text-xl font-bold text-white border border-solid rounded-md overflow-hidden border-t-blue-400 border-blue-600 border-b-blue-700">
                    <div className="flex justify-between items-stretch divide-x divide-blue-700">
                        <div
                            className="px-3 flex items-center hover:bg-blue-600/50 cursor-pointer"
                            onClick={handlePreviousMonth}
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={4}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                        </div>
                        <div className="py-1 px-2 min-w-[120px] text-center">
                            Tháng {getMonth}
                        </div>
                        <div
                            className="px-3 flex items-center hover:bg-blue-600/50 cursor-pointer"
                            onClick={handleNextMonth}
                        >
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={4}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-3/12">
                    <div className="bg-gray-500/90 text-xl font-bold text-white px-3 py-1 text-center">
                        Kaizen Number
                    </div>
                    <div className="flex gap-2">
                        {listKaizen.map((item, index) => (
                            <div
                                className={
                                    (index == currentKaizen
                                        ? "bg-gray-600 hover:bg-gray-600 "
                                        : "bg-gray-400 hover:bg-gray-500 ") +
                                    "px-3 py-1 flex-1 text-center cursor-pointer font-bold text-white"
                                }
                                onClick={handleSetKaizen(index)}
                            >
                                {item}
                            </div>
                        ))}
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
            <div className="flex-1 flex">
                <div className="w-3/12 bg-slate-500- p-3 flex flex-col gap-5 justify-around">
                    <div className="bg-gray-200 rounded-lg border-2 border-solid border-gray-300 py-2">
                        <div className="bg-white text-center 2xl:py-2 py-1 font-semibold 2xl:text-xl text-lg">
                            Thông tin người cải tiến
                        </div>
                        <div className="flex">
                            <div className="2xl:p-5 p-2">
                                <div className="2xl:w-32 2xl:h-32 w-24 h-24 border-2 border-solid border-gray-400 bg-white rounded-lg"></div>
                            </div>
                            <div className="2xl:p-5 p-2 pl-0 flex justify-around flex-col">
                                <div>Tên</div>
                                <div>MSNV</div>
                                <div>Bộ Phận</div>
                                <div>Xưởng</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg border-2 border-solid border-gray-300 py-2 flex-1 flex flex-col">
                        <div className="bg-white text-center 2xl:py-2 py-1 font-semibold 2xl:text-xl text-lg">
                            Hạng mục cải tiến
                        </div>
                        <div className="2xl:p-5 p-2 flex-1 flex">
                            <div className="flex flex-1">
                                {getCategory.map((group) => (
                                    <div className="flex-1 flex justify-around flex-col items-start">
                                        {group.map((item) => (
                                            <div
                                                className={
                                                    item.id === null &&
                                                    "opacity-0 pointer-events-none"
                                                }
                                            >
                                                <label
                                                    htmlFor={"item_" + item.id}
                                                    className="flex gap-2 items-center"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={"item_" + item.id}
                                                        className="focus:outline-none focus:shadow-none focus:ring-0 2xl:w-8 2xl:h-8 w-4 h-4"
                                                        checked={
                                                            listChecked[item.id]
                                                        }
                                                    />{" "}
                                                    <div className="text-xl">
                                                        {item.name}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-200 rounded-lg border-2 border-solid border-gray-300 py-2 flex-1 flex flex-col">
                        <div className="bg-white text-center 2xl:py-2 py-1 font-semibold 2xl:text-xl text-lg">
                            Thông tin cải tiến
                        </div>
                        <div className="2xl:p-5 p-2 flex-1 flex justify-around flex-col">
                            <div>Tại chuyền:</div>
                            <div>Tại xưởng:</div>
                            <div>Tại công đoạn:</div>
                            <div>Từ ngày:</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2 p-3 pl-0">
                    <div className="bg-gray-800 text-white rounded-md px-3 py-2 font-bold">
                        Trước đây
                    </div>
                    <div className="flex gap-2 flex-1">
                        <div className="w-4/12 border-2 border-border border-gray-800 rounded-lg">
                            <div></div>
                        </div>
                        <div className="flex-1 border-2 border-border border-gray-800 rounded-lg">
                            <div></div>
                        </div>
                    </div>
                    <div className="bg-gray-800 text-white rounded-md px-3 py-2 font-bold">
                        Hiện tại
                    </div>
                    <div className="flex gap-2 flex-1">
                        <div className="w-4/12 border-2 border-border border-gray-800 rounded-lg">
                            <div></div>
                        </div>
                        <div className="flex-1 border-2 border-border border-gray-800 rounded-lg">
                            <div></div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-gray-500 min-w-[200px] px-3 py-2 rounded-lg text-white text-xl font-bold min-h-[100px] flex justify-center items-center">
                            Lợi ích
                        </div>
                        <div className="rounded-lg border-2 border-gray-900 border-solid flex-grow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

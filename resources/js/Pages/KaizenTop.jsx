import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

export default function KaizenTop() {
    const [isLoading, setLoading] = useState(false);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
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
    const [listKaizenMonth, setListKaizenMonth] = useState([]);

    useEffect(() => {
        setMonth(new Date().getMonth());
        setYear(new Date().getFullYear());
        setListChecked(new Array(listCategory.length).fill(false));
    }, []);

    useEffect(() => {
        if (year === 0) return;
        setLoading(true);
        axios
            .get(`/api/get-kaizen?month=${listMonth[month]}&year=${year}`)
            .then((res) => {
                setLoading(false);
                setListKaizenMonth(res.data);
            });
    }, [month, year]);

    useEffect(() => {
        if (listKaizenMonth.length > 0) {
            setCurrentKaizen(Number(listKaizenMonth[0].kaizen_order) - 1);
        }
    }, [listKaizenMonth]);

    function handlePreviousMonth() {
        if (month - 1 < 0) {
            setMonth(11);
            setYear(year - 1);
            return;
        }

        setMonth(month - 1);
    }

    function handleNextMonth() {
        if (month + 1 > 11) {
            setMonth(0);
            setYear(year + 1);
            return;
        }
        setMonth(month + 1);
    }

    function handleSetKaizen(index) {
        return () => setCurrentKaizen(index);
    }

    const isExistKaizen = useCallback(
        function (order) {
            return !(
                listKaizenMonth.findIndex(
                    (item) => item.kaizen_order == order
                ) > -1
            );
        },
        [listKaizenMonth]
    );

    const getCurrentDataKaizen = useMemo(
        function () {
            return listKaizenMonth[
                listKaizenMonth.findIndex(
                    (item) => item.kaizen_order == currentKaizen + 1
                )
            ];
        },
        [listKaizenMonth, currentKaizen]
    );

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
                                <button
                                    key={index}
                                    className={
                                        (index === currentKaizen
                                            ? "bg-gray-600 hover:bg-gray-600 "
                                            : "bg-gray-400 hover:bg-gray-500 ") +
                                        "px-3 py-1 flex-1 text-center cursor-pointer font-bold text-white" +
                                        (isExistKaizen(index + 1)
                                            ? " opacity-40 hover:bg-gray-500 bg-gray-500 cursor-not-allowed"
                                            : "")
                                    }
                                    disabled={isExistKaizen(index + 1)}
                                    onClick={handleSetKaizen(index)}
                                >
                                    {item}
                                </button>
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
                                    <div className="2xl:w-32 2xl:h-32 w-24 h-24 border-2 border-solid border-gray-400 bg-white rounded-lg overflow-hidden">
                                        {getCurrentDataKaizen?.path_avatar && (
                                            <img
                                                src={
                                                    "/uploads/" +
                                                    getCurrentDataKaizen?.path_avatar
                                                }
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="2xl:p-5 p-2 pl-0 flex justify-around flex-col">
                                    <div>Tên: {getCurrentDataKaizen?.name}</div>
                                    <div>
                                        MSNV: {getCurrentDataKaizen?.msnv}
                                    </div>
                                    <div>
                                        Bộ Phận:{" "}
                                        {getCurrentDataKaizen?.department}
                                    </div>
                                    <div>
                                        Xưởng: {getCurrentDataKaizen?.plant}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-200 rounded-lg border-2 border-solid border-gray-300 py-2 flex-1 flex flex-col">
                            <div className="bg-white text-center 2xl:py-2 py-1 font-semibold 2xl:text-xl text-lg">
                                Hạng mục cải tiến
                            </div>
                            <div className="2xl:p-5 p-2 flex-1 flex">
                                <div className="flex flex-1">
                                    {getCategory.map((group, index) => (
                                        <div
                                            key={index}
                                            className="flex-1 flex justify-around flex-col items-start"
                                        >
                                            {group.map((item, group) => (
                                                <div
                                                    className={
                                                        item.id === null
                                                            ? "opacity-0 pointer-events-none"
                                                            : ""
                                                    }
                                                    key={group}
                                                >
                                                    <label
                                                        htmlFor={
                                                            "item_" + item.id
                                                        }
                                                        className="flex gap-2 items-center"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={
                                                                "item_" +
                                                                item.id
                                                            }
                                                            className="focus:outline-none focus:shadow-none focus:ring-0 2xl:w-8 2xl:h-8 w-4 h-4"
                                                            checked={
                                                                getCurrentDataKaizen &&
                                                                getCurrentDataKaizen[
                                                                    "upgrade_" +
                                                                        item.id
                                                                ] == "1"
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
                                <div>
                                    Tại chuyền: {getCurrentDataKaizen?.line_at}
                                </div>
                                <div>
                                    Tại xưởng: {getCurrentDataKaizen?.plant_at}
                                </div>
                                <div>
                                    Tại công đoạn:{" "}
                                    {getCurrentDataKaizen?.process_at}
                                </div>
                                <div>
                                    Từ ngày: {getCurrentDataKaizen?.start_at}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 p-3 pl-0">
                        <div className="bg-gray-800 text-white rounded-md px-3 py-2 font-bold">
                            Trước đây
                        </div>
                        <div className="flex gap-2 flex-1">
                            <div className="w-4/12 border-2 border-border border-gray-800 rounded-lg overflow-hidden relative">
                                {getCurrentDataKaizen?.after_image && (
                                    <img
                                        src={
                                            "/uploads/" +
                                            getCurrentDataKaizen?.after_image
                                        }
                                        alt=""
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                )}
                            </div>
                            <div className="flex-1 border-2 border-border border-gray-800 rounded-lg">
                                <div className="w-full h-full relative">
                                    <div className="p-5 text-2xl absolute inset-0 break-words overflow-auto">
                                        {
                                            getCurrentDataKaizen?.after_description
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 text-white rounded-md px-3 py-2 font-bold">
                            Hiện tại
                        </div>
                        <div className="flex gap-2 flex-1">
                            <div className="w-4/12 border-2 border-border border-gray-800 rounded-lg overflow-hidden relative">
                                {getCurrentDataKaizen?.current_image && (
                                    <img
                                        src={
                                            "/uploads/" +
                                            getCurrentDataKaizen?.current_image
                                        }
                                        alt=""
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                )}
                            </div>
                            <div className="flex-1 border-2 border-border border-gray-800 rounded-lg">
                                <div className="w-full h-full relative">
                                    <div className="p-5 text-2xl absolute inset-0 break-words overflow-auto">
                                        {
                                            getCurrentDataKaizen?.current_description
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="bg-gray-500 min-w-[200px] px-3 py-2 rounded-lg text-white text-xl font-bold min-h-[100px] flex justify-center items-center">
                                Lợi ích
                            </div>
                            <div className="rounded-lg border-2 border-gray-900 border-solid flex-grow relative">
                                <div className="p-2 text-2xl absolute inset-0 break-words overflow-auto">
                                    {getCurrentDataKaizen?.benefit}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

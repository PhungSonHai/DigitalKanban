import { Link, Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function KaizenTop() {
    const [month, setMonth] = useState(0);
    const listMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    useEffect(() => {
        setMonth(new Date().getMonth() + 1);
    }, []);

    return (
        <div className="bg-white h-screen w-full pt-3 select-none flex flex-col">
            <div className="flex justify-between items-center">
                <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-3xl uppercase font-bold text-white">
                        TOP 3 KAIZEN CỦA THÁNG
                    </p>
                </div>

                <div className="bg-gray-500/90 text-xl font-bold text-white">
                    <div className="flex justify-between">
                        <div>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
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
                        <div>Tháng {month}</div>
                        <div>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
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
                <div>a</div>

                <div className="flex me-4 items-center">
                    <div className="me-10">
                        <button
                            onClick={() => {
                                window.history.back();
                            }}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]"
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
            <div className="flex-1 flex relative">
                <div className="absolute inset-0 flex justify-center"></div>
            </div>
        </div>
    );
}

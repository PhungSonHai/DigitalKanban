import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { closeSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function Welcome() {
    const [permission, setPermission] = useState("");
    const list = [
        { route: "ListDirectory", name: "HƯỚNG DẪN HỌP CẤP BẬC" },
        { route: "KPIBoardGrid", name: "BẢNG HIỂN THỊ CUỘC HỌP CẤP BẬC" },
        { route: "KaizenTop", name: "KAIZEN CỦA THÁNG" },
    ];

    useEffect(() => {
        axios
            .get("/api/get-user")
            .then((res) => setPermission(res.data.permission));

        const key = enqueueSnackbar("Chào mừng bạn đã quay lại Cuộc họp cấp bậc 1", {
            variant: "info",
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
        });
    }, []);

    return (
        <div className='bg-[url("/images/background-kanban.jpg")] bg-cover h-screen w-full bg-no-repeat select-none'>
            <div className="w-full h-full bg-black/50 backdrop-blur-[1px]">
                <div className="flex w-full h-full text-white">
                    <div className="flex-1 flex flex-col justify-between">
                        <div className="px-16">
                            <div className="bg-gray-500 text-4xl lg:text-6xl font-bold text-center p-5 lg:p-10">
                                DANH MỤC CHO CUỘC HỌP CẤP BẬC
                            </div>
                        </div>
                        <div className="pb-10 lg:pb-20 pr-10 flex flex-col gap-10">
                            {permission === "ME" && (
                                <>
                                    <Link
                                        className="bg-orange-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-orange-700/90 block rounded-r-3xl"
                                        href={route("configDisplayTV")}
                                    >
                                        CẤU HÌNH HIỂN THỊ TV
                                    </Link>
                                    <Link
                                        className="bg-orange-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-orange-700/90 block rounded-r-3xl"
                                        href={route("insertKaizen")}
                                    >
                                        QUẢN LÝ DANH SÁCH KAIZEN
                                    </Link>
                                </>
                            )}
                            {/* {true && (
                                <>
                                    <Link
                                        className="bg-orange-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-orange-700/90 block rounded-r-3xl"
                                        href={route("configDisplayTV")}
                                    >
                                        CẤU HÌNH HIỂN THỊ TV
                                    </Link>
                                    <Link
                                        className="bg-orange-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-orange-700/90 block rounded-r-3xl"
                                        href={route("insertKaizen")}
                                    >
                                        QUẢN LÝ DANH SÁCH KAIZEN
                                    </Link>
                                </>
                            )} */}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col-reverse pb-10 lg:pb-20 justify-between">
                        <div className="space-y-5 lg:space-y-10">
                            {list.map((item, index) => (
                                <Link
                                    key={index}
                                    className="bg-gray-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-gray-700/90 block rounded-l-3xl"
                                    href={route(item.route)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-row-reverse pt-3">
                            <div className="flex me-4 items-center">
                                {/* <div className="me-10">
                                    <button
                                        onClick={() => {
                                            window.history.back();
                                        }}
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]"
                                    >
                                        Trở về
                                    </button>
                                </div> */}
                                <div>
                                    <img
                                        width={60}
                                        src="/images/apache.png"
                                        alt="logo-apache"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

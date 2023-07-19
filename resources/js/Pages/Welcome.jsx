import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    const list = [
        { route: "ListDirectory", name: "HƯỚNG DẪN HỌP CẤP BẬC" },
        { route: "KPIBoard", name: "BẢNG HIỂN THỊ CUỘC HỌP CẤP BẬC" },
        { route: "KaizenTop", name: "KAIZEN CỦA THÁNG" },
    ];

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
                        <div className="pb-10 lg:pb-20 pr-10">
                            <Link
                                className="bg-orange-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-orange-700/90 block rounded-r-3xl"
                                href={route('insertKaizen')}
                            >
                                QUẢN LÝ DANH SÁCH KAIZEN
                            </Link>
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

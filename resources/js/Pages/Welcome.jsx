import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const list = [
        "HƯỚNG DẪN HỌP CẤP BẬC",
        "BẢNG HIỂN THỊ CUỘC HỌP CẤP BẬC",
        "KAIZEN CỦA THÁNG",
    ];

    return (
        <div className='bg-[url("/images/background-kanban.jpg")] bg-cover h-screen w-full bg-no-repeat'>
            <div className="w-full h-full bg-black/50 backdrop-blur-[1px]">
                <div className="flex w-full h-full text-white">
                    <div className="flex-1 px-16">
                        <div className="bg-gray-500 text-4xl lg:text-6xl font-bold text-center p-5 lg:p-10">
                            DANH MỤC CHO CUỘC HỌP CẤP BẬC
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col-reverse pb-10 lg:pb-20">
                        <div className="space-y-5 lg:space-y-10">
                            {list.map((item) => (
                                <div className="bg-gray-600/90 p-5 lg:p-10 text-2xl lg:text-4xl font-bold shadow-xl cursor-pointer hover:bg-slate-700/90">{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

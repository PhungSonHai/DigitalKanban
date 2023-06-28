import { Link, Head } from "@inertiajs/react";

export default function GuideResolve() {
    return (
        <div className="bg-white h-screen w-full pt-3 select-none flex flex-col">
            <div className="flex justify-between items-center">
                <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-3xl uppercase font-bold text-white">
                        HƯỚNG DẪN GIẢI QUYẾT VẤN ĐỀ
                    </p>
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
            <div className="flex-1 flex relative">
                <div className="absolute inset-0 flex justify-center">
                    <img
                        className="w-full object-contain"
                        src="/images/guide-resolve.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

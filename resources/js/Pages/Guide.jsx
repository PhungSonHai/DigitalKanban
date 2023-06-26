import React from "react";

function Guide() {
    return (
        <React.Fragment>
            <div className="select-none">
                <div className="flex justify-between items-center pt-3">
                    <div className="bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-3xl uppercase font-bold text-white">
                            Hướng dẫn cuộc họp cấp bậc
                        </p>
                    </div>

                    <div className="flex me-4 items-center">
                        <div className="me-10">
                            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]">
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
                <div className="flex mt-10 flex-wrap">
                    <div className="relative xl:w-1/3 w-1/2">
                        <div className="p-5">
                            <div className="overflow-x-auto shadow-md rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                colSpan={3}
                                                className="px-6 py-3 text-center"
                                            >
                                                Thời gian họp
                                            </th>
                                        </tr>
                                        <tr className="border-t-2 border-sky-500">
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Cuộc họp
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Thời gian
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Thời lượng
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                Apple MacBook Pro 17"
                                            </th>
                                            <td className="px-6 py-4">
                                                Silver
                                            </td>
                                            <td className="px-6 py-4">
                                                Laptop
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Guide;

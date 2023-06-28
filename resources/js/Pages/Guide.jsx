import React from "react";
import {
    tableData,
    theadData,
    tbodyData,
    titleTable,
} from "@/Data/GuideTableData";

function Guide() {
    return (
        <React.Fragment>
            <div className="select-none">
                <div className="flex justify-between items-center pt-3">
                    <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-md md:text-3xl uppercase font-bold text-white">
                            Hướng dẫn cuộc họp cấp bậc
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
                <div className="flex mt-10 flex-wrap">
                    {tableData.map((table, index) => (
                        <div className="relative 2xl:w-1/3 w-1/2">
                            <div className="h-full p-5">
                                <div className="h-full overflow-x-auto shadow-xl shadow-[lightblue] rounded-lg">
                                    <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            {
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        colSpan={table.columns}
                                                        className="px-6 py-3 text-center"
                                                    >
                                                        {titleTable[index]}
                                                    </th>
                                                </tr>
                                            }
                                            <tr className="border-t-2 border-sky-500">
                                                {theadData[index].map(
                                                    (item, index) => (
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3"
                                                        >
                                                            {item}
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tbodyData[index].map(
                                                (tbodyItems, index) => (
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        {tbodyItems.map(
                                                            (item, index) => (
                                                                <td
                                                                    scope="row"
                                                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    {item.indexOf(
                                                                        "/n"
                                                                    ) > -1
                                                                        ? item
                                                                              .split(
                                                                                  "/n"
                                                                              )
                                                                              .map(
                                                                                  (
                                                                                      str
                                                                                  ) => (
                                                                                      <div>
                                                                                          {
                                                                                              str
                                                                                          }
                                                                                      </div>
                                                                                  )
                                                                              )
                                                                        : item}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Guide;

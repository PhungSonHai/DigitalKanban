import React, { useEffect, useState } from 'react'
import { evaluateData } from '@/Data/EvaluateData'

function TableEvaluate({hideMainPoints = false, disableCheckbox = false, hidePoints = false, hideTotalPoints = false, scollTable = false}) {
  return (
    <div className={`overflow-x-auto shadow-lg shadow-[lightblue] rounded-lg ${scollTable ? "absolute inset-0" : ""}`}>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                <tr>
                    <th scope="col" className="px-6 py-3 w-16 whitespace-nowrap">
                        Số thứ tự
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Nội dung đánh giá
                    </th>
                    <th scope="col" className={`px-6 py-3 whitespace-nowrap ${hideMainPoints ? "hidden" : ""}`}>
                        Điểm chính
                    </th>
                    <th scope="col" className={`px-6 py-3 w-20 whitespace-nowrap ${hidePoints ? "hidden" : ""}`}>
                        Số điểm
                    </th>
                    <th scope="col" className="px-6 py-3 w-20 whitespace-nowrap">
                        Điểm tự đánh giá
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    evaluateData.map((items, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {
                                items.map((item, subIndex) => (
                                    item == ""
                                    ?
                                        <td key={subIndex} scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            <div className="text-center">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600" disabled={disableCheckbox} />
                                            </div>
                                        </td>
                                    :
                                        <td key={subIndex} scope="row" className={`px-6 py-4 font-medium text-gray-900 dark:text-white ${subIndex != 1 && subIndex != 2 ? "text-center" : ""} ${hideMainPoints && subIndex == 2 ? "hidden" : ""} ${hidePoints && subIndex == 3 ? "hidden" : ""}`}>
                                            {
                                                item.indexOf("/n") > -1
                                                ? 
                                                    item.split("/n").map((str, strIndex) => (
                                                        <div key={strIndex}>
                                                            {str}
                                                        </div>
                                                    ))
                                                :
                                                    item
                                            }
                                        </td>
                                ))
                            }
                        </tr>
                    ))
                }

                <tr className={`bg-white dark:bg-gray-800 ${hideTotalPoints ? "hidden" : ""} ${scollTable ? "sticky bottom-0 z-10 shadow-lg shadow-green-500" : "border-t-2 dark:border-sky-500 border-sky-400"}`}>
                    <td scope="row" colSpan={3} className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center text-lg">
                        Tổng số điểm / Total points
                    </td>
                    <td scope="row" className={`px-6 py-4 font-medium text-gray-900 dark:text-white text-center text-lg ${!scollTable ? "border-l-2 dark:border-sky-500 border-sky-400" : "border-none"}`}>
                        0
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TableEvaluate

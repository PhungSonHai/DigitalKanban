import React from 'react'

function DetailIssue() {
    

  return (
    <React.Fragment>
        <div className='h-screen flex flex-col'>
            <div className="flex justify-between items-center pt-2">
                <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-md md:text-3xl uppercase font-bold text-white">
                        Chi tiết các vấn đề
                    </p>
                </div>

                <div className="flex me-4 items-center">
                    <div className="me-10">
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]" onClick={() => { window.history.back() }}>
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

            <div className='flex flex-col flex-1'>
                <div className='flex flex-wrap gap-5 pt-8 px-5'>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-20 text-center">
                            <span className='flex-1'>Ngày</span>
                        </span>
                        <input type="date" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" />
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Chuyền
                        </span>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected></option>
                            <option value="US">4001APS01</option>
                            <option value="CA">4001APS02</option>
                            <option value="FR">4001APS03</option>
                        </select>
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Ảnh hưởng
                        </span>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected></option>
                            <option value="US">Chất lượng</option>
                            <option value="CA">Sản lượng</option>
                        </select>
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Tình trạng
                        </span>
                        <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected></option>
                            <option value="US">Hoàn thành</option>
                            <option value="CA">Đang giải quyết</option>
                        </select>
                    </div>
                </div>

                <div className='flex-1 px-5 py-5 relative'>
                    <div className="overflow-x-auto shadow-lg shadow-[lightblue] rounded-lg absolute inset-0 m-5 dark:bg-gray-800">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    STT
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Ngày
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Chuyền
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Ảnh hưởng
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Nguyên nhân
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Mô tả nguyên nhân
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Hành động giải quyết
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Người chịu trách nhiệm
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Hoàn thành hoặc hủy
                                </th>
                            </thead>
                            <tbody>
                                {
                                    new Array(20).fill(null).map(item => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                1
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                06-09-2023
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                4001APS01
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Sản lượng
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Chuyển đổi hình thể
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Mất thời gian chuyển đổi
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Hướng dẫn lại thao tác
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Tổ trưởng / Trợ lý
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                Đang giải quyết
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default DetailIssue

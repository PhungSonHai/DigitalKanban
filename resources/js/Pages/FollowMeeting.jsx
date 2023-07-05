import React from 'react'
import TableEvaluate from '@/Components/TableEvaluate'

function FollowMeeting() {
  return (
    <React.Fragment>
        <div className='h-screen flex flex-col select-none'>
            <div className="flex justify-between items-center pt-2">
                <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-md md:text-3xl uppercase font-bold text-white">
                        Theo dõi cuộc họp
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

            <div className='flex-1 pt-8 px-4 flex flex-col'>
                <div className='flex items-center'>
                    <div className="flex w-[300px] mr-8">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-20 text-center">
                            <span className='flex-1'>Tháng</span>
                        </span>
                        <input type="month" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" />
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
                            Truy vấn
                        </button>
                    </div>
                </div>

                <div className='flex-1 py-2 flex flex-col'>
                    <div className='flex-1 pb-2 relative'>
                        <div className="overflow-x-auto shadow-md shadow-[lightblue] rounded-lg absolute inset-0">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                    <tr className=''>
                                        <th scope="col" className="px-6 py-3 text-center">
                                        </th>
                                        <th scope="col" colSpan={31} className="px-6 py-3 text-center">
                                            Ngày trong tháng
                                        </th>
                                    </tr>
                                    <tr className=''>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Chuyền
                                        </th>

                                        {
                                            new Array(31).fill(null).map((item, index) => (
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    {index + 1}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        new Array(10).fill(null).map((items, index) => (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                {
                                                    new Array(32).fill(null).map((item, subIndex) => (
                                                        <td scope="row" className={`px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ${subIndex != 0 ? "border border-gray-700" : ""}`}>
                                                            {subIndex == 0 ? "4001APS01": ""}
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='h-[400px] relative mt-2'>
                        <TableEvaluate hidePoints={true} disableCheckbox={true} scollTable={true}/>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default FollowMeeting

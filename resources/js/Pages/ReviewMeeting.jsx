import React, { useEffect, useState } from 'react'

function ReviewMeeting() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
    }, []);

  return (
    <React.Fragment>
        <div className='h-screen flex flex-col'>
            <div className="flex justify-between items-center pt-2">
                <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                    <p className="text-md md:text-3xl uppercase font-bold text-white">
                        Đánh giá cuộc họp
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

            <div className='px-5 flex-1 flex flex-col'>
                <div className='pt-8 flex items-center justify-between pb-5'>
                    <div>
                        <span className='text-lg font-bold'>Thời gian thực hiện đánh giá:</span>
                        <span className='font-semibold pl-2'>{currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</span>
                    </div>
                    <div>
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">Lưu đánh giá</button>
                    </div>
                </div>

                <div className='flex-1'>
                    <div className="overflow-x-auto shadow-lg shadow-[lightblue] rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                <th scope="col" className="px-6 py-3 w-16 whitespace-nowrap">
                                    Số thứ tự
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Điểm chính
                                </th>
                                <th scope="col" className="px-6 py-3 w-20 whitespace-nowrap">
                                    Số điểm
                                </th>
                                <th scope="col" className="px-6 py-3 w-20 whitespace-nowrap">
                                    Điểm tự giá
                                </th>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ReviewMeeting

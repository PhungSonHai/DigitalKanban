import React from 'react'

function TableIssue() {
  return (
    <div>
        {/* nav table */}
        <div className='h-[72px] flex flex-col 2xl:flex-row pt-1 gap-8'>
            <div className='flex-1 flex justify-between lg:justify-evenly'>
                <div className='flex gap-2'>
                    <div className='flex flex-col justify-between'>
                        <span className='font-bold bg-sky-600 text-white px-4 py-1 rounded-md text-center mb-1'>Cấp bậc 1</span>
                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700">Xem chi tiết</button>
                    </div>
                    <div className='flex flex-col justify-between'>
                        <div className='w-full flex shadow-lg'>
                            <span className='font-bold bg-sky-600 text-white px-4 py-1 text-center rounded-l-md'>Điểm</span>
                            <span className='bg-white px-5 py-0.5 rounded-r-md font-bold'>09</span>
                        </div>
                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700">Bảng theo dõi</button>
                    </div>
                </div>
                <div className='w-48 flex flex-col shadow-md'>
                    <div className='bg-white w-full text-center font-semibold'>Sản lượng</div>
                    <div className='bg-gray-400 flex-1'></div>
                </div>
                <div className='w-48 flex flex-col shadow-md'>
                    <div className='bg-white w-full text-center font-semibold'>Phẩm chất</div>
                    <div className='bg-gray-400 flex-1'></div>
                </div>
            </div>

            <div className='flex-1 flex justify-between lg:justify-around xl:justify-evenly'>
                <div className='w-40 flex flex-col shadow-md'>
                    <div className='bg-sky-500 text-white text-sm py-[2px] w-full text-center font-semibold'>Tổng vấn đề</div>
                    <div className='bg-gray-400 flex-1'></div>
                </div>
                <div className='w-40 flex flex-col shadow-md'>
                    <div className='bg-green-600 text-white text-sm py-[2px] w-full text-center font-semibold'>Đã giải quyết</div>
                    <div className='bg-gray-400 flex-1'></div>
                </div>
                <div className='w-40 flex flex-col shadow-md'>
                    <div className='bg-red-600 text-white text-sm py-[2px] w-full text-center font-semibold'>Chưa giải quyết</div>
                    <div className='bg-gray-400 flex-1'></div>
                </div>
                <div className='flex flex-col justify-between'>
                    <span className='font-semibold text-gray-500 text-lg'>Tài khoản 4001APS01</span>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700">Đánh giá cuộc họp</button>
                </div>
            </div>
        </div>

        {/* table */}
        <div>

        </div>
    </div>
  )
}

export default TableIssue

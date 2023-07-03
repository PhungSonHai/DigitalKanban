import React, { useState } from 'react'
import Modal from './Modal'
import { quantityStitching, qualityStitching } from '@/Data/IssueStitching'

function TableIssue() {
    const [showModalStitching, setShowModalStitching] = useState(false)

    const handleShowModalStitching = () => {
        setShowModalStitching(true)
    }

    const handleCloseModalStitching = () => {
        setShowModalStitching(false)
    }

  return (
    <React.Fragment>
        <Modal show={showModalStitching} maxWidth='6xl' onClose={handleCloseModalStitching}>
            <div>
                <div className=''>
                    <div className="overflow-x-auto shadow-xl shadow-[lightblue] rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className='relative'>
                                    <th scope="col" colSpan={5} className="px-6 py-3 text-center uppercase">
                                        Biểu ghi nhận vấn đề cho cuộc họp cấp bậc điện tử - chuyền may
                                    </th>
                                </tr>
                                <tr className="border-t-2 border-sky-500">
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Ảnh hưởng tới
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
                                </tr>
                            </thead>
                            <tbody>
                                {/* Sản lượng */}
                                {
                                    quantityStitching.map((items, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            {
                                                items.map((item, subIndex) => (
                                                    item != ""
                                                    ? 
                                                        <td scope="row" rowSpan={index == 0 && subIndex == 0 ? quantityStitching.length : ""} className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {
                                                                item.indexOf("/n") > -1
                                                                ?
                                                                    item.split("/n").map((str, strIndex) => (
                                                                        <div className='mt-1.5'>
                                                                            {
                                                                                str.indexOf('/checkbox/') > -1
                                                                                ?
                                                                                    <div className='flex'>
                                                                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5" />
                                                                                        <div>
                                                                                            {str.replace('/checkbox/', '')}
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    str
                                                                            }
                                                                        </div>
                                                                    ))
                                                                :
                                                                    item.indexOf('/checkbox/') > -1
                                                                    ?
                                                                        <div className='flex'>
                                                                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5" />
                                                                            <div>
                                                                                {item.replace('/checkbox/', '')}
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        item
                                                            }
                                                        </td>
                                                    :
                                                        ""
                                                ))
                                            }
                                        </tr>
                                    ))
                                }

                                {/* Chất lượng */}
                                {
                                    qualityStitching.map((items, index) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            {
                                                items.map((item, subIndex) => (
                                                    item != ""
                                                    ? 
                                                        <td scope="row" rowSpan={index == 0 && subIndex == 0 ? qualityStitching.length : ""} className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {
                                                                item.indexOf("/n") > -1
                                                                ?
                                                                    item.split("/n").map((str, strIndex) => (
                                                                        <div className='mt-1.5'>
                                                                            {
                                                                                str.indexOf('/checkbox/') > -1
                                                                                ?
                                                                                    <div className='flex'>
                                                                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5" />
                                                                                        <div>
                                                                                            {str.replace('/checkbox/', '')}
                                                                                        </div>
                                                                                    </div>
                                                                                :
                                                                                    str
                                                                            }
                                                                        </div>
                                                                    ))
                                                                :
                                                                    item.indexOf('/checkbox/') > -1
                                                                    ?
                                                                        <div className='flex'>
                                                                            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5" />
                                                                            <div>
                                                                                {item.replace('/checkbox/', '')}
                                                                            </div>
                                                                        </div>
                                                                    :
                                                                        item
                                                            }
                                                        </td>
                                                    :
                                                        ""
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Modal>

        <div className='flex flex-col'>
            {/* nav table */}
            <div className='flex flex-col 2xl:flex-row pt-1 gap-8 px-5 xl:px-0'>
                <div className='flex-1 flex justify-between lg:justify-evenly'>
                    <div className='flex gap-6'>
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
                <div className=''>
                    <div className="p-5">
                        <div className="overflow-x-auto shadow-xl shadow-[lightblue] rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className='relative'>
                                        <th scope="col" colSpan={8} className="px-6 py-3 text-center">
                                            Mô tả vấn đề trong ngày cấp bậc 1
                                        </th>

                                        <th className='absolute right-2 top-1.5'>
                                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleShowModalStitching}>Vấn đề may</button>
                                        </th>

                                        <th className='absolute right-[132px] top-1.5'>
                                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Vấn đề gia công</button>
                                        </th>
                                    </tr>
                                    <tr className="border-t-2 border-sky-500">
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
                                            Người chịu trách nhiệm
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Hoàn thành hoặc hủy
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            1
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            06-09-2023
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            4001APS01
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            Sản lượng
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            Nguyên vật liệu
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            Thiếu liệu từ chặt và may vi tính
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            Bộ trưởng
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                                                <img width={30} src="svg/check.svg" alt="check" />
                                            </button>
                                            <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600">
                                                <img width={30} src="svg/cancel.svg" alt="check" />
                                            </button>
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
  )
}

export default TableIssue

import React from 'react'

function InsertInfoKaizen() {
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const years = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050]
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

  return (
    <div>
      <React.Fragment>
            <div className="select-none h-screen flex flex-col">
                <div className="flex justify-between items-center pt-3">
                    <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-md md:text-3xl uppercase font-bold text-white">
                            Nhập kaizen của tháng
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

                <div className='pt-10 flex-1 flex flex-col'>
                    <div className='flex flex-wrap gap-4 justify-between items-center pb-8'>
                        <div className='flex ps-2 gap-4 flex-col md:flex-col lg:flex-row'>
                            <div className="flex justify-between items-center">
                                <div className='me-2'>
                                    <span className='text-mg font-medium'>Thứ tự kaizen:</span>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="inline-radio" className="ml-2 text-sm font-medium">Thứ tự 1</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="inline-2-radio" className="ml-2 text-sm font-medium">Thứ tự 2</label>
                                </div>
                                <div className="flex items-center mr-4">
                                    <input id="inline-checked-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="inline-checked-radio" className="ml-2 text-sm font-medium">Thứ tự 3</label>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className='flex justify-between items-center lg:ms-5'>
                                    <div className='me-2'>
                                        <label htmlFor="countries" className="block text-md font-medium">Tháng:</label>
                                    </div>
                                    <div>
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {months.map((month, index) => (
                                                <option key={index} selected={month == currentMonth ? true : false} value={month}>Tháng {month}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center ms-10'>
                                    <div className='me-2'>
                                        <label htmlFor="countries" className="block text-md font-medium">Năm:</label>
                                    </div>
                                    <div>
                                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            {years.map((year, index) => (
                                                <option key={index} selected={year == currentYear ? true : false} value={year}>Năm {year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='pl-2'>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Thêm</button>
                        </div>
                    </div>
                    
                    <div className='flex flex-1 pb-3'>
                        <div className='bg-gray-300 w-2/3 mx-2 p-6 rounded-lg'>
                            <div className='lg:flex'>
                                <div className='lg:w-1/2 pe-5'>
                                    <div className='text-center font-bold'>
                                        <span className='text-xl text-sky-600'>Thông tin người cải tiến</span>
                                    </div>
                                    <div className='mt-2'>
                                        <label className="block mb-1 text-md font-medium" htmlFor="file_input">Ảnh người cải tiến</label>
                                        <input className="block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type='file' accept="image/*" />
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <label htmlFor="name" className="block mb-1 text-md font-medium">Tên</label>
                                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập tên..." autoComplete='off' required />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <label htmlFor="msnv" className="block mb-1 text-md font-medium">MSNV</label>
                                            <input type="text" id="msnv" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập MSNV..." autoComplete='off' required />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <label htmlFor="department" className="block mb-1 text-md font-medium">Bộ phận</label>
                                            <select id="department" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">IT</option>
                                                <option value="">ME</option>
                                                <option value="">HR</option>
                                                <option value="">GMO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <div>
                                            <label htmlFor="plant" className="block mb-1 text-md font-medium">Xưởng</label>
                                            <select id="plant" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option value="">Xưởng A</option>
                                                <option value="">Xưởng C</option>
                                                <option value="">Xưởng D</option>
                                                <option value="">Xưởng E</option>
                                                <option value="">Xưởng F</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='lg:w-1/2 lg:ps-5'>
                                    <div className='pt-4 lg:pt-0'>
                                        <div className='font-bold text-center'>
                                            <span className='text-xl text-sky-600'>Hạng mục cải tiến</span>
                                        </div>
                                        <div className='flex justify-around'>
                                            <div className='mt-3'>
                                                <div className="flex items-center">
                                                    <input id="quanlity" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="quanlity" className="ml-2 text-md font-medium">Phẩm chất</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="productivity" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="productivity" className="ml-2 text-md font-medium">Năng suất</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="saving" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="saving" className="ml-2 text-md font-medium">Tiết kiệm</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="overview" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="overview" className="ml-2 text-md font-medium">Toàn diện</label>
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                <div className="flex items-center">
                                                    <input id="safety" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="safety" className="ml-2 text-md font-medium">An toàn</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="creative" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="creative" className="ml-2 text-md font-medium">Sáng tạo</label>
                                                </div>
                                                <div className="flex items-center mt-1">
                                                    <input id="6s" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="6s" className="ml-2 text-md font-medium">6S</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='pt-3'>
                                        <div className='font-bold text-center'>
                                            <span className='text-xl text-sky-600'>Thông tin cải tiến</span>
                                        </div>
                                        <div className='mt-1'>
                                            <div className='flex' style={{ marginTop: 6 }}>
                                                <div className='w-1/2'>
                                                    <label htmlFor="inLine" className="block mb-1 text-md font-medium">Tại chuyền</label>
                                                    <select id="inLine" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="">4001APL</option>
                                                        <option value="">4001APS</option>
                                                        <option value="">4001CPL</option>
                                                        <option value="">4001CPS</option>
                                                    </select>
                                                </div>
                                                <div className='w-1/2 ms-2'>
                                                    <label htmlFor="inPhase" className="block mb-1 text-md font-medium">Tại công đoạn</label>
                                                    <select id="inPhase" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option value="">Chặt</option>
                                                        <option value="">May</option>
                                                        <option value="">Gia công</option>
                                                        <option value="">Thành hình</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className='mt-2'>
                                                <label htmlFor="inPlant" className="block mb-1 text-md font-medium">Tại xưởng</label>
                                                <select id="inPlant" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option value="">Xưởng A</option>
                                                    <option value="">Xưởng B</option>
                                                    <option value="">Xưởng C</option>
                                                    <option value="">Xưởng D</option>
                                                </select>
                                            </div>
                                            <div className='mt-2'>
                                                <label htmlFor="dateFrom" className="block mb-1 text-md font-medium">Từ ngày</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path></svg>
                                                    </div>
                                                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className='text-center font-bold mt-8'>
                                    <span className='text-xl text-sky-600'>Mô tả cải tiến</span>
                                </div>

                                <div className='flex flex-col lg:flex-row gap-3 items-end'>
                                    <div className='w-full lg:w-1/3'>
                                        <div className='mt-2'>
                                            <label className="block mb-1 text-md font-medium" htmlFor="beforeImprovement">Ảnh trước cải tiến</label>
                                            <input className="block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="beforeImprovement" type='file' accept="image/*" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="descriptionBefore" className="block mb-1 text-md font-medium">Mô tả trước cải tiến</label>
                                            <textarea id="descriptionBefore" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mô tả trước cải tiến..."></textarea>
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3'>
                                        <div className='mt-2'>
                                            <label className="block mb-1 text-md font-medium" htmlFor="afterImprovement">Ảnh sau cải tiến</label>
                                            <input className="block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="afterImprovement" type='file' accept="image/*" />
                                        </div>
                                        <div className='mt-2'>
                                            <label htmlFor="descriptionAfter" className="block mb-1 text-md font-medium">Mô tả sau cải tiến</label>
                                            <textarea id="descriptionAfter" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mô tả sau cải tiến..."></textarea>
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/3 flex-1'>
                                        <div className='mt-2'>
                                            <label htmlFor="benefit" className="block mb-1 text-md font-medium">Lợi ích</label>
                                            <textarea id="benefit" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mô tả lợi ích..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-gray-300 w-1/3 mx-2 p-6 rounded-lg flex flex-col'>
                            <div className='text-center mb-4'>
                                <span className='text-xl text-sky-600 font-bold'>Danh sách kaizen</span>
                            </div>
                            <div className='flex-1 relative'>
                                <div className='absolute inset-0 overflow-auto space-y-3'>
                            {
                                new Array(15).fill(null).map(() => (
                                    <div className='dark:bg-[#374151] bg-white w-full rounded-lg py-2 px-4 flex flex-col lg:flex-row justify-between'>
                                        <div className='flex-1 lg:mr-8'>
                                            <div>
                                                <span className='dark:text-white mr-2 font-semibold'>Tên:</span>
                                                <span className='dark:text-white break-all'>Nguyễn Văn A</span>
                                            </div>
                                            <div>
                                                <span className='dark:text-white mr-2 font-semibold'>MSNV:</span>
                                                <span className='dark:text-white break-all'>0015464</span>
                                            </div>
                                            <div>
                                                <span className='dark:text-white mr-2 font-semibold'>Bộ phận:</span>
                                                <span className='dark:text-white break-all'>Sinh quản</span>
                                            </div>
                                        </div>
        
                                        <div className='flex flex-row lg:flex-col pt-2 lg:pt-0 justify-around items-center'>
                                            <div className='dark:hover:text-gray-300 dark:text-white hover:text-gray-500 cursor-pointer'>
                                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                                </svg>
                                            </div>
                                            <div className='hover:text-red-500 text-red-400 cursor-pointer'>
                                                <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                    <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    </div>
  )
}

export default InsertInfoKaizen

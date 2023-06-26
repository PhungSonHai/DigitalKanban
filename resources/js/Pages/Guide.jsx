import React from 'react'

function Guide() {
  return (
    <React.Fragment>
      <div className=''>
        <div className='flex justify-between items-center mt-3'>
          <div className='bg-gray-500/90 px-5 py-2 rounded-r-full shadow-xl shadow-[lightblue]'>
            <p className='text-3xl uppercase font-bold text-white'>Hướng dẫn cuộc họp cấp bậc</p>
          </div>

          <div className='flex me-4 items-center'>
            <div className='me-10'>
              <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 shadow-xl shadow-[lightblue]'>Trở về</button>
            </div>
            <div>
              <img width={60} src="/images/apache.png" alt="logo-apache" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Guide

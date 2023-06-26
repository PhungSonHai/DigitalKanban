import React from 'react'

function Guide() {
  return (
    <React.Fragment>
      <div className=''>
        <div className='flex justify-between items-center'>
          <div>
            <p className='text-3xl uppercase font-bold'>Hướng dẫn cuộc họp cấp bậc</p>
          </div>

          <div className='flex me-4 items-center'>
            <div>
              <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Trở về</button>
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

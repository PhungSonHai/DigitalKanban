import React, { useEffect, useState } from 'react';
import TableEvaluate from '@/Components/TableEvaluate';
import axios from 'axios';

function FollowMeeting() {
    const today = new Date();
    const [listDepartment, setListDepartment] = useState([]);
    const [listPoints, setListPoints] = useState(new Array(10).fill(0));
    const [totalPoint, setTotalPoint] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(`${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, '0')}`);
    const [dayOfMonth, setDayOfMonth] = useState(Number(31));
    const [allEvaluate, setAllEvaluate] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/get-department")
            .then((res) =>
                setListDepartment(res.data.map((item) => item.dep_sap))
            );
    }, []);

    useEffect(function() {
        if(listDepartment.length > 0) {
            setIsLoading(false)
        }
    }, [listDepartment])

    const handleDayOfMonth = (e) => {
        setSelectedMonth(e.target.value)
        setListPoints(new Array(10).fill(0))
        setTotalPoint(0)
    }

    useEffect(function() {
        let arrMonthYear = selectedMonth.split("-")
        let month = arrMonthYear[1]
        let year = arrMonthYear[0]

        setDayOfMonth(new Date(year, month, 0).getDate())
    }, [selectedMonth])

    useEffect(function() {
        axios.get('follow-meeting/getall-evaluate')
            .then(res => {
                setAllEvaluate(res.data.data)
            })
            .catch(err => console.log(err))
    }, [selectedMonth])

    const handleGetListPoint = (evaluate_date, line_code) => {
        if(evaluate_date && line_code) {
            const data = {
                evaluate_date: evaluate_date,
                line_code: line_code
            }
    
            axios.post('follow-meeting/getlist-point', data)
                .then(res => {
                    let temp = [...listPoints]
                    temp.map((item, index) => {
                        temp[index] = Number(res.data.data[`point_${index + 1}`])
                    })

                    setTotalPoint(res.data.data.total_point)
                    setListPoints(temp)
                })
                .catch(err => console.log(err))
        }
    }

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
                        <input type="month" id="website-admin" className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="elonmusk" value={selectedMonth} onChange={handleDayOfMonth}/>
                    </div>
                </div>

                <div className='flex-1 py-2 flex flex-col'>
                    <div className='flex-1 pb-2 relative'>
                        <div className="overflow-x-auto shadow-md shadow-[lightblue] rounded-lg absolute inset-0 dark:bg-gray-800">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                    <tr className=''>
                                        <th scope="col" className="px-6 py-3 text-center">
                                        </th>
                                        <th scope="col" colSpan={dayOfMonth} className="px-6 py-3 text-center">
                                            Ngày trong tháng
                                        </th>
                                    </tr>
                                    <tr className=''>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Chuyền
                                        </th>

                                        {
                                            new Array(dayOfMonth).fill(null).map((item, index) => (
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    {index + 1}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isLoading
                                        ?
                                            <tr>
                                                <td className="absolute top-1/2 left-1/2" role="status">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </td>
                                            </tr>
                                        :
                                            listDepartment.map((items, index) => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    {
                                                        new Array(dayOfMonth + 1).fill(null).map((item, subIndex) => {
                                                            const matching = allEvaluate.find(
                                                                data => data.line_code == items && 
                                                                new Date(data.evaluate_date).getDate() == subIndex && 
                                                                new Date(data.evaluate_date).getMonth() + 1 == selectedMonth.split('-')[1]
                                                            );
                                                            const isMatching = matching && subIndex > 0;
                                                            return (
                                                                <td scope="row" className={`px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ${subIndex != 0 ? (isMatching ? "border border-gray-700 bg-blue-500 hover:bg-blue-500/80 cursor-pointer cell-evaluated" : "border border-gray-700") : ""}`} onClick={(e) => {
                                                                    handleGetListPoint(
                                                                        isMatching ? matching.evaluate_date : "", 
                                                                        isMatching ? matching.line_code : ""
                                                                    )

                                                                    let cellsEvaluate = document.querySelectorAll('.cell-evaluated')
                                                                    
                                                                    if(e.target.classList.contains("cell-evaluated")) {
                                                                        cellsEvaluate.forEach(element => {
                                                                            element.classList.remove("bg-red-500", "hover:bg-red-500/80")
                                                                        })

                                                                        e.target.classList.add("bg-red-500", "hover:bg-red-500/80")
                                                                    }
                                                                }}>
                                                                    {subIndex == 0 ? items : (isMatching ? matching.total_point : "")}
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='h-[400px] relative mt-2'>
                        <TableEvaluate hidePoints={true} disableCheckbox={true} checkboxValue={listPoints} totalPoint={totalPoint} scollTable={true}/>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default FollowMeeting

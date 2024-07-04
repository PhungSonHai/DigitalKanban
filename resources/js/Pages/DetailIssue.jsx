import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DetailIssue() {
    const [listLineCode, setListLineCode] = useState([]);
    const [allIssue, setAllIssue] = useState([]);
    const [isAllIssue, setIsAllIssue] = useState(true);
    const [dateFill, setDateFill] = useState("");
    const [lineCodeFill, setLineCodeFill] = useState("");
    const [affectFill, setAffectFill] = useState("");
    const [statusFill, setStatusFill] = useState("");
    const { department } = usePage().props;

    useEffect(() => {
        axios
            .get("/api/get-department")
            .then((res) => {
                setListLineCode(res.data.map((item) => item.department_code))
            });
    }, []);

    useEffect(() => {
        if(!department) {
            axios
                .get("getall-issue")
                .then((res) => {
                    if(res.status === 200) {
                        setAllIssue(res.data.data)
                        setIsAllIssue(false)
                    }
                });
        } else {
            setLineCodeFill(department)
            handleFillIssue(department)
        }
    }, [department])

    function formatDate(datetime, displayTime = false) {
        const date = new Date(datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        if(displayTime) {
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        } else {
            return `${year}-${month}-${day}`;
        }
    }

    const handleFillIssue = (lineCode = lineCodeFill) => {
        var data = {
            created_at: dateFill,
            line_code: lineCode,
            affect: affectFill,
            is_solved: statusFill
        }

        axios.post('fill-issue', data)
            .then(res => {
                if(res.status === 200) {
                    setAllIssue(res.data.data)
                    setIsAllIssue(false)
                }
            }) 
            .catch(err => {
                const key = enqueueSnackbar(err.response.data.error, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                    },
                    action: (
                        <div
                            className="text-white cursor-pointer hover:text-gray-100 active:text-gray-200"
                            onClick={() => closeSnackbar(key)}
                        >
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="-80 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
                            </svg>
                        </div>
                    ),
                });
            })
    }

  return (
    <React.Fragment>
        <div className='h-screen flex flex-col select-none'>
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
                <div className='flex flex-wrap gap-5 pt-8 px-5 justify-center items-center'>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-20 text-center">
                            <span className='flex-1'>Ngày</span>
                        </span>
                        <input 
                            type="date" 
                            className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="elonmusk" 
                            onChange={(e) => { setDateFill(e.target.value) }}
                        />
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Chuyền
                        </span>
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            onChange={(e) => { setLineCodeFill(e.target.value) }}
                            defaultValue=""
                        >
                            <option value=""></option>
                            {
                                listLineCode.map((item, index) => (
                                    <option key={index} value={item} selected={lineCodeFill == item ? true : false}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Ảnh hưởng
                        </span>
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => { setAffectFill(e.target.value) }}
                            defaultValue=""
                        >
                            <option value=""></option>
                            <option value="Chất lượng">Chất lượng</option>
                            <option value="Sản lượng">Sản lượng</option>
                        </select>
                    </div>
                    <div className="flex flex-1 min-w-[320px] max-w-[410px]">
                        <span className="flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-300 dark:border-gray-600 whitespace-nowrap w-24 text-center">
                            Tình trạng
                        </span>
                        <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            onChange={(e) => { setStatusFill(e.target.value) }}
                            defaultValue=""
                        >
                            <option value=""></option>
                            <option value="1">Hoàn thành</option>
                            <option value="0">Chưa giải quyết</option>
                        </select>
                    </div>
                    <div className=''>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={() => handleFillIssue()}>
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                <div className='flex-1 px-5 py-5 relative'>
                    <div className="overflow-x-auto shadow-lg shadow-[lightblue] rounded-lg absolute inset-0 m-5 dark:bg-gray-800">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                <tr>
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
                                        Trạng thái
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isAllIssue
                                    ?
                                        <tr>
                                            <td className="absolute top-1/2 left-1/2" role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-9 h-9 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                        (
                                            allIssue.length
                                            ?
                                                allIssue.map((item, index) => (
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {index + 1}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                            {formatDate(item.created_at, true)}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.line_code}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.affect}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.reason}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.description_reason}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.action_resolve}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.responsible}
                                                        </td>
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {
                                                                Number(item.is_solved)
                                                                ?
                                                                    "Hoàn thành"
                                                                :
                                                                    "Chưa giải quyết"
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <div className="absolute top-1/2 left-1/2">
                                                        Không tìm thấy dữ liệu
                                                    </div>
                                                </tr>
                                        )
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

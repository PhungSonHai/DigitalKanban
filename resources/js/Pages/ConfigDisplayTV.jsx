import React, { useEffect, useMemo, useState } from 'react'
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";

function ConfigDisplayTV() {
    const [listUser, setListUser] = useState([])
    const [listUserFilter, setListUserFilter] = useState([])
    const [listDepartment, setListDepartment] = useState([])
    const [keySearch, setKeySearch] = useState("")
    const [departmentSelected, setDepartmentSelected] = useState([])
    const [userSelected, setUserSelected] = useState("")
    const [lineOfAccount, setLineOfAccount] = useState([])
    const [isHandling, setHandling] = useState(false)

    useEffect(() => {
        fetchListUser()
        fetchListDepartment()
        fetchLineOfAccount()
    }, [])

    const fetchListUser = async () => {
        await axios.get("/api/get-list-user").then((res) => {
            setListUser(res.data)
            setListUserFilter(res.data)
        });
    }

    const fetchListDepartment = async () => {
        await axios.get("/api/get-list-department").then((res) => {
            setListDepartment(res.data)
        });
    }

    const fetchLineOfAccount = async () => {
        await axios.get("/api/get-line-of-account").then((res) => {
            setLineOfAccount(res.data);
        })
    }

    useEffect(() => {
        if(keySearch) {
            let resultFilter = listUser.filter(item => item.UserCode.includes(keySearch))
            setListUserFilter(resultFilter)
            setDepartmentSelected([])
        } else {
            setListUserFilter(listUser)
            setDepartmentSelected([])
        }
    }, [keySearch])

    useEffect(() => {
        if(userSelected) {
            let lineOfAccountFilter = lineOfAccount.filter(item => item.username == userSelected)
            let listLineCodeSelect = lineOfAccountFilter.map(item => item.line_code)
            setDepartmentSelected(listLineCodeSelect)
        }
    }, [userSelected])

    const handleSelectDepartment = (departmentCode) => {
        if(!departmentSelected.find(item => item == departmentCode)) {
            setDepartmentSelected(prevState => [...prevState, departmentCode])
        } else {
            let filterDepartmentSelected = departmentSelected.filter(item => item != departmentCode)
            setDepartmentSelected(filterDepartmentSelected)
        }
    }

    const canSelectDepartment = useMemo(() => {
        return !userSelected
    }, [userSelected, listDepartment])

    const cancelDepartmentSelect = () => {
        setDepartmentSelected([])
    }

    const handleSaveChange = () => {
        setHandling(true)
        const data = {
            username: userSelected,
            departmentCode: departmentSelected
        }

        axios
            .post("/api/save-config-display", data)
                .then((res) => {
                    if (res.data.status) {
                        const key = enqueueSnackbar(res.data.message, {
                            variant: "success",
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
                    } else {
                        const key = enqueueSnackbar(res.data.message, {
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
                    }
                })
                .catch(err => {
                    const key = enqueueSnackbar(err.response.message, {
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
                .finally(() => {
                    setHandling(false)
                    fetchLineOfAccount()
                })
    }

    // useEffect(() => {
    //     console.log(departmentSelected);
    // }, [departmentSelected])

    return (
        <>  
            <div 
                className={`absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center ${!isHandling ? "hidden" : ""}`}
            >
                <div role="status">
                    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="select-none h-screen flex flex-col overflow-hidden">
                <div className="flex justify-between items-center pt-3">
                    <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                        <p className="text-md md:text-3xl uppercase font-bold text-white">
                            Cấu hình hiển thị TV
                        </p>
                    </div>

                    <div className="flex me-4 items-center">
                        <div className="me-10">
                            <button 
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]" 
                                onClick={() => { window.history.back() }}
                            >
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
                <div className="pt-10 flex-1 flex flex-col items-center justify-center overflow-hidden py-[50px]">
                    <div className='w-[800px] flex-1 flex gap-6 border border-dashed border-gray-400 rounded-md p-4 overflow-hidden'>
                        <div className='w-1/3 flex flex-col gap-2 overflow-hidden'>
                            <div className='font-bold text-[18px]'>
                                Danh sách tài khoản
                            </div>
                            <div className='flex gap-2 px-[1px]'>
                                <div className='flex-1 flex'>
                                    <input 
                                        type="text" 
                                        className='flex-1 rounded-md'
                                        placeholder='Tìm kiếm tài khoản...'
                                        value={keySearch}
                                        onChange={(e) => setKeySearch(e.target.value)}
                                    />
                                </div>
                                {/* <div className='flex w-[70px] items-center justify-center'>
                                    <button 
                                        className='flex-1 h-full flex items-center justify-center bg-gray-500 hover:bg-gray-600 rounded-md transition-all'
                                    >
                                        <div className='w-6 text-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div> */}
                            </div>
                            <div className='flex-1 flex flex-col gap-2 border border-dashed border-gray-400 rounded-md p-5 overflow-auto'>
                                {
                                    listUserFilter.map((item, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                            <div className='flex items-center justify-center'>
                                                <input 
                                                    type="radio" 
                                                    checked={userSelected == item.UserCode}
                                                    id={`username${index}`} 
                                                    name="username" 
                                                    disabled={isHandling}
                                                    className='outline-none !ring-0 !ring-offset-0 cursor-pointer'
                                                    onChange={() => setUserSelected(item.UserCode)}
                                                />
                                            </div>
                                            <label htmlFor={`username${index}`} className='font-semibold cursor-pointer'>
                                                {item.UserCode}
                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='flex items-center justify-center'>
                            <div className='w-8'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col gap-5 overflow-hidden'>
                            <div className='flex-1 flex flex-col gap-2 overflow-hidden'>
                                <div className='font-bold text-[18px]'>
                                    Danh sách chuyền
                                </div>
                                <div className='flex-1 flex gap-3 overflow-hidden'>
                                    <div className='flex-1 flex flex-col gap-2 border border-dashed border-gray-400 rounded-md py-5 px-10 overflow-auto'>
                                        {
                                            listDepartment.map((item, index) => (
                                                <div key={index} className='flex items-center gap-3'>
                                                    <div className='flex items-center justify-center'>
                                                        <input 
                                                            type="checkbox"
                                                            className='!ring-0 !ring-offset-0'
                                                            checked={departmentSelected.includes(item.department_code)}
                                                            onChange={() => handleSelectDepartment(item.department_code)}
                                                            id={`departmentCode${item.department_code}`}
                                                            disabled={canSelectDepartment || isHandling || ( departmentSelected.length === 4 && !departmentSelected.includes(item.department_code) )}
                                                        />
                                                    </div>
                                                    <label className='font-medium' htmlFor={`departmentCode${item.department_code}`}>
                                                        {item.department_code}
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex-1 flex'>
                                            <button 
                                                className='flex-1 border border-solid border-gray-400 px-1 rounded-md hover:bg-gray-100 transition-all'
                                                onClick={cancelDepartmentSelect}
                                                disabled={isHandling}
                                            >
                                                <div className='w-7 text-gray-800'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        <div className='flex-1 flex'>
                                            <button 
                                                className='flex-1 border border-solid border-gray-400 px-1 rounded-md hover:bg-gray-100 transition-all'
                                                onClick={handleSaveChange}
                                                disabled={isHandling}
                                            >
                                                <div className='w-7 text-gray-800'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex-1 flex flex-col gap-2'>
                                <div className='font-bold text-[18px]'>
                                    Danh sách chuyền đã chọn
                                </div>
                                <div className='flex-1 flex gap-3'>
                                    <div className='flex-1 border border-dashed border-gray-400 rounded-md'>
                                        
                                    </div>
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex-1 flex'>
                                            <button 
                                                className='flex-1 border border-solid border-gray-400 px-1 rounded-md hover:bg-gray-100 transition-all'
                                            >
                                                <div className='w-7 text-gray-800'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                        <div className='flex-1 flex'>
                                            <button 
                                                className='flex-1 border border-solid border-gray-400 px-1 rounded-md hover:bg-gray-100 transition-all'
                                            >
                                                <div className='w-7 text-gray-800'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfigDisplayTV
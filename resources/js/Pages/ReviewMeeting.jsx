import React, { useCallback, useEffect, useState } from 'react';
import TableEvaluate from '@/Components/TableEvaluate';
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from 'notistack';

function ReviewMeeting() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [points, setPoints] = useState(new Array(10).fill(0));
    const [totalPoint, setTotalPoint] = useState(0);
    const [isPostEvaluate, setIsPostEvaluate] = useState(false);
    const [lineCode, setLineCode] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);

        axios
            .get("/api/get-user")
            .then((res) => {
                setLineCode(res.data.staff_department)
            });
    
        return () => {
          clearInterval(interval);
        };
    }, []);

    function formatDate(datetime) {
        const day = String(datetime.getDate()).padStart(2, '0');
        const month = String(datetime.getMonth() + 1).padStart(2, '0');
        const year = datetime.getFullYear();
      
        return `${year}-${month}-${day}`;
    }

    const handleCheckboxChange = (index, value) => {
        let temp = [...points]
        temp[index] = value ? 1 : 0
        setPoints(temp)
    };

    useEffect(function() {
        let temp = 0
        points.map(item => {
            temp += item
        })
        setTotalPoint(temp)
    }, [points]);

    const createEvaluate = useCallback(() => {
        setIsPostEvaluate(true)
        const data = {
            line_code: lineCode,
            evaluate_date: formatDate(new Date()),
            total_point: totalPoint,
        }

        points.map((point, index) => {
            var pointKey = `point_${index + 1}`
            data[pointKey] = point
        })

        axios.post('review-meeting/create-evaluate', data)
            .then(res => {
                if(res.status == 200) {
                    const key = enqueueSnackbar(res.data.message, {
                        variant: "info",
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

                    setIsPostEvaluate(false)
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

                setIsPostEvaluate(false)
            })
    }, [lineCode, totalPoint]);

  return (
    <React.Fragment>
        <div className='h-screen flex flex-col select-none'>
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
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 w-[125px]" onClick={() => createEvaluate()} disabled={isPostEvaluate}>
                            {isPostEvaluate ? (
                                        <div className='flex justify-center' role="status">
                                            <svg
                                                aria-hidden="true"
                                                class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                            <span class="sr-only">
                                                Loading...
                                            </span>
                                        </div>
                                    ) : (
                                        "Lưu đánh giá"
                                )}
                        </button>
                    </div>
                </div>

                <div className='flex-1'>
                    <TableEvaluate hideMainPoints={true} totalPoint={totalPoint} checkboxValue={points} onCheckboxChange={handleCheckboxChange} />
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default ReviewMeeting

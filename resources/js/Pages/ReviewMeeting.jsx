import React, { useEffect, useState } from 'react';
import TableEvaluate from '@/Components/TableEvaluate';
import axios from "axios";

function ReviewMeeting() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [points, setPoints] = useState(new Array(10).fill(0));
    const [totalPoint, setTotalPoint] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
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

    const createEvaluate = () => {
        const data = {
            line_code: "APL01",
            evaluate_date: formatDate(currentTime),
            total_point: totalPoint,
        }

        points.map((point, index) => {
            var pointKey = `point_${index + 1}`
            data[pointKey] = point
        })

        axios.post('review-meeting/create-evaluate', data)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    };

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
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700" onClick={() => createEvaluate()}>Lưu đánh giá</button>
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

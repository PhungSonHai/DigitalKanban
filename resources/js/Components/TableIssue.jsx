import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "@inertiajs/react";
import { quantityStitching, qualityStitching } from "@/Data/IssueStitching";
import { quantityMachining, qualityMachining } from "@/Data/IssueMachining";
import axios from "axios";
import { closeSnackbar, enqueueSnackbar } from "notistack";

function TableIssue() {
    const [check, setCheck] = useState([]);
    const [checkStitching, setCheckStitching] = useState([]);
    const [username, setUsername] = useState('khách');
    const [staffDepartment, setStaffDepartment] = useState('');
    const [allIssueOfLine, setAllIssueOfLine] = useState([]);
    const [isAllIssueOfLine, setIsAllIssueOfLine] = useState(true);
    const [idCompleteIssue, setIdCompleteIssue] = useState(0);
    const [idCancelIssue, setIdCancelIssue] = useState(0);
    const [statisticIssue, setStatisticIssue] = useState({
        all_issue: 0,
        quantity_issue: 0,
        quality_issue: 0,
        solved_issue: 0,
        not_solved_issue: 0
    });
    const [scoreEvaluate, setScoreEvaluate] = useState(0);
    const [isAddIssueStitching, setIsAddIssueStitching] = useState(false);
    const [isAddIssueMachining, setIsAddIssueMachining] = useState(false);
    const [isConfirmCancelIssue, setIsConfirmCancelIssue] = useState(false);
    const [isConfirmCompleteIssue, setIsConfirmCompleteIssue] = useState(false);

    useEffect(function () {
        setCheck(() =>
            new Array(quantityMachining[0].length).fill(new Array(3).fill(""))
        );

        setCheckStitching(() =>
            new Array(quantityStitching[0].length).fill(new Array(3).fill(""))
        );

        axios
            .get("/api/get-user")
            .then((res) => {
                setUsername(res.data.info.UserCode)
                setStaffDepartment(res.data.staff_department)
                handleGetAllIssueOfLine(res.data.staff_department)

                const data = {
                    line_code: res.data.staff_department,
                    evaluate_date: formatDate(new Date())
                }

                axios.post('KPIBoard/score-evaluate', data)
                    .then(res => {
                        if(res.status === 200) {
                            setScoreEvaluate(Number(res.data.score.total_point))
                        }
                    })
                    .catch(err => {
                        console.log(err.response.data.error)
                    })
            });
    }, []);

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

    // Handle get all issue of line
    const handleGetAllIssueOfLine = (lineCode) => {
        var data = {
            line_code: lineCode
        }
        
        axios.post('KPIBoard/get-issue-of-line', data)
            .then(res => {
                setAllIssueOfLine(res.data.data)
                setIsAllIssueOfLine(false)
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
    
    const handleCompleteIssue = () => {
        setIsConfirmCompleteIssue(true)
        var data = {}
        data.id = idCompleteIssue

        axios.post('KPIBoard/complete-issue', data)
            .then(res => {
                if(res.status === 200) {
                    const key = enqueueSnackbar("Thành công", {
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
    
                    handleCloseModalComplete()
                    handleGetAllIssueOfLine(staffDepartment)
                    setIsConfirmCompleteIssue(false)
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

    const handleCancelIssue = () => {
        setIsConfirmCancelIssue(true)
        var data = {}
        data.id = idCancelIssue

        axios.post('KPIBoard/cancel-issue', data)
            .then(res => {
                if(res.status === 200) {
                    const key = enqueueSnackbar("Thành công", {
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
                    
                    handleCloseModalCancel()
                    handleGetAllIssueOfLine(staffDepartment)
                    setIsConfirmCancelIssue(false)
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

    useEffect(function() {
        var data = {
            line_code: staffDepartment
        }
        axios.post('KPIBoard/statistic-issue', data)
            .then(res => {
                setStatisticIssue(res.data.data)
            })
            .catch(err => {
                console.log(err);
                
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
    }, [allIssueOfLine])

    //BEGIN: HANDLE ISSUE MACHINING
    const isDisable = useCallback(
        function ([column, row, line]) {
            if (column == 0 || check.length == 0) {
                return false;
            }

            if (column == 1) {
                if (
                    check[column].every((item) => item !== "") &&
                    check[column][1] != row
                ) {
                    return true;
                }
            }

            if (column > 1) {
                let diff = 0;
                let object = quantityMachining;
                if (row >= 6) {
                    diff = 6;
                    object = qualityMachining;
                }

                for (let iColumn = column; iColumn >= 1; iColumn--) {

                    if (
                        (object[row - diff][iColumn - 1].every(
                            (item) => !item.showCheckbox
                        ) ||
                            object[row - diff][iColumn - 1].some(
                                (item) => !item.showCheckbox
                            )) &&
                        check[iColumn - 1].every((item) => item === "")
                    ) {
                        continue;
                    }

                    if (
                        check[iColumn - 1].every((item) => item === "") ||
                        check[iColumn - 1][1] !== row ||
                        (check[column].every((item) => item !== "") &&
                            check[column][2] !== line) ||
                        (object[row - diff][iColumn].every(
                            (item) => !item.showCheckbox
                        ) &&
                            check[iColumn - 1][2] !== line &&
                            iColumn > 2)
                    ) {
                        return true;
                    }
                }
            }

            return false;
        },
        [check]
    );

    const handleCheck = useCallback(
        function ([column, row, line]) {
            return () => {
                let diff = 0;
                if (row >= 6) {
                    diff = 6;
                }

                let temp = [...check];
                if (check[column].every((item) => item == "")) {
                    temp[column] = [column, row, line];
                } else {
                    for(let iColumn = column; iColumn<quantityMachining[0].length; iColumn++){
                        temp[iColumn] = new Array(3).fill("");
                    }
                }
                setCheck(() => temp);
            };
        },
        [check]
    );

    const isSelected = useCallback(function([column, row, line]){
        const value = [column, row, line];
        if(check.length === 0) return false;
        const valid = check[column].every((item, index) => {
            return item === value[index]
        });
        return valid;
    }, [check])

    const getDataIssue = useCallback(function() {
        if(check.length === 0) {
            return ""
        }
        const valid = check[1].every(item => item !== "") 
        let data = [];
        if(valid) {
            const [column, row, line] = check[1]
            let diff = 0
            let object = quantityMachining
            
            if (row >= 6) {
                diff = 6;
                object = qualityMachining;
            }

            data = new Array(object[row - diff].length).fill("")

            let iLine = 0;

            for(let iColumn = 0; iColumn < object[row - diff].length; iColumn++) {
                if(object[row - diff][iColumn].every(item => item.showCheckbox) && check[iColumn].every(item => item === "")) {
                    break
                }
                if(object[iColumn === 0 ? 0 : row - diff][iColumn].every(item => item.showCheckbox)) {
                    iLine = check[iColumn][2]
                }
                data[iColumn] = object[iColumn === 0 ? 0 : row - diff][iColumn][iLine].name
                // if(object[row - diff][iColumn].every(item => !item.showCheckbox)) {
                //     data[iColumn] = object[row - diff][iColumn][line].name 
                // }
            }
        }

        return data
    }, [check])
    //END: HANDLE ISSUE MACHINING


    //BEGIN: HANDLE ISSUE STITCHING
    const isDisableStitching = useCallback(
        function ([column, row, line]) {
            if (column == 0 || checkStitching.length == 0) {
                return false;
            }

            if (column == 1) {
                if (
                    checkStitching[column].every((item) => item !== "") &&
                    checkStitching[column][1] != row
                ) {
                    return true;
                }
            }

            if (column > 1) {
                let diff = 0;
                let object = quantityStitching;
                if (row >= 3) {
                    diff = 3;
                    object = qualityStitching;
                }

                for (let iColumn = column; iColumn >= 1; iColumn--) {

                    if (
                        (object[row - diff][iColumn - 1].every(
                            (item) => !item.showCheckbox
                        ) ||
                            object[row - diff][iColumn - 1].some(
                                (item) => !item.showCheckbox
                            )) &&
                        checkStitching[iColumn - 1].every((item) => item === "")
                    ) {
                        continue;
                    }

                    if (
                        checkStitching[iColumn - 1].every((item) => item === "") ||
                        checkStitching[iColumn - 1][1] !== row ||
                        (checkStitching[column].every((item) => item !== "") &&
                            checkStitching[column][2] !== line) ||
                        (object[row - diff][iColumn].every(
                            (item) => !item.showCheckbox
                        ) &&
                            checkStitching[iColumn - 1][2] !== line &&
                            iColumn > 2)
                    ) {
                        return true;
                    }
                }
            }

            return false;
        },
        [checkStitching]
    );

    const handleCheckStitching = useCallback(
        function ([column, row, line]) {
            return () => {
                let diff = 0;
                if (row >= 3) {
                    diff = 3;
                }

                let temp = [...checkStitching];
                if (checkStitching[column].every((item) => item == "")) {
                    temp[column] = [column, row, line];
                } else {
                    for(let iColumn = column; iColumn < quantityStitching[0].length; iColumn++){
                        temp[iColumn] = new Array(3).fill("");
                    }
                }
                setCheckStitching(() => temp);
            };
        },
        [checkStitching]
    );

    const isSelectedStitching = useCallback(function([column, row, line]){
        const value = [column, row, line];
        if(checkStitching.length === 0) return false;
        const valid = checkStitching[column].every((item, index) => {
            return item === value[index]
        });
        return valid;
    }, [checkStitching])

    const getDataIssueStitching = useCallback(function() {
        if(checkStitching.length === 0) {
            return ""
        }
        const valid = checkStitching[1].every(item => item !== "") 
        let data = [];
        if(valid) {
            const [column, row, line] = checkStitching[1]
            let diff = 0
            let object = quantityStitching
            
            if (row >= 3) {
                diff = 3;
                object = qualityStitching;
            }

            data = new Array(object[row - diff].length).fill("")

            let iLine = 0;

            for(let iColumn = 0; iColumn < object[row - diff].length; iColumn++) {
                if(object[row - diff][iColumn].every(item => item.showCheckbox) && checkStitching[iColumn].every(item => item === "")) {
                    break
                }
                if(object[iColumn === 0 ? 0 : row - diff][iColumn].every(item => item.showCheckbox)) {
                    iLine = checkStitching[iColumn][2]
                }
                data[iColumn] = object[iColumn === 0 ? 0 : row - diff][iColumn][iLine].name
                // if(object[row - diff][iColumn].every(item => !item.showCheckbox)) {
                //     data[iColumn] = object[row - diff][iColumn][line].name 
                // }
            }
        }

        return data
    }, [checkStitching])
    //END: HANDLE ISSUE STITCHING


    // Handle add issue
    const handleAddIssue = useCallback((stage) => {
        var dataIssue = [];
        if(stage === "S") {
            dataIssue = getDataIssueStitching()
            setIsAddIssueStitching(true)
        } 
        else if(stage === "L") {
            dataIssue = getDataIssue()
            setIsAddIssueMachining(true)
        }

        if(dataIssue.some(item => item === "")) {
            const key = enqueueSnackbar("Dữ liệu không hợp lệ, vui lòng chọn đầy đủ", {
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
        } else {
            if(staffDepartment != "") {
                var data = {}
                data.line_code = staffDepartment
                data.affect = dataIssue[0]
                data.reason = dataIssue[1]
                data.description_reason = dataIssue[2]
                data.action_resolve = dataIssue[3]
                data.responsible = dataIssue[4]
                data.issue_of = stage

                axios.post('KPIBoard/add-issue', data)
                    .then(res => {
                        if(res.status === 200) {
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

                            handleGetAllIssueOfLine(staffDepartment)

                            if(stage === "S") {
                                handleCloseModalStitching()
                                setIsAddIssueStitching(false)
                            }
                            else if(stage === "L") {
                                handleCloseModalMachining()
                                setIsAddIssueMachining(false)
                            }
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
                        setIsAddIssueStitching(false)
                        setIsAddIssueMachining(false)
                    })
            } else {
                const key = enqueueSnackbar("Xảy ra lỗi không thể thêm vấn đề", {
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
                setIsAddIssueStitching(false)
                setIsAddIssueMachining(false)
            }
        }
    }, [check, checkStitching])


    // Hanlde show & close modal stitching
    const [showModalStitching, setShowModalStitching] = useState(false);

    const handleShowModalStitching = () => {
        setShowModalStitching(true);
    };

    const handleCloseModalStitching = () => {
        setShowModalStitching(false);
        setCheckStitching(() =>
            new Array(quantityStitching[0].length).fill(new Array(3).fill(""))
        );
    };

    // Hanlde show & close modal machining
    const [showModalMachining, setShowModalMachining] = useState(false);

    const handleShowModalMachining = () => {
        setShowModalMachining(true);
    };

    const handleCloseModalMachining = () => {
        setShowModalMachining(false);
        setCheck(() =>
            new Array(quantityMachining[0].length).fill(new Array(3).fill(""))
        );
    };

    // Handle show & close modal confirm cancel
    const [showModalCancel, setShowModalCancel] = useState(false);

    const handleShowModalCancel = (idIssue) => {
        setShowModalCancel(true);
        setIdCancelIssue(idIssue)
    };

    const handleCloseModalCancel = () => {
        setShowModalCancel(false);
    };

    // Handle show & close modal confirm complete
    const [showModalComplete, setShowModalComplete] = useState(false);

    const handleShowModalComplete = (idIssue) => {
        setShowModalComplete(true);
        setIdCompleteIssue(idIssue)
    };

    const handleCloseModalComplete = () => {
        setShowModalComplete(false);
    };

    return (
        <React.Fragment>
            {/* Modal issue stitching */}
            <Modal
                show={showModalStitching}
                maxWidth="6xl"
                onClose={handleCloseModalStitching}
            >
                <div className="flex flex-col bg-white dark:bg-gray-800 zoom-60 xl:zoom-100">
                    <div className="">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 select-none">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="relative">
                                        <th
                                            scope="col"
                                            colSpan={5}
                                            className="px-6 py-3 text-center uppercase"
                                        >
                                            Biểu ghi nhận vấn đề cho cuộc họp
                                            cấp bậc điện tử - chuyền may
                                        </th>

                                        <th
                                            className="absolute right-0 p-2.5 rounded-sm cursor-pointer hover:bg-gray-600"
                                            onClick={handleCloseModalStitching}
                                        >
                                            <img
                                                width={20}
                                                src="svg/close.svg"
                                                alt="close"
                                            />
                                        </th>
                                    </tr>
                                    <tr className="border-t-2 border-sky-500">
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Ảnh hưởng tới
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Nguyên nhân
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Mô tả nguyên nhân
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Hành động giải quyết
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Người chịu trách nhiệm
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Sản lượng */}
                                    {quantityStitching.map((items, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {items.map((item, subIndex) => (
                                                <td
                                                    key={subIndex}
                                                    scope="row"
                                                    rowSpan={
                                                        index == 0 &&
                                                        subIndex == 0
                                                            ? quantityStitching.length
                                                            : ""
                                                    }
                                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                                    hidden={
                                                        item[0].name == ""
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {item.map(
                                                        (objItem, objIndex) => {
                                                            var isDisabledStitching =
                                                                isDisableStitching([
                                                                    subIndex,
                                                                    index,
                                                                    objIndex,
                                                                ]);

                                                            return (
                                                                <div
                                                                    key={
                                                                        objIndex
                                                                    }
                                                                    className="flex mt-1.5"
                                                                >
                                                                    {objItem.showCheckbox && (
                                                                        <input
                                                                            disabled={
                                                                                isDisabledStitching
                                                                            }
                                                                            checked={isSelectedStitching([subIndex, index, objIndex])}
                                                                            id={`quantityStitching-${index}-${subIndex}-${objIndex}`}
                                                                            onChange={handleCheckStitching(
                                                                                [
                                                                                    subIndex,
                                                                                    index,
                                                                                    objIndex,
                                                                                ]
                                                                            )}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <label
                                                                            className={`${
                                                                                isDisabledStitching
                                                                                    ? "text-gray-900/50 dark:text-white/50 line-through"
                                                                                    : "text-gray-900 dark:text-white"
                                                                            }`}
                                                                            htmlFor={`quantityStitching-${index}-${subIndex}-${objIndex}`}
                                                                        >
                                                                            {
                                                                                objItem.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {/* Chất lượng */}
                                    {qualityStitching.map((items, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {items.map((item, subIndex) => (
                                                <td
                                                    key={subIndex}
                                                    scope="row"
                                                    rowSpan={
                                                        index == 0 &&
                                                        subIndex == 0
                                                            ? qualityStitching.length
                                                            : ""
                                                    }
                                                    className={
                                                        "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                                    }
                                                    hidden={
                                                        item[0].name == ""
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {item.map(
                                                        (objItem, objIndex) => {
                                                            var isDisabledStitching =
                                                                isDisableStitching([
                                                                    subIndex,
                                                                    index + 3,
                                                                    objIndex,
                                                                ]);

                                                            return (
                                                                <div
                                                                    key={
                                                                        objIndex
                                                                    }
                                                                    className="flex mt-1.5"
                                                                >
                                                                    {objItem.showCheckbox && (
                                                                        <input
                                                                            disabled={
                                                                                isDisabledStitching
                                                                            }
                                                                            
                                                                            checked={isSelectedStitching([subIndex, index + 3, objIndex])}
                                                                            id={`qualityStitching-${index}-${subIndex}-${objIndex}`}
                                                                            onChange={handleCheckStitching(
                                                                                [
                                                                                    subIndex,
                                                                                    index + 3,
                                                                                    objIndex,
                                                                                ]
                                                                            )}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <label
                                                                            className={`${
                                                                                isDisabledStitching
                                                                                    ? "text-gray-900/50 dark:text-white/50 line-through"
                                                                                    : "text-gray-900 dark:text-white"
                                                                            }`}
                                                                            htmlFor={`qualityStitching-${index}-${subIndex}-${objIndex}`}
                                                                        >
                                                                            {
                                                                                objItem.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="py-2 flex justify-around">
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
                            onClick={() => handleAddIssue('S')}
                            disabled={isAddIssueStitching}
                        >
                            {
                                isAddIssueStitching
                                ?
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
                                :
                                    "Xác nhận"
                            }
                        </button>
                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700"
                            onClick={handleCloseModalStitching}
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal issue machining */}
            <Modal
                show={showModalMachining}
                maxWidth="6xl"
                onClose={handleCloseModalMachining}
            >
                <div className="flex flex-col bg-white dark:bg-gray-800 zoom-60 xl:zoom-100">
                    <div className="">
                        <div className="overflow-x-auto rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 select-none">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="relative">
                                        <th
                                            scope="col"
                                            colSpan={5}
                                            className="px-6 py-3 text-center uppercase"
                                        >
                                            Biểu ghi nhận vấn đề cho cuộc họp
                                            cấp bậc điện tử - chuyền gia công
                                        </th>

                                        <th
                                            className="absolute right-0 p-2.5 rounded-sm cursor-pointer hover:bg-gray-600"
                                            onClick={handleCloseModalMachining}
                                        >
                                            <img
                                                width={20}
                                                src="svg/close.svg"
                                                alt="close"
                                            />
                                        </th>
                                    </tr>
                                    <tr className="border-t-2 border-sky-500">
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Ảnh hưởng tới
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Nguyên nhân
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Mô tả nguyên nhân
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Hành động giải quyết
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            Người chịu trách nhiệm
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Sản lượng */}
                                    {quantityMachining.map((items, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {items.map((item, subIndex) => (
                                                <td
                                                    key={subIndex}
                                                    scope="row"
                                                    rowSpan={
                                                        index == 0 &&
                                                        subIndex == 0
                                                            ? quantityMachining.length
                                                            : ""
                                                    }
                                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                                    hidden={
                                                        item[0].name == ""
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {item.map(
                                                        (objItem, objIndex) => {
                                                            var isDisabled =
                                                                isDisable([
                                                                    subIndex,
                                                                    index,
                                                                    objIndex,
                                                                ]);

                                                            return (
                                                                <div
                                                                    key={
                                                                        objIndex
                                                                    }
                                                                    className="flex mt-1.5"
                                                                >
                                                                    {objItem.showCheckbox && (
                                                                        <input
                                                                            disabled={
                                                                                isDisabled
                                                                            }
                                                                            checked={isSelected([subIndex, index, objIndex])}
                                                                            id={`quantityMachining-${index}-${subIndex}-${objIndex}`}
                                                                            onChange={handleCheck(
                                                                                [
                                                                                    subIndex,
                                                                                    index,
                                                                                    objIndex,
                                                                                ]
                                                                            )}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <label
                                                                            className={`${
                                                                                isDisabled
                                                                                    ? "text-gray-900/50 dark:text-white/50 line-through"
                                                                                    : "text-gray-900 dark:text-white"
                                                                            }`}
                                                                            htmlFor={`quantityMachining-${index}-${subIndex}-${objIndex}`}
                                                                        >
                                                                            {
                                                                                objItem.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                    {/* Chất lượng */}
                                    {qualityMachining.map((items, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {items.map((item, subIndex) => (
                                                <td
                                                    key={subIndex}
                                                    scope="row"
                                                    rowSpan={
                                                        index == 0 &&
                                                        subIndex == 0
                                                            ? qualityMachining.length
                                                            : ""
                                                    }
                                                    className={
                                                        "px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                                    }
                                                    hidden={
                                                        item[0].name == ""
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    {item.map(
                                                        (objItem, objIndex) => {
                                                            var isDisabled =
                                                                isDisable([
                                                                    subIndex,
                                                                    index + 6,
                                                                    objIndex,
                                                                ]);

                                                            return (
                                                                <div
                                                                    key={
                                                                        objIndex
                                                                    }
                                                                    className="flex mt-1.5"
                                                                >
                                                                    {objItem.showCheckbox && (
                                                                        <input
                                                                            disabled={
                                                                                isDisabled
                                                                            }
                                                                            checked={isSelected([subIndex, index + 6, objIndex])}
                                                                            id={`qualityMachining-${index}-${subIndex}-${objIndex}`}
                                                                            onChange={handleCheck(
                                                                                [
                                                                                    subIndex,
                                                                                    index + 6,
                                                                                    objIndex,
                                                                                ]
                                                                            )}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <label
                                                                            className={`${
                                                                                isDisabled
                                                                                    ? "text-gray-900/50 dark:text-white/50 line-through"
                                                                                    : "text-gray-900 dark:text-white"
                                                                            }`}
                                                                            htmlFor={`qualityMachining-${index}-${subIndex}-${objIndex}`}
                                                                        >
                                                                            {
                                                                                objItem.name
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="py-2 flex justify-around">
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
                            onClick={() => handleAddIssue('L')}
                            disabled={isAddIssueMachining}
                        >
                            {
                                isAddIssueMachining
                                ?
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
                                :
                                    "Xác nhận"
                            }
                        </button>
                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700"
                            onClick={handleCloseModalMachining}
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal confirm cancel issue */}
            <Modal
                show={showModalCancel}
                maxWidth="md"
                onClose={handleCloseModalCancel}
            >
                <div className="p-3">
                    <div className="text-center mt-2">
                        <span className="text-xl font-semibold">
                            Xác nhận hủy vấn đề ?
                        </span>
                    </div>
                    <div className="flex justify-around mt-5 mb-2">
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
                            onClick={() => handleCancelIssue()}
                            disabled={isConfirmCancelIssue}
                        >
                            {
                                isConfirmCancelIssue
                                ?
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
                                :
                                    "Có"
                            }
                        </button>

                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700"
                            onClick={handleCloseModalCancel}
                        >
                            Không
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal confirm complete issue */}
            <Modal
                show={showModalComplete}
                maxWidth="md"
                onClose={handleCloseModalComplete}
            >
                <div className="p-3">
                    <div className="text-center mt-2">
                        <span className="text-xl font-semibold">
                            Xác nhận vấn đề hoàn thành ?
                        </span>
                    </div>
                    <div className="flex justify-around mt-5 mb-2">
                        <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700"
                            onClick={() => handleCompleteIssue()}
                            disabled={isConfirmCompleteIssue}
                        >
                            {
                                isConfirmCompleteIssue
                                ?
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
                                :
                                    "Có"
                            }
                        </button>

                        <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700"
                            onClick={handleCloseModalComplete}
                        >
                            Không
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="flex-1 h-full flex flex-col">
                {/* nav table */}
                <div className="flex flex-col 2xl:flex-row pt-1 gap-2 xl:gap-8 px-0">
                    <div className="flex-1 flex justify-between lg:justify-evenly gap-2">
                        <div className="flex gap-6 flex-1 xl:flex-none">
                            <div className="flex flex-row xl:flex-col justify-between items-center gap-1">
                                <span className="font-bold bg-sky-600 text-white px-2 py-0.5 xl:px-4 xl:py-1 rounded-md text-center">
                                    Cấp bậc 1
                                </span>
                                <Link href={route("detailIssue")}>
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-2 py-1 xl:px-4 xl:py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                            <div className="flex flex-row xl:flex-col justify-between items-center flex-1 gap-1">
                                <div className="w-full flex shadow-lg flex-1">
                                    <span className="font-bold bg-sky-600 text-white px-2 py-0.5 xl:px-4 xl:py-1 text-center rounded-l-md">
                                        Điểm
                                    </span>
                                    <span className="bg-white px-2 py-0.5 xl:px-4 xl:py-1 rounded-r-md font-bold text-center w-full">
                                        {scoreEvaluate}
                                    </span>
                                </div>
                                <Link href={route("followMeeting")} className="flex-1">
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-2 py-1 xl:px-4 xl:py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Bảng theo dõi
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="xl:w-48 flex flex-col shadow-md">
                            <div className="px-2 xl:px-0 bg-white w-full text-center text-sm py-[2px] font-semibold">
                                Vấn đề sản lượng
                            </div>
                            <div className="bg-gray-400 flex-1 flex items-center justify-center xl:text-xl font-bold text-cyan-300">
                                {statisticIssue.quantity_issue}
                            </div>
                        </div>
                        <div className="xl:w-48 flex flex-col shadow-md">
                            <div className="px-2 xl:px-0 bg-white w-full text-center text-sm py-[2px] font-semibold">
                                Vấn đề phẩm chất
                            </div>
                            <div className="bg-gray-400 flex-1 flex items-center justify-center xl:text-xl font-bold text-cyan-300">
                                {statisticIssue.quality_issue}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-between lg:justify-around xl:justify-evenly">
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-sky-500 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Tổng vấn đề
                            </div>
                            <div className="bg-gray-400 flex-1 flex items-center justify-center text-xl font-bold text-cyan-300">
                                {statisticIssue.all_issue}
                            </div>
                        </div>
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-green-600 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Đã giải quyết
                            </div>
                            <div className="bg-gray-400 flex-1 flex items-center justify-center text-xl font-bold text-cyan-300">
                                {statisticIssue.solved_issue}
                            </div>
                        </div>
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-red-600 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Chưa giải quyết
                            </div>
                            <div className="bg-gray-400 flex-1 flex items-center justify-center text-xl font-bold text-cyan-300">
                                {statisticIssue.not_solved_issue}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-center">
                            <span className="font-semibold text-gray-500 xl:text-lg">
                                Tài khoản {username}
                            </span>
                            <Link href={route("reviewMeeting")}>
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-3 py-1 xl:px-5 xl:py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                >
                                    Đánh giá cuộc họp
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* table */}
                <div className="flex-1 relative my-4 mx-2">
                    <div className="">
                        <div className="p-5">
                            <div className="overflow-x-auto shadow-xl shadow-[lightblue] rounded-lg absolute inset-0 dark:bg-gray-800">
                                <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-300/50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
                                        <tr className="relative">
                                            <th
                                                scope="col"
                                                colSpan={8}
                                                className="px-6 py-3 text-center"
                                            >
                                                Mô tả vấn đề trong ngày cấp bậc
                                                1
                                            </th>

                                            <th className="absolute right-2 top-1.5">
                                                <button
                                                    type="button"
                                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    onClick={
                                                        handleShowModalStitching
                                                    }
                                                >
                                                    Vấn đề may
                                                </button>
                                            </th>

                                            <th className="absolute right-[132px] top-1.5">
                                                <button
                                                    type="button"
                                                    className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                    onClick={
                                                        handleShowModalMachining
                                                    }
                                                >
                                                    Vấn đề gia công
                                                </button>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                STT
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Ngày
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Chuyền
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Ảnh hưởng
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Nguyên nhân
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Mô tả nguyên nhân
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Người chịu trách nhiệm
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Hoàn thành hoặc hủy
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="relative">
                                        {
                                            isAllIssueOfLine
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
                                                allIssueOfLine.map((item, index) => (
                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                                        >
                                                            {formatDate(item.created_at, true)}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {item.line_code}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {item.affect}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {item.reason}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {item.description_reason}
                                                        </td>
                                                        <td
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                        >
                                                            {item.responsible}
                                                        </td>
                                                        {
                                                            Number(item.is_solved)
                                                            ?
                                                                <td
                                                                    scope="row"
                                                                    className="px-6 py-4 font-medium dark:text-emerald-400 text-emerald-400"
                                                                >
                                                                    Hoàn thành
                                                                </td>
                                                            :
                                                                <td
                                                                    scope="row"
                                                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                                                                        onClick={
                                                                            () => handleShowModalComplete(item.id)
                                                                        }
                                                                    >
                                                                        <img
                                                                            width={30}
                                                                            src="svg/check.svg"
                                                                            alt="check"
                                                                        />
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                                                                        onClick={
                                                                            () => handleShowModalCancel(item.id)
                                                                        }
                                                                    >
                                                                        <img
                                                                            width={30}
                                                                            src="svg/cancel.svg"
                                                                            alt="check"
                                                                        />
                                                                    </button>
                                                                </td>
                                                        }
                                                    </tr>
                                                ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TableIssue;

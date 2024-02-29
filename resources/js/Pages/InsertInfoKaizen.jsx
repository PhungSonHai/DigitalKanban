import Modal from "@/Components/Modal";
import axios from "axios";
import { closeSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";

function InsertInfoKaizen() {
    const [isLoading, setLoading] = useState(true);
    const [isPosting, setPosting] = useState(false);
    const [isLoadingKaizen, setLoadingKaizen] = useState(false);
    const [isShowModal, setShowModal] = useState(false);
    const [isWatingDelete, setWatingDelete] = useState(false);
    const [isEditMode, setEditMode] = useState(false);

    const [updateTime, setUpdateTime] = useState(0);
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const years = [
        1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002,
        2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
        2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
        2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038,
        2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050,
    ];
    const [listDepartment, setListDepartment] = useState([]);
    const [listLine, setListLine] = useState([]);
    const [listProcess, setListProcess] = useState([]);
    const [listPlant, setListPlant] = useState([]);
    const [listKaizen, setListKaizen] = useState([]);

    const [selectId, setSelectId] = useState(0);

    const [order, setOrder] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [currentYear, setCurrentYear] = useState(0);

    const imagePIC = useRef();
    const [name, setName] = useState("");
    const [staffCode, setStaffCode] = useState("");
    const [deparment, setDeparment] = useState("");
    const [plant, setPlant] = useState("");

    const [upgrade, setUpgrade] = useState([]);

    const [lineAt, setLineAt] = useState("");
    const [processAt, setProcessAt] = useState("");
    const [plantAt, setPlantAt] = useState("");
    const [startAt, setStartAt] = useState("");
    const imageBefore = useRef();
    const imageCurrent = useRef();
    const [descriptionBefore, setDescriptionBefore] = useState("");
    const [descriptionCurrent, setDescriptionCurrent] = useState("");
    const [benefit, setBenefit] = useState("");

    const [currentMonthFilter, setCurrentMonthFilter] = useState(0);
    const [currentYearFilter, setCurrentYearFilter] = useState(0);

    useEffect(() => {
        setUpgrade(new Array(7).fill(false));
        setCurrentMonth(new Date().getMonth() + 1);
        setCurrentYear(new Date().getFullYear());
        setCurrentMonthFilter(new Date().getMonth() + 1);
        setCurrentYearFilter(new Date().getFullYear());
        setUpdateTime(Date.now());
        Promise.all([
            getDeparment(),
            getDeparment2(),
            getProcess(),
            getPlant(),
        ]).then((values) => {
            setLoading(false);
        });
    }, []);

    const getDeparment = () => {
        return axios.get("/api/get-department").then((res) =>
            setListLine(() => {
                let listDept = [...res.data, { dep_sap: "Other", department_code: "Other", department_name: "Khác" }];
                listDept.unshift({
                    dep_sap: "",
                    department_code: "",
                    department_name: "",
                });
                console.log(listDept);
                return listDept;
            })
        );
    };

    const getDeparment2 = () => {
        return axios.get("/api/get-department2").then((res) =>
            setListDepartment(() => {
                let listDept = [...res.data];
                listDept.unshift({
                    costcenter_name: "",
                });
                return listDept;
            })
        );
    };

    const getProcess = () => {
        return axios.get("/api/get-process").then((res) =>
            setListProcess(() => {
                let listDept = [...res.data, { rout_no: "Other", rout_name_z: "Khác" }];
                listDept.unshift({ rout_name_z: "", rout_no: "" });
                console.log(listDept);
                return listDept;
            })
        );
    };

    const getPlant = () => {
        return axios.get("/api/get-plant").then((res) =>
            setListPlant(() => {
                let listDept = [...res.data, { costcenter_name: "Khác" }];
                listDept.unshift({ costcenter_name: "" });
                return listDept;
            })
        );
    };

    const clear = function () {
        setOrder(1);
        setCurrentMonth(new Date().getMonth() + 1);
        setCurrentYear(new Date().getFullYear());
        imagePIC.current.value = "";
        setName("");
        setStaffCode("");
        setDeparment("");
        setPlant("");
        setUpgrade(new Array(7).fill(false));
        setLineAt("");
        setProcessAt("");
        setPlantAt("");
        setStartAt("");
        imageBefore.current.value = "";
        imageCurrent.current.value = "";
        setDescriptionBefore("");
        setDescriptionCurrent("");
        setBenefit("");
    };

    const setDataEdit = (item) => {
        console.log(item);
        setOrder(item.kaizen_order);
        setCurrentMonth(item.kaizen_month);
        setCurrentYear(item.kaizen_year);
        setName(item.name);
        setStaffCode(item.msnv);
        setDeparment(item.department);
        setPlant(item.plant);
        setUpgrade(
            new Array(7)
                .fill(false)
                .map((_, index) => item["upgrade_" + index] == "1")
        );
        setLineAt(item.line_at);
        setProcessAt(item.process_at);
        setPlantAt(item.plant_at);
        setStartAt(item.start_at.split(" ")[0]);
        setDescriptionBefore(item.after_description);
        setDescriptionCurrent(item.current_description);
        setBenefit(item.benefit);
    };

    const handleSelectDelete = (id) => {
        return () => {
            setShowModal(true);
            setSelectId(id);
        };
    };

    const handleDelete = () => {
        setWatingDelete(true);
        axios
            .post("/api/delete-kaizen", {
                id: selectId,
            })
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

                    setUpdateTime(Date.now());
                    setSelectId(0);
                    setShowModal(false);
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
            .finally(() => {
                setWatingDelete(false);
            });
    };

    const handleAdd = function () {
        if (
            !(
                currentMonth &&
                currentYear &&
                imagePIC.current.files.length &&
                name &&
                staffCode &&
                deparment &&
                plant &&
                upgrade.some((item) => item) &&
                lineAt &&
                processAt &&
                plantAt &&
                startAt &&
                imageBefore.current.files.length &&
                imageCurrent.current.files.length &&
                descriptionBefore &&
                descriptionCurrent &&
                benefit
            )
        ) {
            const key = enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
                variant: "warning",
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

            return;
        }

        setPosting(true);

        const formData = new FormData();
        formData.append("order", order);
        formData.append("month", currentMonth);
        formData.append("year", currentYear);
        formData.append("avatar", imagePIC.current.files[0]);
        formData.append("name", name);
        formData.append("msnv", staffCode);
        formData.append("derpartment", deparment);
        formData.append("plant", plant);
        formData.append("after_image", imageBefore.current.files[0]);
        formData.append("after_description", descriptionBefore);
        formData.append("current_image", imageCurrent.current.files[0]);
        formData.append("current_description", descriptionCurrent);
        formData.append("benefit", benefit);
        for (let i = 0; i < upgrade.length; i++) {
            formData.append("upgrade_" + i, upgrade[i]);
        }
        formData.append("line_at", lineAt);
        formData.append("plant_at", plantAt);
        formData.append("process_at", processAt);
        formData.append("start_at", startAt);

        axios
            .post("/api/insert-kaizen", formData)
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

                    setUpdateTime(Date.now());

                    clear();
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
            .finally(function () {
                setPosting(false);
            });
    };

    const handleUpdate = function () {
        if (
            !(
                selectId != 0 &&
                currentMonth &&
                currentYear &&
                name &&
                staffCode &&
                deparment &&
                plant &&
                lineAt &&
                processAt &&
                plantAt &&
                startAt &&
                descriptionBefore &&
                descriptionCurrent &&
                benefit
            )
        ) {
            const key = enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
                variant: "warning",
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

            return;
        }

        setPosting(true);

        const formData = new FormData();
        formData.append("id", selectId);
        formData.append("order", order);
        formData.append("month", currentMonth);
        formData.append("year", currentYear);
        formData.append("name", name);
        formData.append("msnv", staffCode);
        formData.append("derpartment", deparment);
        formData.append("plant", plant);
        formData.append("after_description", descriptionBefore);
        formData.append("current_description", descriptionCurrent);
        formData.append("benefit", benefit);
        for (let i = 0; i < upgrade.length; i++) {
            formData.append("upgrade_" + i, upgrade[i]);
        }
        formData.append("line_at", lineAt);
        formData.append("plant_at", plantAt);
        formData.append("process_at", processAt);
        formData.append("start_at", startAt);

        axios
            .post("/api/update-kaizen", formData)
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
                    clear();
                    setUpdateTime(Date.now());
                    setEditMode(false);
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
            .finally(function () {
                setPosting(false);
            });
    };

    const handleSelectEdit = (id, item) => {
        return () => {
            setEditMode(true);
            setSelectId(id);
            clear();
            setDataEdit(item);
        };
    };

    useEffect(() => {
        setLoadingKaizen(true);
        axios
            .get(
                "/api/get-kaizen?month=" +
                    currentMonthFilter +
                    "&year=" +
                    currentYearFilter
            )
            .then((res) => setListKaizen(res.data))
            .finally(() => {
                setLoadingKaizen(false);
            });
    }, [currentMonthFilter, currentYearFilter, updateTime]);

    return (
        <div>
            <React.Fragment>
                <Modal show={isShowModal} maxWidth="sm">
                    <div className="px-3 py-2 border-b border-solid border-gray-200 text-xl">
                        Bạn có muốn xoá dữ liệu này?
                    </div>
                    <div className="px-3 py-2">
                        <div className="mb-5">
                            Dữ liệu kaizen này sẽ được xoá khỏi hệ thống, vui
                            lòng cân nhắc kỹ hãy xoá!
                        </div>
                        <div className="flex justify-between">
                            <div></div>
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-1 border border-solid border-gray-300 rounded text-sm hover:bg-gray-300"
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectId(0);
                                    }}
                                >
                                    Huỷ bỏ
                                </button>
                                <button
                                    className="px-3 py-1 border border-solid border-red-500 bg-red-500 text-white rounded text-sm hover:bg-red-400 hover:border-red-400"
                                    onClick={handleDelete}
                                    disabled={isWatingDelete}
                                >
                                    {isWatingDelete ? (
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                        </div>
                                    ) : (
                                        "Đồng ý"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                {isLoading && (
                    <div className="fixed inset-0 bg-gray-800/30 flex items-center justify-center backdrop-blur-sm z-50">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                <div className="select-none h-screen flex flex-col">
                    <div className="flex justify-between items-center pt-3">
                        <div className="bg-gray-500/90 px-5 py-2 me-10 rounded-r-full shadow-xl shadow-[lightblue]">
                            <p className="text-md md:text-3xl uppercase font-bold text-white">
                                Nhập kaizen của tháng
                            </p>
                        </div>

                        <div className="flex me-4 items-center">
                            <div className="me-10">
                                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-7 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 shadow-xl shadow-[lightblue]" onClick={() => { window.history.back() }}>
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

                    <div className="pt-10 flex-1 flex flex-col">
                        <div className="flex flex-wrap gap-4 justify-between items-center pb-8">
                            <div className="flex ps-2 gap-4 flex-col md:flex-col lg:flex-row">
                                <div className="flex justify-between items-center">
                                    <div className="me-2">
                                        <span className="text-mg font-medium">
                                            Thứ tự kaizen:
                                        </span>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            id="inline-radio"
                                            type="radio"
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={order == 1}
                                            onChange={() => {
                                                setOrder(1);
                                            }}
                                        />
                                        <label
                                            htmlFor="inline-radio"
                                            className="ml-2 text-sm font-medium"
                                        >
                                            Thứ tự 1
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            id="inline-2-radio"
                                            type="radio"
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={order == 2}
                                            onChange={() => {
                                                setOrder(2);
                                            }}
                                        />
                                        <label
                                            htmlFor="inline-2-radio"
                                            className="ml-2 text-sm font-medium"
                                        >
                                            Thứ tự 2
                                        </label>
                                    </div>
                                    <div className="flex items-center mr-4">
                                        <input
                                            id="inline-checked-radio"
                                            type="radio"
                                            name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={order == 3}
                                            onChange={() => {
                                                setOrder(3);
                                            }}
                                        />
                                        <label
                                            htmlFor="inline-checked-radio"
                                            className="ml-2 text-sm font-medium"
                                        >
                                            Thứ tự 3
                                        </label>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex justify-between items-center lg:ms-5">
                                        <div className="me-2">
                                            <label
                                                htmlFor="countries"
                                                className="block text-md font-medium"
                                            >
                                                Tháng:
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    setCurrentMonth(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {months.map((month, index) => (
                                                    <option
                                                        key={index}
                                                        selected={
                                                            month ==
                                                            currentMonth
                                                                ? true
                                                                : false
                                                        }
                                                        value={month}
                                                    >
                                                        Tháng {month}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center ms-10">
                                        <div className="me-2">
                                            <label
                                                htmlFor="countries"
                                                className="block text-md font-medium"
                                            >
                                                Năm:
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    setCurrentYear(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {years.map((year, index) => (
                                                    <option
                                                        key={index}
                                                        selected={
                                                            year == currentYear
                                                                ? true
                                                                : false
                                                        }
                                                        value={year}
                                                    >
                                                        Năm {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pl-2">
                                {isEditMode && (
                                    <div className="flex gap-2">
                                        <button
                                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                                            onClick={() => {
                                                setEditMode(false);
                                                setSelectId(0);
                                                clear();
                                            }}
                                        >
                                            Huỷ bỏ
                                        </button>
                                        <button
                                            type="button"
                                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                                            onClick={handleUpdate}
                                            disabled={isPosting}
                                        >
                                            {isPosting ? (
                                                <div role="status">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                                </div>
                                            ) : (
                                                "Cập nhật"
                                            )}
                                        </button>
                                    </div>
                                )}
                                {!isEditMode && (
                                    <button
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                        onClick={handleAdd}
                                        disabled={isPosting}
                                    >
                                        {isPosting ? (
                                            <div role="status">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                            </div>
                                        ) : (
                                            "Thêm"
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-1 pb-3">
                            <div
                                className={`${
                                    isEditMode ? "bg-orange-100" : "bg-gray-300"
                                } w-2/3 mx-2 p-6 rounded-lg`}
                            >
                                <div className="lg:flex">
                                    <div className="lg:w-1/2 pe-5">
                                        <div className="text-center font-bold">
                                            <span className="text-xl text-sky-600">
                                                Thông tin người cải tiến
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <label
                                                className={`block mb-1 text-md font-medium ${
                                                    isEditMode &&
                                                    "opacity-50 pointer-events-none"
                                                }`}
                                                htmlFor="file_input"
                                            >
                                                Ảnh người cải tiến
                                            </label>
                                            <input
                                                className={`block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  ${
                                                    isEditMode &&
                                                    "opacity-50 pointer-events-none"
                                                }`}
                                                id="file_input"
                                                type="file"
                                                accept="image/*"
                                                ref={imagePIC}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Tên
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Nhập tên..."
                                                    autoComplete="off"
                                                    required
                                                    aria-autocomplete="list"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label
                                                    htmlFor="msnv"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    MSNV
                                                </label>
                                                <input
                                                    type="text"
                                                    id="msnv"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Nhập MSNV..."
                                                    autoComplete="off"
                                                    required
                                                    value={staffCode}
                                                    onChange={(e) =>
                                                        setStaffCode(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label
                                                    htmlFor="department"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Bộ phận
                                                </label>
                                                <select
                                                    id="department"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={deparment}
                                                    onChange={(e) =>
                                                        setDeparment(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {listDepartment.map(
                                                        (item, index) => (
                                                            <option
                                                                value={
                                                                    item.costcenter_name
                                                                }
                                                                key={index}
                                                            >
                                                                {
                                                                    item.costcenter_name
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label
                                                    htmlFor="plant"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Xưởng
                                                </label>
                                                <select
                                                    id="plant"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={plant}
                                                    onChange={(e) =>
                                                        setPlant(e.target.value)
                                                    }
                                                >
                                                    {listPlant.map((item, index) => (
                                                        <option
                                                            value={
                                                                item.costcenter_name
                                                            }
                                                            key={index}
                                                        >
                                                            {
                                                                item.costcenter_name
                                                            }
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:w-1/2 lg:ps-5">
                                        <div className="pt-4 lg:pt-0">
                                            <div className="font-bold text-center">
                                                <span className="text-xl text-sky-600">
                                                    Hạng mục cải tiến
                                                </span>
                                            </div>
                                            <div className="flex justify-around">
                                                <div className="mt-3">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="quanlity"
                                                            type="checkbox"
                                                            checked={upgrade[0]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[0] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="quanlity"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            Phẩm chất
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <input
                                                            id="productivity"
                                                            type="checkbox"
                                                            checked={upgrade[1]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[1] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="productivity"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            Năng suất
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <input
                                                            id="saving"
                                                            type="checkbox"
                                                            checked={upgrade[2]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[2] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="saving"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            Tiết kiệm
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <input
                                                            id="overview"
                                                            type="checkbox"
                                                            checked={upgrade[3]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[3] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="overview"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            Toàn diện
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="safety"
                                                            type="checkbox"
                                                            checked={upgrade[4]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[4] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="safety"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            An toàn
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <input
                                                            id="creative"
                                                            type="checkbox"
                                                            checked={upgrade[5]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[5] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="creative"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            Sáng tạo
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center mt-1">
                                                        <input
                                                            id="6s"
                                                            type="checkbox"
                                                            checked={upgrade[6]}
                                                            onChange={(e) => {
                                                                let temp = [
                                                                    ...upgrade,
                                                                ];
                                                                temp[6] =
                                                                    e.target.checked;
                                                                setUpgrade(
                                                                    temp
                                                                );
                                                            }}
                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <label
                                                            htmlFor="6s"
                                                            className="ml-2 text-md font-medium"
                                                        >
                                                            6S
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-3">
                                            <div className="font-bold text-center">
                                                <span className="text-xl text-sky-600">
                                                    Thông tin cải tiến
                                                </span>
                                            </div>
                                            <div className="mt-1">
                                                <div
                                                    className="flex"
                                                    style={{ marginTop: 6 }}
                                                >
                                                    <div className="w-1/2">
                                                        <label
                                                            htmlFor="inLine"
                                                            className="block mb-1 text-md font-medium"
                                                        >
                                                            Tại chuyền
                                                        </label>
                                                        <select
                                                            id="inLine"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={lineAt}
                                                            onChange={(e) =>
                                                                setLineAt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {listLine.map(
                                                                (item, index) => (
                                                                    <option
                                                                        value={
                                                                            item.department_code
                                                                        }
                                                                        key={index}
                                                                    >
                                                                        {
                                                                            item.department_code
                                                                        }{" "}
                                                                        {item.department_name &&
                                                                            `(${item.department_name})`}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="w-1/2 ms-2">
                                                        <label
                                                            htmlFor="inPhase"
                                                            className="block mb-1 text-md font-medium"
                                                        >
                                                            Tại công đoạn
                                                        </label>
                                                        <select
                                                            id="inPhase"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            value={processAt}
                                                            onChange={(e) =>
                                                                setProcessAt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            {listProcess.map(
                                                                (item, index) => (
                                                                    <option
                                                                        value={
                                                                            item.rout_name_z
                                                                        }
                                                                        key={index}
                                                                    >
                                                                        {
                                                                            item.rout_name_z
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <label
                                                        htmlFor="inPlant"
                                                        className="block mb-1 text-md font-medium"
                                                    >
                                                        Tại xưởng
                                                    </label>
                                                    <select
                                                        id="inPlant"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={plantAt}
                                                        onChange={(e) =>
                                                            setPlantAt(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {listPlant.map(
                                                            (item, index) => (
                                                                <option
                                                                    value={
                                                                        item.costcenter_name
                                                                    }
                                                                    key={index}
                                                                >
                                                                    {
                                                                        item.costcenter_name
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="mt-2">
                                                    <label
                                                        htmlFor="dateFrom"
                                                        className="block mb-1 text-md font-medium"
                                                    >
                                                        Từ ngày
                                                    </label>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                            <svg
                                                                aria-hidden="true"
                                                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"></path>
                                                            </svg>
                                                        </div>
                                                        <input
                                                            type="date"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Select date"
                                                            value={startAt}
                                                            onChange={(e) =>
                                                                setStartAt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-center font-bold mt-8">
                                        <span className="text-xl text-sky-600">
                                            Mô tả cải tiến
                                        </span>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-3 items-end">
                                        <div className="w-full lg:w-1/3">
                                            <div className="mt-2">
                                                <label
                                                    className={`block mb-1 text-md font-medium ${
                                                        isEditMode &&
                                                        "opacity-50 pointer-events-none"
                                                    }`}
                                                    htmlFor="beforeImprovement"
                                                >
                                                    Ảnh trước cải tiến
                                                </label>
                                                <input
                                                    className={`block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${
                                                        isEditMode &&
                                                        "opacity-50 pointer-events-none"
                                                    }`}
                                                    id="beforeImprovement"
                                                    type="file"
                                                    accept="image/*"
                                                    ref={imageBefore}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="descriptionBefore"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Mô tả trước cải tiến
                                                </label>
                                                <textarea
                                                    id="descriptionBefore"
                                                    rows="5"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                                                    placeholder="Nhập mô tả trước cải tiến..."
                                                    value={descriptionBefore}
                                                    onChange={(e) =>
                                                        setDescriptionBefore(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/3">
                                            <div className="mt-2">
                                                <label
                                                    className={`block mb-1 text-md font-medium ${
                                                        isEditMode &&
                                                        "opacity-50 pointer-events-none"
                                                    }`}
                                                    htmlFor="afterImprovement"
                                                >
                                                    Ảnh sau cải tiến
                                                </label>
                                                <input
                                                    className={`block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 resize-none ${
                                                        isEditMode &&
                                                        "opacity-50 pointer-events-none"
                                                    }`}
                                                    id="afterImprovement"
                                                    type="file"
                                                    accept="image/*"
                                                    ref={imageCurrent}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="descriptionAfter"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Mô tả sau cải tiến
                                                </label>
                                                <textarea
                                                    id="descriptionAfter"
                                                    rows="5"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                                                    placeholder="Nhập mô tả sau cải tiến..."
                                                    value={descriptionCurrent}
                                                    onChange={(e) =>
                                                        setDescriptionCurrent(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/3 flex-1">
                                            <div className="mt-2">
                                                <label
                                                    htmlFor="benefit"
                                                    className="block mb-1 text-md font-medium"
                                                >
                                                    Lợi ích
                                                </label>
                                                <textarea
                                                    id="benefit"
                                                    rows="5"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Nhập mô tả lợi ích..."
                                                    value={benefit}
                                                    onChange={(e) =>
                                                        setBenefit(
                                                            e.target.value
                                                        )
                                                    }
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`bg-gray-300 w-1/3 mx-2 p-6 rounded-lg flex flex-col relative ${
                                    isEditMode &&
                                    "pointer-events-none opacity-20 cursor-not-allowed"
                                }`}
                            >
                                {isLoadingKaizen && (
                                    <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-sm z-20 rounded-lg flex items-center justify-center">
                                        <div role="status">
                                            <svg
                                                aria-hidden="true"
                                                className="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                                        </div>
                                    </div>
                                )}
                                <div className="text-center mb-4">
                                    <span className="text-xl text-sky-600 font-bold">
                                        Danh sách kaizen
                                    </span>
                                </div>
                                <div className="flex mb-5 flex-wrap gap-2">
                                    <div className="flex justify-between items-center">
                                        <div className="me-2">
                                            <label
                                                htmlFor="countries"
                                                className="block text-md font-medium"
                                            >
                                                Tháng:
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    setCurrentMonthFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {months.map((month, index) => (
                                                    <option
                                                        key={index}
                                                        selected={
                                                            month ==
                                                            currentMonthFilter
                                                                ? true
                                                                : false
                                                        }
                                                        value={month}
                                                    >
                                                        Tháng {month}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="me-2">
                                            <label
                                                htmlFor="countries"
                                                className="block text-md font-medium"
                                            >
                                                Năm:
                                            </label>
                                        </div>
                                        <div>
                                            <select
                                                id="countries"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    setCurrentYearFilter(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {years.map((year, index) => (
                                                    <option
                                                        key={index}
                                                        selected={
                                                            year ==
                                                            currentYearFilter
                                                                ? true
                                                                : false
                                                        }
                                                        value={year}
                                                    >
                                                        Năm {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <div className="absolute inset-0 overflow-auto space-y-3">
                                        {listKaizen.length > 0 ? (
                                            listKaizen.map((item, index) => (
                                                <div key={index} className="dark:bg-[#374151] bg-white w-full rounded-lg py-2 px-4 flex flex-col lg:flex-row justify-between items-center gap-3">
                                                    <div>
                                                        <div className="w-16 h-16">
                                                            <img
                                                                src={
                                                                    "/uploads/" +
                                                                    item.path_avatar
                                                                }
                                                                className="rounded-lg w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div>
                                                            <div className="text-xs bg-orange-400 text-white rounded px-2 inline-block">
                                                                Thứ tự{" "}
                                                                {
                                                                    item.kaizen_order
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="dark:text-white mr-2 font-semibold">
                                                                Tên:
                                                            </span>
                                                            <span className="dark:text-white break-all">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="dark:text-white mr-2 font-semibold">
                                                                MSNV:
                                                            </span>
                                                            <span className="dark:text-white break-all">
                                                                {item.msnv}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="dark:text-white mr-2 font-semibold">
                                                                Bộ phận:
                                                            </span>
                                                            <span className="dark:text-white break-all">
                                                                {
                                                                    item.department
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row lg:flex-col pt-2 lg:pt-0 justify-around items-center gap-2">
                                                        <div
                                                            className="dark:hover:text-gray-300 dark:text-white hover:text-gray-500 cursor-pointer"
                                                            onClick={handleSelectEdit(
                                                                item.id,
                                                                item
                                                            )}
                                                        >
                                                            <svg
                                                                className="w-6 h-6"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 18"
                                                            >
                                                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                                            </svg>
                                                        </div>
                                                        <div
                                                            className="hover:text-red-500 text-red-400 cursor-pointer"
                                                            onClick={handleSelectDelete(
                                                                item.id
                                                            )}
                                                        >
                                                            <svg
                                                                className="w-6 h-6"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 18 20"
                                                            >
                                                                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                Không có dữ liệu tháng này
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
}

export default InsertInfoKaizen;

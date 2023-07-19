import React, { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "@inertiajs/react";
import { quantityStitching, qualityStitching } from "@/Data/IssueStitching";
import { quantityMachining, qualityMachining } from "@/Data/IssueMachining";

function TableIssue() {
    const [check, setCheck] = useState([]);

    useEffect(function () {
        setCheck(() =>
            new Array(quantityMachining[0].length).fill(new Array(3).fill(""))
        );
    }, []);

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
                setCheck(temp);
            };
        },
        [check]
    );

    const isSelected = useCallback(function([column, row, line]){
        const value = [column, row, line];
        const valid = check[column].every((item, index) => {
            console.log(value[index], item, index);
            return item === value[index]
        });
        console.log(valid)
        if(check.length === 0) return false;
        return valid;
    }, [check])

    // Hanlde show & close modal stitching
    const [showModalStitching, setShowModalStitching] = useState(false);

    const handleShowModalStitching = () => {
        setShowModalStitching(true);
    };

    const handleCloseModalStitching = () => {
        setShowModalStitching(false);
    };

    // Hanlde show & close modal machining
    const [showModalMachining, setShowModalMachining] = useState(false);

    const handleShowModalMachining = () => {
        setShowModalMachining(true);
    };

    const handleCloseModalMachining = () => {
        setShowModalMachining(false);
    };

    // Handle show & close modal confirm cancel
    const [showModalCancel, setShowModalCancel] = useState(false);

    const handleShowModalCancel = () => {
        setShowModalCancel(true);
    };

    const handleCloseModalCancel = () => {
        setShowModalCancel(false);
    };

    // Handle show & close modal confirm complete
    const [showModalComplete, setShowModalComplete] = useState(false);

    const handleShowModalComplete = () => {
        setShowModalComplete(true);
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
                <div className="flex flex-col bg-white dark:bg-gray-800">
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
                                            {items.map((item, subIndex) =>
                                                item != "" ? (
                                                    <td
                                                        key={subIndex}
                                                        scope="row"
                                                        rowSpan={
                                                            index == 0 &&
                                                            subIndex == 0
                                                                ? quantityStitching.length
                                                                : ""
                                                        }
                                                        className={`px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ${
                                                            index == 0 &&
                                                            subIndex == 0
                                                                ? "uppercase"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.indexOf("/n") >
                                                        -1 ? (
                                                            item
                                                                .split("/n")
                                                                .map(
                                                                    (
                                                                        str,
                                                                        strIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                strIndex
                                                                            }
                                                                            className="mt-1.5"
                                                                        >
                                                                            {str.indexOf(
                                                                                "/checkbox/"
                                                                            ) >
                                                                            -1 ? (
                                                                                <div className="flex">
                                                                                    <input
                                                                                        id={`quantityStitching-${index}-${subIndex}-${strIndex}`}
                                                                                        type="checkbox"
                                                                                        value=""
                                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                                    />
                                                                                    <div>
                                                                                        <label
                                                                                            htmlFor={`quantityStitching-${index}-${subIndex}-${strIndex}`}
                                                                                        >
                                                                                            {str.replace(
                                                                                                "/checkbox/",
                                                                                                ""
                                                                                            )}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                str
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )
                                                        ) : item.indexOf(
                                                              "/checkbox/"
                                                          ) > -1 ? (
                                                            <div className="flex">
                                                                <input
                                                                    id={`quantityStitching-${index}-${subIndex}`}
                                                                    type="checkbox"
                                                                    value=""
                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                />
                                                                <div>
                                                                    <label
                                                                        htmlFor={`quantityStitching-${index}-${subIndex}`}
                                                                    >
                                                                        {item.replace(
                                                                            "/checkbox/",
                                                                            ""
                                                                        )}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            item
                                                        )}
                                                    </td>
                                                ) : (
                                                    ""
                                                )
                                            )}
                                        </tr>
                                    ))}

                                    {/* Chất lượng */}
                                    {qualityStitching.map((items, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            {items.map((item, subIndex) =>
                                                item != "" ? (
                                                    <td
                                                        key={subIndex}
                                                        scope="row"
                                                        rowSpan={
                                                            index == 0 &&
                                                            subIndex == 0
                                                                ? qualityStitching.length
                                                                : ""
                                                        }
                                                        className={`px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ${
                                                            index == 0 &&
                                                            subIndex == 0
                                                                ? "uppercase"
                                                                : ""
                                                        }`}
                                                    >
                                                        {item.indexOf("/n") >
                                                        -1 ? (
                                                            item
                                                                .split("/n")
                                                                .map(
                                                                    (
                                                                        str,
                                                                        strIndex
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                strIndex
                                                                            }
                                                                            className="mt-1.5"
                                                                        >
                                                                            {str.indexOf(
                                                                                "/checkbox/"
                                                                            ) >
                                                                            -1 ? (
                                                                                <div className="flex">
                                                                                    <input
                                                                                        id={`qualityStitching-${index}-${subIndex}-${strIndex}`}
                                                                                        type="checkbox"
                                                                                        value=""
                                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                                    />
                                                                                    <div>
                                                                                        <label
                                                                                            htmlFor={`qualityStitching-${index}-${subIndex}-${strIndex}`}
                                                                                        >
                                                                                            {str.replace(
                                                                                                "/checkbox/",
                                                                                                ""
                                                                                            )}
                                                                                        </label>
                                                                                    </div>
                                                                                </div>
                                                                            ) : (
                                                                                str
                                                                            )}
                                                                        </div>
                                                                    )
                                                                )
                                                        ) : item.indexOf(
                                                              "/checkbox/"
                                                          ) > -1 ? (
                                                            <div className="flex">
                                                                <input
                                                                    id={`qualityStitching-${index}-${subIndex}`}
                                                                    type="checkbox"
                                                                    value=""
                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 mr-2 mt-0.5"
                                                                />
                                                                <div>
                                                                    <label
                                                                        htmlFor={`qualityStitching-${index}-${subIndex}`}
                                                                    >
                                                                        {item.replace(
                                                                            "/checkbox/",
                                                                            ""
                                                                        )}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            item
                                                        )}
                                                    </td>
                                                ) : (
                                                    ""
                                                )
                                            )}
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
                        >
                            Xác nhận
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
                <div className="flex flex-col bg-white dark:bg-gray-800">
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
                                                                            id={`qualityMachining-${index}-${subIndex}-${objIndex}`}
                                                                            onChange={handleCheck(
                                                                                [
                                                                                    subIndex,
                                                                                    index +
                                                                                        6,
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
                        >
                            Xác nhận
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
                        >
                            Có
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
                        >
                            Có
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

            <div className="flex flex-col">
                {/* nav table */}
                <div className="flex flex-col 2xl:flex-row pt-1 gap-8 px-5 xl:px-0">
                    <div className="flex-1 flex justify-between lg:justify-evenly">
                        <div className="flex gap-6">
                            <div className="flex flex-col justify-between">
                                <span className="font-bold bg-sky-600 text-white px-4 py-1 rounded-md text-center mb-1">
                                    Cấp bậc 1
                                </span>
                                <Link href={route("detailIssue")}>
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="w-full flex shadow-lg">
                                    <span className="font-bold bg-sky-600 text-white px-4 py-1 text-center rounded-l-md">
                                        Điểm
                                    </span>
                                    <span className="bg-white px-5 py-0.5 rounded-r-md font-bold">
                                        09
                                    </span>
                                </div>
                                <Link href={route("followMeeting")}>
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                    >
                                        Bảng theo dõi
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="w-48 flex flex-col shadow-md">
                            <div className="bg-white w-full text-center font-semibold">
                                Sản lượng
                            </div>
                            <div className="bg-gray-400 flex-1"></div>
                        </div>
                        <div className="w-48 flex flex-col shadow-md">
                            <div className="bg-white w-full text-center font-semibold">
                                Phẩm chất
                            </div>
                            <div className="bg-gray-400 flex-1"></div>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-between lg:justify-around xl:justify-evenly">
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-sky-500 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Tổng vấn đề
                            </div>
                            <div className="bg-gray-400 flex-1"></div>
                        </div>
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-green-600 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Đã giải quyết
                            </div>
                            <div className="bg-gray-400 flex-1"></div>
                        </div>
                        <div className="w-40 flex flex-col shadow-md">
                            <div className="bg-red-600 text-white text-sm py-[2px] w-full text-center font-semibold">
                                Chưa giải quyết
                            </div>
                            <div className="bg-gray-400 flex-1"></div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <span className="font-semibold text-gray-500 text-lg">
                                Tài khoản 4001APS01
                            </span>
                            <Link href={route("reviewMeeting")}>
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700"
                                >
                                    Đánh giá cuộc họp
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* table */}
                <div>
                    <div className="">
                        <div className="p-5">
                            <div className="overflow-x-auto shadow-xl shadow-[lightblue] rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                        <tr className="border-t-2 border-sky-500">
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
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                1
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                            >
                                                06-09-2023
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                4001APS01
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                Sản lượng
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                Nguyên vật liệu
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                Thiếu liệu từ chặt và may vi
                                                tính
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                Bộ trưởng
                                            </td>
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                <button
                                                    type="button"
                                                    className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-3 py-1 mr-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                                                    onClick={
                                                        handleShowModalComplete
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
                                                        handleShowModalCancel
                                                    }
                                                >
                                                    <img
                                                        width={30}
                                                        src="svg/cancel.svg"
                                                        alt="check"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
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

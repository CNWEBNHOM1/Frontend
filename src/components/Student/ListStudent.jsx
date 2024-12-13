/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../Header/Header"
import "./ListStudent.css"
import { faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react";
import SelectRoomOfRequest from "../Request/SelectRoomOfRequest";
import { getListRoom } from "../../service/ManagerAPI/RoomAPI";
import { getListStudent } from "../../service/ManagerAPI/StudentAPI";
import { formatDate } from "../../utils/DateUtils";
import { Link } from "react-router-dom";
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup";
import API_CONFIG from "../../config/ApiConfig";
import axios from 'axios';
import { saveAs } from 'file-saver';

const statusTab = [
    { key: "all", label: "Tất cả", trangthai: null },
    { key: "staying", label: "Đang ở", trangthai: "Đang ở" },
    { key: "stop_before", label: "Dừng trước hạn", trangthai: "Dừng trước hạn" }
];

const colsToRender = {
    name: true,
    sid: true,
    email: true,
    phone: true,
    ngaysinh: true,
    room: true,
};

const col = {
    name: {
        name: "Họ và tên"
    },
    sid: {
        name: "Mã số sinh viên"
    },
    email: {
        name: "Email"
    },
    phone: {
        name: "Số điện thoại"
    },
    ngaysinh: {
        name: "Ngày sinh"
    },
    room: {
        name: "Phòng"
    }
}
const ListStudent = () => {
    const [tabActive, setTabActive] = useState("all");

    // phan trang,bo loc
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [name, setName] = useState(null);
    const [room, setRoom] = useState(null);
    const btnRef = useRef(null);
    const [isOpenSelectRoom, setIsOpenSelectRoom] = useState(false);
    const closePopupSelectRoom = () => {
        setIsOpenSelectRoom(false);
    }
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [listRoom, setListRoom] = useState([]);
    const [datafetchRoomList, setDatafetchRoomList] = useState({
        "page": 1,
        "limit": 10000,
        "department": null
    })
    const selectRoom = (select) => {
        setRoom(select._id);
        setSelectedRoom(select);
        setIsOpenSelectRoom(false);  // Đóng popup sau khi chọn phòng
    };

    const fetchListRomm = async () => {
        const rooms = await getListRoom(datafetchRoomList)
        setListRoom(rooms.data.listRoom);
    }

    /* ----------*/

    // pagination
    const [pageQuantity, setPageQuantity] = useState(null);
    const [studentQuantity, setStudentQuantity] = useState(null);
    const limitBtnRef = useRef(null);
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);

    const handlePrevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
    const handleNextPage = () => {
        setPage((prevPage) => (prevPage < pageQuantity ? prevPage + 1 : prevPage));
    };
    /* ----------*/

    const [listStudent, setListStudent] = useState([]);
    const [trangthai, setTrangthai] = useState(null);

    const handleTabClick = (key, trangthai) => {
        setTabActive(key);
        setTrangthai(trangthai);
    };

    const fetchListStudent = async () => {
        const students = await getListStudent({ page: page, limit: limit, name: name, room: room, trangthai: trangthai });
        setListStudent(students.data)
        setStudentQuantity(students.totalStudents)
        setPageQuantity(students.totalPages)
    };

    const exportStudentsToExcel = async () => {
        try {
            const token = localStorage.getItem('token');
            // console.log(token);
            const response = await axios({
                url: `${API_CONFIG.API_BASE_URL}/user/exportAllStudent`,
                method: 'GET',
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(localStorage.getItem('token'))
            const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            saveAs(file, `${Date.now()}_DSSV.xlsx`);

        } catch (error) {
            console.error('Lỗi gì đó: ', error);
        }
    }

    useEffect(() => {
        fetchListRomm();
    }, [isOpenSelectRoom])

    useEffect(() => {
        fetchListStudent();
    }, [page, limit, room, trangthai, name])
    return (
        <div className="list-student">
            <Header title={"Danh sách thành viên"} />
            <div className="right__listPage">
                <div className="toolbar">
                    <button className="btn-base" onClick={exportStudentsToExcel}>
                        <span className="btn-icon">
                            <FontAwesomeIcon icon={faPlus} style={{ height: '15px' }} />
                        </span>
                        <span className="btn-title">
                            Xuất flie

                        </span>
                    </button>
                </div>
                <div className="main_table">
                    <div className="main_table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                {statusTab.map(({ key, label, trangthai }) => (
                                    <button
                                        key={key}
                                        className={`btn-scroller ${tabActive === key ? "active" : ""}`}
                                        onClick={() => {
                                            handleTabClick(key, trangthai);
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="main_table-search-filter">
                        <div className="box-search-filter-btns">
                            <div className="box-search">
                                <div className="box-input">
                                    <div className="search-icon">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </div>
                                    <input
                                        placeholder="Tìm kiếm theo tên thành viên"
                                        type="text"
                                        name="search"
                                        id=""
                                        autoComplete="on"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <fieldset className="input-field" />
                                </div>
                            </div>
                            <div className="btn-group group-filter-btns">
                                <button className="btn btn_base btn_filter" ref={btnRef} onClick={() => setIsOpenSelectRoom(!isOpenSelectRoom)}>
                                    <span className="btn_label">
                                        Phòng
                                        <span className="btn_icon">
                                            <FontAwesomeIcon icon={faCaretDown} style={{ color: "#A3A8AF" }} />
                                        </span>
                                    </span>
                                </button>
                                {isOpenSelectRoom && <SelectRoomOfRequest closePopup={closePopupSelectRoom} btnRef={btnRef} listObject={listRoom} onSelectRoom={selectRoom} />}
                                <button className="btn btn_base btn_filter"
                                    onClick={() => {
                                        setRoom(null);
                                        setSelectedRoom(null);
                                    }
                                    }
                                >
                                    <span className="btn_label">
                                        Xóa bộ lọc
                                    </span>
                                </button>
                            </div>
                        </div>
                        {selectedRoom && (
                            <div className="box-show-selected-filter">
                                <div className="box-show-selected-container">
                                    {selectRoom && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Phòng: (<span>{selectedRoom?.department?.name}</span> -
                                                <span>{selectedRoom?.name}</span>)
                                            </span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() => {
                                                        setRoom(null);
                                                        setSelectedRoom(null);
                                                    }
                                                    }
                                                    className="btn-remove-item"
                                                    type="button"
                                                >
                                                    <span>
                                                        <FontAwesomeIcon icon={faXmark} />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="main_table-headers">
                        <table className="box-table-headers">
                            <colgroup>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "250px" }}></col>
                                <col style={{ width: "120px" }}></col>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "130px" }}></col>
                            </colgroup>
                            <thead>
                                <tr className="group-table-headers">
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if (value) {
                                            return (
                                                <th
                                                    key={key}
                                                    colSpan={1}
                                                    rowSpan={1}
                                                    className="table-header-item"
                                                >
                                                    {col[key]?.name}
                                                </th>
                                            )
                                        }
                                        return null
                                    })}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="table-data__container">
                        <table className="box-table-data">
                            <colgroup>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "250px" }}></col>
                                <col style={{ width: "120px" }}></col>
                                <col style={{ width: "150px" }}></col>
                                <col style={{ width: "130px" }}></col>
                            </colgroup>
                            <tbody>
                                {listStudent.map((student, index) => {
                                    return (
                                        <tr key={index} className="table-data-row">
                                            {Object.entries(colsToRender).map(([key, value]) => {
                                                if (value) {
                                                    if (key === "ngaysinh") {
                                                        return (
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                                <p className="box-text">
                                                                    {formatDate(student[key])}
                                                                </p>
                                                            </td>
                                                        )
                                                    }
                                                    else if (key === "email") {
                                                        return (
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                                <p className="box-text">
                                                                    {student?.user?.email}
                                                                </p>
                                                            </td>
                                                        )
                                                    }
                                                    else if (key === "room") {
                                                        return (
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                                <p className="box-text">
                                                                    {`${student?.room?.department?.name} - ${student?.room?.name}`}
                                                                </p>
                                                            </td>
                                                        )
                                                    }
                                                    else
                                                        return (
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                                <p className="box-text">
                                                                    {key !== "name" ? (
                                                                        student[key]
                                                                    ) : (
                                                                        <Link
                                                                            className="box-id"
                                                                            to={`/manager/people/detail/${student._id}`}
                                                                        >
                                                                            {student[key]}
                                                                        </Link>
                                                                    )}
                                                                </p>
                                                            </td>
                                                        )
                                                }
                                                return null;
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="right__table-pagination">
                    <div className="display-title" style={{ color: "#0F1824" }}>
                        Hiển thị
                    </div>
                    <div className="box-page-limit">
                        <button
                            ref={limitBtnRef}
                            onClick={() => setIsOpenLimitPopup(!isOpenLimitPopup)}
                            className={`btn-page-limit ${isOpenLimitPopup ? 'selected' : ''}`}
                        >
                            {limit}
                            <span>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                        </button>
                        {isOpenLimitPopup && (
                            <LimitSelectPopup
                                btnRef={limitBtnRef}
                                closePopup={() => setIsOpenLimitPopup(false)}
                                limit={limit}
                                handleChangeLimit={(limit) => {
                                    setLimit(limit);
                                    setPage(1);
                                }}
                            />
                        )}
                    </div>
                    <div className="title-1" style={{ display: "flex", flexDirection: "row", gap: '5px' }}>
                        <div>Kết quả.</div>
                        <div className="item-quantity">
                            Từ {(page - 1) * limit + 1} đến{" "}
                            {page * limit > studentQuantity ? studentQuantity : page * limit} trên tổng{" "}
                            {studentQuantity}
                        </div>
                    </div>
                    <div className="prev">
                        <button
                            className={`btn_prev ${page === 1 ? 'inactive' : ''}`}
                            onClick={handlePrevPage}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="page">
                        {page}
                    </div>
                    <div className="next">
                        <button
                            className={`btn_next ${page === pageQuantity ? 'inactive' : ''}`}
                            onClick={handleNextPage}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListStudent
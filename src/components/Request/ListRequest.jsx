/* eslint-disable no-unused-vars */
import "./ListRequest.css"
import Header from "../Header/Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react";
import { formatDate, formatDateWithHour } from "../../utils/DateUtils";
import { Link } from "react-router-dom";
import { getListRequest } from "../../service/ManagerAPI/RequestAPI";
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup";
import SelectRoomOfBill from "../Bill/SelectRoomOfBill";
import { getListRoom } from "../../service/ManagerAPI/RoomAPI";
import SelectRoomOfRequest from "./SelectRoomOfRequest";

const statusTab = [
    { key: "all", label: "Tất cả yêu cầu", trangthai: null },
    { key: "pending", label: "Đã thanh toán", trangthai: "pending" },
    { key: "approved", label: "Đã chấp nhận", trangthai: "approved" },
    { key: "declined", label: "Đã từ chối", trangthai: "declined" },
    { key: "unpaid", label: "Chưa thanh toán", trangthai: "unpaid" }
];
const colsToRender = {
    name: true,
    sid: true,
    gender: true,
    room: true,
    priority:true,
    createdAt: true,
    trangthai: true
};

const col = {
    name : {
        name: "Họ và tên"
    },
    sid: {
        name: "Mã số sinh viên"
    },
    gender: {
        name: "Giới tính"
    },
    room: {
        name: "Phòng đăng ký"
    },
    priority: {
        name: "Ưu tiên"
    },
    createdAt: {
        name: "Ngày gửi"
    },
    trangthai: {
        name: "Trạng thái"
    }
}

const ListRequest = () =>{

    const [tabActive, setTabActive] = useState("all");
    const [listRequest, setListRequest] = useState([]);

    // phan trang va loc
    const [status, setStatus] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [room, setRoom] = useState(null);
    const [name, setName] = useState(null);
    const [pageQuantity, setPageQuantity] = useState(null);
    const handleTabClick = (key, trangthai) => {
        setTabActive(key);
        setStatus(trangthai);
    };

    //pagination
    const limitBtnRef = useRef(null);
    const [isOpenLimitPopup,setIsOpenLimitPopup] = useState(false);
    const [requestQuantity, setRequestQuantity] = useState(null);

    const handlePrevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };
    const handleNextPage = () => {
        setPage((prevPage) => (prevPage < pageQuantity ? prevPage + 1 : prevPage));
    };

    //selectRooom
    const btnRef = useRef(null);
    const [isOpenSelectRoom, setIsOpenSelectRoom] = useState(false);
    const closePopupSelectRoom = () =>{
        setIsOpenSelectRoom(false);
    }
    const [selectedRoom, setSelectedRoom] = useState(null);
    const selectRoom = (select) => {
        setRoom(select._id);
        setSelectedRoom(select);
        setIsOpenSelectRoom(false);  // Đóng popup sau khi chọn phòng
    };
    const [listRoom, setListRoom] = useState([]);
    const [datafetchRoomList, setDatafetchRoomList] = useState({
        "page": 1,
        "limit": 10000,
        "department": null
    })

    const fetchListRomm = async () =>{
        const rooms = await getListRoom(datafetchRoomList)
        setListRoom(rooms.data.listRoom);
    }
 

    const fetchListRequest = async () =>{
        const request = await getListRequest({page: page, limit: limit, status: status,room: room, name: name })
        setListRequest(request.data);
        setRequestQuantity(request.totalRequests)
        setPageQuantity(request.totalPages);
    }

    useEffect(() =>{
        fetchListRomm()
    }, [isOpenSelectRoom])

    useEffect(() =>{
        fetchListRequest()
    }, [page, limit, name, room, status])
    return(
        <div className="list-request">
            <Header title={"Danh sách yêu cầu đăng ký phòng"}/>
            <div className="right__listPage">
                <div className="toolbar">
                    <button className="btn-base" style={{visibility: "hidden"}}>
                        <span className="btn-icon">
                            <FontAwesomeIcon icon={faPlus} style={{height: '15px'}}/>
                        </span>
                        <span className="btn-title">
                            Xuất flie
                        </span>
                    </button>
                </div>
                <div className="main_table">
                    <div className="main_table-scroller">
                        <div className="box-scroller">
                            <div  className="group-scroller-btns">
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
                                        placeholder="Tìm kiếm theo tên người đăng ký" 
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
                                <button className="btn btn_base btn_filter"  ref={btnRef} onClick={() => setIsOpenSelectRoom(!isOpenSelectRoom)}>
                                    <span className="btn_label">
										Phòng đăng ký
										<span className="btn_icon">
											<FontAwesomeIcon icon={faCaretDown} style={{color:"#A3A8AF" }}/>
										</span>
									</span>
                                </button>
                                {isOpenSelectRoom && <SelectRoomOfRequest closePopup={closePopupSelectRoom} btnRef={btnRef} listObject={listRoom} onSelectRoom = {selectRoom}/>}
                                <button className="btn btn_base btn_filter"
                                    onClick={() =>{
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
                        { selectedRoom && (
                            <div className="box-show-selected-filter">
                                <div className="box-show-selected-container">
                                    {selectRoom && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Phòng đăng ký: (<span>{selectedRoom?.department?.name}</span> -
                                                <span>{selectedRoom?.name}</span>)
                                            </span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() =>{
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
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "120px"}}></col>
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                            </colgroup>
                            <thead>
                                <tr className="group-table-headers">
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if(value){
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
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "120px"}}></col>
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                            </colgroup>
                            <tbody>
                                {listRequest.map((request, index) =>{
                                    return(
                                        <tr key={index} className="table-data-row">
                                            {Object.entries(colsToRender).map(([key,value]) =>{
                                                if(value){
                                                    if(key === "trangthai"){
                                                        if(request[key] === "approved"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-green">
                                                                        {"Đã chấp nhận"}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                        else if(request[key] === "pending"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-blue">
                                                                        {"Đã thanh toán"}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                        else if(request[key] === "unpaid"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-red1">
                                                                        {"Chưa thanh toán"}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                        else{
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-red">
                                                                        {"Đã từ chối"}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else if(key === "createdAt"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                            <p className="box-text">
                                                                {formatDateWithHour(request[key])}
                                                            </p>
                                                        </td>
                                                        )
                                                    }
                                                    else if(key === "room"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                            <p className="box-text">
                                                                {`${request?.room?.department?.name} - ${request?.room?.name}`}
                                                            </p>
                                                        </td>
                                                        )
                                                    }
                                                    else if(key === "priority"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                                <p className="box-text">
                                                                    {request[key] ? "Có" : "Không"}
                                                                </p>
                                                            </td>
                                                        )
                                                    }
                                                    else
                                                    return(
                                                        <td
                                                            key={key}
                                                            colSpan={1}
													        rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-text">
                                                                {key !== "name" ? (
                                                                request[key]
                                                                ) : (
                                                                <Link
                                                                    to={`/manager/request/detail/${request._id}`}
                                                                    className="box-id"
                                                                >
                                                                    {request[key]}
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
                    <div className="display-title" style={{color: "#0F1824"}}>
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
                    <div className="title-1" style={{display: "flex", flexDirection: "row", gap: '5px'}}>
                        <div>Kết quả.</div>
                        <div className="item-quantity">
                            Từ {(page - 1) * limit + 1} đến{" "}
                            {page * limit > requestQuantity ? requestQuantity : page * limit} trên tổng{" "}
                            {requestQuantity}
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

export default ListRequest
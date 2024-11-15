/* eslint-disable no-unused-vars */
import Header from "../Header/Header"
import "./ListRooms.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faL, faMagnifyingGlass, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import SelectDatePopup from "../SelectDatePopup/SelectDatePopup"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup"
import { withAuthorization } from "../../hoc"
import { getListRoom } from "../../service/ManagerAPI/RoomAPI"
import SelectFilter from "../SelectFilter/SelectFilter"
import { getListDepartment } from "../../service/ManagerAPI/DepartmentAPI"


const colsToRender = {
    name: true,
    department: true,
    occupiedSlots: true,
    capacity: true,
    giatrangbi: true,
    tinhtrang: true
};
const col = {
    name : {
      name: "Tên phòng",
      width: "80px",
      align: "text-center"
    },
  
    department: {
      name: "Tên khu",
      width: "80px",
      align: "text-center"
    },
    occupiedSlots: {
      name: "Số người hiện tại",
      width: "70px",
      align: "text-center"
    },
    capacity: {
      name: "Số người tối đa",
      width: "70px",
      align: "text-center"
    },
    giatrangbi: {
      name: "Giá trang bị",
      width: "100px",
      align: "text-center"
    },
    tinhtrang: {
      name: "Tình trạng",
      width: "120px",
      align: "text-center"
    }
  
}
const ListRooms = () =>{

    const [dataBody, setDataBody] = useState({
        keyword : null,
        created_date_from: null,
        created_date_to: null,
        department : null,
    });

    const filterBtnRef = useRef(null);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [name,setName] = useState("");
    const [listDepartment, setListDepartment] = useState([]);
    const [currentPageFilter, setCurrentPageFilter] = useState(1);
    const [totalPageFilter, setTotalPageFilter] = useState();
    
    const [roomList, setRoomList] = useState([]);
    const limitBtnRef = useRef(null);
    const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page,setPage] = useState(1);
    const [roomQuantity, setRoomQuantity] = useState(0)
    const [pageQuantity, setPageQuantity] = useState(3);

    const selectDepartment = (department) => {
        setDataBody((prev) => ({
            ...prev,
            department: department.name
        }));
        // Đóng filter popup sau khi chọn
        setIsOpenFilter(false);
    };
    const fetchListDepartment = async () =>{
        const departments = await getListDepartment({page: currentPageFilter, limit: 10, name: name});
        setListDepartment(departments.data.listDepartment);
        setTotalPageFilter(departments.data.totalPages);
    }

    const fetchMoreListDepartment = async () => {
		if (currentPageFilter < totalPageFilter) {
			const departments = await getListDepartment({
				page: currentPageFilter + 1,
				limit: 10,
                name: "",
            }
			);
			setListDepartment((prev) => [...prev, ...departments.data.listDepartment]);
			setCurrentPageFilter(currentPageFilter + 1);
			setTotalPageFilter(departments.data.totalPages);
		}
	};

    const handleFetchMoreListDepartment = () => {
		if (isOpenFilter) {
			fetchListDepartment();
		} else {
			setListDepartment([]);
			setName("");
			setCurrentPageFilter(1);
			setTotalPageFilter(1);
		}
	};

    useEffect(() => {
		handleFetchMoreListDepartment();
	}, [isOpenFilter]);

    useEffect(() => {
		setCurrentPageFilter(1);
		handleFetchMoreListDepartment();
	}, [name]);

    const handlePrevPage = () => {
		if (page > 1) {
			setPage((prev) => prev - 1);
		}
	};

    const handleNextPage = () => {
		if (page < pageQuantity) {
			setPage((prev) => prev + 1);
		}
	};

    const fetchRoomList =  async () =>{
        const rooms = await getListRoom({
            page: page,
            limit: limit,
            department: dataBody.department
        })
        console.log(rooms.data)
        setRoomList(rooms.data.listRoom)
        setPageQuantity(rooms.data.totalPages)
        setRoomQuantity(rooms.data.total)
    }

    useEffect(() =>{
        fetchRoomList();
    }, [limit, page, dataBody.department])

    const navigate = useNavigate();
    return(
        
        <div className="list-room">
            <Header title={"Danh sách phòng"}/>
            <div className="right__listPage">
                <div className="toolbar">
                    <button className="btn-base" onClick={() => navigate("/manager/room/create")}>
                        <span className="btn-icon">
                            <FontAwesomeIcon icon={faPlus} style={{height: '15px'}}/>
                        </span>
                        <span className="btn-title">
                            Tạo phòng mới
                        </span>
                    </button>
                </div>
                <div className="main_table">
                    <div className="main_table-scroller">
                        <div className="box-scroller">
                            <div className="group-scroller-btns">
                                <button className="btn-scroller active">Tất cả các phòng</button>
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
                                        placeholder="Tìm kiếm theo tên phòng" 
                                        type="text"
                                        name="search"
                                        id=""
                                        autoComplete="on" 
                                    />
                                    <fieldset className="input-field" />
                                </div>
                            </div>
                            <div className="btn-group group-filter-btns">
                                <button
									className="btn btn_base btn_filter"
                                    onClick={() => setIsOpenFilter(!isOpenFilter)} ref={filterBtnRef}
								>
									<span className="btn_label">
										Khu
										<span className="btn_icon">
											<FontAwesomeIcon icon={faCaretDown} style={{color:"#A3A8AF" }}/>
										</span>
									</span>
								</button>
                                { isOpenFilter && (
                                    <SelectFilter
                                        btnRef={filterBtnRef}
                                        closePopup={() => setIsOpenFilter(false)}
                                        listObject={listDepartment}
                                        currentPage={currentPageFilter}
                                        totalPage={totalPageFilter}
                                        keyword={name}
                                        handleChangeKeyword={(e) => {
											setName(e.target.value);
										}}
                                        loadMoreData={fetchMoreListDepartment}
                                        onSelectDepartment={selectDepartment}
                                    />
                                )}
                                <button className="btn btn_base btn_filter"
                                    onClick={() => setDataBody({
                                        keyword: null,
                                        created_date_from: null,
                                        created_date_to: null,
                                        department: null,
                                    })}
                                >
									<span className="btn_label">
										Xóa bộ lọc
									</span>
								</button>
                            </div>
                        </div>
                        { ((dataBody.created_date_from && dataBody.created_date_to) || dataBody.department )&&(
                            <div className="box-show-selected-filter">
                                <div className="box-show-selected-container">
                                    {dataBody.created_date_from && dataBody.created_date_to && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Ngày tạo: (<span>{dataBody.created_date_from}</span> -
                                                <span>{dataBody.created_date_to}</span>)
											</span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() =>
                                                        setDataBody((prev) => ({
                                                        ...prev,
                                                        created_date_from: null,
                                                        created_date_to: null,
                                                        }))
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
                                    {dataBody.department && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Khu: <span>{dataBody.department}</span> 
											</span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() =>
                                                        setDataBody((prev) => ({
                                                        ...prev,
                                                        department: null
                                                        }))
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
                                <col style={{width: "130px"}}></col>
                                <col style={{width: "130px"}}></col>
                                <col style={{width: "160px"}}></col>
                                <col style={{width: "160px"}}></col>
                                <col style={{width: "180px"}}></col>
                                <col style={{width: "200px"}}></col>
                            </colgroup>
                            <thead>
                                <tr className="group-table-headers">
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if(value){
                                            if (key === "created_at"){
                                                return (
													<th
														key={key}
														className="table-header-item"
													>
														<div className="box-sort-date">
															{col[key].name}
															<span className="box-icon">
																<FontAwesomeIcon icon={faCaretDown} />
															</span>
														</div>
													</th>
												);
                                            } 
                                            return (
                                                <th
													key={key}
													colSpan={1}
													rowSpan={1}
													className="table-header-item"
												>
													{col[key].name}
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
                                <col style={{width: "130px"}}></col>
                                <col style={{width: "130px"}}></col>
                                <col style={{width: "160px"}}></col>
                                <col style={{width: "160px"}}></col>
                                <col style={{width: "180px"}}></col>
                                <col style={{width: "200px"}}></col>
                            </colgroup>
                            <tbody>
                                {roomList.map((room, index) =>{
                                    return(
                                        <tr key={index} className="table-data-row">
                                            {Object.entries(colsToRender).map(([key,value]) =>{
                                                if(value){
                                                    if(key === "tinhtrang"){
                                                        if(room[key] === "Bình thường"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-green">
                                                                        {room[key]}
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
                                                                        {room[key]}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else if(key === "giatrangbi"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                            <p className="box-text">
                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(room[key])}
                                                            </p>
                                                        </td>
                                                        )
                                                    }
                                                    else if(key === "department"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                            <p className="box-text">
                                                                {room[key].name}
                                                            </p>
                                                        </td>
                                                        )
                                                    }
                                                    return(
                                                        <td
                                                            key={key}
                                                            colSpan={1}
													        rowSpan={1}
                                                            className="table-data-item"
                                                        >
                                                            <p className="box-text">
                                                                {key !== "name" ? (
                                                                room[key]
                                                                ) : (
                                                                <Link
                                                                    className="box-id"
                                                                >
                                                                    {room[key]}
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
                    <div className="display-title" style={{color: "#0F1824;"}}>
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
                            {page * limit > roomQuantity ? roomQuantity : page * limit} trên tổng{" "}
                            {roomQuantity}
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

export default withAuthorization(ListRooms, ["Quản lý"])
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";
import "./ListReport.css"
import { faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import SelectDatePopup from "../SelectDatePopup/SelectDatePopup";
import { Link } from "react-router-dom";
import { getListBill } from "../../service/ManagerAPI/BillAPI";
import { formatDate, formatDateWithHour } from "../../utils/DateUtils";
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup";
import { getListReport } from "../../service/ManagerAPI/ReportAPI";
import SelectFilter from "../SelectFilter/SelectFilter";
import { getListDepartment } from "../../service/ManagerAPI/DepartmentAPI";

const statusTab = [
    { key: "all", label: "Tất cả báo cáo", trangthai: null },
    { key: "completed", label: "Đã xử lý", trangthai: "Đã xử lý" },
    { key: "incompleted", label: "Chưa xử lý", trangthai: "Chưa xử lý" },
];

const colsToRender = {
    room: true,
    department: true,
    noidung: true,
    ghichu: true,
    ngaygui: true,
    trangthai: true,
};

const col = {
    room : {
      name: "Tên phòng",
    },
  
    department: {
      name: "Tên khu",
    },
    noidung: {
        name: "Nội dung",
    },
    ghichu: {
        name: "Ghi chú"
    },
    ngaygui: {
      name: "Ngày gửi hoá đơn",
    },
    trangthai: {
      name: "Trạng thái",
    }
}


const ListReport = () =>{


    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const filterBtnRef = useRef(null);
    const [name,setName] = useState("");
    const [listDepartment, setListDepartment] = useState([]);
    const [currentPageFilter, setCurrentPageFilter] = useState(1);
    const [totalPageFilter, setTotalPageFilter] = useState();
    const selectDepartment = (department) => {
        setFilterBody((prev) => ({
            ...prev,
            department: department._id
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
    const limitBtnRef = useRef(null);
    const [isOpenLimitPopup,setIsOpenLimitPopup] = useState(false);
    const [filterBody, setFilterBody] = useState({
        page: 1,
        limit: 10,
        trangthai: null,
        room: null,
        department:null,
        fromDate: null,
        toDate: null,
        sortOrder: -1
    })
    const [reportList, setReportList] = useState([]);

    const [reportQuantity, setreportQuantity] = useState();
    const [pageQuantity, setPageQuantity] = useState();
    const [tabActive, setTabActive] = useState("all");
    const handleTabClick = (key, trangthai) => {
        setTabActive(key);
        setFilterBody(prev => ({
            ...prev,
            trangthai: trangthai,
            overdue: false
        }));
    };

    const toggleSortOrder = () => {
        setFilterBody((prev) => ({
            ...prev,
            sortOrder: prev.sortOrder === -1 ? 1 : -1
        }));
    };
    

    const handleTabClick1 = (key,trangthai) => {
        setTabActive(key);
        setFilterBody(prev => ({
            ...prev,
            trangthai: trangthai,
            overdue: true
        }));
    };

    const handleNextPage = () => {
        setFilterBody((prevFilterBody) => {
            if (prevFilterBody.page < pageQuantity) {
                return { ...prevFilterBody, page: prevFilterBody.page + 1 };
            }
            return prevFilterBody;
        });
    };
    
    const handlePrevPage = () => {
        setFilterBody((prevFilterBody) => {
            if (prevFilterBody.page > 1) {
                return { ...prevFilterBody, page: prevFilterBody.page - 1 };
            }
            return prevFilterBody;
        });
    };
    const fetchListReport = async () =>{
        const reports = await getListReport(filterBody);
        setReportList(reports.data.listReport);
        setreportQuantity(reports.data.total);
        setPageQuantity(reports.data.totalPages);
    }
    useEffect(()=>{
        fetchListReport();
    }, [filterBody])
    return(
        <div className="list-report">
            <Header title={"Danh sách báo cáo"}/>
            <div className="right__listPage">
                <div className="toolbar">
                    <button className="btn-base">
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
                                        placeholder="Tìm kiếm theo tên phòng" 
                                        type="text"
                                        name="search"
                                        id=""
                                        autoComplete="on"
                                        onChange={(e) =>
											setFilterBody({ ...filterBody, room: e.target.value })
										}
                                    />
                                    <fieldset className="input-field" />
                                </div>
                            </div>
                            <div className="btn-group group-filter-btns">
                                <button className="btn btn_base btn_filter" onClick={() => setIsOpenFilter(!isOpenFilter)} ref={filterBtnRef}>
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
                                    onClick={() => setFilterBody({
                                        ...filterBody,
                                        department:null,
                                        fromDate: null,
                                        toDate: null
                                    })}
                                >
									<span className="btn_label">
										Xóa bộ lọc
									</span>
								</button>
                            </div>
                        </div>
                        {((filterBody.fromDate && filterBody.toDate) || filterBody.department) && (
                            <div className="box-show-selected-filter">
                                <div className="box-show-selected-container">
                                    {filterBody.fromDate && filterBody.toDate && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Ngày tạo: (<span>{filterBody.fromDate}</span> -
                                                <span>{filterBody.toDate}</span>)
                                            </span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() =>
                                                        setFilterBody((prev) => ({
                                                        ...prev,
                                                        fromDate: null,
                                                        toDate: null,
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
                                    {filterBody.department && (
                                        <div className="box-show-selected-item">
                                            <span>
                                                Khu: <span>{filterBody.department}</span> 
                                            </span>
                                            <div className="box-remove-item">
                                                <button
                                                    onClick={() =>
                                                        setFilterBody((prev) => ({
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
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "200px"}}></col>
                            </colgroup>
                            <thead>
                                <tr className="group-table-headers">
                                    {Object.entries(colsToRender).map(([key, value]) => {
                                        if(value){
                                            if (key === "ngaygui"){
                                                return (
													<th
														key={key}
														className="table-header-item"
                                                        onClick={toggleSortOrder}
													>
														<div className="box-sort-date">
															{col[key].name}
															<span className="box-icon" style={{ transform: filterBody.sortOrder === -1 ? 'rotate(0deg)' : 'rotate(180deg)' }}>
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
                                <col style={{width: "200px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "150px"}}></col>
                                <col style={{width: "200px"}}></col>
                            </colgroup>
                            <tbody>
                                {reportList.map((report, index) =>{
                                    return(
                                        <tr key={index} className="table-data-row">
                                            {Object.entries(colsToRender).map(([key,value]) =>{
                                                if(value){
                                                    if(key === "trangthai"){
                                                        if(report[key] === "Đã xử lý"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-green">
                                                                        {report[key]}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                        else if(report[key] === "Đang xử lý"){
                                                            return(
                                                                <td
                                                                    key={key}
                                                                    colSpan={1}
                                                                    rowSpan={1}
                                                                    className="table-data-item"
                                                                >
                                                                    <p className="box-blue">
                                                                        {report[key]}
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
                                                                        {report[key]}
                                                                    </p>
                                                                </td>
                                                            )
                                                        }
                                                    }
                                                    else if(key === "ngaygui"){
                                                        return(
                                                            <td
                                                                key={key}
                                                                colSpan={1}
                                                                rowSpan={1}
                                                                className="table-data-item"
                                                            >
                                                            <p className="box-text">
                                                                {formatDateWithHour(report?.createdAt)}
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
                                                                {report?.room?.department?.name}
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
                                                                {key !== "room" ? (
                                                                report[key]
                                                                ) : (
                                                                <Link
                                                                    to={`/manager/report/detailReport/${report._id}`}
                                                                    className="box-id"
                                                                >
                                                                    {report.room.name}
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
                            {filterBody.limit}
                            <span>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                        </button>
                        {isOpenLimitPopup && (
                            <LimitSelectPopup
                                btnRef={limitBtnRef}
                                closePopup={() => setIsOpenLimitPopup(false)}
                                limit={filterBody.limit}
                                handleChangeLimit={(limit) => {
                                    setFilterBody({
                                        ...filterBody,
                                        limit: limit,
                                        page: 1
                                    })
                                }}
                            />
						)}
                    </div>
                    <div className="title-1" style={{display: "flex", flexDirection: "row", gap: '5px'}}>
                        <div>Kết quả.</div>
                        <div className="item-quantity">
                            Từ {(filterBody.page - 1) * filterBody.limit + 1} đến{" "}
                            {filterBody.page * filterBody.limit > reportQuantity ? reportQuantity : filterBody.page * filterBody.limit} trên tổng{" "}
                            {reportQuantity}
                        </div>
                    </div>
                    <div className="prev">
                        <button
                            className={`btn_prev ${filterBody.page === 1 ? 'inactive' : ''}`}
                            onClick={handlePrevPage}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                    <div className="page">
                        {filterBody.page}
                    </div>
                    <div className="next">
                        <button
                            className={`btn_next ${filterBody.page === pageQuantity ? 'inactive' : ''}`}
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
export default ListReport;
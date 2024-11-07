/* eslint-disable no-unused-vars */
import { useState,useRef } from "react"
import { withAuthorization } from "../../hoc"
import Header from "../Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import "./AreaList.css"
import SelectDatePopup from "../SelectDatePopup/SelectDatePopup"
import { Link } from "react-router-dom"
import cn from "classnames"
import LimitSelectPopup from "../LimitSelectPopup/LimitSelectPopup"


const col = {
  id : {
    name: "Mã khu",
    width: "50px",
    align: "text-center"
  },

  name: {
    name: "Tên khu",
    width: "60px",
    align: "text-center"
  },
  room_count: {
    name: "Số lượng phòng",
    width: "120px",
    align: "text-center"
  },
  broken_room: {
    name: "Số lượng phòng hỏng",
    width: "120px",
    align: "text-center"
  },
  created_at: {
    name: "Ngày tạo",
    width: "100px",
    align: "text-center"
  },
  updated_at: {
    name: "Ngày cập nhật",
    width: "100px",
    align: "text-center"
  }

}

const colsToRender = {
  id: true,
  name: true,
  room_count: true,
  broken_room: true,
  created_at: true,
  updated_at: true
};
const areaList = [
  
]
const AreaList = () => {

  const [dataBody, setDataBody] = useState({
    keyword : null,
		created_date_from: null,
		created_date_to: null,
		updated_date_from: null,
		updated_date_to: null
	});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [areasQuantity, setAreasQuantity] = useState(20);
  const [pageQuantity, setPageQuantity] = useState(3);
  const [isOpenLimitPopup, setIsOpenLimitPopup] = useState(false);
  const headersRef = useRef(null);
	const contentRef = useRef(null);
  const limitBtnRef = useRef(null);

  const handleScroll = (e, target) => {
		target.scrollLeft = e.target.scrollLeft;
	};

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

  console.log(areaList)
  return (
    <div className="area-list">
      <Header title={"Khu ký túc xá"}/>
      <div className="right__listPage"> 
        <div className="toolbar">
          <button className="btn-base">
            <span className="btn-icon">
              <FontAwesomeIcon icon={faPlus} style={{height: '15px'}}/>
            </span>
            <span className="btn-title">
              Tạo khu mới
            </span>
          </button>
        </div>
        <div className="main_table">
          <div className="main_table-scroller">
            <div className="box-scroller">
              <div  className="group-scroller-btns">
                <button className="btn-scroller active">Tất cả các khu</button>
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
                    placeholder="Tìm kiếm theo mã khu, tên khu" 
                    type="text"
                    name="search"
                    id=""
                    autoComplete="on"
                    onChange={(e) =>
											setDataBody({ ...dataBody, keyword: e.target.value })
										}
                  />
                  <fieldset className="input-field" />
                </div>
              </div>
              <div className="btn-group group-filter-btns">
                <SelectDatePopup 
                  title={"Ngày tạo"}
                  setDataFilters={(data) =>
										setDataBody((prev) => {
											return {
												...prev,
												created_date_from: data.date_from,
												created_date_to: data.date_to,
											};
										})
									}
                />
                <SelectDatePopup 
                  title={"Ngày cập nhật"} 
                  setDataFilters={(data) =>
										setDataBody((prev) => {
											return {
												...prev,
												updated_date_from: data.date_from,
												updated_date_to: data.date_to,
											};
										})
									}
                />
                <button className="btn btn_base btn_filter"
                  onClick={() => setDataBody({
                    keyword: null,
                    created_date_from: null,
                    created_date_to: null,
                    updated_date_from: null,
                    updated_date_to: null
                  })}
                >
									<span className="btn_label">
										Xóa bộ lọc
									</span>
								</button>
              </div>
            </div>
            {( (dataBody.created_date_from && dataBody.created_date_to) || (dataBody.updated_date_from && dataBody.updated_date_to) )
              &&
              (
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
                    {dataBody.updated_date_from && dataBody.updated_date_to && (
                        <div className="box-show-selected-item">
                          <span>
													  Ngày cập nhật: (<span>{dataBody.updated_date_from}</span> -
													  <span>{dataBody.updated_date_to}</span>)
												  </span>
                          <div className="box-remove-item">
                            <button
                              onClick={() =>
                                setDataBody((prev) => ({
                                  ...prev,
                                  updated_date_from: null,
                                  updated_date_to: null,
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
              )
            }  
          </div>
          <div
            ref={headersRef}
            className="main_table-headers"
            onScroll={(e) => handleScroll(e, contentRef.current)}
          >
            <table className="box-table-headers">
              <colgroup>
                <col style={{width: "60px"}}/>
                <col style={{width: "80px"}}/>
                <col style={{width: "120px"}}/>
                <col style={{width: "120px"}}/>
                <col style={{width: "150px"}} />
                <col style={{width: "150px"}} />
              </colgroup>
              <thead>
                <tr className="group-table-headers">
                  {Object.entries(colsToRender).map(([key, value]) => {
										if (value) {
											if (key === "created_at" || key === "updated_at") {
												return (
													<th
														key={key}
														colSpan={1}
														rowSpan={1}
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
											);
										}
										return null;
									})}
                </tr>
              </thead>
            </table>
          </div>
          <div
            ref={contentRef}
            onScroll={(e) => handleScroll(e, headersRef.current)}
            className="table-data__container"
          >
            <table className="box-table-data">
              <colgroup>
                <col style={{width: "60px", alignItems: "center"}}/>
                <col style={{width: "80px", alignItems: "center"}}/>
                <col style={{width: "120px", alignItems: "center"}}/>
                <col style={{width: "120px", alignItems: "center"}}/>
                <col style={{width: "150px", alignItems: "center"}} />
                <col style={{width: "150px", alignItems: "center"}} />
              </colgroup>
              <tbody>
                {areaList.map((area,index) => {
                  return(
                    <tr key={index} className="table-data-row">
                      {Object.entries(colsToRender).map(([key, value]) => {
                        if (value) {
                            if (
                            key === "updated_at" ||
                            key === "created_at"
                          ) {
                            return (
                              <td
                                key={key}
                                colSpan={1}
													      rowSpan={1}
                                className="table-data-item"
                              >
                                <p className="box-text">
                                  {area[key]}
                                </p>
                              </td>
                            );
                          }
                          return (
                            <td
                              key={key}
                              colSpan={1}
													    rowSpan={1}
                              className="table-data-item"

                            >
                              <p className="box-text">
                                {key !== "name" ? (
                                  area[key]
                                ) : (
                                  <Link
                                    className="box-id"
                                  >
                                    {area[key]}
                                  </Link>
                                )}
                              </p>
                            </td>
                          );
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
              {(page - 1) * limit + areaList.length} trên tổng{" "}
              {areasQuantity}
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

export default withAuthorization(AreaList, ["Quản lý"])

/* eslint-disable no-unused-vars */

import { withAuthorization } from "../../hoc"
import Header from "../Header/Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faCaretDown, faChevronLeft, faChevronRight, faMagnifyingGlass, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import "./AreaList.css"
import SelectDatePopup from "../SelectDatePopup/SelectDatePopup"
const AreaList = () => {
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
                  />
                  <fieldset className="input-field" />
                </div>
              </div>
              <div className="btn-group group-filter-btns">
                <SelectDatePopup title={"Ngày tạo"}/>
                <SelectDatePopup title={"Ngày cập nhật"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuthorization(AreaList, ["Quản lý"])

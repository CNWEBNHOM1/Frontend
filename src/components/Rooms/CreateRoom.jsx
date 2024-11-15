import { Link, useNavigate } from "react-router-dom";
import "./CreateRoom.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import infoIcon from "../../assets/icons/InfoIcon";


const CreateRoom = () =>{
    const navigate = useNavigate();
    return(
        <>  
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/bill' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách phòng
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/room")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button 
                            className="btn-outline-primary-blue" 
                        >
                            <span className="btn__title">Tạo</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right_detail-room-page">
                <div className="box-info-room">
                    <div className="box-general-room">
                        <div className="info-header-room">
                            <div className="box-header-room">
                                <h4>Thông tin chung</h4>
                            </div>
                        </div>
                        <div className="info-content-room">
                            <div className="row-room">
                                <div className="box-room-name">
                                    <label htmlFor="name" className="form-label-room">
                                        Tên phòng
                                        <span
                                            id='name'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-department">
                                    <label htmlFor="department" className="form-label-room">
                                        Tên khu
                                        <span
                                            id='department'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-select-department">
                                        <button className="btn_select_department-room">
                                            Chọn khu
                                            <span className="btn_icon">
                                                <FontAwesomeIcon icon={faCaretDown} style={{color:"#A3A8AF" }}/>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row-room">
                                <div className="box-room-capacity">
                                    <label htmlFor="capacity" className="form-label-room">
                                        Số người tối đa
                                        <span
                                            id='capacity'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room">
                                        <input 
                                            name="capacity"
                                            id="capacity"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-gender">
                                    <label htmlFor="capacity" className="form-label-room">
                                        Phòng dành cho
                                        <span
                                            id='capacity'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="gender-choice">
                                        <label className="gender-option">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                id="gender-male"
                                            />
                                            Nam
                                        </label>
                                        <label className="gender-option">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                id="gender-female"
                                            />
                                            Nữ
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row-room">
                                <div className="box-room-sophongvs">
                                    <label htmlFor="sophongvs" className="form-label-room">
                                        Số phòng vệ sinh
                                        <span
                                            id='sophongvs'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room">
                                        <input 
                                            name="sophongvs"
                                            id="sophongvs"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-sodieuhoa">
                                    <label htmlFor="sodieuhoa" className="form-label-room">
                                        Số điều hoà
                                        <span
                                            id='capacity'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room">
                                        <input 
                                            name="sodieuhoa"
                                            id="sodieuhoa"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-detail-room">
                        <div className="info-header-room">
                            <div className="box-header-room">
                                <h4>Thông tin chi tiết</h4>
                            </div>
                        </div>
                        <div className="info-content-room">
                            <div className="row-room">
                                <div className="box-room-giatrangbi">
                                    <label htmlFor="giatrangbi" className="form-label-room">
                                        Giá trang bị
                                        <span
                                            id='giatrangbi'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="giatrangbi"
                                            id="giatrangbi"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-tieno">
                                    <label htmlFor="tieno" className="form-label-room">
                                        Tiền ở
                                        <span
                                            id='tieno'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="tieno"
                                            id="tieno"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-room">
                                <div className="box-room-tiennuoc">
                                    <label htmlFor="tiennuoc" className="form-label-room">
                                        Tiền nước
                                        <span
                                            id='tiennuoc'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="tiennuoc"
                                            id="tiennuoc"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-sodiencuoi">
                                    <label htmlFor="sodiencuoi" className="form-label-room">
                                        Số điện cuối
                                        <span
                                            id='sodiencuoi'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="sodiencuoi"
                                            id="sodiencuoi"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-room">
                                <div className="box-room-dongiadien">
                                    <label htmlFor="dongiadien" className="form-label-room">
                                        Đơn giá điện
                                        <span
                                            id='dongiadien'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="dongiadien"
                                            id="dongiadien"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div className="box-room-binhnuocnong">
                                    <label htmlFor="binhnuocnong" className="form-label-room">
                                        Số bình nước nóng
                                        <span
                                            id='binhnuocnong'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-room1">
                                        <input 
                                            name="binhnuocnong"
                                            id="binhnuocnong"
                                            type="number"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 
export default CreateRoom;
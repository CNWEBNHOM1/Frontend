/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import "./CreateRoom.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import infoIcon from "../../assets/icons/InfoIcon";
import { useEffect, useRef, useState } from "react";
import SelectFilter from "../SelectFilter/SelectFilter";
import { getListDepartment } from "../../service/ManagerAPI/DepartmentAPI";
import { notification} from 'antd';
import { createRoom } from "../../service/ManagerAPI/RoomAPI";


const CreateRoom = () =>{
    const navigate = useNavigate();
    const SelectDepartmentRef = useRef(null);
    const [isOpenSelectDepartment, setIsOpenSelectDepartment] = useState(false);
    const [currentPageFilter, setCurrentPageFilter] = useState(1);
    const [listDepartment, setListDepartment] = useState([]);
    const [totalPageFilter, setTotalPageFilter] = useState();
    const [name, setName] = useState("");
    const [dataCreateRoom, setDataCreateRoom ] = useState({
        name: null,
        department: null,
        gender: null,
        capacity: null,
        occupiedSlots: 0,
        giatrangbi: null,
        tieno: null,
        tiennuoc: null,
        dongiadien: null,
        sophongvs: null,
        binhnuocnong: null,
        tinhtrang: "Bình thường",
        dieuhoa: null
    })
    const [selectedDepartment, setSelectedDepartment] = useState(null);



    const selectDepartment = (department) => {
        setDataCreateRoom((prev) => ({
            ...prev,
            department: department._id
        }));
        setSelectedDepartment(department)
        // Đóng filter popup sau khi chọn
        setIsOpenSelectDepartment(false);
    };

    const closePopupSelectDepartment = () =>{
        setIsOpenSelectDepartment(false);
    }

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
		if (isOpenSelectDepartment) {
			fetchListDepartment();
		} else {
			setListDepartment([]);
			setName("");
			setCurrentPageFilter(1);
			setTotalPageFilter(1);
		}
	};

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const handleCreateRoom = async () => {
        const hasEmptyOrNullField = Object.values(dataCreateRoom).some(
            (value) => value === null || value === ""
        );
    
        if (hasEmptyOrNullField) {
            openNotificationWithIcon('error', "Thông tin không được để trống");
        } else {
            try {
                const newRoom = await createRoom(dataCreateRoom);
                if (newRoom.status === "success") {
                    openNotificationWithIcon('success', "Tạo phòng mới thành công");
                    setTimeout(() => {
                        navigate("/manager/room");
                    }, 800);
                } else {
                    openNotificationWithIcon('error', "Tạo phòng mới không thành công");
                }
            } catch (error) {
                if (error.response && error.response.status === 403 && error.response.data.error === "Room exist") {
                    openNotificationWithIcon('error', "Phòng đã tồn tại");
                } 
                
                else if(error.response && error.response.status === 405 && error.response.data.error === "Department is full"){
                    openNotificationWithIcon('error', "Khu này đã có tối đa số phòng");
                }
                else {
                    openNotificationWithIcon('error', "Có lỗi xảy ra trong quá trình thêm phòng mới");
                }
            }
        }
    };

    useEffect(() => {
		handleFetchMoreListDepartment();
	}, [isOpenSelectDepartment]);

    useEffect(() => {
		setCurrentPageFilter(1);
		handleFetchMoreListDepartment();
	}, [name]);

    console.log(dataCreateRoom)



    return(
        <>  
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/room' className='btn-back-of-an'>
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
                            onClick={handleCreateRoom}
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }))
                                            }
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
                                        <button className="btn_select_department-room" ref={SelectDepartmentRef} onClick={() =>setIsOpenSelectDepartment(!isOpenSelectDepartment)}>
                                            {dataCreateRoom.department ? selectedDepartment.name : "Chọn khu"}
                                            <span className="btn_icon">
                                                <FontAwesomeIcon icon={faCaretDown} style={{color:"#A3A8AF" }}/>
                                            </span>
                                        </button>
                                        {isOpenSelectDepartment && (
                                            <SelectFilter 
                                                btnRef={SelectDepartmentRef}
                                                closePopup={closePopupSelectDepartment}
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    capacity: parseInt(e.target.value),
                                                }))
                                            }
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
                                                value="Nam"
                                                id="gender-male"
                                                onChange={(e) =>
                                                    setDataCreateRoom((prev) => ({
                                                        ...prev,
                                                        gender: e.target.value, // Cập nhật giá trị của trường `gender`
                                                    }))
                                                }
                                                checked={dataCreateRoom.gender === 'Nam'} // Liên kết trạng thái với input
                                            />
                                            Nam
                                        </label>
                                        <label className="gender-option">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nữ"
                                                id="gender-female"
                                                onChange={(e) =>
                                                    setDataCreateRoom((prev) => ({
                                                        ...prev,
                                                        gender: e.target.value,
                                                    }))
                                                }
                                                checked={dataCreateRoom.gender === 'Nữ'}
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    sophongvs: parseInt(e.target.value),
                                                }))
                                            }
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    dieuhoa: parseInt(e.target.value),
                                                }))
                                            }
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    giatrangbi: parseInt(e.target.value),
                                                }))
                                            }
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    tieno: parseInt(e.target.value),
                                                }))
                                            }
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    tiennuoc: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                {/* <div className="box-room-sodiencuoi">
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    sodiencuoi: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div> */}
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    dongiadien: parseInt(e.target.value),
                                                }))
                                            }
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
                                            onChange={(e) =>
                                                setDataCreateRoom((prev) => ({
                                                    ...prev,
                                                    binhnuocnong: parseInt(e.target.value),
                                                }))
                                            }
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
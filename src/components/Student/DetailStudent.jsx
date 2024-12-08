import { Link, useNavigate, useParams } from "react-router-dom"
import "./DetailStudent.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import InfoIcon from "../../assets/icons/InfoIcon"
import { formatDate } from "../../utils/DateUtils"
import { useEffect, useState } from "react"
import { getDetailStudent, revomeStudent } from "../../service/ManagerAPI/StudentAPI"
import { notification} from 'antd';

const formatDate1 = (dateString) => {
    if (!dateString) {
        return ''; // Xử lý nếu không có giá trị
    }

    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
        return ''; // Trả về chuỗi rỗng nếu giá trị không hợp lệ
    }

    // Chuyển đổi sang định dạng yyyy-MM-dd cho input[type="date"]
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const DetailStudent = () =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };
    const {id} = useParams();
    const navigate = useNavigate();

    const [detailStudent, setDetailStudent] = useState();
    const fetchDetailStudent = async () =>{
        const res = await getDetailStudent(id);
        setDetailStudent(res.data);
    }

    const handleClickDelete = async () =>{
        try {
            const res = await revomeStudent(id);
            if (res.status === "success") {
                openNotificationWithIcon('success', "Xoá sinh viên thành công");
                setTimeout(() => {
                    navigate('/manager/people');
                }, 1000);
            } else {
                openNotificationWithIcon('error', "Lỗi khi xoá sinh viên");
            }
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Có lỗi xảy ra");
        }
    }

    useEffect(()=>{
        fetchDetailStudent();
    }, [])



    return(
        <>
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/people' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách thành viên
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/people")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                        { detailStudent?.trangthai !== "Dừng trước hạn" && 
                            <button 
                                className="btn-primary-red" 
                                onClick={handleClickDelete}
                            >
                            <span className="btn__title">Xoá</span>
                        </button> }
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo">
                    <div className="box-general-request">
                        <div className="info-header-request">
                            <div className="box-header-request">
                                <h4>Thông tin thành viên</h4>
                            </div>
                        </div>
                        <div className="info-content">
                            <div className="row-request">
                                <div className="box-request-name">
                                    <label htmlFor="room" className="form-label">
                                        Tên người đăng ký
                                        <span
                                            id='name'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={detailStudent?.name}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  name: e.target.value,
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-ngaysinh">
                                    <label htmlFor="ngaysinh" className="form-label">
                                        Ngày sinh
                                        <span
                                            id='name'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="ngaysinh"
                                            id="ngaysinh"
                                            type="date"
                                            value={formatDate1(detailStudent?.ngaysinh)}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  ngaysinh: e.target.value,
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-student-xa">
                                    <label htmlFor="xa" className="form-label">
                                        Xã/Phường/Thị trấn
                                        <span
                                            id='xa'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-vung">
                                        <input 
                                            name="xa"
                                            id="xa"
                                            type="text"
                                            value={detailStudent?.address?.xa}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  address: {
                                                    ...prev.address,
                                                    xa: e.target.value,
                                                  },
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-student-huyen">
                                    <label htmlFor="huyen" className="form-label">
                                        Quận/Huyện
                                        <span
                                            id='huyen'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-vung">
                                        <input 
                                            name="huyen"
                                            id="huyen"
                                            type="text"
                                            value={detailStudent?.address?.thanh}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  address: {
                                                    ...prev.address,
                                                    thanh: e.target.value,
                                                  },
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-student-tinh">
                                    <label htmlFor="tinh" className="form-label">
                                        Tỉnh/Thành phố
                                        <span
                                            id='tinh'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-vung">
                                        <input 
                                            name="tinh"
                                            id="tinh"
                                            type="text"
                                            value={detailStudent?.address?.tinh}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  address: {
                                                    ...prev.address,
                                                    tinh: e.target.value,
                                                  },
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-request-sdt">
                                    <label htmlFor="phone" className="form-label">
                                        Số điện thoại
                                        <span
                                            id='phone'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="phone"
                                            id="phone"
                                            type="text"
                                            value={detailStudent?.phone}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  phone: e.target.value,
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-cccd">
                                    <label htmlFor="sdt" className="form-label">
                                        Số CCCD
                                        <span
                                            id='cccd'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="cccd"
                                            id="cccd"
                                            type="text"
                                            value={detailStudent?.cccd}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  cccd: e.target.value,
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-request-gender">
                                    <label htmlFor="gender" className="form-label">
                                        Giới tính
                                        <span
                                            id='gender'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="gender"
                                            id="gender"
                                            type="gender"
                                            value={detailStudent?.gender}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-khoa">
                                    <label htmlFor="khoa" className="form-label">
                                        Khoá
                                        <span
                                            id='khoa'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="khoa"
                                            id="khoa"
                                            type="number"
                                            value={detailStudent?.khoa}
                                            onChange={(e) =>
                                                setDetailStudent((prev) => ({
                                                  ...prev,
                                                  khoa: parseInt(e.target.value),
                                                }))
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-request-school">
                                <label htmlFor="school" className="form-label">
                                    Viện / Trường
                                    <span
                                        id='school'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield">
                                    <input 
                                        name="school"
                                        id="school"
                                        type="text"
                                        value={detailStudent?.school}
                                        onChange={(e) =>
                                            setDetailStudent((prev) => ({
                                              ...prev,
                                              school: e.target.value,
                                            }))
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="box-request-class">
                                <label htmlFor="class" className="form-label">
                                    Lớp
                                    <span
                                        id='class'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield">
                                    <input 
                                        name="class"
                                        id="class"
                                        type="text"
                                        value={detailStudent?.lop}
                                        onChange={(e) =>
                                            setDetailStudent((prev) => ({
                                              ...prev,
                                              lop: e.target.value,
                                            }))
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-maininfo">
                    <div className="box-detail-request"> 
                        <div className="info-header-request">
                            <div className="box-header-request">
                                <h4>Thông tin chi tiết</h4>
                            </div>
                        </div>
                        <div className="info-content-student">
                            <div className="row-request">
                                <div className="box-request-room">
                                    <label htmlFor="room" className="form-label">
                                        Phòng đăng ký
                                        <span
                                            id='room'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1234">
                                        <input 
                                            name="room"
                                            id="room"
                                            type="text"
                                            value={`${detailStudent?.room?.department?.name} - ${detailStudent?.room?.name}`}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-room_gender">
                                    <label htmlFor="room_gender" className="form-label">
                                        Phòng dành cho
                                        <span
                                            id='room_gender'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1234">
                                        <input 
                                            name="room_gender"
                                            id="room_gender"
                                            type="text"
                                            value={detailStudent?.room?.gender}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-student-huyen">
                                    <label htmlFor="huyen" className="form-label">
                                        Trạng thái
                                        <span
                                            id='huyen'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-an">
                                        <input 
                                            name="huyen"
                                            id="huyen"
                                            type="text"
                                            value={detailStudent?.trangthai}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-student-huyen">
                                    <label htmlFor="huyen" className="form-label">
                                        Ngày đăng ký
                                        <span
                                            id='huyen'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-an">
                                        <input 
                                            name="huyen"
                                            id="huyen"
                                            type="text"
                                            value={formatDate(detailStudent?.createdAt)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-student-tinh">
                                    <label htmlFor="tinh" className="form-label">
                                        Ngày duyệt
                                        <span
                                            id='tinh'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfiel-an">
                                        <input 
                                            name="tinh"
                                            id="tinh"
                                            type="text"
                                            value={formatDate(detailStudent?.updatedAt)}
                                            disabled
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

export default DetailStudent
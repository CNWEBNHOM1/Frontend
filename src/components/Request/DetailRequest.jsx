/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router"
import "./DetailRequest.css"
import { getDetailRequet, handleDetailRequest } from "../../service/ManagerAPI/RequestAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InfoIcon from "../../assets/icons/InfoIcon";
import { formatDate, formatDateWithHour } from "../../utils/DateUtils";
import { formatCurrencyVND } from "../../utils/CurrencyUtils";

import { notification} from 'antd';

const DetailRequest = () =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const navigate = useNavigate();
    const {id} = useParams();
    const [detailRequest, setDetailRequest] = useState(null);

    const fetchDetailRequest = async () =>{
        const res = await getDetailRequet(id);
        setDetailRequest(res.data);
    }

    const hanldeRequest = async (action) =>{
        try {
            const res = await handleDetailRequest(id, action);
            console.log(res)
            if (res.status === "success") {
                openNotificationWithIcon('success', "Xử lý yêu cầu thành công");
                setTimeout(() => {
                    navigate('/manager/request');
                }, 1000);
            } else {
                openNotificationWithIcon('error', "Có lỗi xảy ra");
            }
        } catch (error) {
            openNotificationWithIcon('error', "Lỗi khi xử lý yêu cầu");
        }
    }
    useEffect(()=>{
        fetchDetailRequest()
    }, [])
    
    return(
        <>
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/request' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách yêu cầu
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/request")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button className="btn-primary-red" 
                            disabled={detailRequest?.trangthai !== "pending"}
                            onClick={() => {
                                const action = "declined";
                                hanldeRequest(action);
                            }}
                        >
                            <span className="btn__title">Từ chối</span>
                        </button>
                        <button 
                            className="btn-primary"
                            disabled={detailRequest?.trangthai !== "pending"}
                            onClick={() => {
                                const action = "approved";
                                hanldeRequest(action);
                            }}
                        >
                            <span className="btn__title">Chấp nhận</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo">
                    <div className="box-general-request">
                        <div className="info-header-request">
                            <div className="box-header-request">
                                <h4>Thông tin người đăng ký</h4>
                            </div>
                        </div>
                        <div className="info-content-request">
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
                                            value={detailRequest?.name}
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
                                            type="text"
                                            value={formatDate(detailRequest?.ngaysinh)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-request-sdt">
                                    <label htmlFor="sdt" className="form-label">
                                        Số điện thoại
                                        <span
                                            id='sdt'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="sdt"
                                            id="sdt"
                                            type="text"
                                            value={detailRequest?.phone}
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
                                            value={detailRequest?.cccd}
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
                                            value={detailRequest?.gender}
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
                                            type="text"
                                            value={detailRequest?.khoa}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-request-diachi">
                                <label htmlFor="diachi" className="form-label">
                                    Địa chỉ
                                    <span
                                        id='diachi'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield">
                                    <input 
                                        name="diachi"
                                        id="diachi"
                                        type="text"
                                        value={`${detailRequest?.address?.xa} - ${detailRequest?.address?.thanh} - ${detailRequest?.address?.tinh}`}
                                        disabled
                                    />
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
                                        value={detailRequest?.school}
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
                                        value={detailRequest?.lop}
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
                                <h4>Thông tin phiếu</h4>
                            </div>
                        </div>
                        <div className="info-content-request">
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
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="room"
                                            id="room"
                                            type="text"
                                            value={`${detailRequest?.room?.department?.name} - ${detailRequest?.room?.name}`}
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
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="room_gender"
                                            id="room_gender"
                                            type="text"
                                            value={detailRequest?.room?.gender}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-request-trangthai">
                                    <label htmlFor="room" className="form-label">
                                        Trạng thái đăng ký
                                        <span
                                            id='trangthai'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="trangthai"
                                            id="trangthai"
                                            type="text"
                                            value={detailRequest?.trangthai === "approved" ? "Thành công" : detailRequest?.trangthai === "pending" ? "Đã thanh toán" : "Đã từ chối"}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-sotien">
                                    <label htmlFor="room" className="form-label">
                                        Số tiền phải trả
                                        <span
                                            id='trangthai'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="trangthai"
                                            id="trangthai"
                                            type="text"
                                            value={formatCurrencyVND(detailRequest?.sotienphaitra)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-request">
                                <div className="box-request-ngaygui">
                                    <label htmlFor="ngaygui" className="form-label">
                                        Ngày gửi yêu cầu
                                        <span
                                            id='ngaygui'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="ngaygui"
                                            id="ngaygui"
                                            type="text"
                                            value={formatDateWithHour(detailRequest?.createdAt)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-request-ngaypheduyet">
                                    <label htmlFor="ngaypheduyet" className="form-label">
                                        Ngày phê duyệt yêu cầu
                                        <span
                                            id='ngaypheduyet'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-request1">
                                        <input 
                                            name="ngaypheduyet"
                                            id="ngaypheduyet"
                                            type="text"
                                            value={detailRequest?.trangthai === "approved" ? formatDateWithHour(detailRequest?.updatedAt) : null}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-request-anhminhchung">
                                <label htmlFor="anhminhchung" className="form-label">
                                    Ảnh minh chứng
                                    <span
                                        id='anhminhchung'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-image-request">
                                    <img 
                                        src={`http://localhost:5000/${detailRequest?.minhchung}`}
                                        alt=""
                                    />
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailRequest
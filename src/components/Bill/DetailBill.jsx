/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router";
import { getDetailBill, handleBill, sendBill, updateDetailBill } from "../../service/ManagerAPI/BillAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {UncontrolledTooltip } from 'reactstrap'
import infoIcon from "../../assets/icons/InfoIcon";
import "./DetailBill.css"
import logoSoict from "../../assets/logo-soict.png";
import NotPayment from "../../assets/chuachuyenkhoan.jpg"
import { formatDate, formatDateWithHour } from "../../utils/DateUtils";
import { notification} from 'antd';
import { saveAs } from "file-saver";
import API_CONFIG from "../../config/ApiConfig";
import axios from "axios";


function extractMonth(dateStr) {
    const date = new Date(dateStr); // Chuyển chuỗi thành đối tượng Date

    if (!isNaN(date)) { // Kiểm tra xem ngày có hợp lệ không
        const month = date.getMonth() + 1; // getMonth() trả về tháng từ 0-11, nên cần +1
        return month;
    } else {
        return "Invalid date format"; // Trả về thông báo nếu ngày không hợp lệ
    }
}
const DetailBill = () =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const {_id} = useParams();

    const [billDetail, setBillDetail] = useState({}); 
    const [isRender, setIsRender] = useState(false);
    
    const fetchDetailBill = async () =>{
        const detailBill = await getDetailBill(_id);
        setBillDetail(detailBill.data);
    }

    const handleClickUpdate = async () =>{
        const action = "Đã đóng"
        const updateBill = await handleBill(_id, action);
        if(updateBill.data){
            openNotificationWithIcon("success", "Xác nhận hoá đơn thành công")
            setTimeout(() => {
                navigate('/manager/bill');
            }, 1000);
        }
        else{
            openNotificationWithIcon("error", "Có lỗi xảy ra")
        }
    }

    const handleClickSendBill = async() =>{
        const res = await sendBill(_id);
        if(res.message === "Bills sent successfully"){
            openNotificationWithIcon("success", "Gửi hoá đơn thành công")
        }
        else{
            openNotificationWithIcon("error", "Gửi hoá đơn thất bại")
        }
    }

    useEffect(() =>{
        fetchDetailBill();
    }, [])
    const navigate = useNavigate();

    const exportBillToPDF = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios({
                url: `${API_CONFIG.API_BASE_URL}/user/exportBills`,
                method: 'POST',
                responseType: 'blob', // Nhận file PDF
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                data: {
                    billId: _id
                },
            });
            const fileName = `${billDetail.room.department.name}_${billDetail.room.name}_${Date.now()}_Invoice.pdf`;
    
            // Tạo file PDF
            const file = new Blob([response.data], { type: 'application/pdf' });
            saveAs(file, fileName);
    
        } catch (error) {
            console.error('Lỗi gì đó: ', error);
            alert("Lỗi khi xuất file PDF");
        }
    };
    return(
        <>
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/bill' className='btn-back-of-an'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách hoá đơn
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/bill")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button 
                            className="btn-outline-primary-print" 
                            onClick={exportBillToPDF}
                        >
                            <span className="btn__title">In hoá đơn</span>
                        </button>
                        {   billDetail.trangthai === "Chờ xác nhận" &&
                            <button 
                            className="btn-primary" 
                            onClick={handleClickUpdate}
                            >
                        
                            <span className="btn__title">Xác nhận</span>
                            </button>
                        }
                        {   billDetail.trangthai === "Chưa đóng" &&
                            <button 
                                className="btn-primary-green" 
                                onClick={handleClickSendBill}
                            >
                            <span className="btn__title">Gửi hoá đơn</span>
                            </button> 
                        }
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo">
                    <div className="box-general">
                        <div className="info-header">
                            <div className="box-header">
                                <h4>Thông tin chung</h4>
                            </div>
                        </div>
                        <div className="info-content">
                            <div className="box-bill-name">
                                <div className="form-item">
                                    <label htmlFor="due" className="form-label">
                                        Tên hoá đơn
                                        <span
                                            id='nameCaption'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={`Hoá đơn tháng ${extractMonth(billDetail.handong)}`}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-bill-due">
                                <div className="form-item">
                                    <label htmlFor="due" className="form-label">
                                        Hạn đóng
                                        <span
                                            id='due'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={formatDate(billDetail.handong)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-bill">
                                <div className="box-bill-sodiendau">
                                    <label htmlFor="sodiendau" className="form-label">
                                        Số điện đầu
                                        <span
                                            id='sodiendau'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="sodiendau"
                                            id="sodiendau"
                                            type="number"
                                            min="1"
                                            value={billDetail.sodiendau}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-bill-sodiencuoi">
                                    <label htmlFor="sodiencuoi" className="form-label">
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
                                    <div className="form-textfield1">
                                        <input 
                                            name="sodiencuoi"
                                            id="sodiencuoi"
                                            type="number"
                                            min="1"
                                            value={billDetail.sodiencuoi}
                                            onChange={(e) => setBillDetail({
                                                ...billDetail,
                                                sodiencuoi: parseInt(e.target.value) 
                                            })}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-bill">
                                <div className="box-bill-dongia">
                                    <label htmlFor="dongia" className="form-label">
                                        Đơn giá
                                        <span
                                            id='dongia'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="dongia"
                                            id="dongia"
                                            type="number"
                                            min="1"
                                            value={billDetail.room?.dongiadien || ''}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-bill-thanhtien">
                                    <label htmlFor="thanhtien" className="form-label">
                                        Thành tiền
                                        <span
                                            id='thanhtien'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="thanhtien"
                                            id="thanhtien"
                                            type="number"
                                            min="1"
                                            value={(billDetail.sodiencuoi - billDetail.sodiendau) * (billDetail.room?.dongiadien || 0)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-maininfo">
                    <div className="box-detail">
                        <div className="info-header">
                            <div className="box-header">
                                <h4>Thông tin chi tiết</h4>
                            </div>
                        </div>
                        <div className="info-content">
                            <div className="row-bill">
                                <div className="box-bill-department">
                                    <label htmlFor="department" className="form-label">
                                        Khu
                                        <span
                                            id='department'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield2">
                                        <input 
                                            name="department"
                                            id="department"
                                            type="text"
                                            value={billDetail.room?.department.name}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-bill-department">
                                    <label htmlFor="thanhtien" className="form-label">
                                        Phòng
                                        <span
                                            id='room'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield2">
                                        <input 
                                            name="room"
                                            id="room"
                                            type="text"
                                            value={billDetail.room?.name}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-bill">
                                <div className="box-bill-name">
                                    <div className="form-item">
                                        <label htmlFor="trangthai" className="form-label">
                                            Trạng thái
                                            <span
                                                id='nameCaption'
                                                className="caption-icon"
                                                style={{color: "#4d53e0"}}
                                            >
                                                {infoIcon}
                                            </span>
                                            <span className="asterisk-icon">*</span>
                                        </label>
                                        <div className="form-textfield2">
                                            <input 
                                                name="trangthai"
                                                id="trangthai"
                                                type="text"
                                                value={billDetail.trangthai}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="box-bill-name">
                                    <div className="form-item">
                                        <label htmlFor="trangthai" className="form-label">
                                            Ngày xác nhận
                                            <span
                                                id='nameCaption'
                                                className="caption-icon"
                                                style={{color: "#4d53e0"}}
                                            >
                                                {infoIcon}
                                            </span>
                                            <span className="asterisk-icon">*</span>
                                        </label>
                                        {
                                            billDetail?.trangthai === "Đã đóng" ? 
                                            (
                                                <div className="form-textfield2">
                                                    <input 
                                                        name="trangthai"
                                                        id="trangthai"
                                                        type="text"
                                                        value={formatDateWithHour(billDetail?.updatedAt)}
                                                        disabled
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="form-textfield2">
                                                    <input 
                                                        name="trangthai"
                                                        id="trangthai"
                                                        type="text"
                                                        disabled
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-image">
                        <div className="info-header">
                            <div className="box-header">
                                <h4>Ảnh minh chứng</h4>
                            </div>
                        </div>
                        <div className="info-content-1-of-fix">
                            <div className="box-bill-image">
                                {billDetail.anhminhchung ? (
                                    <img src={`${billDetail.anhminhchung}`} alt="Ảnh minh chứng" />
                                ) : (
                                    <img src={NotPayment} alt="Không có ảnh minh chứng" />
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailBill;
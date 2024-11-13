/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router";
import { getDetailBill, updateDetailBill } from "../../service/ManagerAPI/BillAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {UncontrolledTooltip } from 'reactstrap'
import infoIcon from "../../assets/icons/InfoIcon";
import "./DetailBill.css"
import logoSoict from "../../assets/logo-soict.png";
import NotPayment from "../../assets/chuachuyenkhoan.jpg"
import { formatDate } from "../../utils/DateUtils";
import { notification} from 'antd';


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


    const handleClickUpdate = async() =>{

        if(billDetail.sodiencuoi > billDetail.sodiendau){
            const updateBill = await updateDetailBill(_id, billDetail);
            console.log(updateBill);
            if(updateBill.status === "success"){
                openNotificationWithIcon('success', "Cập nhật hoá đơn thành cônng");
            }
            else{
                openNotificationWithIcon('error', "Cập nhật hoá đơn thất bại");
            }
            setIsRender(!isRender)
        }
        else{
            openNotificationWithIcon('error', "Lỗi số điện cuối");
        }
    }

    useEffect(() =>{
        fetchDetailBill();
    }, [isRender])

    console.log(billDetail.trangthai)
    const navigate = useNavigate();
    return(
        <>
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/bill' className='btn-back'>
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
                        <button className="btn-outline-primary-blue"  onClick={handleClickUpdate}>
                            <span className="btn__title">Cập nhật</span>
                        </button>
                        <button 
                            className="btn-primary" 
                            disabled={billDetail.trangthai !== "Chờ xác nhận"}
                        >
                            <span className="btn__title">Xác nhận</span>
                        </button>
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
                                            value = {billDetail.dongia}
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
                                            value={(billDetail.sodiencuoi - billDetail.sodiendau) * billDetail.dongia}
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
                                            value={billDetail.department}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-bill-room">
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
                                            value={billDetail.room}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
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
                                    <div className="form-textfield">
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
                        </div>
                    </div>
                    <div className="box-image">
                        <div className="info-header">
                            <div className="box-header">
                                <h4>Ảnh minh chứng</h4>
                            </div>
                        </div>
                        <div className="info-content">
                            <div className="box-bill-image">
                                {billDetail.anhminhchung ? (
                                    <img src={`http://localhost:5000/${billDetail.anhminhchung}`} alt="Ảnh minh chứng" />
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
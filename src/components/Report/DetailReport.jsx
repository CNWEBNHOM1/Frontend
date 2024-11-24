/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./DetailReport.css"
import { useNavigate, useParams } from "react-router";
import { getDetailReport, handleReport } from "../../service/ManagerAPI/ReportAPI";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InfoIcon from "../../assets/icons/InfoIcon";
import { formatDateWithHour } from "../../utils/DateUtils";
import { notification} from 'antd';

const DetailReport= () =>{


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };
    const navigate = useNavigate();
    const {_id} = useParams();


    const [detailReport, setDetailReport] = useState(null);
    const [ghichu, setGhichu] = useState("");

    const fetchDetailReport = async () =>{
        const res = await getDetailReport(_id);
        setDetailReport(res.data);
    }

    const handleUpdateReport = async () => {
        if (!ghichu || ghichu.trim() === "") { // Kiểm tra cả chuỗi rỗng và khoảng trắng
            openNotificationWithIcon('error', "Nội dung không được để trống");
            return; // Thoát khỏi hàm nếu ghichu không hợp lệ
        }
    
        const action = "Đã xử lý";
        try {
            const res = await handleReport({ ghichu: ghichu }, _id, action);
            if (res.data) {
                openNotificationWithIcon('success', "Xử lý hoá đơn thành công");
                setTimeout(() => {
                    navigate('/manager/report');
                }, 1000); // Chờ 2 giây
            } else {
                openNotificationWithIcon('error', "Có lỗi xảy ra");
            }
        } catch (error) {
            openNotificationWithIcon('error', "Lỗi khi xử lý yêu cầu");
        }
    };
    


    useEffect(()=>{
        fetchDetailReport();
    }, [])

    return (
        <>
            {contextHolder}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/report' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách báo cáo
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/report")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                        <button 
                            className="btn-primary" 
                            disabled={detailReport?.trangthai !== "Chưa xử lý"}
                            onClick={handleUpdateReport}
                        >
                            <span className="btn__title">Cập nhật</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo">
                    <div className="box-general-report">
                        <div className="info-header-report">
                            <div className="box-header-report">
                                <h4>Thông tin chung</h4>
                            </div>
                        </div>
                        <div className="info-content-report">
                            <div className="row-report">
                                <div className="box-report-room">
                                    <label htmlFor="room" className="form-label">
                                        Tên phòng
                                        <span
                                            id='room'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="room"
                                            id="room"
                                            type="text"
                                            value={`${detailReport?.room?.department?.name} - ${detailReport?.room?.name}`}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-report-trangthai">
                                    <label htmlFor="trangthai" className="form-label">
                                        Trạng thái
                                        <span
                                            id='trangthai'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="trangthai"
                                            id="trangthai"
                                            type="text"
                                            value={detailReport?.trangthai}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-report">
                                <div className="box-report-ngaygui">
                                    <label htmlFor="room" className="form-label">
                                        Ngày gửi
                                        <span
                                            id='ngaygui'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield1">
                                        <input 
                                            name="ngaygui"
                                            id="ngaygui"
                                            type="text"
                                            value={formatDateWithHour(detailReport?.createdAt)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="box-report-ngaygui">
                                    <label htmlFor="room" className="form-label">
                                        Ngày xử lý
                                        <span
                                            id='ngayxuly'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    {
                                        detailReport?.trangthai === "Chưa xử lý" ? 
                                        (
                                            <div className="form-textfield1">
                                                <input 
                                                    name="ngayxuly"
                                                    id="ngayxuly"
                                                    type="text"
                                                    disabled
                                                />
                                            </div>
                                        ) : detailReport?.trangthai ? 
                                        (
                                            <div className="form-textfield1">
                                                <input 
                                                    name="ngayxuly"
                                                    id="ngayxuly"
                                                    type="text"
                                                    value={formatDateWithHour(detailReport?.updatedAt)}
                                                    disabled
                                                />
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className="box-report-noidung">
                                <label htmlFor="noidung" className="form-label">
                                    Nội dung báo cáo
                                    <span
                                        id='noidung'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textarea-report">
                                    <textarea 
                                        name="noidung"
                                        id="noidung"
                                        type="text"
                                        value={detailReport?.noidung}
                                        disabled
                                    />
                                </div>
                            </div>
                            {
                            detailReport?.trangthai === "Đã xử lý" ? 
                            
                            (<div className="box-report-ghichu">
                                <label htmlFor="noidung" className="form-label">
                                    Nội dung xử lý
                                    <span
                                        id='ghichu'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textarea-report">
                                    <textarea 
                                        name="ghichu"
                                        id="ghichu"
                                        type="text"
                                        value={detailReport?.ghichu}
                                        disabled
                                    />
                                </div>
                            </div>)
                            :
                            (<div className="box-report-ghichu">
                                <label htmlFor="noidung" className="form-label">
                                    Nội dung xử lý
                                    <span
                                        id='ghichu'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textarea-report">
                                    <textarea 
                                        name="ghichu"
                                        id="ghichu"
                                        type="text"
                                        onChange={(e) => setGhichu(e.target.value)}
                                    />
                                </div>
                            </div>)
                            } 
                        </div>
                    </div>
                </div>
                <div className="box-maininfo">
                    <div className="box-detail-report">
                        <div className="info-header-report">
                            <div className="box-header-report">
                                <h4>Thông tin chi tiết</h4>
                            </div>
                        </div>
                        <div className="info-content-report">
                            <div className="box-report-ghichu">
                                <label htmlFor="noidung" className="form-label">
                                    Ảnh minh chứng
                                    <span
                                        id='ghichu'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-image-report">
                                    <img 
                                        src={`http://localhost:5000/${detailReport?.minhchung}`}
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

export default DetailReport;
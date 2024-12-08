import { Link, useNavigate, useParams } from "react-router-dom";
import "./DetailDepartment.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getDetailDepartment } from "../../service/ManagerAPI/DepartmentAPI";
import InfoIcon from "../../assets/icons/InfoIcon";
import { formatDateWithHour } from "../../utils/DateUtils";
import bannerDepartment from "../../assets/banner-detail-department.png"

const DetailDepartment = () =>{

    const navigate = useNavigate();
    const {id} = useParams();
    const [detailDepartment, setDetailDepartment] = useState();

    const fetchDetailDepartment = async () =>{
        const res = await getDetailDepartment(id)
        setDetailDepartment(res.data);
    }

    useEffect(() => {
        fetchDetailDepartment();
    }, [])

    console.log(detailDepartment)

    return(
        <>
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/department' className='btn-back'>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <h4 className="btn-back__title">
                                Quay lại danh sách khu ký túc
                            </h4>
                        </Link>
                    </div>
                    <div className="btn-toolbar">
                        <button className="btn-outline-primary-red" onClick={() => navigate("/manager/department")}>
                            <span className="btn__title">Thoát</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo-department">
                    <div className="box-general-department">
                        <div className="info-header-department">
                            <div className="box-header-department">
                                <h4>Thông tin khu ký túc</h4>
                            </div>
                        </div>
                        <div className="info-content-department">
                            <div className="box-department-name">
                                <label htmlFor="name" className="form-label-department">
                                    Tên khu ký túc xá
                                    <span
                                        id='name'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-detail-department-an">
                                    <input 
                                        name="name"
                                        id="name"
                                        type="text"
                                        value={detailDepartment?.name}
                                        onChange={(e) =>
                                            setDetailDepartment((prev) => ({
                                              ...prev,
                                              name: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="box-department-room_count">
                                <label htmlFor="room_count" className="form-label-department">
                                    Tổng số phòng
                                    <span
                                        id='room_count'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-detail-department-an">
                                    <input 
                                        name="room_count"
                                        id="room_count"
                                        type="number"
                                        min={"0"}
                                        value={detailDepartment?.room_count}
                                        onChange={(e) =>
                                            setDetailDepartment((prev) => ({
                                              ...prev,
                                              room_count: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="box-department-broken_room">
                                <label htmlFor="broken_room" className="form-label-department">
                                    Số phòng hỏng
                                    <span
                                        id='broken_room'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-detail-department-an">
                                    <input 
                                        name="broken_room"
                                        id="broken_room"
                                        type="number"
                                        value={detailDepartment?.broken_room}
                                        min={"0"}
                                        onChange={(e) =>
                                            setDetailDepartment((prev) => ({
                                              ...prev,
                                              broken_room: parseInt(e.target.value),
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <div className="box-department-ngaytao">
                                <label htmlFor="broken_room" className="form-label-department">
                                    Ngày tạo
                                    <span
                                        id='broken_room'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {InfoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-detail-department-an">
                                    <input 
                                        name="broken_room"
                                        id="broken_room"
                                        type="text"
                                        value={formatDateWithHour(detailDepartment?.createdAt)}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-banner-department">
                    <img src={bannerDepartment} alt="" />
                </div>
            </div>
        </>
    )
}
export default DetailDepartment
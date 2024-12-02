/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router";
import "./DetailRoom.css"
import { getDetailRoom, updateDetailRoom } from "../../service/ManagerAPI/RoomAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InfoIcon from "../../assets/icons/InfoIcon";
import SyncIcon from '@mui/icons-material/Sync';
import { getListStudent, kickAllStudentOfRoom, kickStudentOfRoom } from "../../service/ManagerAPI/StudentAPI";
import { notification} from 'antd';
import { Button, Modal, Space } from 'antd';
import TransferRoom from "./TransferRoom";
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const DetailRoom = () =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const navigate = useNavigate();
    const {id} = useParams();
    const [detailRoom, setDetailRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fetchDetailRoom = async () =>{
        try{
            const res = await getDetailRoom(id);
            setDetailRoom(res.data);
        }
        catch(error){
            console.error("Error fetching data:", error);
        }
        finally{
            setTimeout(() => setIsLoading(false), 200);
        }
    }
    const [limit, setLimit] = useState(5);
    const [name, setName] = useState("");
    const [listStudent, setListStudent] = useState(null);
    const [studentQuantity,setStudentQuantity] = useState(null);
    const [pageQuantity,setPageQuantity] = useState(null);
    const [page, setPage] = useState(1);
    const [render, setRender] = useState(false);

    const [isTransfer, setIsTransfer] = useState(false)

    const fetchListStudent = async () =>{
        const students = await getListStudent({page: page, limit: limit, name: name, room: id, trangthai: null});
        setListStudent(students.data)
        setStudentQuantity(students.totalStudents)
        setPageQuantity(students.totalPages)
    }

    const handleClickKickStudent = async(email) =>{
        try {
            const res = await kickStudentOfRoom({email: email});
            if (res.status === "success") {
                openNotificationWithIcon('success', "Xoá thành viên khỏi phòng thành công");
            } else {
                openNotificationWithIcon('error', "Có lỗi xảy ra");
            }
            setRender(!render);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Lỗi khi xoá thành viên khỏi phòng");
        }
    }

    const handleClickKickAllStudent = async() =>{
        try {
            const res = await kickAllStudentOfRoom();
            if (res.message === "All students have been kicked from their rooms") {
                openNotificationWithIcon('success', "Xoá tất cả thành viên khỏi phòng thành công");
            } else {
                openNotificationWithIcon('error', "Xoá không thành công");
            }
            setRender(!render);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Lỗi khi xoá");
        }
    }


    const handleDeleteAll = () =>{
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn xoá tất cả thành viên?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleClickKickAllStudent();
            },
            onCancel: () => {},
        });
    }

    const [selectPeople, setSelectPeople] = useState(null)

    const handleClickTransfer = (people) =>{
        setSelectPeople(people);
        setIsTransfer(true);
    }

    const handleDelete = (email) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn xoá thành viên này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleClickKickStudent(email);
            },
            onCancel: () => {},
        });
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

    const handleUpdateRoom = async () =>{
        try {
            const res = await updateDetailRoom(id,detailRoom);
            if (res.status === "success") {
                openNotificationWithIcon('success', "Cập nhật thông tin phòng thành công");
            } else {
                openNotificationWithIcon('error', "Cập nhật thông tin phòng thất bại");
            }
            setRender(!render);
        } catch (error) {
            console.log(error);
            openNotificationWithIcon('error', "Lỗi khi cập nhật");
        }
    }

    const OnUpdate = () =>{
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn xoá tất cả thành viên?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleUpdateRoom();
            },
            onCancel: () => {},
        });
    }

    const closePopup = () =>{
        setIsTransfer(false);
    }


    useEffect(() =>{
        fetchDetailRoom();
    }, [isTransfer])
    
    useEffect(()=>{
        fetchListStudent();
    }, [page, limit, name, render, isTransfer])

    useEffect(() => {
        if (isTransfer) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        // Clean-up khi component bị hủy bỏ
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isTransfer]);

    if (isLoading) {
        return (
            <Flex align="center" gap="middle" className="loading">
            <Spin
                indicator={
                <LoadingOutlined
                    style={{
                    fontSize: 60,
                    }}
                    spin
                />
                }
            />
            </Flex>
        );
    }

    return(
        <>
            {contextHolder}
            {isTransfer && (
                <>
                    <div className="overlay"></div>
                    <TransferRoom close = {closePopup} detailRoom = {detailRoom} people = {selectPeople}/>
                </>
            )}
            <div className="right__navbar">
                <div className="box-navbar">
                    <div className="btn-toolbar">
                        <Link to='/manager/room' className='btn-back'>
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
                            className="btn-primary"
                            onClick={OnUpdate}
                        >
                            <span className="btn__title">Cập nhật</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="right__DetailPage">
                <div className="box-maininfo">
                    <div className="box-general-detail-room">
                        <div className="info-header-detail-room">
                            <div className="box-header-detail-room">
                                <h4>Thông tin chung</h4>
                            </div>
                        </div>
                        <div className="info-content-detail-room">
                            <div className="row-detail-room">
                                <div className="box-detail-room-name">
                                    <label htmlFor="room" className="form-label">
                                        Tên phòng
                                        <span
                                            id='name'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={detailRoom?.name}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  name: e.target.value,
                                                }))
                                            }

                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-department">
                                    <label htmlFor="room" className="form-label">
                                        Tên khu
                                        <span
                                            id='name'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="name"
                                            id="name"
                                            type="text"
                                            value={detailRoom?.department?.name}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-detail-room">
                                <div className="box-detail-room-gender">
                                    <label htmlFor="gender" className="form-label">
                                        Phòng dành cho
                                        <span
                                            id='gender'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <select 
                                            id="gender" 
                                            required
                                            value={detailRoom?.gender}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  gender: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="box-detail-room-tinhtrang">
                                    <label htmlFor="tinhtrang" className="form-label">
                                        Tình trạng
                                        <span
                                            id='tinhtrang'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <select 
                                            id="tinhtrang" 
                                            required
                                            value={detailRoom?.tinhtrang}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  tinhtrang: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="Bình thường">Bình thường</option>
                                            <option value="Bị hỏng">Bị hỏng</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row-detail-room">
                                <div className="box-detail-room-capacity">
                                    <label htmlFor="capacity" className="form-label">
                                        Sức chứa
                                        <span
                                            id='capacity'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="capacity"
                                            id="capacity"
                                            type="number"
                                            value={detailRoom?.capacity}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  capacity: parseInt(e.target.value),
                                                }))
                                            }

                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-occupiedSlots">
                                    <label htmlFor="occupiedSlots" className="form-label">
                                        Số người đã ở
                                        <span
                                            id='occupiedSlots'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="occupiedSlots"
                                            id="occupiedSlots"
                                            type="number"
                                            value={detailRoom?.occupiedSlots}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-detail-room">
                                <div className="box-detail-room-giatrangbi">
                                    <label htmlFor="giatrangbi" className="form-label">
                                        Giá trang bị
                                        <span
                                            id='giatrangbi'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="giatrangbi"
                                            id="giatrangbi"
                                            type="number"
                                            value={detailRoom?.giatrangbi}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  giatrangbi: parseInt(e.target.value),
                                                }))
                                            }

                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-tieno">
                                    <label htmlFor="tieno" className="form-label">
                                        Tiền ở
                                        <span
                                            id='tieno'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="tieno"
                                            id="tieno"
                                            type="number"
                                            value={detailRoom?.tieno}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  tieno: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-detail-room">
                                <div className="box-detail-room-tiennuoc">
                                    <label htmlFor="tiennuoc" className="form-label">
                                        Tiền nước
                                        <span
                                            id='tiennuoc'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="tiennuoc"
                                            id="tiennuoc"
                                            type="number"
                                            value={detailRoom?.tiennuoc}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  tiennuoc: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-dongiadien">
                                    <label htmlFor="dongiadien" className="form-label">
                                        Đơn giá điện
                                        <span
                                            id='dongiadien'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room">
                                        <input 
                                            name="dongiadien"
                                            id="dongiadien"
                                            type="number"
                                            value={detailRoom?.dongiadien}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  dongiadien: parseInt(e.target.value),
                                                }))
                                            }

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row-detail-room">
                                <div className="box-detail-room-sophongvs">
                                    <label htmlFor="sophongvs" className="form-label">
                                        Phòng vệ sinh
                                        <span
                                            id='sophongvs'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room2">
                                        <input 
                                            name="sophongvs"
                                            id="sophongvs"
                                            type="number"
                                            value={detailRoom?.sophongvs}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  sophongvs: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-binhnuocnong">
                                    <label htmlFor="binhnuocnong" className="form-label">
                                        Bình nước nóng
                                        <span
                                            id='binhnuocnong'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room2">
                                        <input 
                                            name="binhnuocnong"
                                            id="binhnuocnong"
                                            type="number"
                                            value={detailRoom?.binhnuocnong}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
                                                  ...prev,
                                                  binhnuocnong: parseInt(e.target.value),
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="box-detail-room-dieuhoa">
                                    <label htmlFor="dieuhoa" className="form-label">
                                        Điều hoà
                                        <span
                                            id='dieuhoa'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {InfoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-detail-room2">
                                        <input 
                                            name="dieuhoa"
                                            id="dieuhoa"
                                            type="number"
                                            value={detailRoom?.dieuhoa}
                                            onChange={(e) =>
                                                setDetailRoom((prev) => ({
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
                </div>
                <div className="box-maininfo">
                    <div className="box-detail-room-dssv">
                        <div className="info-header-detail-room">
                            <div className="box-header-detail-room">
                                <h4>Danh sách sinh viên</h4>
                            </div>
                            <div className="btn-removeAllStudent">
                                <button className="btn-rmv-all" onClick={handleDeleteAll}>
                                    Xoá tất cả
                                </button>
                            </div>
                        </div>
                        <div className="info-table-dssv">
                            <div className="toolbar-table">
                                <div className="show-limit-dssv">
                                    Hiển thị
                                    <div
                                        className="limit-select-dssv"
                                    >
                                        {limit}
                                        <div className="navigation">
                                            
                                        </div>
                                    </div>
                                    kết quả
                                </div>
                                <div className="serach-name-dssv">
                                    <div className="title-search-dssv">
                                        Search
                                    </div>
                                    <input 
                                        type="text"
                                        placeholder="Tìm kiếm theo tên"
                                        className="input-search"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="main-table-dssv">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Mã số sinh viên</th>
                                            <th>Họ và Tên</th>
                                            <th>Giới tính</th>
                                            <th>Tác vụ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listStudent && listStudent.map((student, index) => (
                                            
                                            <tr key={student._id}>
                                                <td>{student?.sid}</td>
                                                <td>{student?.name}</td>
                                                <td>{student?.gender}</td>
                                                <td>
                                                    <button className="action-btn-view" onClick={() => window.open(`/manager/people/detail/${student._id}`, '_blank')}>Xem</button>
                                                    <button
                                                        className="action-btn-transfer"
                                                        onClick={ () => handleClickTransfer(student)}
                                                    >
                                                        Chuyển
                                                    </button>
                                                    <button 
                                                        className="action-btn-delete" 
                                                        onClick={() => handleDelete(student.email)}
                                                    >
                                                        Xoá
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="footer-dssv">
                                <div className="display-result">
                                    Từ {(page - 1) * limit + 1} đến{" "}
                                    {page * limit > studentQuantity ? studentQuantity : page * limit} trên tổng{" "} {studentQuantity}
                                </div>
                                <div className="pagination-dssv">
                                    <div className="prev-page-dssv" onClick={handlePrevPage}>
                                        Trước
                                    </div>
                                    <div className="page-dssv">
                                        {page}
                                    </div>
                                    <div className="next-page-dssv" onClick={handleNextPage}>
                                        Tiếp
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

export default DetailRoom;
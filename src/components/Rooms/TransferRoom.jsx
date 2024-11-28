/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TransferRoom.css"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { getListRoom } from "../../service/ManagerAPI/RoomAPI";
import SelectRooomToTransfer from "./SelectRooomToTransfer";
import { TransferStudent } from "../../service/ManagerAPI/StudentAPI";
const TransferRoom = ({close, detailRoom, people}) =>{

    const btnRef = useRef(null)
    const [listRoom, setListRoom] = useState([]);
    const [isOpenSelectRoom, setIsOpenSelectRoom] = useState(false);
    const fetchListRomm = async () =>{
        const rooms = await getListRoom({page: 1, limit: 10000, department: null})
        setListRoom(rooms.data.listRoom);
    }
    useEffect(() =>{
        fetchListRomm();
    }, [isOpenSelectRoom])

    const closePopupSelectRoom = () =>{
        setIsOpenSelectRoom(false)
    }
    const [select, setSelect] = useState(null);

    const onSelect = (item) =>{
        setSelect(item);
        setIsOpenSelectRoom(false);
    }

    const handleCLickOk = async() =>{
        if(select){
            const res = await TransferStudent(people._id, select._id);
            if(res.status === "success"){
                alert("Chuyển phòng thành công")
            }
            else{
                alert("Chuyển phòng thất bại")
            }
            close();
        }
        else{
            alert("Chưa chọn phòng chuyển đến")
        }
    }
    return(
        <div className="transfer-room">
            <div className="transfer-header">
                <div className="header-title-transfer">Chuyển phòng</div>
                <div className="header-transfer-cancel" onClick={close}>X</div>
            </div>
            <div className="transfer-content">
                <div className="room-from">
                    <div className="room-from-title">
                        Chuyển từ
                    </div>
                    <div className="room-from-content">
                        <div className="room-from-name">
                            <div className="name-lable">
                                Tên phòng
                            </div>
                            <div className="name-content">
                                {`${detailRoom?.department?.name} - ${detailRoom?.name}`}
                            </div>
                        </div>
                        <div className="room-from-gender">
                            <div className="gender-lable">
                                Phòng dành cho
                            </div>
                            <div className="gender-content">
                                {detailRoom?.gender}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="room-to">
                    <div className="room-to-title">
                        Chuyển đến
                    </div>
                    <div className="room-to-content">
                        <div className="room-to-name">
                            <div className="name-lable">
                                Tên phòng
                            </div>
                            <div className="name-content" ref={btnRef} onClick={() => setIsOpenSelectRoom(!isOpenSelectRoom)}>
                                {select? `${select?.department?.name} - ${select?.name}` : "Chọn phòng"}
                                <div className="icon-down">
                                    <FontAwesomeIcon icon={faCaretDown} />
                                </div>
                            </div>
                            {isOpenSelectRoom && <SelectRooomToTransfer closePopup={closePopupSelectRoom} btnRef={btnRef} listObject={listRoom} onSelectRoom = {onSelect}/>}
                        </div>
                        <div className="room-to-gender">
                            <div className="gender-lable">
                                Phòng dành cho
                            </div>
                            <div className="gender-content">
                                {select? `${select?.gender}` : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="transfer-btn">
                <button className="btn-thoat-transfer" onClick={close}>
                    Thoát
                </button>
                <button className="btn-ok-transfer" onClick={handleCLickOk}>
                    Xác nhận
                </button>
            </div>
        </div>
    )
}
export default TransferRoom;
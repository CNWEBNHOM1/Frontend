/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./CreateBill.css"
import infoIcon from "../../assets/icons/InfoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import SelectRoomOfBill from "./SelectRoomOfBill";
import { getListRoom } from "../../service/ManagerAPI/RoomAPI";
import { createBill } from "../../service/ManagerAPI/BillAPI";

const CreateBill = ({close}) =>{

    const btnRef = useRef(null);
    const [isOpenSelectRoom, setIsOpenSelectRoom] = useState(false);
    const closePopupSelectRoom = () =>{
        setIsOpenSelectRoom(false);
    }

    const [datafetchRoomList, setDatafetchRoomList] = useState({
        "page": 1,
        "limit": 10000,
        "department": null
    })

    const [listRoom, setListRoom] = useState([]);

    const fetchListRomm = async () =>{
        const rooms = await getListRoom(datafetchRoomList)
        setListRoom(rooms.data.listRoom);
    }
    const [dataCreateBill, setDataCreateBill] = useState({
        info_room: null,
        sodiencuoi: null,
        room: null
    })

    const selectRoom = (select) => {
        setDataCreateBill({
          ...dataCreateBill,
          info_room: select,
          room: select._id
        });
        setIsOpenSelectRoom(false);  // Đóng popup sau khi chọn phòng
    };

    const handleClickCreateBill  = async () =>{
        if (dataCreateBill.room && dataCreateBill.sodiencuoi !== null && dataCreateBill.sodiencuoi !== "") {
            const newBill = await createBill({room: dataCreateBill.room, sodiencuoi: dataCreateBill.sodiencuoi});
            console.log(newBill)
            if(newBill.status === "success"){
                alert("Tạo hoá đơn thành công")
            }
            else{
                alert("Tạo hoá đơn không thành công")
            }
            close();
        } else {
            alert("Chưa điền đầy đủ thông tin!");
        }

    }

    useEffect(() =>{
        fetchListRomm();
    }, [isOpenSelectRoom])
    console.log(dataCreateBill.info_room)
    return(
        <div className="create-bill">
            <div className="box-create-bill">
                <div className="info-create-bill-header">
                    <div className="box-create-bill-header">
                        <h4>Tạo mới hoá đơn</h4>
                    </div>
                    <div className="box-cancel-create-bill" onClick={close}>
                        <h4>X</h4>
                    </div>
                </div>
                <div className="info-body-create-bill">
                    <div className="box-create-bill-room">
                        <div className="form-create-bill">
                            <label htmlFor="room" className="form-label-create-bill">
                                Tên phòng
                                <span
                                    id='nameCaption'
                                    className="caption-icon"
                                    style={{color: "#4d53e0"}}
                                >
                                    {infoIcon}
                                </span>
                                <span className="asterisk-icon">*</span>
                            </label>
                            <div className="form-textfield-create-bill">
                                <button className="btn-create-bill-select" ref={btnRef} onClick={() => setIsOpenSelectRoom(!isOpenSelectRoom)}>
                                {dataCreateBill.room ? `${dataCreateBill.info_room.department.name} - ${dataCreateBill.info_room.name}` : "Phòng"}
                                    <span className="btn_icon">
                                        <FontAwesomeIcon icon={faCaretDown} style={{color:"#A3A8AF" }}/>
                                    </span>
                                </button>
                                {isOpenSelectRoom && <SelectRoomOfBill closePopup={closePopupSelectRoom} btnRef={btnRef} listObject={listRoom} onSelectRoom = {selectRoom}/>}
                            </div>
                        </div>
                    </div>
                    <div className="ttphongchon">
                        <div className="box-create-bill-sodiencuoi">
                            <div className="form-create-bill">
                                <label htmlFor="sodiencuoi" className="form-label-create-bill">
                                    Số điện cuối
                                    <span
                                        id='nameCaption'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {infoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-create-bill">
                                    <input 
                                        name="sodiencuoi"
                                        id="sodiencuoi"
                                        type="number"
                                        min="0"
                                        onChange={(e)=> setDataCreateBill({
                                            ...dataCreateBill,
                                            sodiencuoi: parseInt(e.target.value)
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row-btn-create-bill">
                    <button className="btn-cancel-bill" onClick={close}>Huỷ</button>
                    <button className="btn-create-bill"  onClick={handleClickCreateBill}>Tạo</button>
                </div>
            </div>
        </div>
    )
}

export default CreateBill
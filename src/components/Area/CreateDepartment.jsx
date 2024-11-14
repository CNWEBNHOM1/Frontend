/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import infoIcon from "../../assets/icons/InfoIcon";
import "./CreateDepartment.css"
import { createNewDepartment } from "../../service/ManagerAPI/DepartmentAPI";
import { notification} from 'antd';
const CreateDepartment = ({close}) =>{

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const [dataCreateDepartment, setDataCreateDepartment] = useState({
        name: "",
        room_count: null,
        broken_room: null,
    })

    const handleClickAddNewDepartment = async () => {
        if (dataCreateDepartment.name && dataCreateDepartment.room_count !== null && dataCreateDepartment.room_count !== "" && dataCreateDepartment.broken_room !== null && dataCreateDepartment.broken_room !== "") {
            try {
                const newDepartment = await createNewDepartment(dataCreateDepartment);
                if (newDepartment.status === "success") {
                    alert("Thêm khu ký túc xá thành công");
                } else {
                    alert("Thêm khu ký túc xá thất bại");
                }
            } catch (error) {
                alert("Có lỗi xảy ra trong quá trình thêm khu ký túc xá");
            }
        } else {
            alert("Không được để trống thông tin nào")
        }
    
        close();
    };
    console.log(dataCreateDepartment)
    
    return(
        <>  
            {contextHolder}
            <div className="create-department">
                <div className="box-create">
                    <div className="info-createHeader">
                        <div className="box-createHeader">
                            <h4>Thêm khu ký túc</h4>
                        </div>
                        <div className="box-cancelCreate" onClick={close}>
                            <h4>X</h4>
                        </div>
                    </div>
                    <div className="info-body">
                        <div className="box-createDepartmentName">
                            <div className="form-create">
                                <label htmlFor="name" className="form-label-create-department">
                                    Tên Khu
                                    <span
                                        id='nameCaption'
                                        className="caption-icon"
                                        style={{color: "#4d53e0"}}
                                    >
                                        {infoIcon}
                                    </span>
                                    <span className="asterisk-icon">*</span>
                                </label>
                                <div className="form-textfield-create-department">
                                    <input 
                                        name="name"
                                        id="name"
                                        type="text"
                                        onChange={(e) =>setDataCreateDepartment({
                                            ...dataCreateDepartment,
                                            name: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row-createDepartment">
                            <div className="box-bill-room_count">
                                <div className="form-create">
                                    <label htmlFor="room_count" className="form-label-create-department">
                                        Số lượng phòng
                                        <span
                                            id='room_count'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-create-department1">
                                        <input 
                                            name="room_count"
                                            id="room_count"
                                            type="number"
                                            min="1"
                                            onChange={(e) =>setDataCreateDepartment({
                                                ...dataCreateDepartment,
                                                room_count: parseInt(e.target.value)
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="box-bill-broken_room">
                                <div className="form-create">
                                    <label htmlFor="broken_room" className="form-label-create-department">
                                        Số lượng phòng hỏng
                                        <span
                                            id='broken_room'
                                            className="caption-icon"
                                            style={{color: "#4d53e0"}}
                                        >
                                            {infoIcon}
                                        </span>
                                        <span className="asterisk-icon">*</span>
                                    </label>
                                    <div className="form-textfield-create-department1">
                                        <input 
                                            name="broken_room"
                                            id="broken_room"
                                            type="number"
                                            min="0"
                                            onChange={(e) =>setDataCreateDepartment({
                                                ...dataCreateDepartment,
                                                broken_room: parseInt(e.target.value)
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row-btn-create">
                            <button className="btn-cancel-department" onClick={close}>Huỷ</button>
                            <button className="btn-create-department" onClick={handleClickAddNewDepartment}>Thêm</button>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default CreateDepartment;
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import InfoIcon from "../../assets/icons/InfoIcon"
import Header from "../../components/Header/Header"
import "./ChangePassword.css"
import {Modal} from 'antd';
import { notification} from 'antd';
import { changePassword } from "../../service/authAPI";
const ChangePassword = () =>{


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const [dataChangePass, setDataChangePass] = useState({
        oldPass: "",
        newPass: "",
    })

    const [render, setRender] = useState(false);

    const handleChangePassword = async () => {

        if(dataChangePass.newPass !== "" && dataChangePass.oldPass !== ""){
            try {
                const res = await changePassword(dataChangePass);
                if(res.message === "Password changed successfully"){
                    openNotificationWithIcon('success', "Đổi mật khẩu thành công")
                }
                setDataChangePass({
                    oldPass: "",
                    newPass: "",
                })
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.message === "Current password is incorrect") {
                    openNotificationWithIcon('error', "Mật khẩu hiện tại không chính xác.")
                }

                else if(error.response && error.response.status === 400 && error.response.data.message === "Password must be different"){
                    openNotificationWithIcon('error', "Mật khẩu mới không được giống mật khẩu cũ");
                }
                else {
                    openNotificationWithIcon('error', "Lỗi khi đổi mật khẩu");
                }
            }
        }
        else{
            openNotificationWithIcon('error', "Không được để trống thông tin");
        }
    };

    const onChangePassword = () =>{
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn chắc muốn đổi mật khẩu của tài khoản này?",
            okText: "Xác nhận",
            cancelText: "Hủy",
            onOk: async () => {
                await handleChangePassword();
            },
            onCancel: () => {},
        });
    }


    
    return(
        <>  
            {contextHolder}
            <div className="changepassword">
                <Header title={"Đổi mật khẩu"}/>
                <div className="detail-change-password">
                    <div className="box-change-pasword-oldpass">
                        <label htmlFor="room" className="change-label">
                            Mật khẩu cũ
                            <span
                                id='old'
                                className="caption-icon"
                                style={{color: "#4d53e0"}}
                            >
                                {InfoIcon}
                            </span>
                            <span className="asterisk-icon">*</span>
                        </label>
                        <div className="form-change-password">
                            <input 
                                name="old"
                                id="old"
                                type="text"
                                value={dataChangePass.oldPass}
                                onChange={(e) =>
                                    setDataChangePass((prev) => ({
                                      ...prev,
                                      oldPass: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="box-change-pasword-newpass">
                        <label htmlFor="room" className="change-label">
                            Mật khẩu mới
                            <span
                                id='new'
                                className="caption-icon"
                                style={{color: "#4d53e0"}}
                            >
                                {InfoIcon}
                            </span>
                            <span className="asterisk-icon">*</span>
                        </label>
                        <div className="form-change-password">
                            <input 
                                name="new"
                                id="new"
                                type="text"
                                value={dataChangePass.newPass}
                                onChange={(e) =>
                                    setDataChangePass((prev) => ({
                                      ...prev,
                                      newPass: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="box-button-change">
                        <button onClick={onChangePassword}>Thay đổi</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
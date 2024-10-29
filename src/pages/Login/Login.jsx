/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, notification, Space } from 'antd';
//import { login } from "../../actions/auth";
import { useEffect, useState } from 'react';
import loginImage from '../../assets/login_image.svg'
import './Login.css'
import { login } from '../../actions/auth';
const Login = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);
    const [message, setMessage] = useState("");

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };
    console.log(message)

    const doLogin = async (role) => {
        const result = await dispatch(login({ ...formLogin, role }));
        
        if (result.success) {
            openNotificationWithIcon('success', result.message);
        } else {
            openNotificationWithIcon('error', result.message);
        }
    };
    const handleLoginAsManager = () => {
        doLogin("Quản lý");
    };
    
    const handleLoginAsUser = () => {
        doLogin("Sinh viên");
    };

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    })


    useEffect(()=>{
        if(isAuthenticated){
            if(role === "Quản lý"){
                navigate("/manager")
            } else if(role === "Sinh viên"){
                navigate("/user")
            }
        }
    },[isAuthenticated, navigate,role])
    return(
        <>
        {contextHolder}
        <div className='login'>
            <div className='login_content_wrapper'>
                <div className='login_content'>
                    <div className='title'>
                        <div className='title_big'>
                            Đăng nhập
                        </div>
                    </div>

                    <div className='form'>
                        <div className='form_input'>
                            <label htmlFor='email'>Tài khoản</label>
                            <input 
                                id='email'
                                name='email'
                                placeholder='Vui lòng nhập email'
                                value={formLogin.email}
                                onChange={(e)=>{setFormLogin({
                                    ...formLogin,
                                    email: e.target.value
                                })} }
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Mật khẩu</label>
                            <input 
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                value={formLogin.password}
                                onChange={(e)=>{setFormLogin({
                                    ...formLogin,
                                    password: e.target.value
                                })} }
                            />
                        </div>
                    </div>
                    <div className='btn'>
                        <div>Vai trò </div>
                        <div className='btn-wraper'>
                            <button onClick={handleLoginAsManager}>
                                Manager
                            </button>
                            <button onClick={handleLoginAsUser}>User</button>
                        </div>
                    </div>
                    <div className='guest'>
                        <div className='line'>
                            <div className='dividing-line'>
                                    <hr  /> 
                            </div>
                            <div>
                                OR
                            </div>
                            <div className='dividing-line'>
                                <hr  /> 
                            </div>
                        </div>

                        <div className='guest-task'>
                            <div className='register-guest'>
                                    Để đăng kí phòng?
                                    <Link to="/register"> Đăng kí tại đây</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='login_banner'>
                <div className='banner_img'>
                    <img  src={loginImage}/>
                </div>
            </div>
        </div>
        </>
    )
}


export default Login
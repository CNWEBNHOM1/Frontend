/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, notification, Space } from 'antd';
//import { login } from "../../actions/auth";
import { useEffect, useState } from 'react';
import loginImage from '../../assets/login_image.svg'
import './Login.css'
import { login } from '../../actions/auth';
import { forgotPassword } from '../../service/authAPI';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);
    const [message, setMessage] = useState("");
    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

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

    const handleLoginAsGuest = () => {
        doLogin("Khách");
    };


    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    })

    const [email, setEmail] = useState("")

    const handleSendResetLink = async () => {
        try {
            const res = await forgotPassword({ email: email });
            console.log(res)
            if (res.message === "Email sent successfully") {
                openNotificationWithIcon('success', "Đã gửi mật khẩu mới tới email");
            } else {
                openNotificationWithIcon('error', "Đã xảy ra lỗi, vui lòng thử lại");
            }
            setEmail("")
        } catch (error) {
            // Kiểm tra lỗi HTTP
            if (error.response) {
                const { status } = error.response;
                if (status === 500) {
                    openNotificationWithIcon('error', "Lỗi: Gửi email thất bại");
                }
                else if (status === 404) {
                    openNotificationWithIcon('error', "Email không tồn tại");
                }
                else {
                    openNotificationWithIcon('error', `Lỗi: server`);
                }
            } else {
                // Lỗi khác, như không kết nối được server
                openNotificationWithIcon('error', "Không thể kết nối đến server, vui lòng kiểm tra mạng");
            }
            setEmail("")
        }
    };


    useEffect(() => {
        if (isAuthenticated) {
            if (role === "Quản lý") {
                navigate("/manager")
            } else if (role === "Sinh viên") {
                navigate("/user")
            } else if (role === "Khách") {
                navigate("/auth");
            }

        }
    }, [isAuthenticated, navigate, role])
    if(!isForgotPassword){
        return (
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
                                    <label htmlFor='email'>Email</label>
                                    <input
                                        id='email'
                                        name='email'
                                        placeholder='Vui lòng nhập email'
                                        value={formLogin.email}
                                        onChange={(e) => {
                                            setFormLogin({
                                                ...formLogin,
                                                email: e.target.value
                                            })
                                        }}
                                    />
                                </div>

                                <div className='form_input'>
                                    <label htmlFor='password'>Mật khẩu</label>
                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='Vui lòng nhập mật khẩu'
                                        value={formLogin.password}
                                        onChange={(e) => {
                                            setFormLogin({
                                                ...formLogin,
                                                password: e.target.value
                                            })
                                        }}
                                    />
                                    <div className='forgotpassword' onClick={() => setIsForgotPassword(true)}>Quên mật khẩu</div>
                                </div>
                            </div>
                            <div className='role-wrap'>
                                <div className='role-label'>Vai trò </div>
                                <div className='role-buttons'>
                                    <button onClick={handleLoginAsManager}>
                                        Quản lý
                                    </button>
                                    <button onClick={handleLoginAsUser}>Sinh viên</button>
                                    <button onClick={handleLoginAsGuest}>Khách</button> {/* Thêm nút cho Khách */}
                                </div>
                            </div>
                            <div className='guest'>
                                <div className='line'>
                                    <div className='dividing-line'>
                                        <hr />
                                    </div>
                                    <div>
                                        OR
                                    </div>
                                    <div className='dividing-line'>
                                        <hr />
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
                            <img src={loginImage} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            {contextHolder}
            <div className="forgot-password">
                <div className="forgot-password-content-wrapper">
                    <div className="forgot-password-content">
                        <div className="title">
                            <div className="title-big">Quên mật khẩu</div>
                        </div>
                        <div className="form">
                            <div className="form-input1">
                                <label htmlFor="email">Email</label>
                                <input
                                    className='input-forgot'
                                    id="email"
                                    name="email"
                                    placeholder="Vui lòng nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-actions">
                                <button className="btn-reset" onClick={handleSendResetLink}>
                                    Gửi liên kết
                                </button>
                                <Link  className="btn-back-login" onClick={() => setIsForgotPassword(false)}>
                                    Trở lại đăng nhập
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='login_banner'>
                    <div className='banner_img'>
                        <img src={loginImage} />
                    </div>
                </div>
            </div>
        </>
    );
}


export default Login
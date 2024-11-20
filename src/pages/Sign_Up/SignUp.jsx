import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import axios from 'axios';
import './SignUp.css';
import loginImage from '../../assets/signup_image.svg'; // Hình ảnh giao diện đăng ký

// Đúng URL của backend
const API_BASE_URL = 'http://localhost:5000/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const [formSignUp, setFormSignUp] = useState({
        email: '',
        password: '',
    });

    // Hàm mở thông báo
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    // Hàm xử lý đăng ký
    const handleSignUp = async () => {
        try {
            // Đúng endpoint là /auth/register
            const response = await axios.post(`${API_BASE_URL}/register`, formSignUp);

            if (response.status === 201) {
                openNotificationWithIcon(
                    'success',
                    `Đăng ký thành công! Email: ${response.data.email}, Vai trò: ${response.data.role}`
                );
                navigate('/login'); // Điều hướng đến trang đăng nhập
            } else {
                openNotificationWithIcon('error', response.data.message || 'Đăng ký thất bại!');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đã xảy ra lỗi!';
            openNotificationWithIcon('error', errorMessage);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="signup">
                <div className="signup_content_wrapper">
                    <div className="signup_content">
                        <div className="title">
                            <div className="title_big">Đăng ký</div>
                        </div>

                        <div className="form">
                            <div className="form_input">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Vui lòng nhập email HUST"
                                    value={formSignUp.email}
                                    onChange={(e) => setFormSignUp({ ...formSignUp, email: e.target.value })}
                                />
                            </div>

                            <div className="form_input">
                                <label htmlFor="password">Mật khẩu</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Vui lòng nhập mật khẩu"
                                    value={formSignUp.password}
                                    onChange={(e) => setFormSignUp({ ...formSignUp, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="btn">
                            <Button type="primary" onClick={handleSignUp}>
                                Đăng ký
                            </Button>
                        </div>

                        <div className="guest">
                            <div className="line">
                                <div className="dividing-line">
                                    <hr />
                                </div>
                                <div>OR</div>
                                <div className="dividing-line">
                                    <hr />
                                </div>
                            </div>

                            <div className="guest-task">
                                <div className="register-guest">
                                    Đã có tài khoản?
                                    <Link to="/login"> Đăng nhập tại đây</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="login_banner">
                    <div className="banner_img">
                        <img src={loginImage} alt="Sign Up" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;

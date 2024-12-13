import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import axios from 'axios';
import './SignUp.css';
import loginImage from '../../assets/signup_image.svg';

const API_BASE_URL = 'http://localhost:5000/auth';

const SignUp = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const [formSignUp, setFormSignUp] = useState({
        email: '',
        password: '',
    });

    const openNotificationWithIcon = (type, message, description = '') => {
        api[type]({
            message: message,
            description: description || message,
        });
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, formSignUp);

            if (response.status === 201) {
                openNotificationWithIcon(
                    'success',
                    'Đăng ký thành công!',
                    `Email: ${response.data.email}, Vai trò: ${response.data.role}`
                );
                navigate('/login');
            }
        } catch (error) {
            if (error.response?.status === 409 || error.response?.data?.message?.includes('email')) {
                openNotificationWithIcon(
                    'error',
                    'Đăng ký thất bại!',
                    'Email này đã được đăng ký, vui lòng sử dụng email khác'
                );
            } else {
                openNotificationWithIcon(
                    'error',
                    'Đăng ký thất bại!',
                    error.response?.data?.message || 'Đã xảy ra lỗi, vui lòng thử lại'
                );
            }
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
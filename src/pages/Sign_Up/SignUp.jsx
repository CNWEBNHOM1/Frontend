import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, notification } from 'antd';
import './SignUp.css';
import signupImage from '../../assets/signup_image.svg'; // Thay đổi tên file hình ảnh cho giao diện đăng ký

const SignUp = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: message,
            description: message,
        });
    };

    const [formSignUp, setFormSignUp] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
    });

    const handleSignUp = async () => {
        //gọi API đăng ký ở đây
        const result = { success: true, message: "Đăng ký thành công!" }; // Kết quả giả định
        if (result.success) {
            openNotificationWithIcon('success', result.message);
            navigate("/login"); // Điều hướng đến trang đăng nhập
        } else {
            openNotificationWithIcon('error', result.message);
        }
    };

    return (
        <>
            {contextHolder}
            <div className='signup'>
                <div className='signup_content_wrapper'>
                    <div className='signup_content'>
                        <div className='title'>
                            <div className='title_big'>Đăng ký</div>
                        </div>

                        <div className='form'>
                            <div className='form_input'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    name='email'
                                    placeholder='Vui lòng nhập email'
                                    value={formSignUp.email}
                                    onChange={(e) => { setFormSignUp({ ...formSignUp, email: e.target.value }) }}
                                />
                            </div>

                            <div className='form_input'>
                                <label htmlFor='name'>Họ tên</label>
                                <input
                                    id='name'
                                    name='name'
                                    placeholder='Vui lòng nhập họ tên'
                                    value={formSignUp.name}
                                    onChange={(e) => { setFormSignUp({ ...formSignUp, name: e.target.value }) }}
                                />
                            </div>

                            <div className='form_input'>
                                <label htmlFor='username'>Tên người dùng</label>
                                <input
                                    id='username'
                                    name='username'
                                    placeholder='Vui lòng nhập tên người dùng'
                                    value={formSignUp.username}
                                    onChange={(e) => { setFormSignUp({ ...formSignUp, username: e.target.value }) }}
                                />
                            </div>

                            <div className='form_input'>
                                <label htmlFor='password'>Mật khẩu</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Vui lòng nhập mật khẩu'
                                    value={formSignUp.password}
                                    onChange={(e) => { setFormSignUp({ ...formSignUp, password: e.target.value }) }}
                                />
                            </div>
                        </div>

                        <div className='btn'>
                            <Button type="primary" onClick={handleSignUp}>Đăng ký</Button>
                        </div>

                        <div className='guest'>
                            <div className='line'>
                                <div className='dividing-line'>
                                    <hr />
                                </div>
                                <div>OR</div>
                                <div className='dividing-line'>
                                    <hr />
                                </div>
                            </div>

                            <div className='guest-task'>
                                <div className='register-guest'>
                                    Đã có tài khoản?
                                    <Link to="/login"> Đăng nhập tại đây</Link>
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
    );
}

export default SignUp;

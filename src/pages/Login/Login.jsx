/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
//import { login } from "../../actions/auth";
import { useEffect } from 'react';
import loginImage from '../../assets/login_image.svg'
import './Login.css'
const Login = () =>{
    //const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);

    // const doLogin = () => {
    //     dispatch(login());
    // }

    useEffect(()=>{
        if(isAuthenticated){
            if(role === "MANAGER"){
                navigate("/manager")
            } else if(role === "USER"){
                navigate("/user")
            }
        }
    },[isAuthenticated, navigate,role])
    return(
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
                            <label htmlFor='username'>Tài khoản</label>
                            <input 
                                id='username'
                                name='username'
                                placeholder='Enter your username'
                            />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Mật khẩu</label>
                            <input 
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                            />
                        </div>
                    </div>
                    <div className='btn'>
                        <div>Vai trò </div>
                        <div className='btn-wraper'>
                            <button>Manager</button>
                            <button>User</button>
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
    )
}


export default Login
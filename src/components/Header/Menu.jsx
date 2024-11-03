/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faKeyboard ,faMessage} from '@fortawesome/free-regular-svg-icons'
import { useRef,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "./Menu.css"
import { logout } from '../../actions/auth'
const Menu  = ({btnRef, closePopup}) =>{
    const popupRef = useRef(null)
    const dispatch = useDispatch();
    const doLogout = () => {
        dispatch(logout());
      }
    
    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [])
    return(
        <div className="menu-list" ref={popupRef}>
            <div className='list-profile'>
                <div className="profile">
                    <FontAwesomeIcon icon={faUser} style={{width: "25px", height : "25px"}}/>
                    <div className='menu-title'>
                        Hồ sơ
                    </div>
                </div>
                <div className="profile">
                    <FontAwesomeIcon icon={faKeyboard} style={{width: "25px", height : "25px"}}/>
                    <div className='menu-title'>
                        Công việc
                    </div>
                </div>
                <div className="profile">
                    <FontAwesomeIcon icon={faMessage} style={{width: "25px", height : "25px"}}/>
                    <div className='menu-title'>
                        Tin nhắn
                    </div>
                </div>
            </div>
            

            <button className='btn-logout' onClick={() => doLogout()}>
                Đăng xuất
            </button>
        </div>
    )
}

export default Menu
/* eslint-disable react/prop-types */

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
            <button className='btn-logout' onClick={() => doLogout()}>
                Đăng xuất
            </button>
        </div>
    )
}

export default Menu
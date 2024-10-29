/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavItem, NavLink ,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown,NavbarText} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/auth'
import { faArrowAltCircleDown, faBell} from '@fortawesome/free-regular-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import basketIcon from '../../assets/icons/basket-icon.svg'
import calendarIcon from '../../assets/icons/calendar-icon.svg'
import envelopeIcon from '../../assets/icons/envelope-icon.svg'
import ProfileIcon from '../../assets/icons/ProfileIcon'
import TasksIcon from '../../assets/icons/TasksIcon'
import MessagesIcon from '../../assets/icons/MessagesIcon'
import logoutIcon from '../../assets/icons/logout-outline-icon.svg'
import React, { useRef, useState } from 'react'
import "./Header.css"
import Menu from './Menu'
const Header = ({ title }) => {

    const menuRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const email = localStorage.getItem("email");
    const dispatch = useDispatch();
  
    const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
    const toggleMenu = () => setMenuOpen(!menuOpen);
    const doLogout = () => dispatch(logout());
  
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    localStorage.setItem("fullName", "Từ Văn An")
    return (

        <div className='header'>
            <div className='header-title'>
                {title}
            </div>
            <div className='header-right'>
                <div className='notification'>
                    <FontAwesomeIcon icon={faBell} style={{width: "30px", height: "30px"}}/>
                </div>
                <div className='account' onClick={() => setIsOpen(!isOpen)} ref={menuRef}>
                    <div className='circle-name'>
                        {email[0].toUpperCase()}
                    </div>
                    <div className='menu'>
                        <FontAwesomeIcon icon={faChevronDown} style={{width: "20px", height: "20px"}}/>
                    </div>
                </div>
                {isOpen && <Menu btnRef={menuRef} closePopup={() => setIsOpen(false)}/>}
            </div>
        </div>

        
    );
  };
  
  export default Header;
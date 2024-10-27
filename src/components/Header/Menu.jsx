
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser } from '@fortawesome/free-regular-svg-icons'
import "./Menu.css"
const Menu  = () =>{
    return(
        <div className="menu">
            <div className="profile">
                <FontAwesomeIcon icon={faUser} />
                <div className='menu-titile'>
                    Hồ sơ
                </div>
            </div>
            <div className="profile">
                <FontAwesomeIcon icon={faUser} />
                <div className='menu-title'>
                    Hồ sơ
                </div>
            </div>
            <div className="profile">
                <FontAwesomeIcon icon={faUser} />
                <div className='menu-titile'>
                    Hồ sơ
                </div>
            </div>
        </div>
    )
}

export default Menu
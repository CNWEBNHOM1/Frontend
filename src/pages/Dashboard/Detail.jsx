/* eslint-disable react/prop-types */
import "./Detail.css"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Detail = ({title , listObject}) =>{
    return(
        <div className="detail-menu">
            <div className="detail-header">
                <div className="detail-title">
                    {title}
                </div>
                <div className="icon-screen">
                    <FontAwesomeIcon icon={faEye} style={{color: "#FFFFFF"}}/>
                </div>
            </div>
            <div className="detail-content-a">
                {listObject && listObject.map((item, index) => (
                    <div key={index} className="detail-row">
                        <div className="detail-menu-label">
                            {item.label}
                        </div>
                        <div className="detail-menu-number">
                            {item.number}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Detail
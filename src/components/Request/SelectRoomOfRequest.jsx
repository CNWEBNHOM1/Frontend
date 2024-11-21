/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import "./SelectRoomOfRequest.css"
const SelectRoomOfRequest= ({listObject, closePopup ,btnRef, onSelectRoom}) =>{

    const popupRef = useRef(null);
    const listRef = useRef(null);

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return(
        <div className="container-select-room-of-request" ref={popupRef}>
            <div className="wrapper-select-room-of-request">
                <div className="wrapper_select_room" ref={listRef}>
                    {listObject.map((item,index) => (
                        <div className="select-room" key={index}  onClick={() => onSelectRoom(item)}>
                            <div>{`${item.department.name} - ${item.name}`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectRoomOfRequest;
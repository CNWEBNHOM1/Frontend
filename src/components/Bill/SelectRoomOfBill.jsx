/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import "./SelectRoomOfBill.css"

const SelectRoomOfBill = ({listObject, closePopup ,btnRef, onSelectRoom}) =>{

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

    console.log(listObject)
    return(
        <div className="container-select-room-of-bill" ref={popupRef}>
            <div className="wrapper-select-room-of-bill">
                <div className="wrapper_select_room-create-bill" ref={listRef}>
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

export default SelectRoomOfBill;
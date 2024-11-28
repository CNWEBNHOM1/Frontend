/* eslint-disable react/prop-types */

import { useEffect, useRef } from "react";
import "./SelectRooomToTransfer.css"

const SelectRooomToTransfer = ({listObject, closePopup ,btnRef, onSelectRoom}) =>{

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
        <div className="container-select-room-transfer" ref={popupRef}>
            <div className="wrapper-select-room-transfer">
                <div className="wrapper_select_transfer" ref={listRef}>
                    {listObject.map((item,index) => (
                        <div className="select-transfer" key={index}  onClick={() => onSelectRoom(item)}>
                            <div>{`${item.department.name} - ${item.name}`}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default SelectRooomToTransfer
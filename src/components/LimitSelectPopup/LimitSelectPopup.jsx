/* eslint-disable react/prop-types */
import "./LimitSelectPopup.css"
import{ useEffect, useRef } from 'react'
const LimitSelectPopup = ({ btnRef, limit, handleChangeLimit, closePopup}) =>{
    const popupRef = useRef(null)

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
    const handleChange = (limit) => {  
        handleChangeLimit(limit);
        closePopup();
    }
    return(
        <div ref={popupRef} className="container2">
            <div className="wrapper2">
                <button onClick={() => handleChange(10)} className={`selectItem2 ${limit === 10 ? 'selected2' : ''}`}>
                10
                </button>
                <button onClick={() => handleChange(20)} className={`selectItem2 ${limit === 20 ? 'selected2' : ''}`}>
                    20
                </button>
                <button onClick={() => handleChange(50)} className={`selectItem2 ${limit === 50 ? 'selected2' : ''}`}>
                    50
                </button>
            </div>
        </div>
    )

}

export default LimitSelectPopup
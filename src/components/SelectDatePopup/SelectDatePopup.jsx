/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { formatDate } from "../../utils/DateUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./SelectDatePopup.css"
import DateFilter from "../DateFilter/DateFilter";
const SelectDatePopup = ({ data, setDataFilters, title}) =>{
    
    const dateRef = useRef(null);
    const [isOpenDatePopup, setIsOpenDatePopup] = useState(false);

    const handleChangeDataFilter = (filters) => {
		setDataFilters(filters);
	};

    return(
        <>
            <button
                ref={dateRef}
                onClick={()=> setIsOpenDatePopup(!isOpenDatePopup)}
                className="btn btn_base btn_filter"
            >
                <span className="btn__label">
                    {
                        data ? 
                        `${formatDate(data.date_from)} - ${formatDate(data.date_to)}` : title
                    }
                    <span className="btn__icon">
                        <FontAwesomeIcon icon={faCaretDown}/>
                    </span>
                </span>
            </button>
            {isOpenDatePopup &&
                <DateFilter
                    dateRef={dateRef}
                    closePopup={() => setIsOpenDatePopup(false)}
                    handeChangeDatafilter={(data) => handleChangeDataFilter(data)}
                />
            }
        </>
    )
}

export default SelectDatePopup;
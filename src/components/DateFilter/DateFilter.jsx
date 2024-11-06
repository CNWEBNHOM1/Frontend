/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs"; // Đảm bảo bạn đã cài đặt dayjs package: npm install dayjs
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "./DateFilter.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const DateFilter = ({closePopup, handeChangeDatafilter,dateRef}) =>{

    const popupRef = useRef(null);
    const [selectedRange, setSelectedRange] = useState(null);
    const [isSelectCustom, setIsSelectCustom] = useState(false);
	const [customStartDate, setCustomStartDate] = useState(null);
	const [customEndDate, setCustomEndDate] = useState(null);
    const [dateTempo, setDateTempo] = useState({
		dateAtmin: null,
		datedAtmax: null,
	});
    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && dateRef.current && !dateRef.current.contains(e.target)) {
            closePopup();
        }
    }

    const dateRanges = {
		today: "Hôm nay",
		yesterday: "Hôm qua",
		lastWeek: "Tuần trước",
		thisWeek: "Tuần này",
		lastMonth: "Tháng trước",
		thisMonth: "Tháng này",
		custom: "Tùy chọn",
	};

    const dateRangesFunctions = {
		today: {
			start: () => dayjs().startOf("day"),
			end: () => dayjs().endOf("day"),
		},
		yesterday: {
			start: () => dayjs().subtract(1, "day").startOf("day"),
			end: () => dayjs().subtract(1, "day").endOf("day"),
		},
		lastWeek: {
			start: () => dayjs().subtract(1, "week").startOf("week"),
			end: () => dayjs().endOf("week"),
		},
		thisWeek: {
			start: () => dayjs().startOf("week"),
			end: () => dayjs().endOf("week"),
		},
		lastMonth: {
			start: () => dayjs().subtract(1, "month").startOf("month"),
			end: () => dayjs().subtract(1, "month").endOf("month"),
		},
		thisMonth: {
			start: () => dayjs().startOf("month"),
			end: () => dayjs().endOf("month"),
		},
		custom: {
			start: () => customStartDate,
			end: () => customEndDate,
		},
	};

    const handleDateRange = (range) => {
		setSelectedRange(range);

		if (range === "custom") {
			setCustomEndDate(null);
			setCustomStartDate(null);
			setIsSelectCustom(true);
		} else {
			setIsSelectCustom(false);
			setDateTempo({
				dateAtmin: dateRangesFunctions[range].start(),
				dateAtmax: dateRangesFunctions[range].end(),
			});
		}
	};

    const handleFilterClick = () => {
		if (dateTempo.dateAtmin && dateTempo.datedAtmax) {
			handeChangeDatafilter({ date_from: dayjs(dateTempo.dateAtmin).format("YYYY-MM-DD"), date_to: dayjs(dateTempo.datedAtmax).format("YYYY-MM-DD") });
			closePopup();
		}
	}

    useEffect(() => {
		if (isSelectCustom && customStartDate && customEndDate) {
			setDateTempo({
				dateAtmin: customStartDate,
				datedAtmax: customEndDate,
			});
		}
	}, [customStartDate, customEndDate, isSelectCustom]);

    return(
        <div className="container" ref={popupRef}>
            <div className="wrapper1">
                <div className="selectWrapper">
                    { Object.keys(dateRanges).map((range)=> (
                        <button
                            key={range}
                            className={`selectItem ${selectedRange === range ? 'selected' : ''}`}
                            onClick={() => handleDateRange(range)}
                            style={
								range === "custom" ? { width: "calc(100% - 8px)" } : {}
							}

                        >
                            <span>{dateRanges[range]}</span>
                        </button>
                    ))}
                </div>
                { isSelectCustom && (
                    <div className="customContainer">
                        <div className="w-100">
                            <div className="customAt">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        value={customStartDate}
                                        onChange={(date) => setCustomStartDate(date)}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                        <div
							style={{
								height: "1px",
								flex: "0 0 auto",
								background: "rgb(163, 168, 175)",
								width: "0.285714rem",
								margin: "0px 0.571429rem",
							}}
						></div>
                        <div className="w-100">
							<div className="customAt">
								<LocalizationProvider dateAdapter={AdapterDayjs} className = "date-picker">
									<DatePicker
										value={customEndDate}
										onChange={(date) => setCustomEndDate(date)}
                                        sx={{height: '100%'}}
									/>
								</LocalizationProvider>
							</div>
						</div>
                    </div>
                )}
                <button className="filter" onClick={handleFilterClick}>
					<span>Lọc</span>
				</button>
            </div>
        </div>
    )
}

export default DateFilter;
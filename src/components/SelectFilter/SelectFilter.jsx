/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import "./SelectFilter.css"
const SelectFilter = ({
    closePopup, 
    listObject, 
    btnRef, 
    currentPage,
    totalPage,
    keyword,
    handleChangeKeyword,
    loadMoreData,
    onSelectDepartment
}) => {
    const popupRef = useRef(null);
    const listRef = useRef(null);
    const [loading, setLoading] = useState(false); // Trạng thái loading để kiểm soát tải thêm dữ liệu

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
            closePopup();
        }
    };

    const handleScroll = useCallback(() => {
        const list = listRef.current;
        if (!list || loading) return; // Nếu đang loading hoặc không có listRef thì không làm gì
        
        // Lấy các giá trị của thanh cuộn
        const scrollTop = list.scrollTop;
        const scrollHeight = list.scrollHeight;
        const clientHeight = list.clientHeight;

        // Kiểm tra nếu đã cuộn đến 80% của danh sách
        if (scrollTop + clientHeight >= scrollHeight * 0.8) {
            setLoading(true); // Đặt trạng thái loading để ngăn chặn việc gọi API nhiều lần
            loadMoreData().then(() => {
                setLoading(false); // Sau khi tải xong, bỏ trạng thái loading
            });
        }
    }, [loading, loadMoreData]);

    // Thêm sự kiện cuộn để tải thêm dữ liệu
    useEffect(() => {
        const list = listRef.current;
        if (list) {
            list.addEventListener('scroll', handleScroll);
        }

        // Cleanup: Xóa sự kiện khi component bị hủy hoặc listRef thay đổi
        return () => {
            if (list) {
                list.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleSelectDepartment = (selectedDepartment) => {
        // Gọi hàm selectDepartment từ ListBill để cập nhật filterBody
        onSelectDepartment(selectedDepartment);
    };

    return(
        <div ref={popupRef} className="container-filter">
            <div className="wrapper-filter">
                <div className="search_filter"> 
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#aaaeb5", fontSize: "14px" }} />
                    </div>
                    <input placeholder="Tìm kiếm" style={{ flex: 1, border: "none" }} value={keyword} onChange={handleChangeKeyword}/>
                </div>
                <div className="wrapper_select" ref={listRef}>
                    {listObject.map((item,index) => (
                        <div className="select_all" key={index} onClick={() => handleSelectDepartment(item)}>
                            <div>{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectFilter;
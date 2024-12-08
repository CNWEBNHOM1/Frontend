import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { getRoomMates } from "../../service/room";
import './MemberList.css';

function RoomMates() {
    const [roomMates, setRoomMates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = React.useRef();
    useEffect(() => {
        const fetchRoomMates = async () => {
            try {
                setLoading(true);
                const result = await getRoomMates();
                setRoomMates(result.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách thành viên:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoomMates();
    }, []);

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            scrollToMember(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < roomMates.length - 1) {
            setCurrentPage(currentPage + 1);
            scrollToMember(currentPage + 1);
        }
    };

    const scrollToMember = (index) => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            containerRef.current.scrollTo({
                left: containerWidth * index,
                behavior: 'smooth'
            });
        }
    };

    return (
        <> <Header />
            <div className="roommates-container">
                <h1 className="title">Danh Sách Thành Viên Cùng Phòng</h1>
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Đang tải danh sách thành viên...</p>
                    </div>
                ) : roomMates.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">👋</div>
                        <h2>Chào mừng bạn đến với KTX!</h2>
                        <p>Hiện tại bạn là thành viên duy nhất trong phòng.</p>
                        <p>Các bạn cùng phòng sẽ sớm được thêm vào.</p>
                    </div>
                ) : (
                    <div className="member-container" ref={containerRef}>
                        {roomMates.map((member, index) => (
                            <div key={index} className="member-detail-view">
                                <div className="member-card">
                                    <div className="member-avatar">
                                        <span className="avatar-text">
                                            {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <div className="member-info">
                                        <h2>{member.name}</h2>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <strong>MSSV:</strong> {member.sid}
                                            </div>
                                            <div className="info-item">
                                                <strong>Giới tính:</strong> {member.gender}
                                            </div>
                                            <div className="info-item">
                                                <strong>CCCD:</strong> {member.cccd}
                                            </div>
                                            <div className="info-item">
                                                <strong>Số điện thoại:</strong> {member.phone}
                                            </div>
                                            <div className="info-item">
                                                <strong>Địa chỉ:</strong>
                                                {`${member.address?.tinh}, ${member.address?.thanh}, ${member.address?.xa}`}
                                            </div>
                                            <div className="info-item">
                                                <strong>Khoa:</strong> {member.khoa}
                                            </div>
                                            <div className="info-item">
                                                <strong>Trường:</strong> {member.school}
                                            </div>
                                            {/* <div className="info-item">
                                            <strong>Kỳ học:</strong> {member.kyhoc[0]?.ky || "Chưa có kỳ học"}
                                        </div> */}
                                            <div className="info-item">
                                                {/* <strong>Phòng:</strong> {member.kyhoc[0]?.phong || "Chưa có phòng"} */}
                                            </div>
                                        </div>
                                        <div className="pagination">
                                            <button
                                                onClick={handlePrevious}
                                                disabled={currentPage === 0}
                                            >
                                                Trước
                                            </button>
                                            {roomMates.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={currentPage === index ? 'active' : ''}
                                                    onClick={() => {
                                                        setCurrentPage(index);
                                                        scrollToMember(index);
                                                    }}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={handleNext}
                                                disabled={currentPage === roomMates.length - 1}
                                            >
                                                Sau
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>

    );
}

export default RoomMates;
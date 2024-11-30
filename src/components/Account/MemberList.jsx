import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaIdCard, FaMapMarkerAlt, FaUniversity } from 'react-icons/fa';
import Header from "../Header/Header";
import { getRoomMates } from "../../service/room";
import './MemberList.css';

function RoomMates() {
    const [roomMates, setRoomMates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 1; // Mỗi trang một thành viên

    useEffect(() => {
        const fetchRoomMates = async () => {
            try {
                const result = await getRoomMates();
                setRoomMates(result.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách thành viên:", error);
            }
        };
        fetchRoomMates();
    }, []);

    // Tính toán phân trang
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = roomMates.slice(indexOfFirstMember, indexOfLastMember);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="roommates-container">
            <Header title={"Trang chủ/Thành viên"} />

            <div className="member-detail-view">
                {currentMembers.map((member, index) => (
                    <div key={index} className="member-card">
                        <div className="member-avatar">
                            <FaUser size={100} className="avatar-icon" />
                        </div>

                        <div className="member-info">
                            <h2>{member.name}</h2>

                            <div className="info-grid">
                                <div className="info-item">
                                    <FaIdCard className="icon" />
                                    <div>
                                        <strong>MSSV:</strong> {member.sid}
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaUser className="icon" />
                                    <div>
                                        <strong>Giới tính:</strong> {member.gender}
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaPhone className="icon" />
                                    <div>
                                        <strong>Số điện thoại:</strong> {member.phone}
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaMapMarkerAlt className="icon" />
                                    <div>
                                        <strong>Địa chỉ:</strong>
                                        {`${member.address?.tinh}, ${member.address?.thanh}, ${member.address?.xa}`}
                                    </div>
                                </div>

                                <div className="info-item">
                                    <FaUniversity className="icon" />
                                    <div>
                                        <strong>Trường:</strong> {member.school}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {roomMates.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RoomMates;
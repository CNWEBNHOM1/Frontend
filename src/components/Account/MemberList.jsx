import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { getRoomMates } from "../../service/room";
import './MemberList.css';

function RoomMates() {
    const [roomMates, setRoomMates] = useState([]);

    useEffect(() => {
        const fetchRoomMates = async () => {
            try {
                const result = await getRoomMates();
                setRoomMates(result.data); // Lưu danh sách thành viên vào state
            } catch (error) {
                console.error("Lỗi khi tải danh sách thành viên:", error);
            }
        };
        fetchRoomMates();
    }, []);

    return (
        <>
            <Header title={"Trang chủ/Thành viên"} />
            <div className="member-list">
                <h2>Danh Sách Thành Viên Cùng Phòng</h2>
                <ul>
                    {roomMates.map((member, index) => (
                        <li key={index} className="member-item">
                            <p><strong>Tên:</strong> {member.name}</p>
                            <p><strong>Giới tính:</strong> {member.gender}</p>
                            <p><strong>MSSV:</strong> {member.sid}</p>
                            <p><strong>CCCD:</strong> {member.cccd}</p>
                            <p><strong>Số điện thoại:</strong> {member.phone}</p>
                            <p><strong>Địa chỉ:</strong> {`${member.address?.tinh}, ${member.address?.thanh}, ${member.address?.xa}`}</p>
                            <p><strong>Khoa:</strong> {member.khoa}</p>
                            <p><strong>Trường:</strong> {member.school}</p>
                            <p><strong>Kỳ học:</strong> {member.kyhoc[0]?.ky || "Chưa có kỳ học"}</p>
                            <p><strong>Phòng:</strong> {member.kyhoc[0]?.phong || "Chưa có phòng"}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default RoomMates;

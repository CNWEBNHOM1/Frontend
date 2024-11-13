import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import { getRoomMates } from "../../service/room";
import './MemberList.css';

function RoomMates() {
    const [roomMates, setRoomMates] = useState([]);

    useEffect(() => {
        const get = async () => {
            const result = await getRoomMates();
            setRoomMates(result.data); // Sửa thành setRoomMates
        };
        get();
    }, []);

    useEffect(() => {
        console.log(roomMates);
    }, [roomMates]);

    return (
        <>
            <Header title={"Trang chủ/Thành viên"} />
            <div className="member-list">
                <h2>Danh Sách Thành Viên Cùng Phòng</h2>
                <ul>
                    {roomMates.map((member, index) => (
                        <li key={index} className="member-item">
                            <p><strong>Tên:</strong> {member.name}</p>
                            <p><strong>MSSV:</strong> {member.mssv}</p>
                            <p><strong>Khoa/Viện:</strong> {member.khoaVien}</p>
                            <p><strong>Khóa:</strong> {member.khoa}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default RoomMates;

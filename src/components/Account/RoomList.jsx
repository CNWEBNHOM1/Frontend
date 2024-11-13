import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomList.css';
import Header from "../Header/Header";
import { getRoom } from "../../service/room";

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const roomsPerPage = 1; // Số phòng hiển thị trên mỗi trang

    useEffect(() => {
        const get = async () => {
            const result = await getRoom();
            setRooms(result.data);
        };
        get();
    }, []);

    useEffect(() => {
        console.log(rooms);
    }, [rooms]);

    // Tính toán dữ liệu cho trang hiện tại
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

    // Số trang
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    // Chuyển sang trang trước
    const goToPreviousPage = () => {
        setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
    };

    // Chuyển sang trang sau
    const goToNextPage = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    return (
        <>
            <Header title={"Trang chủ/Profile"} />
            <div className="room-list">
                <h2>Danh Sách Các Phòng</h2>
                {currentRooms.length > 0 ? (
                    <ul>
                        {currentRooms.map((room, index) => (
                            <li key={index} className="room-item">
                                <p><strong>Phòng:</strong> {room.name}</p>
                                <p><strong>Khu:</strong> {room.department}</p>
                                <p><strong>Số thành viên hiện tại:</strong> {room.occupiedSlots > 0 ? `${room.occupiedSlots} thành viên` : 'Trống'}</p>
                                <p><strong>Sức chứa:</strong> {room.capacity} người</p>
                                <p><strong>Điều hòa:</strong> {room.dieuhoa ? 'Có' : 'Không'}</p>
                                <p><strong>Bình nước nóng:</strong> {room.binhnuocnong ? 'Có' : 'Không'}</p>
                                <p><strong>Giá trị trang bị:</strong> {room.giatrangbi.toLocaleString()} VND</p>
                                <p><strong>Đơn giá điện:</strong> {room.dongiadien.toLocaleString()} VND</p>
                                <p><strong>Số điện cuối:</strong> {room.sodiencuoi}</p>
                                <p><strong>Số phòng vệ sinh:</strong> {room.sophongvs}</p>
                                <p><strong>Tiền nước:</strong> {room.tiennuoc.toLocaleString()} VND</p>
                                <p><strong>Tiền nợ:</strong> {room.tieno.toLocaleString()} VND</p>
                                <p><strong>Tình trạng:</strong> {room.tinhtrang}</p>
                                <p><strong>Tổng thu:</strong> {room.tongthu.toLocaleString()} VND</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có phòng nào.</p>
                )}

                {/* Điều hướng phân trang */}
                <div className="pagination">
                    <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                        Trang trước
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                        Trang sau
                    </button>
                </div>
            </div>
        </>
    );
}

export default RoomList;

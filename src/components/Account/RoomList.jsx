import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomList.css';
import Header from "../Header/Header";
import { rooms as mockRooms } from './mockRooms.js';
// function RoomList() {
//     const [rooms, setRooms] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Giả sử đây là API lấy danh sách các phòng
//         axios.get('/api/rooms')
//             .then(response => {
//                 setRooms(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Lỗi khi tải danh sách phòng:", error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <p>Đang tải danh sách phòng...</p>;
//     }

//     return (
//         <>
//             <Header title={"Trang chủ/Profile"} />
//             <div className="room-list">
//                 <h2>Danh Sách Các Phòng</h2>
//                 {rooms.length > 0 ? (
//                     <ul>
//                         {rooms.map((room, index) => (
//                             <li key={index} className="room-item">
//                                 <p><strong>Phòng:</strong> {room.name}</p>
//                                 <p><strong>Khu:</strong> {room.zone}</p>
//                                 <p><strong>Trạng thái:</strong> {room.memberCount > 0 ? `${room.memberCount} thành viên` : 'Trống'}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>Không có phòng nào.</p>
//                 )}
//             </div>
//         </>
//     );
// }
function RoomList() {
    const [rooms] = useState(mockRooms);

    return (
        <>
            <Header title={"Trang chủ/Profile"} />
            <div className="room-list">
                <h2>Danh Sách Các Phòng</h2>
                <ul>
                    {rooms.map((room, index) => (
                        <li key={index} className="room-item">
                            <p><strong>Phòng:</strong> {room.name}</p>
                            <p><strong>Khu:</strong> {room.zone}</p>
                            <p><strong>Trạng thái:</strong> {room.memberCount > 0 ? `${room.memberCount} thành viên` : 'Trống'}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
export default RoomList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberList.css';
import { members as mockMembers } from './mockData.js'
import Header from "../Header/Header";
// function MemberList({ roomId }) {
//     const [members, setMembers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Giả sử đây là API lấy danh sách thành viên trong cùng phòng
//         axios.get(`/api/rooms/${roomId}/members`)
//             .then(response => {
//                 setMembers(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Lỗi khi tải danh sách thành viên:", error);
//                 setLoading(false);
//             });
//     }, [roomId]);

//     if (loading) {
//         return <p>Đang tải danh sách thành viên...</p>;
//     }

//     return (
//         <div className="member-list">
//             <h2>Danh Sách Thành Viên Cùng Phòng</h2>
//             {members.length > 0 ? (
//                 <ul>
//                     {members.map((member, index) => (
//                         <li key={index} className="member-item">
//                             <p><strong>Tên:</strong> {member.name}</p>
//                             <p><strong>MSSV:</strong> {member.mssv}</p>
//                             <p><strong>Khoa/Viện:</strong> {member.khoaVien}</p>
//                             <p><strong>Khóa:</strong> {member.khoa}</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Không có thành viên nào trong phòng này.</p>
//             )}
//         </div>
//     );
// }
function MemberList() {
    const [members] = useState(mockMembers);

    return (
        <>
            <Header title={"Trang chủ/Thành viên"} />
            <div className="member-list">
                <h2>Danh Sách Thành Viên Cùng Phòng</h2>
                <ul>
                    {members.map((member, index) => (
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

export default MemberList;

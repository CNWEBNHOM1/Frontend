import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BillList.css';

// function BillList({ roomId, month, year }) {
//     const [bills, setBills] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Giả sử đây là API lấy hóa đơn điện nước theo phòng và tháng
//         axios.get(`/api/rooms/${roomId}/bills?month=${month}&year=${year}`)
//             .then(response => {
//                 setBills(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error("Lỗi khi tải danh sách hóa đơn:", error);
//                 setLoading(false);
//             });
//     }, [roomId, month, year]);

//     if (loading) {
//         return <p>Đang tải danh sách hóa đơn...</p>;
//     }

//     return (
//         <div className="bill-list">
//             <h2>Danh Sách Hóa Đơn Điện Nước - Tháng {month}/{year}</h2>
//             {bills.length > 0 ? (
//                 <ul>
//                     {bills.map((bill, index) => (
//                         <li key={index} className="bill-item">
//                             <p><strong>Ngày lập:</strong> {bill.date}</p>
//                             <p><strong>Tiền điện:</strong> {bill.electricityCost} VNĐ</p>
//                             <p><strong>Tiền nước:</strong> {bill.waterCost} VNĐ</p>
//                             <p><strong>Tổng cộng:</strong> {bill.totalCost} VNĐ</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Không có hóa đơn nào trong tháng này.</p>
//             )}
//         </div>
//     );
// }
function BillList({ roomId, month, year }) {
    // Dữ liệu giả định để kiểm tra hiển thị
    const mockBills = [
        {
            date: "2024-11-01",
            electricityCost: 150000,
            waterCost: 50000,
            totalCost: 200000,
        },
        {
            date: "2024-11-15",
            electricityCost: 160000,
            waterCost: 55000,
            totalCost: 215000,
        },
    ];

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Sử dụng dữ liệu giả định thay vì gọi API
        setTimeout(() => {
            setBills(mockBills);
            setLoading(false);
        }, 1000); // Giả lập thời gian chờ như khi gọi API
    }, [roomId, month, year]);

    if (loading) {
        return <p>Đang tải danh sách hóa đơn...</p>;
    }

    return (
        <div className="bill-list">
            <h2>Danh Sách Hóa Đơn Điện Nước - Tháng {month}/{year}</h2>
            {bills.length > 0 ? (
                <ul>
                    {bills.map((bill, index) => (
                        <li key={index} className="bill-item">
                            <p><strong>Ngày lập:</strong> {bill.date}</p>
                            <p><strong>Tiền điện:</strong> {bill.electricityCost.toLocaleString()} VNĐ</p>
                            <p><strong>Tiền nước:</strong> {bill.waterCost.toLocaleString()} VNĐ</p>
                            <p><strong>Tổng cộng:</strong> {bill.totalCost.toLocaleString()} VNĐ</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Không có hóa đơn nào trong tháng này.</p>
            )}
        </div>
    );
}

export default BillList;

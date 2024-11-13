import React, { useState, useEffect } from 'react';
import './BillList.css';
import { getListBills } from '../../service/room';

function BillList({ roomId, month, year }) {
    const [listBills, setListBills] = useState([]);

    useEffect(() => {
        const get = async () => {
            try {
                const result = await getListBills({ roomId, month, year });
                setListBills(result); // Cập nhật listBills với dữ liệu từ API
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hóa đơn:", error);
            }
        };
        get();
    }, [roomId, month, year]);

    useEffect(() => {
        console.log(listBills);
    }, [listBills]);

    return (
        <div className="bill-list">
            <h2>Danh Sách Hóa Đơn Điện Nước - Tháng {month}/{year}</h2>
            {listBills.length > 0 ? (
                <ul>
                    {listBills.map((bill, index) => (
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

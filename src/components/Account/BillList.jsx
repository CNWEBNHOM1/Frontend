import React, { useState, useEffect } from 'react';
import './BillList.css';
import { getListBills } from '../../service/room';

function BillList({ roomId, month, year }) {
    const [listBills, setListBills] = useState(null);

    useEffect(() => {
        const get = async () => {
            try {
                const result = await getListBills({ roomId, month, year });
                setListBills(result.data); // Cập nhật listBills với dữ liệu từ API
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hóa đơn:", error);
            }
        };
        get();
    }, [roomId, month, year]);

    useEffect(() => {
        console.log(listBills);
    }, [listBills]);

    const handleUpload = (billId) => {
        console.log("Uploading image for bill ID:", billId);
        // Thêm logic upload ảnh tại đây
    };

    return (
        <div className="bill-list">
            <h2>Danh Sách Hóa Đơn Điện Nước - Tháng {month}/{year}</h2>
            {listBills != null ? (
                listBills.length > 0 ? (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {listBills.map((bill, index) => (
                            <li
                                key={index}
                                className="bill-item"
                                style={{
                                    border: "1px solid #ddd",
                                    padding: "15px",
                                    borderRadius: "5px",
                                    marginBottom: "10px",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <p><strong>Tên phòng:</strong> {bill.room?.name || "Không rõ"}</p>
                                <p><strong>Số điện đầu:</strong> {bill.sodiendau}</p>
                                <p><strong>Số điện cuối:</strong> {bill.sodiencuoi}</p>
                                <p><strong>Đơn giá:</strong> {bill.room?.dongiadien || 0} VNĐ</p>
                                <p><strong>Thành tiền:</strong> {bill.thanhtien} VNĐ</p>
                                <p><strong>Hạn đóng:</strong> {new Date(bill.handong).toLocaleString()}</p>
                                <p><strong>Trạng thái:</strong> {bill.trangthai} </p>

                                <button
                                    onClick={() => handleUpload(bill._id)}
                                    style={{
                                        padding: "10px 15px",
                                        backgroundColor: "#007bff",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Up Ảnh Chuyển Khoản Thành Công
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có hóa đơn nào trong tháng này.</p>
                )
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    );
}

export default BillList;

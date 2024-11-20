import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './BillList.css';
import { getListBills } from '../../service/bills.jsx';

function BillList({ roomId, month, year }) {
    const [listBills, setListBills] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const get = async () => {
            try {
                const result = await getListBills({ roomId, month, year });
                setListBills(result.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hóa đơn:", error);
            }
        };
        get();
    }, [roomId, month, year]);

    const handleUpload = (billId) => {
        navigate(`/user/anhhhoadon`, { state: { billId } }); // Truyền billId qua state
    };

    return (
        <div className="bill-list">
            <h2>Danh Sách Hóa Đơn Điện Nước - Tháng {month}/{year}</h2>
            {listBills != null ? (
                listBills.length > 0 ? (
                    <table className="bill-table">
                        <thead>
                            <tr>
                                <th>Tên phòng</th>
                                <th>Số điện đầu</th>
                                <th>Số điện cuối</th>
                                <th>Đơn giá (VNĐ)</th>
                                <th>Thành tiền (VNĐ)</th>
                                <th>Hạn đóng</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listBills.map((bill, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{bill.room?.name || "Không rõ"}</td>
                                    <td>{bill.sodiendau}</td>
                                    <td>{bill.sodiencuoi}</td>
                                    <td>{bill.room?.dongiadien || 0}</td>
                                    <td>{bill.thanhtien}</td>
                                    <td>{new Date(bill.handong).toLocaleString()}</td>
                                    <td>{bill.trangthai}</td>
                                    <td>
                                        <button
                                            className="upload-button"
                                            onClick={() => handleUpload(bill._id)} // Điều hướng khi click
                                        >
                                            Up Ảnh
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

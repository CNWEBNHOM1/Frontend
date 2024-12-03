import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getListBills } from '../../service/bills';
import './BillList.css';

function BillList() {
    const [bills, setBills] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        trangthai: '',
        sortBy: 'createAt',
        order: 'asc',
        limit: 10
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBills();
    }, [currentPage, filters]);

    const fetchBills = async () => {
        try {
            setIsLoading(true);
            const result = await getListBills({
                ...filters,
                page: currentPage
            });
            setBills(result.data.bills);
        } catch (error) {
            setError(error.message);
            console.error("Lỗi khi lấy danh sách hóa đơn:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = (e) => {
        setFilters(prev => ({ ...prev, trangthai: e.target.value }));
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        const [sortBy, order] = e.target.value.split('-');
        setFilters(prev => ({ ...prev, sortBy, order }));
        setCurrentPage(1);
    };

    const handleUpload = (billId) => {
        navigate(`/user/anhhhoadon`, { state: { billId } });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="bill-list-container">
            <div className="bill-list-header">
                <h1 className="bill-list-title">Danh Sách Hóa Đơn Điện Nước</h1>
                <div className="filter-section">
                    <select
                        className="filter-select"
                        value={filters.trangthai}
                        onChange={handleStatusChange}
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã đóng">Đã đóng</option>
                        <option value="Chưa đóng">Chưa đóng</option>
                        <option value="Quá hạn">Quá hạn</option>
                    </select>

                    <select
                        className="filter-select"
                        value={`${filters.sortBy}-${filters.order}`}
                        onChange={handleSortChange}
                    >
                        <option value="createAt-asc">Ngày tạo (cũ nhất)</option>
                        <option value="createAt-desc">Ngày tạo (mới nhất)</option>
                        <option value="thanhtien-asc">Thành tiền (thấp đến cao)</option>
                        <option value="thanhtien-desc">Thành tiền (cao đến thấp)</option>
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="loading">Đang tải dữ liệu...</div>
            ) : bills.length === 0 ? (
                <div className="no-bills">Không có hóa đơn nào.</div>
            ) : (
                <div className="bill-table-wrapper">
                    <table className="bill-table">
                        <thead>
                            <tr>
                                <th>Tên phòng</th>
                                <th>Số điện đầu</th>
                                <th>Số điện cuối</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                                <th>Hạn đóng</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.room?.name || "Không rõ"}</td>
                                    <td>{bill.sodiendau}</td>
                                    <td>{bill.sodiencuoi}</td>
                                    <td>{formatCurrency(bill.room?.dongiadien || 0)}</td>
                                    <td>{formatCurrency(bill.thanhtien)}</td>
                                    <td>{new Date(bill.handong).toLocaleString('vi-VN')}</td>
                                    <td>
                                        <span className={`status-badge status-${bill.trangthai.toLowerCase().replace(/\s+/g, '-')}`}>
                                            {bill.trangthai}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="upload-button"
                                            onClick={() => handleUpload(bill._id)}
                                        >
                                            Up Ảnh
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default BillList;
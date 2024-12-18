/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getListBills } from '../../service/bills';
import EmptyState from './EmptyState';
import { getBillPayment } from '../../service/bills';
import './BillList.css';
import Header from "../../components/Header/Header";

function BillList() {
    const [bills, setBills] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        trangthai: '',
        sortBy: 'createAt',
        order: 'asc',
        limit: 100
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBills();
    }, [currentPage, filters]);

    const fetchBills = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getListBills({
                ...filters,
                page: currentPage
            });

            if (!response) {
                setBills({ data: { bills: [] } });
                return;
            }

            setBills(response);
        } catch (error) {
            console.error("Lỗi:", error);
            if (error.message === "Bill not found") {
                setBills({ data: { bills: [] } });
            } else {
                setError(error.message);
            }
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const handlePayment = async (billId) => {
        try {
            const returnUrl = `${window.location.origin}/user/payment-return`;
            const data = await getBillPayment(billId, returnUrl);
            if (data.status === 'success' && data.data) {
                window.location.href = data.data;
            } else {
                alert('Có lỗi xảy ra khi tạo link thanh toán');
            }
        } catch (error) {
            console.error("Lỗi khi tạo URL thanh toán:", error);
            alert("Có lỗi xảy ra khi tạo link thanh toán");
        }
    };

    if (isLoading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    if (!bills?.data?.bills && !filters.trangthai) {
        return <EmptyState />;
    }

    return (
        <>
            <Header />
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
                            <option value="Đã đóng">Đã đóng</option>
                            <option value="Chưa đóng">Chưa đóng</option>
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

                <div className="bill-table-wrapper">
                    {bills?.data?.bills.length === 0 && (
                        <div className="no-bills-message">
                            Không tìm thấy hóa đơn nào phù hợp với điều kiện tìm kiếm
                        </div>
                    )}
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
                                <th>Thanh toán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills?.data?.bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.room?.department.name + "-" + bill.room?.name || "Không rõ"}</td>
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
                                            className="action-button-payment"
                                            onClick={() => handlePayment(bill._id)}
                                            disabled={bill.trangthai !== "Chưa đóng"}
                                        >
                                            Thanh toán
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default BillList;
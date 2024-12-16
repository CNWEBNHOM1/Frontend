/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './PaymentReturn.css';
import API_CONFIG from '../../config/ApiConfig';

function PaymentReturn() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const handlePaymentReturn = async () => {
            try {
                const response = await fetch(`${API_CONFIG.API_BASE_URL}/user/getBillPaymentReturn${location.search}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await response.json();
                setPaymentStatus(result.status);
                setPaymentData(result.data);
            } catch (error) {
                console.error('Lỗi khi xử lý kết quả thanh toán:', error);
                setPaymentStatus('error');
            }
        };

        handlePaymentReturn();
    }, [location]);

    const handleReturn = () => {
        // window.location.href = `${API_CONFIG.API_BASE_URL}/user/invoice`;
        navigate("/user/invoice");
    };

    return (
        <div className="payment-return-wrapper">
            <div className="payment-return-card">
                {paymentStatus === 'success' && paymentData.trangthai === "Thành công" && (
                    <div className="payment-content">
                        <div className="icon-wrapper success">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="payment-title success">Thanh toán thành công!</h2>
                        <div className="payment-details">
                            <div className="detail-item">
                                <span className="detail-label">Mã giao dịch:</span>
                                <span className="detail-value">{paymentData.magiaodich}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Số tiền:</span>
                                <span className="detail-value">
                                    {Number(paymentData.sotien / 100).toLocaleString('vi-VN')} VNĐ
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Nội dung:</span>
                                <span className="detail-value">{paymentData.thongtingiaodich}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Trạng thái:</span>
                                <span className="detail-value status-success">{paymentData.trangthai}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleReturn}
                            className="return-button"
                        >
                            Quay lại trang hóa đơn
                        </button>
                    </div>
                )}

                {/* Giữ nguyên phần failure và error */}
                {paymentStatus === 'success' && paymentData.trangthai === "Không thành công" && (
                    <div className="payment-content">
                        <div className="icon-wrapper failure">
                            <XCircle size={40} />
                        </div>
                        <h2 className="payment-title failure">Thanh toán thất bại!</h2>
                        <p className="payment-message">
                            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
                        </p>
                        <button
                            onClick={handleReturn}
                            className="return-button failure"
                        >
                            Quay lại trang hóa đơn
                        </button>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="payment-content">
                        <div className="icon-wrapper error">
                            <AlertCircle size={40} />
                        </div>
                        <h2 className="payment-title error">Lỗi xử lý!</h2>
                        <p className="payment-message">
                            Đã có lỗi xảy ra khi xử lý thanh toán. Vui lòng kiểm tra lại sau.
                        </p>
                        <button
                            onClick={handleReturn}
                            className="return-button error"
                        >
                            Quay lại trang hóa đơn
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentReturn;
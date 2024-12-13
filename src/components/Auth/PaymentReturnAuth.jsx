import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './PaymentReturnAuth.css';

function PaymentReturn() {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const handlePaymentReturn = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/getRoomPaymentReturn${location.search}`, {
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
        window.location.href = 'http://localhost:4444/auth/CheckRequest';
    };

    return (
        <div className="payment-return-auth-wrapper">
            <div className="payment-return-auth-card">
                {paymentStatus === 'success' && paymentData && (
                    <div className="payment-return-auth-content">
                        <div className="payment-return-auth-icon-success">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="payment-return-auth-title-success">Thanh toán thành công!</h2>
                        <div className="payment-return-auth-details">
                            <div className="payment-return-auth-detail-item">
                                <span className="payment-return-auth-detail-label">Mã giao dịch:</span>
                                <span className="payment-return-auth-detail-value">{paymentData.magiaodich}</span>
                            </div>
                            <div className="payment-return-auth-detail-item">
                                <span className="payment-return-auth-detail-label">Số tiền:</span>
                                <span className="payment-return-auth-detail-value">
                                    {(Number(paymentData.sotien) / 1000).toLocaleString('vi-VN')} VNĐ
                                </span>
                            </div>
                            <div className="payment-return-auth-detail-item">
                                <span className="payment-return-auth-detail-label">Nội dung:</span>
                                <span className="payment-return-auth-detail-value">{paymentData.thongtingiaodich}</span>
                            </div>
                            <div className="payment-return-auth-detail-item">
                                <span className="payment-return-auth-detail-label">Trạng thái:</span>
                                <span className="payment-return-auth-detail-value-success">{paymentData.trangthai}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleReturn}
                            className="payment-return-auth-button"
                        >
                            Quay lại trang yêu cầu
                        </button>
                    </div>
                )}

                {paymentStatus === 'failure' && (
                    <div className="payment-return-auth-content">
                        <div className="payment-return-auth-icon-failure">
                            <XCircle size={40} />
                        </div>
                        <h2 className="payment-return-auth-title-failure">Thanh toán thất bại!</h2>
                        <p className="payment-return-auth-message">
                            Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
                        </p>
                        <button
                            onClick={handleReturn}
                            className="payment-return-auth-button-failure"
                        >
                            Quay lại trang yêu cầu
                        </button>
                    </div>
                )}

                {paymentStatus === 'error' && (
                    <div className="payment-return-auth-content">
                        <div className="payment-return-auth-icon-error">
                            <AlertCircle size={40} />
                        </div>
                        <h2 className="payment-return-auth-title-error">Lỗi xử lý!</h2>
                        <p className="payment-return-auth-message">
                            Đã có lỗi xảy ra khi xử lý thanh toán. Vui lòng kiểm tra lại sau.
                        </p>
                        <button
                            onClick={handleReturn}
                            className="payment-return-auth-button-error"
                        >
                            Quay lại trang yêu cầu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentReturn;
import React, { useState } from 'react';
import axiosInstance from "../../service/axiosInstance"
import './UserReport.css';

function Report() {
    const [noidung, setNoidung] = useState(''); // Nội dung báo cáo
    const [message, setMessage] = useState(''); // Thông báo thành công
    const [error, setError] = useState(''); // Thông báo lỗi

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            if (!token) {
                setError('Bạn cần đăng nhập để gửi báo cáo.');
                return;
            }

            const response = await axiosInstance.post(
                'user/createReport', // Gửi yêu cầu tới đúng endpoint
                { noidung },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Token xác thực
                    }
                }
            );

            setMessage('Báo cáo đã được gửi thành công!');
            setNoidung(''); // Xóa nội dung báo cáo
            setError(''); // Xóa thông báo lỗi
        } catch (err) {
            // Xử lý lỗi
            if (err.response) {
                setError(`Lỗi: ${err.response.data.error || 'Không rõ lỗi'}`);
            } else {
                setError('Lỗi không kết nối được đến server.');
            }
            setMessage('');
        }
    };

    return (
        <div className="report-container">
            <h2>Tạo Báo Cáo</h2>
            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                    <label htmlFor="noidung">Nội dung báo cáo:</label>
                    <textarea
                        id="noidung"
                        value={noidung}
                        onChange={(e) => setNoidung(e.target.value)}
                        placeholder="Nhập nội dung báo cáo..."
                        rows="5"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Gửi Báo Cáo</button>
            </form>
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}
        </div>
    );
}

export default Report;

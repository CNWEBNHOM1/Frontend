import React, { useState } from 'react';
import axios from 'axios';
import './UserReport.css'; // Tạo file CSS nếu muốn tùy chỉnh giao diện

function Report() {
    const [noidung, setNoidung] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage
            const response = await axios.post('/api/createReport', { noidung }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('Báo cáo đã được gửi thành công!');
            setNoidung(''); // Xóa nội dung sau khi gửi
        } catch (error) {
            setMessage('Lỗi khi gửi báo cáo. Vui lòng thử lại.');
            console.error("Lỗi khi gửi báo cáo:", error);
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
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default Report;

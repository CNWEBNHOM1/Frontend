import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DormRequestFlow.css';
import Header from '../Header/Header';

const DormRequestFlow = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/user/myRequest', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`// lấy theo email
                }
            });
            console.log("123", response.data.data)
            setRequests(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            setError('Lỗi khi tải yêu cầu');
        } finally {
            setLoading(false);
        }
    }, []);

    const renderRequestStatus = () => (
        <div className="request-container">
            <h2>Yêu cầu của tôi</h2>
            {loading ? (
                <div className="loading">Đang tải danh sách yêu cầu...</div>
            ) : (
                <div className="request-list">
                    {requests.length > 0 ? (
                        requests.map(request => (
                            <div key={request._id} className="request-card">
                                <h3>Mã yêu cầu: {request._id}</h3>
                                <p className={`status ${request.trangthai.toLowerCase()}`}>
                                    Trạng thái: {request.trangthai}
                                </p>
                                <p>Phòng: {request.room.name}</p>
                                <p>Số tiền: {request.sotienphaitra} VNĐ</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-requests">Chưa có yêu cầu nào</p>
                    )}
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    );

    return (
        <div className='dashboard-user'>
            <Header title={"Trang chủ"} />

            <div className="container">
                {renderRequestStatus()}
            </div>
        </div>
    );
};

export default DormRequestFlow;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CheckRequest.css';
import Header from '../Header/Header';
import API_CONFIG from '../../config/ApiConfig';

const DormRequestFlow = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_CONFIG.API_BASE_URL}/user/myRequest`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log("API response:", response.data.data);
                setRequests(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                setError('Lỗi khi tải yêu cầu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
        <>
            <Header title={""} />
            <div className='dashboard-user'>


                <div className="container-b">
                    {renderRequestStatus()}
                </div>
            </div>
        </>
    );
};

export default DormRequestFlow;
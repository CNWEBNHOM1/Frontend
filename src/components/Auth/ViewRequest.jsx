import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';

const ViewRequest = () => {
    const [requests, setRequests] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/request/view');
                setRequests(response.data);
            } catch (error) {
                openNotificationWithIcon('error', error.response?.data?.message || 'Đã xảy ra lỗi!');
            }
        };

        fetchRequests();
    }, []);

    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: type === 'success' ? 'Thành công' : 'Thất bại',
            description: message,
        });
    };

    return (
        <>
            {contextHolder}
            <div>
                <h1>Danh sách yêu cầu</h1>
                {requests.map((request, index) => (
                    <div key={index}>
                        <p>Họ và tên: {request.fullName}</p>
                        <p>Tòa nhà: {request.building}</p>
                        <p>Phòng: {request.room}</p>
                        <p>Trạng thái: {request.status}</p>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ViewRequest;

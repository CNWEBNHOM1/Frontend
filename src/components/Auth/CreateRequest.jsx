import React, { useState } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import './CreateRequest.css';
const CreateRequest = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        building: '',
        room: '',
        transferImage: null,
    });

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: type === 'success' ? 'Thành công' : 'Thất bại',
            description: message,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('fullName', formData.fullName);
        data.append('building', formData.building);
        data.append('room', formData.room);
        data.append('transferImage', formData.transferImage);

        try {
            const response = await axios.post('http://localhost:5000/api/request/create', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 201) {
                openNotificationWithIcon('success', 'Yêu cầu đã được gửi thành công!');
            }
        } catch (error) {
            openNotificationWithIcon('error', error.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, transferImage: e.target.files[0] });
    };

    return (
        <>
            {contextHolder}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Tòa nhà:</label>
                    <input
                        type="text"
                        value={formData.building}
                        onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Phòng:</label>
                    <input
                        type="text"
                        value={formData.room}
                        onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Ảnh chuyển khoản:</label>
                    <input type="file" onChange={handleFileChange} required />
                </div>
                <button type="submit">Gửi yêu cầu</button>
            </form>
        </>
    );
};

export default CreateRequest;

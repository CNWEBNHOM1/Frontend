import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';

const SelectRoom = () => {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [timer, setTimer] = useState(30 * 60); // 30 phút tính bằng giây

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message) => {
        api[type]({
            message: type === 'success' ? 'Thành công' : 'Thất bại',
            description: message,
        });
    };

    const handleRoomSelect = async (room) => {
        setSelectedRoom(room);
        try {
            const response = await axios.post('http://localhost:5000/api/room/update-1', { room });
            if (response.status === 200) {
                openNotificationWithIcon('success', 'Phòng đã được giữ chỗ thành công!');
            }
        } catch (error) {
            openNotificationWithIcon('error', error.response?.data?.message || 'Đã xảy ra lỗi!');
        }
    };

    useEffect(() => {
        if (selectedRoom && timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

            if (timer === 0) {
                axios.post('http://localhost:5000/api/room/update-2', { room: selectedRoom });
                setSelectedRoom('');
                openNotificationWithIcon('error', 'Thời gian giữ chỗ đã hết, vui lòng chọn lại phòng.');
            }

            return () => clearInterval(interval);
        }
    }, [selectedRoom, timer]);

    return (
        <>
            {contextHolder}
            <div>
                <h1>Chọn Phòng</h1>
                <button onClick={() => handleRoomSelect('101')}>Phòng 101</button>
                <button onClick={() => handleRoomSelect('102')}>Phòng 102</button>
                <button onClick={() => handleRoomSelect('103')}>Phòng 103</button>
                {selectedRoom && (
                    <p>
                        Phòng {selectedRoom} đã được giữ chỗ. Thời gian còn lại:{' '}
                        {Math.floor(timer / 60)} phút {timer % 60} giây.
                    </p>
                )}
            </div>
        </>
    );
};

export default SelectRoom;

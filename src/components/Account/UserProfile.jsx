
import React, { useState } from 'react';
import './UserProfile.css';
import Header from "../Header/Header";
function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: 'Nguyen Van A',
        email: 'nguyenvana@example.com',
        phone: '0123456789',
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSaveClick = () => {
        // Thực hiện lưu dữ liệu
        console.log('Thông tin đã lưu:', user);
        setIsEditing(false);
    };

    return (
        <>
            <Header title={"Trang chủ/Profile"} />
            <div className="user-profile">
                <h2>Thông Tin Cá Nhân</h2>
                <form>
                    <div>
                        <label>Tên:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{user.name}</span>
                        )}
                    </div>
                    <div>
                        <label>Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{user.email}</span>
                        )}
                    </div>
                    <div>
                        <label>Số điện thoại:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={user.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{user.phone}</span>
                        )}
                    </div>
                </form>
                {isEditing ? (
                    <div>
                        <button onClick={handleSaveClick}>Lưu</button>
                        <button onClick={handleCancelClick}>Hủy</button>
                    </div>
                ) : (
                    <button onClick={handleEditClick}>Chỉnh sửa</button>
                )}
            </div>
        </>
    );

}

export default UserProfile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import Header from "../Header/Header";
import { getProfile } from "../../service/Profile";

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // State để theo dõi trang hiện tại
    const [isEditing, setIsEditing] = useState(false); // State để theo dõi chế độ chỉnh sửa

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                setProfile(result.data); // Gán dữ liệu profile từ API
            } catch (error) {
                console.error("Lỗi khi tải thông tin cá nhân:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await axios.put('/api/profile/update', profile); // Gửi yêu cầu cập nhật thông tin trực tiếp
            setIsEditing(false); // Đóng chế độ chỉnh sửa sau khi cập nhật thành công
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false); // Hủy chế độ chỉnh sửa
    };

    const goToPreviousPage = () => {
        setCurrentPage(1);
    };

    const goToNextPage = () => {
        setCurrentPage(2);
    };

    if (!profile) {
        return <p>Đang tải thông tin cá nhân...</p>;
    }
    return (
        <>
            <Header title={"Trang chủ/Profile"} />
            {!profile ? (
                <div className="loading">Đang tải thông tin cá nhân...</div>
            ) : (
                <div className="user-profile">
                    <h2>Thông Tin Cá Nhân</h2>
                    <form>
                        {currentPage === 1 ? (
                            <>
                                <div>
                                    <label>Tên:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={profile.name}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile.name}</span>
                                    )}
                                </div>
                                <div>
                                    <label>Ngày sinh:</label>
                                    <span>
                                        {profile?.ngaysinh?.$date
                                            ? new Date(profile.ngaysinh.$date).toLocaleDateString()
                                            : profile?.ngaysinh
                                                ? new Date(profile.ngaysinh).toLocaleDateString()
                                                : "Không có dữ liệu"}
                                    </span>
                                </div>
                                <div>
                                    <label>Giới tính:</label>
                                    <span>{profile.gender}</span>
                                </div>
                                <div>
                                    <label>Số điện thoại:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={profile.phone}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile.phone}</span>
                                    )}
                                </div>
                                <div>
                                    <label>Địa chỉ:</label>
                                    <span>{`${profile.address?.tinh}, ${profile.address?.thanh}, ${profile.address?.xa}`}</span>
                                </div>
                                <div>
                                    <label>CCCD:</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="cccd"
                                            value={profile.cccd}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        <span>{profile.cccd}</span>
                                    )}
                                </div>
                                <div>
                                    <label>Ưu tiên:</label>
                                    <span>{profile.priority ? "Có" : "Không"}</span>
                                </div>
                                <div>
                                    <label>Khóa:</label>
                                    <span>{profile.khoa}</span>
                                </div>
                                <div>
                                    <label>Trường:</label>
                                    <span>{profile.school}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label>Trạng thái:</label>
                                    <span>{profile.trangthai}</span>
                                </div>
                                <div>
                                    <label>Phòng:</label>
                                    <span>{profile.kyhoc[0]?.phong || "Chưa có phòng"}</span>
                                </div>
                                <div>
                                    <label>Kỳ học:</label>
                                    <span>{profile.kyhoc[0]?.ky}</span>
                                </div>
                            </>
                        )}
                    </form>

                    <div className="pagination">
                        {currentPage > 1 && (
                            <button onClick={goToPreviousPage}>
                                Trang trước
                            </button>
                        )}
                        {currentPage < 2 && (
                            <button onClick={goToNextPage}>
                                Trang sau
                            </button>
                        )}
                    </div>

                    <div className="action-buttons">
                        {isEditing ? (
                            <>
                                <button className="save-btn" onClick={handleSaveClick}>
                                    Lưu thay đổi
                                </button>
                                <button className="cancel-btn" onClick={handleCancelClick}>
                                    Hủy
                                </button>
                            </>
                        ) : (
                            <button className="edit-btn" onClick={handleEditClick}>
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default UserProfile;

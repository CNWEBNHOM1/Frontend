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
                setProfile(result.data); // Gán dữ liệu đầu tiên trong mảng vào profile
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
                                        value={profile?.name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{profile.name}</span>
                                )}
                            </div>
                            <div>
                                <label>Email:</label>
                                <span>{profile?.email}</span>
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
                                    <span>{profile?.phone}</span>
                                )}
                            </div>
                            <div>
                                <label>Địa chỉ:</label>
                                <span>{`${profile?.address?.tinh}, ${profile?.address?.thanh}, ${profile?.address?.xa}`}</span>
                            </div>
                            <div>
                                <label>Ngày sinh:</label>
                                <span>{new Date(profile.ngaysinh).toLocaleDateString()}</span>
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
                                <label>Khoa:</label>
                                <span>{profile.khoa}</span>
                            </div>
                            <div>
                                <label>Lớp:</label>
                                <span>{profile.lop}</span>
                            </div>
                            <div>
                                <label>Mã ngành:</label>
                                <span>{profile.ma_nganh}</span>
                            </div>
                            <div>
                                <label>Ngành:</label>
                                <span>{profile.nganh}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label>Trạng thái:</label>
                                <span>{profile.trangthai}</span>
                            </div>
                            <div>
                                <label>Trường Khoa/Viện:</label>
                                <span>{profile.truong_khoa_vien}</span>
                            </div>
                            <div>
                                <label>Tên người thân:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="familyname"
                                        value={profile.familyname}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{profile.familyname}</span>
                                )}
                            </div>
                            <div>
                                <label>Quan hệ người thân:</label>
                                <span>{profile.family}</span>
                            </div>
                            <div>
                                <label>Số điện thoại người thân:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="familyphone"
                                        value={profile.familyphone}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{profile.familyphone}</span>
                                )}
                            </div>
                            <div>
                                <label>Ngày hết hạn:</label>
                                <span>{new Date(profile.holdexpirity).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <label>Số ID sinh viên:</label>
                                <span>{profile.sid}</span>
                            </div>
                            <div>
                                <label>Phòng đã chọn:</label>
                                <span>{profile.roomselected}</span>
                            </div>
                            <div>
                                <label>Khu đã chọn:</label>
                                <span>{profile.departmentselected}</span>
                            </div>
                            <div>
                                <label>Ngày đăng ký:</label>
                                <span>{new Date(profile.ngaydangky).toLocaleDateString()}</span>
                            </div>
                        </>
                    )}
                </form>

                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={goToPreviousPage}>Trang trước</button>
                    )}
                    {currentPage < 2 && (
                        <button onClick={goToNextPage}>Trang sau</button>
                    )}
                </div>

                {/* Nút Chỉnh sửa, Lưu, Hủy */}
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

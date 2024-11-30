import React, { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaIdCard, FaMapMarkerAlt, FaUniversity, FaBirthdayCake } from 'react-icons/fa';
import axios from 'axios';
import './UserProfile.css';
import Header from "../Header/Header";
import { getProfile } from "../../service/Profile";

function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                setProfile(result.data);
            } catch (error) {
                console.error("Lỗi khi tải thông tin cá nhân:", error);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) {
        return <p>Đang tải thông tin cá nhân...</p>;
    }

    return (
        <div className="profile-container">
            <Header title={"Trang chủ/Hồ Sơ Cá Nhân"} />
            
            <div className="profile-detail-view">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <FaUser size={100} className="avatar-icon" />
                    </div>
                    
                    <div className="profile-info">
                        <h2>{profile.name}</h2>
                        
                        <div className="info-grid">
                            <div className="info-item">
                                <FaIdCard className="icon" />
                                <div>
                                    <strong>CCCD:</strong> {profile.cccd}
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <FaBirthdayCake className="icon" />
                                <div>
                                    <strong>Ngày sinh:</strong> 
                                    {profile.ngaysinh 
                                        ? new Date(profile.ngaysinh).toLocaleDateString() 
                                        : "Chưa cập nhật"}
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <FaPhone className="icon" />
                                <div>
                                    <strong>Số điện thoại:</strong> {profile.phone}
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <FaMapMarkerAlt className="icon" />
                                <div>
                                    <strong>Địa chỉ:</strong> 
                                    {`${profile.address?.tinh}, ${profile.address?.thanh}, ${profile.address?.xa}`}
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <FaUniversity className="icon" />
                                <div>
                                    <strong>Trường:</strong> {profile.school}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
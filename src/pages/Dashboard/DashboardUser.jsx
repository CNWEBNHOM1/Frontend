import React from 'react';
import Header from "../../components/Header/Header";
import { Home } from 'lucide-react';
import "./DashboardUser.css";
import logo_hust from '../../assets/icons/logo-soict-hust-1.png'; // Import ảnh
import toaktx from '../../assets/icons/toaktx.jpg'; // Import ảnh
import room from '../../assets/icons/room.jpg'; // Import ảnh

const DashboardUser = () => {
  return (
    <div className="dashboard-user">
      <Header title={"Trang chủ"} />

      <div className="max-w-7xl">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="banner-content">
            <img
              src={logo_hust}
              alt="SOICT Logo"
              className="soict-logo"
            />
            <div className="welcome-text">
              <h1>Chào mừng bạn đến với Ký túc xá SOICT!</h1>
              <p>Nơi an cư lạc nghiệp cho sinh viên Trường Công nghệ Thông tin và Truyền thông</p>
            </div>
          </div>
        </div>

        {/* Images Grid */}
        <div className="images-grid">
          <div className="image-card">
            <div className="image-container">
              <img
                src={toaktx}
                alt="Tòa nhà KTX"
              />
            </div>
            <h3>Tòa nhà Ký túc xá SOICT</h3>
            <p>Không gian hiện đại, an toàn và tiện nghi</p>
          </div>

          <div className="image-card">
            <div className="image-container">
              <img
                src={room}
                alt="Phòng KTX"
              />
            </div>
            <h3>Phòng ở sinh viên</h3>
            <p>Thiết kế thông minh, đầy đủ tiện nghi sinh hoạt</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="quick-info">
          <div className="info-header">
            <Home color="#C41E3A" size={24} />
            <h2>Thông tin nhanh</h2>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <h4>Địa chỉ</h4>
              <p>Đại học Bách Khoa Hà Nội</p>
            </div>
            <div className="info-item">
              <h4>Liên hệ</h4>
              <p>soict@hust.edu.vn</p>
            </div>
            <div className="info-item">
              <h4>Hotline</h4>
              <p>024.3869.2463</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserReport.css";

const Upanhreport = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null); // File ảnh
    const [noidung, setNoidung] = useState(""); // Nội dung báo cáo
    const [message, setMessage] = useState(""); // Thông báo

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage("Vui lòng chọn một tệp trước khi tải lên.");
            return;
        }

        if (!noidung.trim()) {
            setMessage("Vui lòng nhập nội dung báo cáo.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("minhchung", selectedFile); // Tên trường file phải khớp với Multer
            formData.append("noidung", noidung); // Gửi nội dung báo cáo
            const token = localStorage.getItem("token"); // Lấy token nếu cần xác thực

            await axios.post("http://localhost:5000/user/createReport", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Nếu backend yêu cầu xác thực
                },
            });

            setMessage("Báo cáo đã được gửi thành công!");
            setTimeout(() => {
                navigate("/user/report"); // Quay lại trang danh sách báo cáo
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi gửi báo cáo:", error);
            setMessage("Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.");
        }
    };

    return (
        <div className="upload-container">
            <h2>Tạo Báo Cáo</h2>
            <form onSubmit={handleUpload}>
                <div className="form-group">
                    <label htmlFor="noidung">Nội dung báo cáo:</label>
                    <textarea
                        id="noidung"
                        value={noidung}
                        onChange={(e) => setNoidung(e.target.value)}
                        placeholder="Nhập nội dung báo cáo..."
                        rows="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Tải lên minh chứng:</label>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Gửi Báo Cáo</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Upanhreport;

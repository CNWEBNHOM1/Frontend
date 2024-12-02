import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserReport.css";

const Upanhreport = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [noidung, setNoidung] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
    const [fileName, setFileName] = useState(""); // Để hiển thị tên file đã chọn

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage("Vui lòng chọn một tệp trước khi tải lên.");
            setMessageType("error");
            return;
        }

        if (!noidung.trim()) {
            setMessage("Vui lòng nhập nội dung báo cáo.");
            setMessageType("error");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("minhchung", selectedFile);
            formData.append("noidung", noidung);
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/user/createReport", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("Báo cáo đã được gửi thành công!");
            setMessageType("success");
            setTimeout(() => {
                navigate("/user/report");
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi gửi báo cáo:", error);
            setMessage("Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.");
            setMessageType("error");
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
                        placeholder="Nhập nội dung báo cáo của bạn ở đây..."
                        rows="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Minh chứng:</label>
                    <div className="file-upload-wrapper">
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        <label htmlFor="file" className="file-upload-label">
                            <i className="fas fa-cloud-upload-alt"></i>
                            {fileName ? fileName : "Chọn file minh chứng"}
                        </label>
                    </div>
                </div>
                <button type="submit" className="submit-button">
                    Gửi Báo Cáo
                </button>
            </form>
            {message && (
                <p className={`message ${messageType}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Upanhreport;
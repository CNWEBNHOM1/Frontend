import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Upanhhoadon.css";

const Upanhhoadon = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { billId } = location.state || {};

    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage("Vui lòng chọn một tệp trước khi tải lên.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("minhchung", selectedFile);
            formData.append("id", billId);
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/user/uploadProof", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("Hóa đơn đã được tải lên thành công!");
            setTimeout(() => {
                navigate("/user/invoice");
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi tải lên hóa đơn:", error);
            setMessage("Đã xảy ra lỗi khi tải lên. Vui lòng thử lại.");
        }
    };

    const handleClose = () => {
        navigate("/user/invoice");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Tải Lên Hóa Đơn Chuyển Khoản</h2>
                    <button className="close-button" onClick={handleClose}>×</button>
                </div>
                {billId && <div className="bill-id">Mã hóa đơn: {billId}</div>}
                <form onSubmit={handleUpload}>
                    <div className="file-input-container">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            id="file-input"
                        />
                        <label htmlFor="file-input" className="file-label">
                            {selectedFile ? selectedFile.name : 'Chọn ảnh hóa đơn'}
                        </label>
                    </div>
                    <button type="submit" className="upload-button">
                        Tải Lên
                    </button>
                </form>
                {message && (
                    <div className={`message ${message.includes('thành công') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Upanhhoadon;
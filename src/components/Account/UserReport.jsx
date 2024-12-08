import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, File, X } from 'lucide-react';
import "./UserReport.css";
import Header from "../../components/Header/Header";

const UserReport = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [noidung, setNoidung] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileRemove = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
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
                navigate("/user/dashboard");
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi gửi báo cáo:", error);
            setMessage("Đã xảy ra lỗi khi gửi báo cáo. Vui lòng thử lại.");
            setMessageType("error");
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <> <Header />
            <div className="report-container">
                <div className="report-card">
                    <h2 className="report-title">Tạo Báo Cáo</h2>
                    <form onSubmit={handleUpload} className="report-form">
                        <div className="form-group">
                            <label htmlFor="noidung">Nội dung báo cáo</label>
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
                            <label>Minh chứng</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden-input"
                                required
                            />
                            <div
                                onClick={triggerFileInput}
                                className="file-upload-area"
                            >
                                {selectedFile ? (
                                    <div className="file-selected">
                                        <div className="file-info">
                                            <File className="file-icon" />
                                            <span className="file-name">{selectedFile.name}</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFileRemove();
                                            }}
                                            className="remove-file-btn"
                                        >
                                            <X />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="file-upload-placeholder">
                                        <Upload className="upload-icon" />
                                        <p className="upload-text">
                                            Kéo và thả hoặc nhấp để tải tệp
                                        </p>
                                        <p className="upload-subtext">
                                            Chỉ chấp nhận file ảnh
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">
                            Gửi Báo Cáo
                        </button>
                    </form>

                    {message && (
                        <div className={`message ${messageType}`}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserReport;
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Upanhhoadon.css";

const Upanhhoadon = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { billId } = location.state || {}; // Lấy billId từ state

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
            formData.append("minhchung", selectedFile); // Tên trường file phải khớp với Multer
            formData.append("id", billId); // Gửi billId qua body
            const token = localStorage.getItem("token"); // Lấy token nếu cần xác thực

            await axios.post("http://localhost:5000/user/uploadProof", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, // Nếu backend yêu cầu xác thực
                },
            });

            setMessage("Hóa đơn đã được tải lên thành công!");
            setTimeout(() => {
                navigate("/user/invoice"); // Quay lại trang hóa đơn
            }, 2000);
        } catch (error) {
            console.error("Lỗi khi tải lên hóa đơn:", error);
            setMessage("Đã xảy ra lỗi khi tải lên. Vui lòng thử lại.");
        }
    };

    return (
        <div className="upload-container">
            <h2>Tải Lên Hóa Đơn Chuyển Khoản</h2>
            {billId && <p>Hóa đơn ID: {billId}</p>}
            <form onSubmit={handleUpload}>
                <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                <button type="submit">Tải Lên</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Upanhhoadon;

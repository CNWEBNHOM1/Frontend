import React, { useState } from "react";
import axios from "axios";
import "./Upanhhoadon.css";

const Upanhhoadon = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setMessage("Vui lòng chọn một tệp trước khi tải lên.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("billImage", selectedFile);

            const response = await axios.post("/api/uploadBill", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setUploadedImages([...uploadedImages, response.data.imageUrl]);
            setMessage("Hóa đơn đã được tải lên thành công!");
            setSelectedFile(null);
        } catch (error) {
            console.error("Lỗi khi tải lên hóa đơn:", error);
            setMessage("Đã xảy ra lỗi khi tải lên. Vui lòng thử lại.");
        }
    };

    return (
        <div className="upload-container">
            <h2>Tải Lên Hóa Đơn Chuyển Khoản</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit">Tải Lên</button>
            </form>
            {message && (
                <p className={message.includes("thành công") ? "success" : "error"}>{message}</p>
            )}

            <h3>Hóa Đơn Cũ</h3>
            <div className="uploaded-images">
                {uploadedImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Hóa đơn ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Upanhhoadon;

import React, { useState } from 'react';
import './FormRegistrationForm.css';

function FormRegistrationForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        cccd: '',
        priority: false,
        phone: '',
        address: '',
        khoa: '',
        truong: '',
        nganh: '',
        maNganh: '',
        lop: '',
        thongTinGiaDinh: '',
        soDienThoaiGiaDinh: '',
        toa: '',
        phong: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Thay bằng xử lý lưu trữ hoặc gửi form
    };

    return (
        <form className="dorm-form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />

            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label>CCCD</label>
            <input type="text" name="cccd" value={formData.cccd} onChange={handleChange} />

            <label>Priority</label>
            <input type="checkbox" name="priority" checked={formData.priority} onChange={handleChange} />

            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

            <label>Address (Tỉnh/Thành, Xã)</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />

            <label>Khoa</label>
            <input type="text" name="khoa" value={formData.khoa} onChange={handleChange} />

            <label>Trường</label>
            <input type="text" name="truong" value={formData.truong} onChange={handleChange} />

            <label>Ngành</label>
            <input type="text" name="nganh" value={formData.nganh} onChange={handleChange} />

            <label>Mã Ngành</label>
            <input type="text" name="maNganh" value={formData.maNganh} onChange={handleChange} />

            <label>Lớp</label>
            <input type="text" name="lop" value={formData.lop} onChange={handleChange} />

            <label>Thông tin Ông Bà, Bố Mẹ</label>
            <input type="text" name="thongTinGiaDinh" value={formData.thongTinGiaDinh} onChange={handleChange} />

            <label>Số điện thoại gia đình</label>
            <input type="text" name="soDienThoaiGiaDinh" value={formData.soDienThoaiGiaDinh} onChange={handleChange} />

            <label>Tòa</label>
            <select name="toa" value={formData.toa} onChange={handleChange}>
                <option value="">Chọn tòa</option>
                <option value="A">Tòa A</option>
                <option value="B">Tòa B</option>
            </select>

            <label>Phòng</label>
            <select name="phong" value={formData.phong} onChange={handleChange}>
                <option value="">Chọn phòng</option>
                <option value="101">101</option>
                <option value="102">102</option>
            </select>

            <button type="submit">Đăng Ký</button>
        </form>
    );
}

export default FormRegistrationForm;

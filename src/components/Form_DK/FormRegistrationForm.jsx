/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './FormRegistrationForm.css';
import Header from "../Header/Header"

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
        <>
            <Header title={"Trang chủ"} />
            <form className="dorm-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>CCCD</label>
                    <input type="text" name="cccd" value={formData.cccd} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Priority</label>
                    <input type="checkbox" name="priority" checked={formData.priority} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address (Tỉnh/Thành, Xã)</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Khoa</label>
                    <input type="text" name="khoa" value={formData.khoa} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Trường</label>
                    <input type="text" name="truong" value={formData.truong} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Ngành</label>
                    <input type="text" name="nganh" value={formData.nganh} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Mã Ngành</label>
                    <input type="text" name="maNganh" value={formData.maNganh} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Lớp</label>
                    <input type="text" name="lop" value={formData.lop} onChange={handleChange} />
                </div>

                <div className="form-group form-group-full">
                    <label>Thông tin Ông Bà, Bố Mẹ</label>
                    <input type="text" name="thongTinGiaDinh" value={formData.thongTinGiaDinh} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Số điện thoại gia đình</label>
                    <input type="text" name="soDienThoaiGiaDinh" value={formData.soDienThoaiGiaDinh} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Tòa</label>
                    <select name="toa" value={formData.toa} onChange={handleChange}>
                        <option value="">Chọn tòa</option>
                        <option value="A">Tòa A</option>
                        <option value="B">Tòa B</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Phòng</label>
                    <select name="phong" value={formData.phong} onChange={handleChange}>
                        <option value="">Chọn phòng</option>
                        <option value="101">101</option>
                        <option value="102">102</option>
                    </select>
                </div>

                <button type="submit">Đăng Ký</button>
            </form>
        </>
    );

}

export default FormRegistrationForm;

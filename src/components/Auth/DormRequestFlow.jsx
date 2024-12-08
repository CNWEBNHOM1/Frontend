// DormRequestFlow.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DormRequestFlow.css';
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";

const DormRequestFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        ngaysinh: '',
        gender: '',
        sid: '',
        cccd: '',
        priority: '',
        phone: '',
        address: {
            tinh: '',
            thanh: '',
            xa: '',
            tinhCode: '',
            thanhCode: '',
            xaCode: ''
        },
        khoa: '',
        school: '',
        lop: '',
        roomId: ''
    });

    // Location states
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState({
        province: '',
        district: '',
        ward: ''
    });

    // Other states
    const [rooms, setRooms] = useState([]);
    const [proofImage, setProofImage] = useState(null);
    const [requests, setRequests] = useState([]);
    const [timer, setTimer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageURL, setImageURL] = useState(null);


    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (formData.address.tinhCode) {
            fetchDistricts(formData.address.tinhCode);
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    thanh: '',
                    thanhCode: '',
                    xa: '',
                    xaCode: ''
                }
            }));
            setWards([]);
        }
    }, [formData.address.tinhCode]);

    useEffect(() => {
        if (formData.address.thanhCode) {
            fetchWards(formData.address.thanhCode);
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    xa: '',
                    xaCode: ''
                }
            }));
        }
    }, [formData.address.thanhCode]);

    useEffect(() => {
        if (step === 2) {
            fetchRooms();
        }
        if (step === 3) {
            fetchMyRequests();
        }
    }, [step]);

    const fetchProvinces = async () => {
        setLocationLoading(true);
        setLocationError(prev => ({ ...prev, province: '' }));
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/p/');
            setProvinces(response.data);
        } catch (error) {
            setLocationError(prev => ({
                ...prev,
                province: 'Không thể tải danh sách tỉnh/thành phố. Vui lòng thử lại sau.'
            }));
        } finally {
            setLocationLoading(false);
        }
    };

    const fetchDistricts = async (provinceCode) => {
        setLocationLoading(true);
        setLocationError(prev => ({ ...prev, district: '' }));
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
            setDistricts(response.data.districts);
        } catch (error) {
            setLocationError(prev => ({
                ...prev,
                district: 'Không thể tải danh sách quận/huyện. Vui lòng thử lại sau.'
            }));
        } finally {
            setLocationLoading(false);
        }
    };

    const fetchWards = async (districtCode) => {
        setLocationLoading(true);
        setLocationError(prev => ({ ...prev, ward: '' }));
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
            if (response.data && response.data.wards) {
                setWards(response.data.wards);
            } else {
                setWards([]);
                setLocationError(prev => ({
                    ...prev,
                    ward: 'Không có dữ liệu phường/xã'
                }));
            }
        } catch (error) {
            console.error('Error fetching wards:', error);
            setLocationError(prev => ({
                ...prev,
                ward: 'Lỗi khi tải danh sách phường/xã. Vui lòng thử lại sau.'
            }));
            setWards([]);
        } finally {
            setLocationLoading(false);
        }
    };

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/user/roomAvailable', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (Array.isArray(response.data)) {
                setRooms(response.data);
            } else if (response.data.data && Array.isArray(response.data.data)) {
                setRooms(response.data.data);
            } else {
                setRooms([]);
                setError('Không thể tải danh sách phòng');
            }
        } catch (error) {
            setError('Lỗi khi tải danh sách phòng');
            setRooms([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/user/myRequests', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRequests(response.data);
        } catch (error) {
            setError('Lỗi khi tải yêu cầu');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleProvinceChange = (e) => {
        const { value } = e.target;
        const selectedProvince = provinces.find(p => p.code === parseInt(value));

        if (selectedProvince) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    tinh: selectedProvince.name,
                    tinhCode: selectedProvince.code
                }
            }));
        }
    };

    const handleDistrictChange = (e) => {
        const { value } = e.target;
        const selectedDistrict = districts.find(d => d.code === parseInt(value));

        if (selectedDistrict) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    thanh: selectedDistrict.name,
                    thanhCode: selectedDistrict.code
                }
            }));
        }
    };

    const handleWardChange = (e) => {
        const { value } = e.target;
        const selectedWard = wards.find(w => w.code === parseInt(value));

        if (selectedWard) {
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    xa: selectedWard.name,
                    xaCode: selectedWard.code
                }
            }));
        }
    };
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('File ảnh phải nhỏ hơn 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError('File phải là ảnh');
                return;
            }
            setProofImage(file);
            setImageURL(URL.createObjectURL(file));
            setError('');
        }
    };

    const validateLocation = () => {
        if (!formData.address.tinh) {
            setLocationError(prev => ({
                ...prev,
                province: 'Vui lòng chọn tỉnh/thành phố'
            }));
            return false;
        }
        if (!formData.address.thanh) {
            setLocationError(prev => ({
                ...prev,
                district: 'Vui lòng chọn quận/huyện'
            }));
            return false;
        }
        if (!formData.address.xa) {
            setLocationError(prev => ({
                ...prev,
                ward: 'Vui lòng chọn phường/xã'
            }));
            return false;
        }
        return true;
    };

    const validateForm = () => {
        const required = ['name', 'ngaysinh', 'gender', 'sid', 'cccd', 'phone', 'school'];
        const missing = required.filter(field => !formData[field]);

        if (!validateLocation()) {
            return false;
        }

        if (missing.length > 0) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc');
            return false;
        }
        return true;
    };

    const handleRoomSelection = async (roomId) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:5000/user/updateRequest-1',
                { roomId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setFormData({ ...formData, roomId });

            const timerID = setTimeout(async () => {
                try {
                    await axios.post('http://localhost:5000/user/updateRequest-2',
                        { roomId },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    );
                    setFormData(prev => ({ ...prev, roomId: '' }));
                } catch (error) {
                    setError('Lỗi khi cập nhật trạng thái phòng');
                }
            }, 30 * 60 * 1000);

            setTimer(timerID);
            setError('');
        } catch (error) {
            setError('Lỗi khi chọn phòng');
        } finally {
            setLoading(false);
        }
    };



    //     if (!validateForm()) return;

    //     try {
    //         setLoading(true);
    //         const formDataObj = new FormData();

    //         Object.keys(formData).forEach(key => {
    //             if (key === 'address') {
    //                 formDataObj.append('address', JSON.stringify(formData.address));
    //             } else {
    //                 formDataObj.append(key, formData[key]);
    //             }
    //         });

    //         if (proofImage) {
    //             formDataObj.append('minhchung', proofImage);
    //         }

    //         const response = await axios.post('http://localhost:5000/user/createRequest', formDataObj, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         if (response.data.status === "success") {
    //             if (timer) {
    //                 clearTimeout(timer);
    //             }
    //             navigate("/auth/CheckRequest");
    //             setError('');
    //         }
    //     } catch (error) {
    //         setError('Lỗi khi gửi yêu cầu: ' + (error.response?.data?.error || error.message));
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const submitRequest = async () => {
    //     if (!validateForm()) return;

    //     try {
    //         setLoading(true);
    //         const formDataObj = new FormData();

    //         // Tách address ra khỏi formData chính
    //         const { address, ...otherData } = formData;

    //         // Append các trường dữ liệu khác
    //         Object.keys(otherData).forEach(key => {
    //             formDataObj.append(key, otherData[key]);
    //         });

    //         // Append address như một object JSON
    //         formDataObj.append('address', JSON.stringify({
    //             tinh: formData.address.tinh,
    //             thanh: formData.address.thanh,
    //             xa: formData.address.xa
    //         }));

    //         // Append file ảnh nếu có
    //         if (proofImage) {
    //             formDataObj.append('minhchung', proofImage);
    //         }

    //         const response = await axios.post('http://localhost:5000/user/createRequest', formDataObj, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         if (response.data.status === "success") {
    //             if (timer) {
    //                 clearTimeout(timer);
    //             }
    //             navigate("/auth/CheckRequest");
    //             setError('');
    //         }
    //     } catch (error) {
    //         setError('Lỗi khi gửi yêu cầu: ' + (error.response?.data?.error || error.message));
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const submitRequest = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const formDataObj = new FormData();

            // Thêm các trường dữ liệu cơ bản
            const { address, ...otherData } = formData;
            Object.keys(otherData).forEach(key => {
                // Set priority luôn là false
                if (key === 'priority') {
                    formDataObj.append(key, false);
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });

            // Thử gửi từng trường của address riêng
            formDataObj.append('address[tinh]', formData.address.tinh);
            formDataObj.append('address[thanh]', formData.address.thanh);
            formDataObj.append('address[xa]', formData.address.xa);

            // Thêm file ảnh
            if (proofImage) {
                formDataObj.append('minhchung', proofImage);
            }

            const response = await axios.post('http://localhost:5000/user/createRequest', formDataObj, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === "success") {
                if (timer) {
                    clearTimeout(timer);
                }
                navigate("/auth/CheckRequest");
                setError('');
            }
        } catch (error) {
            setError('Lỗi khi gửi yêu cầu: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };
    const renderPersonalInfoForm = () => (
        <div className="form-container">
            <h2>Thông tin cá nhân</h2>
            <div className="form-grid">
                <div className="form-group">
                    <label>Họ và tên *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                    />
                </div>
                <div className="form-group">
                    <label>Ngày sinh *</label>
                    <input
                        type="date"
                        name="ngaysinh"
                        value={formData.ngaysinh}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Giới tính *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mã sinh viên *</label>
                    <input
                        type="text"
                        name="sid"
                        value={formData.sid}
                        onChange={handleInputChange}
                        placeholder="Nhập mã sinh viên"
                    />
                </div>
                <div className="form-group">
                    <label>CCCD *</label>
                    <input
                        type="text"
                        name="cccd"
                        value={formData.cccd}
                        onChange={handleInputChange}
                        placeholder="Nhập số CCCD"
                    />
                </div>
                <div className="form-group">
                    <label>Số điện thoại *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                    />
                </div>

                {/* Location selection */}
                <div className="form-group">
                    <label>Tỉnh/Thành phố *</label>
                    <select
                        value={formData.address.tinhCode}
                        onChange={handleProvinceChange}
                        className={`location-select ${locationError.province ? 'error' : ''}`}
                        disabled={locationLoading}
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map(province => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {locationError.province && (
                        <div className="error-message">{locationError.province}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Quận/Huyện *</label>
                    <select
                        value={formData.address.thanhCode}
                        onChange={handleDistrictChange}
                        className={`location-select ${locationError.district ? 'error' : ''}`}
                        disabled={!formData.address.tinhCode || locationLoading}
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map(district => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    {locationError.district && (
                        <div className="error-message">{locationError.district}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Phường/Xã *</label>
                    <select
                        value={formData.address.xaCode}
                        onChange={handleWardChange}
                        className={`location-select ${locationError.ward ? 'error' : ''}`}
                        disabled={!formData.address.thanhCode || locationLoading}
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map(ward => (
                            <option key={ward.code} value={ward.code}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                    {locationError.ward && (
                        <div className="error-message">{locationError.ward}</div>
                    )}
                </div>

                <div className="form-group">
                    <label>Khóa</label>
                    <input
                        type="text"
                        name="khoa"
                        value={formData.khoa}
                        onChange={handleInputChange}
                        placeholder="Nhập khoa"
                    />
                </div>
                <div className="form-group">
                    <label>Trường *</label>
                    <input
                        type="text"
                        name="school"
                        value={formData.school}
                        onChange={handleInputChange}
                        placeholder="Nhập tên trường"
                    />
                </div>
                <div className="form-group">
                    <label>Lớp</label>
                    <input
                        type="text"
                        name="lop"
                        value={formData.lop}
                        onChange={handleInputChange}
                        placeholder="Nhập lớp"
                    />
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
                onClick={() => validateForm() && setStep(2)}
                className="btn-next"
                disabled={loading || locationLoading}
            >
                {loading || locationLoading ? 'Đang xử lý...' : 'Tiếp theo: Chọn phòng'}
            </button>
        </div>
    );

    const renderRoomSelection = () => (
        <div className="room-container">
            <h2>Chọn Phòng</h2>
            {loading ? (
                <div className="loading">Đang tải danh sách phòng...</div>
            ) : (
                <div className="room-grid">
                    {Array.isArray(rooms) && rooms.length > 0 ? (
                        rooms.map(room => (
                            <div
                                key={room._id}
                                className={`room-card ${formData.roomId === room._id ? 'selected' : ''}`}
                                onClick={() => handleRoomSelection(room._id)}
                            >
                                <h3>Phòng {room.name}</h3>
                                <p>Toa {room.department.name}</p>
                                <p>Còn trống: {room.capacity - room.occupiedSlots}</p>
                                <p>Giá: {(room.giatrangbi + room.tieno + room.tiennuoc).toLocaleString('vi-VN')} VNĐ</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-rooms">Không có phòng trống</p>
                    )}
                    <div className="form-group full-width">
                        <label>Ảnh chuyển khoản *</label>
                        <div className="upload-container">
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file-upload" className="upload-button">
                                Chọn ảnh
                            </label>
                        </div>
                        {imageURL && (
                            <div className="image-preview">
                                <img
                                    src={imageURL}
                                    alt="Preview"
                                    className="preview-image"
                                />
                                <button
                                    onClick={() => {
                                        setProofImage(null);
                                        setImageURL(null);
                                    }}
                                    className="remove-image"
                                >
                                    Xóa
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
                <button onClick={() => setStep(1)} className="btn-back">
                    Quay lại
                </button>
                <button
                    onClick={submitRequest}
                    className="btn-submit"
                    disabled={!formData.roomId || loading}
                >
                    {loading ? 'Đang xử lý...' : 'Gửi yêu cầu'}
                </button>
            </div>
        </div>
    );

    const renderRequestStatus = () => (
        <div className="request-container">
            <h2>Yêu cầu của tôi</h2>
            {loading ? (
                <div className="loading">Đang tải danh sách yêu cầu...</div>
            ) : (
                <div className="request-list">
                    {requests.length > 0 ? (
                        requests.map(request => (
                            <div key={request._id} className="request-card">
                                <h3>Mã yêu cầu: {request._id}</h3>
                                <p className={`status ${request.trangthai.toLowerCase()}`}>
                                    Trạng thái: {request.trangthai}
                                </p>
                                <p>Phòng: {request.room}</p>
                                <p>Số tiền: {request.sotienphaitra.toLocaleString('vi-VN')} VNĐ</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-requests">Chưa có yêu cầu nào</p>
                    )}
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <button onClick={() => setStep(1)} className="btn-new-request">
                Tạo yêu cầu mới
            </button>
        </div>
    );

    return (
        <> <Header title={"Trang chủ"} />
            <div className='dashboard-user'>

                <div className="container">
                    <div className="steps-indicator">
                        <div className={`step ${step >= 1 ? 'active' : ''}`} data-step="1">
                            Thông tin cá nhân
                        </div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`} data-step="2">
                            Chọn phòng
                        </div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`} data-step="3">
                            Trạng thái yêu cầu
                        </div>
                    </div>
                    {step === 1 && renderPersonalInfoForm()}
                    {step === 2 && renderRoomSelection()}
                    {step === 3 && renderRequestStatus()}
                </div>
            </div>
        </>
    );
};

export default DormRequestFlow;
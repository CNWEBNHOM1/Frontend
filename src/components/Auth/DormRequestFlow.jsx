/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DormRequestFlow.css';
import Header from '../Header/Header';
import { useNavigate } from "react-router-dom";
import API_CONFIG from '../../config/ApiConfig';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [requestId, setRequestId] = useState(null);

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

    console.log(error)

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
            setWards(response.data.wards);
        } catch (error) {
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
            const response = await axios.get(`${API_CONFIG.API_BASE_URL}/user/roomAvailable`, {
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
        let valid = true;

        setLocationError(prev => {
            const newErrors = { ...prev };  // Sao chép các lỗi hiện tại

            // Kiểm tra tỉnh
            if (!formData.address.tinh) {
                newErrors.province = 'Vui lòng chọn tỉnh/thành phố';
                valid = false;
            } else {
                newErrors.province = '';  // Xóa lỗi tỉnh nếu đã chọn
            }

            // Kiểm tra quận/huyện
            if (!formData.address.thanh) {
                newErrors.district = 'Vui lòng chọn quận/huyện';
                valid = false;
            } else {
                newErrors.district = '';  // Xóa lỗi quận/huyện nếu đã chọn
            }

            // Kiểm tra phường/xã
            if (!formData.address.xa) {
                newErrors.ward = 'Vui lòng chọn phường/xã';
                valid = false;
            } else {
                newErrors.ward = '';  // Xóa lỗi phường/xã nếu đã chọn
            }

            return newErrors;  // Trả về các lỗi đã được cập nhật
        });

        return valid;
    };

    const validatePersonalInfo = () => {
        const required = ['name', 'ngaysinh', 'gender', 'sid', 'cccd', 'phone', 'school', 'priority'];
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

    const handleRoomSelection = (room) => {
        setSelectedRoom({
            ...room,
            totalPrice: room.giatrangbi + room.tieno + room.tiennuoc
        });
        setFormData({ ...formData, roomId: room._id });
    };

    const submitRequest = async () => {
        if (!formData.roomId) {
            setError('Vui lòng chọn phòng');
            return;
        }

        try {
            setLoading(true);
            // const formDataObj = new FormData();

            // // Thêm các trường dữ liệu cơ bản
            // formDataObj.append('name', formData.name);
            // formDataObj.append('ngaysinh', formData.ngaysinh);
            // formDataObj.append('gender', formData.gender);
            // formDataObj.append('sid', formData.sid);
            // formDataObj.append('cccd', formData.cccd);
            // formDataObj.append('phone', formData.phone);
            // formDataObj.append('school', formData.school);
            // formDataObj.append('khoa', formData.khoa || '');
            // formDataObj.append('lop', formData.lop || '');
            // formDataObj.append('roomId', formData.roomId);
            // formDataObj.append('priority', 'false');

            // // Thêm địa chỉ
            // const addressData = {
            //     tinh: formData.address.tinh,
            //     thanh: formData.address.thanh,
            //     xa: formData.address.xa
            // };
            // formDataObj.append('address', JSON.stringify(addressData));



            // // Tạo một file PNG rỗng từ base64 string
            // const defaultPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
            // const defaultFileBlob = await fetch(`data:image/png;base64,${defaultPngBase64}`).then(r => r.blob());
            // const defaultFile = new File([defaultFileBlob], 'default.png', { type: 'image/png' });

            // formDataObj.append('minhchung', defaultFile);
            // console.log("abfjf: ",formDataObj)

            const response = await axios.post(
                `${API_CONFIG.API_BASE_URL}/user/createRequest`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.status === "success") {
                setRequestId(response.data.data._id);
                setStep(3); // Move to payment step
            }
        } catch (error) {
            console.error('Error details:', error.response?.data);
            setError('Lỗi khi gửi yêu cầu: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    console.log(formData)

    const handlePayment = async () => {
        if (!selectedRoom || !requestId) {
            setError('Không tìm thấy thông tin phòng hoặc yêu cầu');
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${API_CONFIG.API_BASE_URL}/user/getRoomPaymentUrl`,
                {
                    returnUrl: `${window.location.origin}/auth/payment-return`,
                    requestId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.status === "success") {
                window.location.href = response.data.data;
            }
        } catch (error) {
            setError('Lỗi khi tạo URL thanh toán: ' + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleUploadProof = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('minhchung', proofImage);
            formData.append('requestId', requestId);

            const response = await axios.post(
                `${API_CONFIG.API_BASE_URL}/user/uploadPaymentProof`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.status === "success") {
                navigate("/auth/payment-return");
            }
        } catch (error) {
            setError('Lỗi khi tải lên ảnh: ' + (error.response?.data?.message || error.message));
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
                    <label>Ưu tiên *</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                    >
                        <option value="">Chọn ưu tiên</option>
                        <option value="true">Có</option>
                        <option value="false">Không</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Khóa</label>
                    <input
                        type="text"
                        name="khoa"
                        value={formData.khoa}
                        onChange={handleInputChange}
                        placeholder="Nhập khóa"
                    />
                </div>
                <div className="form-group">
                    <label>Trường/Viện *</label>
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
                onClick={() => {
                    if (validatePersonalInfo()) {
                        setError(null); // Reset lỗi
                        setStep(2);
                    }
                }}
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
                                onClick={() => handleRoomSelection(room)}
                            >
                                <h3>Phòng: {room.name}</h3>
                                <p>Tòa: <b>{room.department.name}</b></p>
                                <p>Phòng dành cho: <b>{room?.gender}</b></p>
                                <p>Còn trống: <b>{room.capacity - room.occupiedSlots} </b></p>
                                <p>Giá: <b>{(room.giatrangbi + room.tieno + room.tiennuoc).toLocaleString('vi-VN')} VNĐ </b></p>
                            </div>
                        ))
                    ) : (
                        <p className="no-rooms">Không có phòng trống</p>
                    )}
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
            <div className="button-group">
                <button onClick={() => { setStep(1); setError(null) }} className="btn-back">
                    Quay lại
                </button>
                <button
                    onClick={submitRequest}
                    className="btn-submit"
                    disabled={!formData.roomId || loading}
                >
                    {loading ? 'Đang xử lý...' : 'Tiếp theo: Thanh toán'}
                </button>
            </div>
        </div>
    );

    const renderPayment = () => (
        <div className="room-payment-container">
            <h2>Thanh toán</h2>
            {selectedRoom && (
                <div className="room-payment-details">
                    <h3>Thông tin thanh toán</h3>
                    <p>Phòng: {selectedRoom.name}</p>
                    <p>Tòa: {selectedRoom.department.name}</p>
                    <p>Tổng tiền: {(selectedRoom.giatrangbi + selectedRoom.tieno + selectedRoom.tiennuoc).toLocaleString('vi-VN')} VNĐ</p>

                    <button
                        onClick={handlePayment}
                        className="room-payment-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Thanh toán qua VNPay'}
                    </button>
                </div>
            )}
            {error && <div className="room-payment-error">{error}</div>}
            <button onClick={() => setStep(2)} className="room-payment-back-button">
                Quay lại
            </button>
        </div>
    );

    const renderRequestStatus = () => (
        <div className="request-container">
            <h2>Tải lên ảnh thanh toán</h2>
            <div className="upload-section">
                <div className="form-group">
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
                    {imageURL && (
                        <div className="image-preview">
                            <img src={imageURL} alt="Preview" className="preview-image" />
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
                <button
                    onClick={handleUploadProof}
                    className="btn-submit"
                    disabled={!proofImage || loading}
                >
                    {loading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );

    return (
        <>
            <Header title={""} />
            <div className='dashboard-user'>
                <div className="container-a">
                    <div className="steps-indicator-a">
                        <div className={`step ${step >= 1 ? 'active' : ''}`} data-step="1">
                            Thông tin cá nhân
                        </div>
                        <div className={`step ${step >= 2 ? 'active' : ''}`} data-step="2">
                            Chọn phòng
                        </div>
                        <div className={`step ${step >= 3 ? 'active' : ''}`} data-step="3">
                            Thanh toán
                        </div>
                        <div className={`step ${step >= 4 ? 'active' : ''}`} data-step="4">
                            Trạng thái yêu cầu
                        </div>
                    </div>
                    {step === 1 && renderPersonalInfoForm()}
                    {step === 2 && renderRoomSelection()}
                    {step === 3 && renderPayment()}
                    {step === 4 && renderRequestStatus()}
                </div>
            </div>
        </>
    );
};

export default DormRequestFlow;
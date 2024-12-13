import API_CONFIG from "../config/ApiConfig";
import axiosInstance from "./axiosInstance";

export const getListBills = async (params) => {
    try {
        console.log("Params gửi đi:", {
            trangthai: params?.trangthai,
            page: params?.page || 1,
            limit: params?.limit || 10,
            sortBy: params?.sortBy || 'createAt',
            order: params?.order || 'asc'
        });

        const response = await axiosInstance.get("/user/listBills", {
            params: {
                trangthai: params?.trangthai,
                page: params?.page || 1,
                limit: params?.limit || 10,
                sortBy: params?.sortBy || 'createAt',
                order: params?.order || 'asc'
            }
        });

        console.log("Phản hồi từ API:", response);
        return response.data;
    } catch (error) {
        console.error("Chi tiết lỗi:", error.response?.data, error.message);
        throw new Error(error.response?.data?.error || 'Có lỗi xảy ra khi lấy danh sách hóa đơn');
    }
};

// export const getBillPayment = async (billId) => {
//     try {
//         const response = await fetch('http://localhost:5000/user/getBillPaymentUrl', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify({
//                 returnUrl: "http://localhost:4444/login",
//                 billId
//             })
//         });

//         const data = await response.json();
//         console.log('Response data:', data);

//         if (!response.ok) {
//             throw new Error(data.message || 'Có lỗi xảy ra khi tạo URL thanh toán');
//         }

//         return data;
//     } catch (error) {
//         console.error('Payment error:', error);
//         throw error;
//     }
// };

export const getBillPayment = async (billId, returnUrl) => { // Thêm tham số returnUrl
    try {
        const response = await fetch(`${API_CONFIG.API_BASE_URL}/user/getBillPaymentUrl`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                returnUrl: returnUrl, // Sử dụng returnUrl được truyền vào
                billId
            })
        });
        const data = await response.json();
        console.log('Response data:', data);
        if (!response.ok) {
            throw new Error(data.message || 'Có lỗi xảy ra khi tạo URL thanh toán');
        }
        return data;
    } catch (error) {
        console.error('Payment error:', error);
        throw error;
    }
};
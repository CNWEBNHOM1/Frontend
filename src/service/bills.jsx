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

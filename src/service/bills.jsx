// import axiosInstance from "./axiosInstance"

// export const getListBills = async () => {
//     try {
//         const response = await axiosInstance.get("/user/listBills");
//         return response.data;

//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }


import axiosInstance from "./axiosInstance";

export const getListBills = async (params) => {
    try {
        const response = await axiosInstance.get("/user/listBills", {
            params: {
                trangthai: params?.trangthai,
                page: params?.page || 1,
                limit: params?.limit || 10,
                sortBy: params?.sortBy || 'createAt',
                order: params?.order || 'asc'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Có lỗi xảy ra khi lấy danh sách hóa đơn');
    }
};
import axiosInstance from "./axiosInstance"

export const getListBills = async () => {
    try {
        const response = await axiosInstance.get("/user/listBills");
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

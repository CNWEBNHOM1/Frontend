import axiosInstance from "./axiosInstance"

export const getProfile = async () => {
    try {
        //get phai dung axiosInstance.get
        const response = await axiosInstance.get("/user/info");
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
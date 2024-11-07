import axiosInstance from "./axiosInstance"


export const loginAccount = async(dataLogin) =>{
    try {
        const response = await axiosInstance.post("/auth/login", dataLogin);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
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

export const changePassword = async(dataLogin) =>{
    try {
        const response = await axiosInstance.post("/auth/changePassword", dataLogin);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
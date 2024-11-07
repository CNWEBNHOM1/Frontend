/* eslint-disable no-unused-vars */
import axiosInstance from "../axiosInstance";

export const getListRoom = async (data) =>{
    try {
        console.log(data)
        const response = await axiosInstance.post("/user/roomd", data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
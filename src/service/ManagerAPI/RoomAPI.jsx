/* eslint-disable no-unused-vars */
import axiosInstance from "../axiosInstance";

export const getListRoom = async (data) =>{
    try {
        const response = await axiosInstance.post("/user/roomd", data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createRoom = async (data) =>{
    try {
        const response = await axiosInstance.post("/user/createRoom", data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
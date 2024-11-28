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

export const getDetailRoom = async (id) =>{
    try {
        const response = await axiosInstance.get(`/user/detailRoom/${id}`)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const updateDetailRoom = async (id, data) =>{
    try {
        const response = await axiosInstance.put(`/user/updateRoom/${id}`,data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
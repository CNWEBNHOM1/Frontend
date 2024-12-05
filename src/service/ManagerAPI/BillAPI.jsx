import axiosInstance from "../axiosInstance";

export const getListBill = async (data) =>{
    try{
        const response =  await axiosInstance.post("/user/allBills",data)
        return  response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const createBill = async (data) =>{
    try {
        const response = await axiosInstance.post("/user/createBill", data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getDetailBill = async (_id) =>{
    try {
        const response = await axiosInstance.get(`/user/detailBill/${_id}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateDetailBill = async(id, data) =>{
    try {
        const response = await axiosInstance.put(`/user/updateBill/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const handleBill = async(id, action) =>{
    try {
        const response = await axiosInstance.put(`/user/handleBill/${id}/${action}`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getStatisticBills = async () =>{
    try {
        const response = await axiosInstance.get("/user/statisticBills")
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const sendBill = async (id) =>{
    try {
        const response = await axiosInstance.get(`/user/sendBill/${id}`)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}


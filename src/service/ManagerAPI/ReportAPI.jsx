import axiosInstance from "../axiosInstance";

export const getListReport = async (data) =>{
    try{
        const response =  await axiosInstance.post("/user/getAllReports",data)
        return  response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getDetailReport = async (_id) =>{
    try {
        const response = await axiosInstance.get(`/user/detailReport/${_id}`)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const handleReport = async(data, id, action) => {
    try {
        const response = await axiosInstance.put(`/user/handleReport/${id}/${action}`, data)
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
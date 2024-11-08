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
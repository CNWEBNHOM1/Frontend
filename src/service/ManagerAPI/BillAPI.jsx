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
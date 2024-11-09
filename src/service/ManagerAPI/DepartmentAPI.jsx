import axiosInstance from "../axiosInstance";

export const getListDepartment = async (data) =>{
    try{
        const response =  await axiosInstance.post("/user/getAllDepartments",data)
        return  response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
import axiosInstance from "../axiosInstance";

export const getAllAccount = async (data) =>{
    try {
        const { page, limit, email } = data;

        // Lọc ra các giá trị không null hoặc undefined
        const params = {};
        if (page != null) params.page = page;
        if (limit != null) params.limit = limit;
        if (email != null) params.email = email;

        // Gửi request với params đã được lọc
        const response = await axiosInstance.get("/user/allUsers", { params });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const handleUser = async(id,action) =>{
    try {
        const response = await axiosInstance.put(`/user/handleUser/${id}/${action}`)
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
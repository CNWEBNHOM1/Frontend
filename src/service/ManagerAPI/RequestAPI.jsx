import axiosInstance from "../axiosInstance";

export const getListRequest = async (data) => {
    try {
        const { page, limit, status, name, room } = data;

        // Lọc ra các giá trị không null hoặc undefined
        const params = {};
        if (page != null) params.page = page;
        if (limit != null) params.limit = limit;
        if (status != null) params.status = status;
        if (name != null) params.name = name;
        if (room != null) params.room = room;

        // Gửi request với params đã được lọc
        const response = await axiosInstance.get("/user/allRequests", { params });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getDetailRequet = async(id) =>{
    try {
        const respone = await axiosInstance.get(`/user/detailRequest/${id}`);
        return respone.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const handleDetailRequest = async(id, action) =>{
    try {
        const respone = await axiosInstance.put(`/user/handleRequest/${id}/${action}`);
        return respone.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
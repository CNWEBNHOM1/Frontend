import axiosInstance from "../axiosInstance";

export const getListStudent = async (data) => {
    try {
        const { trangthai, room, name,page, limit } = data;

        // Lọc ra các giá trị không null hoặc undefined
        const params = {};
        if (page != null) params.page = page;
        if (limit != null) params.limit = limit;
        if (trangthai != null) params.trangthai = trangthai;
        if (name != null) params.name = name;
        if (room != null) params.room = room;

        // Gửi request với params đã được lọc
        const response = await axiosInstance.get("/user", { params });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
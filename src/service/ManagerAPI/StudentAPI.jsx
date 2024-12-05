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

export const getDetailStudent = async (id) =>{
    try {
        const response = await axiosInstance.get(`/user/detailStudent/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const updateStudent = async(id,data) =>{
    try {
        const response = await axiosInstance.put(`/user/updateStudent/${id}`, data)
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const declinedStudent = async(data) =>{
    try {
        const response = await axiosInstance.post("/user/declineStundet", data)
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const kickStudentOfRoom = async(data) =>{
    try {
        const response = await axiosInstance.post("/user/declineStudent", data)
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const kickAllStudentOfRoom = async() =>{
    try {
        const response = await axiosInstance.post("/user/kickAll")
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const TransferStudent = async(student_id, new_room_id) =>{
    try {
        const response = await axiosInstance.put(`/user/transferRoom/${student_id}/${new_room_id}`)
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export const getstatisticStudents = async () =>{
    try {
        const response = await axiosInstance.get("/user/statisticStudents")
        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}
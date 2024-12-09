import axiosInstance from "./axiosInstance"

export const getRoom = async () => {
    try {
        //get phai dung axiosInstance.get
        const response = await axiosInstance.get("/user/room");
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getRoomMates = async () => {
    try {
        //get phai dung axiosInstance.get
        const response = await axiosInstance.get("/user/roomMates");
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}



// cho post axiosInstance.post
// data trong async (data) =>
// axiosInstance.post("///", data);

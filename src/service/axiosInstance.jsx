import axios from "axios"
import ApiConfig from "../config/ApiConfig"
const axiosInstance = axios.create({
    baseURL: ApiConfig.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Xóa token khi gặp lỗi 401
        localStorage.clear();
        
        // Điều hướng người dùng đến trang đăng nhập
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;
  
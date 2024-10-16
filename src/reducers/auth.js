import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS} from '../actions/auth.js'

const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')); // Đảm bảo đọc đúng kiểu dữ liệu
const role = localStorage.getItem('role'); // Đảm bảo đọc đúng kiểu dữ liệu

const authReducer = (state = {
    isAuthenticated: isAuthenticated,
    role: role,
    errorMessage: ''
}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:{
            const updatedRole = localStorage.getItem('role'); // Lấy role từ localStorage
            localStorage.setItem('isAuthenticated', true);
            return {
                ...state,
                isAuthenticated: true,
                role: updatedRole // Cập nhật role vào state
            };
        }
        case LOGIN_FAIL:
            localStorage.setItem('isAuthenticated', false); // Cập nhật lại nếu thất bại
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload
            };
        case LOGOUT_SUCCESS:
            localStorage.removeItem('isAuthenticated'); // Xóa khi đăng xuất
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
}


export default authReducer;
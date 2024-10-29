import { loginAccount } from "../service/authAPI";

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

export const loginFail = (error) => {
    return {
        type: LOGIN_FAIL,
        payload: error
    }
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFail = (error) => {
    return {
        type: LOGOUT_FAIL,
        payload: error
    }
}

export const login = (dataLogin) => {
    return async (dispatch) => {
        try {
            const response = await loginAccount(dataLogin);

            // Kiểm tra mã trạng thái của phản hồi
            if (response.message === "Login Successful") {
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('id', response.userData.id);
                localStorage.setItem('email', response.userData.email);
                localStorage.setItem('role', response.userData.role);
                localStorage.setItem('token', response.token);
                dispatch(loginSuccess());
                return { success: true, message: response.message };
            } else {
                // Nếu không thành công nhưng không ném lỗi
                return { success: false, message: response.message };
            }
        } catch (error) {
            // Xử lý lỗi từ backend
            if (error.response) {
                // Yêu cầu đã được gửi và server đã trả về mã trạng thái khác 2xx
                const { status, data } = error.response;
                let errorMessage;

                if (status === 400) {
                    errorMessage = data.message || "Yêu cầu không hợp lệ.";
                } else if (status === 500) {
                    errorMessage = "Đã xảy ra lỗi trên server.";
                } else {
                    errorMessage = "Đã xảy ra lỗi. Vui lòng thử lại.";
                }

                return { success: false, message: errorMessage };
            } else {
                // Lỗi khi gửi yêu cầu
                return { success: false, message: "Lỗi mạng hoặc server không phản hồi." };
            }
        }
    };
}


export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess());
    }
}
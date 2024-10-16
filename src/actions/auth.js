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

export const login = () => {
    return  (dispatch) => {
        
        localStorage.setItem('userId', '1234')
        localStorage.setItem('fullName', 'Từ Văn An')
        localStorage.setItem('phone', '09888888')
        localStorage.setItem('role', 'USER')
        dispatch(loginSuccess());
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logoutSuccess());
    }
}
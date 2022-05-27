import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ACT_LOGIN_ERROR, ACT_LOGIN_SUCCESS, ACT_LOGOUT_ERROR, ACT_LOGOUT_SUCCESS, ACT_REGISTER_ERROR, ACT_REGISTER_SUCCESS, ACT_UPDATE_KHACHHANG_INFO_ERROR, ACT_UPDATE_KHACHHANG_INFO_SUCCESS, ACT_UPDATE_KHACHHANG_PASSWORD_ERROR, ACT_UPDATE_KHACHHANG_PASSWORD_SUCCESS } from "../../constants/Message";

export const ACT_KHACHHANG_REGISTER = 'ACT_KHACHHANG_REGISTER';
export const ACT_KHACHHANG_LOGIN = 'ACT_KHACHHANG_LOGIN';
export const ACT_KHACHHANG_LOGOUT = 'ACT_KHACHHANG_LOGOUT';
export const RESET_MESSAGE_USER_KHACHHANG = 'RESET_MESSAGE_USER_KHACHHANG'
export const ACT_GET_CURRENT_USER_KHACHHANG = 'ACT_GET_CURRENT_USER_KHACHHANG'
export const ACT_KHACHHANG_UPDATE_INFO = 'ACT_KHACHHANG_UPDATE_INFO';
export const ACT_KHACHHANG_UPDATE_PASSWORD = 'ACT_KHACHHANG_UPDATE_PASSWORD';
export const GET_BILL_BY_USERKH = 'GET_BILL_BY_USERKH';

export const actResetMessageUserKhachHang = () => (dispatch) => {
    dispatch({
        type: RESET_MESSAGE_USER_KHACHHANG,
        payload: ''
    })
}

export const actRegisterKhachHang = (data) => (dispatch) => {
    axios.post(
        `${API_URL}khachhang`,
        data,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type: ACT_KHACHHANG_REGISTER,
            payload: ACT_REGISTER_SUCCESS
        })
    }).catch((error) => {
        dispatch({
            type: ACT_KHACHHANG_REGISTER,
            payload: ACT_REGISTER_ERROR
        });
        console.log('actRegisterKhachHang error: ', error);
    })
}

export const actLoginKhachHang = (data) => (dispatch) => {
    axios.post(
        `${API_URL}khachhang/login`,
        data,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type: ACT_KHACHHANG_LOGIN,
            payload: {
                khachhang: res.data,
                message: ACT_LOGIN_SUCCESS
            }
        })
    }).catch((error) => {

        if (error.response.data.message) {
            console.log('actLoginKhachHang error: ', error.response.data.message);

            dispatch({
                type: ACT_KHACHHANG_LOGIN,
                payload: {
                    khachhang: {},
                    message: error.response.data.message
                }
            });
        }
        else {
            console.log('actLoginKhachHang error: ', error);

            dispatch({
                type: ACT_KHACHHANG_LOGIN,
                payload: {
                    khachhang: {},
                    message: ACT_LOGIN_ERROR
                }
            });
        }

    })
}

export const actGetCurrentUserKhachHang = (data) => (dispatch) => {
    axios.get(
        `${API_URL}khachhang/usercurrent`,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        // console.log("CurrentUserKhachHang: ", res.data)
        dispatch({
            type: ACT_GET_CURRENT_USER_KHACHHANG,
            payload: {
                khachhang: res.data
            }
        })
    }).catch((error) => {
        console.log('actGetCurrentUserKhachHang error: ', error);

        dispatch({
            type: ACT_GET_CURRENT_USER_KHACHHANG,
            payload: {
                khachhang: {}
            }
        });
    })
}

export const actLogoutKhachHang = () => (dispatch) => {
    axios.get(
        `${API_URL}khachhang/logout`,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type: ACT_KHACHHANG_LOGOUT,
            payload: {
                khachhang: {},
                message: ACT_LOGOUT_SUCCESS
            } 
        })
    }).catch((error) => {

        dispatch({
            type: ACT_KHACHHANG_LOGOUT,
            payload: {
                khachhang: {},
                message: ACT_LOGOUT_ERROR
            } 
        });
        console.log('actLogoutKhachHang error: ', error);
    })
}

export const actUpdateInfoKhachHang = (data) => (dispatch) => {
    axios.put(
        `${API_URL}khachhang/updateInfoKH`,
        data,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type: ACT_KHACHHANG_UPDATE_INFO,
            payload: {
                khachhang: res.data,
                message: ACT_UPDATE_KHACHHANG_INFO_SUCCESS
            }
        })
    }).catch((error) => {

        if (error.response.data.message) {
            console.log('actUpdateInfoKhachHang error: ', error.response.data.message);

            dispatch({
                type: ACT_KHACHHANG_UPDATE_INFO,
                payload: {
                    khachhang: {},
                    message: error.response.data.message
                }
            });
        }
        else {
            console.log('actUpdateInfoKhachHang error: ', error);

            dispatch({
                type: ACT_KHACHHANG_UPDATE_INFO,
                payload: {
                    khachhang: {},
                    message: ACT_UPDATE_KHACHHANG_INFO_ERROR
                }
            });
        }

    })
}

export const actUpdatePasswordKhachHang = (data) => (dispatch) => {
    axios.put(
        `${API_URL}khachhang/updatePasswordKH`,
        data,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type: ACT_KHACHHANG_UPDATE_PASSWORD,
            payload: {
                khachhang: res.data,
                message: ACT_UPDATE_KHACHHANG_PASSWORD_SUCCESS
            }
        })
    }).catch((error) => {

        if (error.response.data.message) {
            console.log('actUpdatePasswordKhachHang error: ', error.response.data.message);

            dispatch({
                type: ACT_KHACHHANG_UPDATE_PASSWORD,
                payload: {
                    message: error.response.data.message
                }
            });
        }
        else {
            console.log('actUpdatePasswordKhachHang error: ', error);

            dispatch({
                type: ACT_KHACHHANG_UPDATE_PASSWORD,
                payload: {
                    message: ACT_UPDATE_KHACHHANG_PASSWORD_ERROR
                }
            });
        }

    })
}

export const actGetBillByUserKH = (pageIndex) => (dispatch) => {
    axios.get(
        `${API_URL}donhang/getByUserKH/${pageIndex}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((res) => {
        // console.log("data: ", res.data);
        dispatch({
            type: GET_BILL_BY_USERKH,
            payload: res.data
        })
    }).catch((error) => {
        console.log("actGetBillByUserKH error: ", error);
        dispatch({
            type: GET_BILL_BY_USERKH,
            payload: {}
        });
    })
}
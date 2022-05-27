
import axios from 'axios'
import { API_URL } from '../../constants/Config';
import { ACT_LOGIN_ERROR, ACT_LOGIN_SUCCESS, ACT_LOGOUT_ERROR, ACT_LOGOUT_SUCCESS, UPDATE_INFO_USER_ADMIN_ERROR, UPDATE_INFO_USER_ADMIN_SUCCESS, UPDATE_PASS_USER_ADMIN_ERROR, UPDATE_PASS_USER_ADMIN_SUCCESS } from '../../constants/Message';


export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";
export const UPDATE_INFO_USER_ADMIN = "UPDATE_INFO_USER_ADMIN";
export const UPDATE_PASS_USER_ADMIN = "UPDATE_PASS_USER_ADMIN";
export const GET_USER = "GET_USER";
export const RESET_MESSAGE_USER_NHANVIEN = 'RESET_MESSAGE_USER_NHANVIEN'

export const actResetMessageUserNhanVien = () => (dispatch) => {
    dispatch({
        type: RESET_MESSAGE_USER_NHANVIEN,
        payload: ''
    })
}

export const actLogoutAdmin = () => (dispatch) => {
    axios.get(`${API_URL}nhanvien/logout`,
    {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
    }).then((res) => {
        // console.log(res);
        dispatch({
            type: LOGOUT_ADMIN,
            payload: {
                nhanvien: {},
                message: ACT_LOGOUT_SUCCESS
            }
        });
    }).catch((error) => {
        console.log('actLogoutAdmin error: ', error);

        dispatch({
            type: LOGOUT_ADMIN,
            payload: {
                nhanvien: {},
                message: ACT_LOGOUT_ERROR
            }
        });
    })
}

export const actLoginAdmin = (data) => (dispatch) => {
    axios.post(`${API_URL}nhanvien/login`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            console.log(res);
            dispatch({
                type: LOGIN_ADMIN,
                payload: {
                    nhanvien: res.data,
                    message: ACT_LOGIN_SUCCESS
                }
            });
        }).catch((error) => {
            if (error.response.data.message) {
                console.log('actLoginAdmin error: ', error.response.data.message);

                dispatch({
                    type: LOGIN_ADMIN,
                    payload: {
                        nhanvien: {},
                        message: error.response.data.message
                    }
                });
            }
            else {
                console.log('actLoginAdmin error: ', error);

                dispatch({
                    type: LOGIN_ADMIN,
                    payload: {
                        nhanvien: {},
                        message: ACT_LOGIN_ERROR
                    }
                });
            }
            // dispatch({
            //     type : LOGIN_ADMIN,
            //     payload : ACT_LOGIN_ERROR
            // });
            console.log("actLoginAdmin error: ", error);
        })
}

export const actGetUser = () => (dispatch) => {
    axios.get(`${API_URL}nhanvien/user`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            dispatch({
                type: GET_USER,
                payload: res.data
            });
        }).catch((error) => {
            console.log(error);
            dispatch({
                type: GET_USER,
                payload: {}
            });
        })
}

export const actUpdateInfoUserAdmin = (data) => (dispatch) => {
    axios.put(`${API_URL}nhanvien/updateInfoUserNV`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            console.log(res);
            dispatch({
                type: UPDATE_INFO_USER_ADMIN,
                payload: {
                    nhanvien: res.data,
                    message: UPDATE_INFO_USER_ADMIN_SUCCESS
                }
            });
        }).catch((error) => {
            if (error.response.data.message) {
                console.log('actUpdateInfoUserAdmin error: ', error.response.data.message);

                dispatch({
                    type: UPDATE_INFO_USER_ADMIN,
                    payload: {
                        nhanvien: null,
                        message: error.response.data.message
                    }
                });
            }
            else {
                console.log('actUpdateInfoUserAdmin error: ', error);

                dispatch({
                    type: UPDATE_INFO_USER_ADMIN,
                    payload: {
                        nhanvien: null,
                        message: UPDATE_INFO_USER_ADMIN_ERROR
                    }
                });
            }
            console.log("actUpdateInfoUserAdmin error: ", error);
        })
}

export const actUpdatePasswordUserAdmin = (data) => (dispatch) => {
    axios.put(`${API_URL}nhanvien/updatePasswordUserNV`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            // console.log(res);
            dispatch({
                type: UPDATE_PASS_USER_ADMIN,
                payload: {
                    nhanvien: res.data,
                    message: UPDATE_PASS_USER_ADMIN_SUCCESS
                }
            });
        }).catch((error) => {
            if (error.response.data.message) {
                console.log('actUpdatePasswordUserAdmin error: ', error.response.data.message);
                dispatch({
                    type: UPDATE_PASS_USER_ADMIN,
                    payload: {
                        nhanvien: null,
                        message: error.response.data.message
                    }
                });
            }
            else {
                console.log('actUpdatePasswordUserAdmin error: ', error);
                dispatch({
                    type: UPDATE_PASS_USER_ADMIN,
                    payload: {
                        nhanvien: null,
                        message: UPDATE_PASS_USER_ADMIN_ERROR
                    }
                });
            }
            console.log("actUpdatePasswordUserAdmin error: ", error);
        })
}
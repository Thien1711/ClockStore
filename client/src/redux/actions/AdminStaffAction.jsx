import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ACT_CHANGE_STATUS_STAFF_ADMIN_ERROR, ACT_OFF_STATUS_STAFF_ADMIN_SUCCESS, ACT_ON_STATUS_STAFF_ADMIN_SUCCESS, ADD_STAFF_ADMIN_ERROR, ADD_STAFF_ADMIN_SUCCESS, UPDATE_PASS_STAFF_ADMIN_ERROR, UPDATE_PASS_STAFF_ADMIN_SUCCESS, UPDATE_PERMISSION_STAFF_ADMIN_ERROR, UPDATE_PERMISSION_STAFF_ADMIN_SUCCESS } from "../../constants/Message";



export const RESET_MESSAGE_STAFF_ADMIN = "RESET_MESSAGE_STAFF_ADMIN";
export const GET_STAFF_ADMIN = "GET_STAFF_ADMIN";
export const CHANGE_STATUS_STAFF_ADMIN = 'CHANGE_STATUS_STAFF_ADMIN';
export const ADD_STAFF_ADMIN = "ADD_STAFF_ADMIN";
export const UPDATE_PASSWORD_STAFF_ADMIN = "UPDATE_PASSWORD_STAFF_ADMIN";
export const UPDATE_PERMISSION_STAFF_ADMIN = "UPDATE_PERMISSION_STAFF_ADMIN";

export const actResetMessageStaffAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_STAFF_ADMIN,
        payload: ''
    })
}

export const actGetStaffAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}nhanvien/filter-admin`,
        data,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_STAFF_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetStaffAdmin error: ', error);
    })
}

export const actChangeStatusStaffAdmin = (user) => (dispatch) => {
    axios.put(
        `${API_URL}nhanvien/changeStatus/${user}`,
        user,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        // console.log("status nhân viên: ", res.data.status);
        if(res.data.status === 1) {
            dispatch({
                type : CHANGE_STATUS_STAFF_ADMIN,
                payload : ACT_ON_STATUS_STAFF_ADMIN_SUCCESS
            })
        }
        else {
            dispatch({
                type : CHANGE_STATUS_STAFF_ADMIN,
                payload : ACT_OFF_STATUS_STAFF_ADMIN_SUCCESS
            })
        }
        
    }).catch(error => {
        // console.log('actChangeStatusStaffAdmin error: ', error);
        // dispatch({
        //     type : CHANGE_STATUS_STAFF_ADMIN,
        //     payload : ACT_CHANGE_STATUS_STAFF_ADMIN_ERROR
        // })

        if (error.response.data.message) {
            console.log('actChangeStatusStaffAdmin error: ', error.response.data.message);

            dispatch({
                type: CHANGE_STATUS_STAFF_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actChangeStatusStaffAdmin error: ', error);

            dispatch({
                type: CHANGE_STATUS_STAFF_ADMIN,
                payload: ACT_CHANGE_STATUS_STAFF_ADMIN_ERROR
            });
        }
    })
}

export const actAddStaffAdmin = (data) => (dispatch) => {
    // console.log(data);
    axios.post(
        `${API_URL}nhanvien`,
        data,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : ADD_STAFF_ADMIN,
            payload : ADD_STAFF_ADMIN_SUCCESS
        })
    }).catch(error => {
        // console.log('actAddStaffAdmin - error: ', error);
        // dispatch({
        //     type : ADD_STAFF_ADMIN,
        //     payload : ADD_STAFF_ADMIN_ERROR
        // })

        if (error.response.data.message) {
            console.log('actAddStaffAdmin error: ', error.response.data.message);

            dispatch({
                type: ADD_STAFF_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actAddStaffAdmin error: ', error);

            dispatch({
                type: ADD_STAFF_ADMIN,
                payload: ADD_STAFF_ADMIN_ERROR
            });
        }
    });
}

export const actUpdatePasswordStaffAdmin = (data) => (dispatch) => {
    axios.put(
        `${API_URL}nhanvien/updatePasswordNV`,
        data,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : UPDATE_PASSWORD_STAFF_ADMIN,
            payload : UPDATE_PASS_STAFF_ADMIN_SUCCESS
        })
        
    }).catch(error => {
        // console.log('actUpdatePasswordStaffAdmin error: ', error);
        // dispatch({
        //     type : UPDATE_PASSWORD_STAFF_ADMIN,
        //     payload : UPDATE_PASS_STAFF_ADMIN_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdatePasswordStaffAdmin error: ', error.response.data.message);

            dispatch({
                type: UPDATE_PASSWORD_STAFF_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdatePasswordStaffAdmin error: ', error);

            dispatch({
                type: UPDATE_PASSWORD_STAFF_ADMIN,
                payload: UPDATE_PASS_STAFF_ADMIN_ERROR
            });
        }
    })
}

export const actUpdatePermissionStaffAdmin = (data) => (dispatch) => {
    axios.put(
        `${API_URL}nhanvien/updatePermissionNV`,
        data,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : UPDATE_PERMISSION_STAFF_ADMIN,
            payload : UPDATE_PERMISSION_STAFF_ADMIN_SUCCESS
        })
        
    }).catch(error => {
        // console.log('actUpdatePermissionStaffAdmin error: ', error);
        // dispatch({
        //     type : UPDATE_PERMISSION_STAFF_ADMIN,
        //     payload : UPDATE_PERMISSION_STAFF_ADMIN_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdatePermissionStaffAdmin error: ', error.response.data.message);

            dispatch({
                type: UPDATE_PERMISSION_STAFF_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdatePermissionStaffAdmin error: ', error);

            dispatch({
                type: UPDATE_PERMISSION_STAFF_ADMIN,
                payload: UPDATE_PERMISSION_STAFF_ADMIN_ERROR
            });
        }
    })
}
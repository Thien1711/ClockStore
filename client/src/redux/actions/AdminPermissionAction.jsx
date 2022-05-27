import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ADD_PERMISSION_ERROR, ADD_PERMISSION_SUCCESS, DELETE_PERMISSION_ERROR, DELETE_PERMISSION_SUCCESS, UPDATE_PERMISSION_ERROR, UPDATE_PERMISSION_SUCCESS } from "../../constants/Message";

export const GET_PERMISSION_ADMIN = 'GET_PERMISSION_ADMIN';
export const RESET_MESSAGE_PERMISSION_ADMIN = 'RESET_MESSAGE_PERMISSION_ADMIN';
export const ADD_PERMISSION_ADMIN = 'ADD_PERMISSION_ADMIN';
export const UPDATE_PERMISSION_ADMIN = 'UPDATE_PERMISSION_ADMIN';
export const DELETE_PERMISSION_ADMIN = 'DELETE_PERMISSION_ADMIN';
export const GETALL_PERMISSION_ADMIN = 'GETALL_PERMISSION_ADMIN';

export const actResetMessagePermissionAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_PERMISSION_ADMIN,
        payload: ''
    })
}

export const actGetAllPermissionAdmin = () => (dispatch) => {
    axios.get(
        `${API_URL}quyen`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GETALL_PERMISSION_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetAllPermissionAdmin error: ', error);
    })
}


export const actGetPermissionAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}quyen/filter-admin`,
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
            type : GET_PERMISSION_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetPermissionAdmin error: ', error);
    })
}

export const actAddPermissionAdmin = (data) => (dispatch) => {
    // console.log(data);
    axios.post(
        `${API_URL}quyen`,
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
            type : ADD_PERMISSION_ADMIN,
            payload : ADD_PERMISSION_SUCCESS
        })
    }).catch(error => {
        // console.log('actAddPermissionAdmin - error: ', error);
        // dispatch({
        //     type : ADD_PERMISSION_ADMIN,
        //     payload : ADD_PERMISSION_ERROR
        // })

        if (error.response.data.message) {
            console.log('actAddPermissionAdmin error: ', error.response.data.message);
            dispatch({
                type: ADD_PERMISSION_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actAddPermissionAdmin error: ', error);
            dispatch({
                type: ADD_PERMISSION_ADMIN,
                payload: ADD_PERMISSION_ERROR
            });
        }
    });
}

export const actUpdatePermissionAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}quyen/${id}`,
        data,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((res) => {
        dispatch({
            type : UPDATE_PERMISSION_ADMIN,
            payload : UPDATE_PERMISSION_SUCCESS
        })
    }).catch(error => {
        // console.log("actUpdatePermissionAdmin error: ", error);
        // dispatch({
        //     type : UPDATE_PERMISSION_ADMIN,
        //     payload : UPDATE_PERMISSION_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdatePermissionAdmin error: ', error.response.data.message);
            dispatch({
                type: UPDATE_PERMISSION_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdatePermissionAdmin error: ', error);
            dispatch({
                type: UPDATE_PERMISSION_ADMIN,
                payload: UPDATE_PERMISSION_ERROR
            });
        }
    });
}

export const actDeletePermissionAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}quyen/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_PERMISSION_ADMIN,
            payload : DELETE_PERMISSION_SUCCESS
        });
    }).catch(error => {
        // console.log("actDeletePermissionAdmin error: ", error);
        // dispatch({
        //     type: DELETE_PERMISSION_ADMIN,
        //     payload: DELETE_PERMISSION_ERROR
        // })

        if (error.response.data.message) {
            console.log('actDeletePermissionAdmin error: ', error.response.data.message);
            dispatch({
                type: DELETE_PERMISSION_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeletePermissionAdmin error: ', error);
            dispatch({
                type: DELETE_PERMISSION_ADMIN,
                payload: DELETE_PERMISSION_ERROR
            });
        }
    })
}
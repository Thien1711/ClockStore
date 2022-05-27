import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ADD_BRAND_ERROR, ADD_BRAND_SUCCESS, DELETE_BRAND_ERROR, DELETE_BRAND_SUCCESS, UPDATE_BRAND_ERROR, UPDATE_BRAND_SUCCESS } from "../../constants/Message";

export const GET_BRAND_ADMIN = 'GET_BRAND_ADMIN';
export const RESET_MESSAGE_BRAND_ADMIN = 'RESET_MESSAGE_BRAND_ADMIN';
export const ADD_BRAND_ADMIN = 'ADD_BRAND_ADMIN';
export const UPDATE_BRAND_ADMIN = 'UPDATE_BRAND_ADMIN';
export const DELETE_BRAND_ADMIN = 'DELETE_BRAND_ADMIN';
export const GET_ALL_BRAND_ADMIN = 'GET_ALL_BRAND_ADMIN';


export const actResetMessageBrandAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_BRAND_ADMIN,
        payload: ''
    })
}

export const actGetAllBrandAdmin = () => (dispatch) => {
    axios.get(
        `${API_URL}thuonghieu`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_ALL_BRAND_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetAllBrandAdmin error: ', error);
    })
}

export const actGetBrandAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}thuonghieu/filter-admin`,
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
            type : GET_BRAND_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetBrandAdmin error: ', error);
    })
}

export const actAddBrandAdmin = (data) => (dispatch) => {
    console.log(data);
    axios.post(
        `${API_URL}thuonghieu`,
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
            type : ADD_BRAND_ADMIN,
            payload : ADD_BRAND_SUCCESS
        })
        // return res.data;
    }).catch(error => {
        // console.log('actAddBrandAdmin - error: ', error);
        // dispatch({
        //     type : ADD_BRAND_ADMIN,
        //     payload : ADD_BRAND_ERROR
        // })

        if (error.response.data.message) {
            console.log('actAddBrandAdmin error: ', error.response.data.message);

            dispatch({
                type: ADD_BRAND_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actAddBrandAdmin error: ', error);

            dispatch({
                type: ADD_BRAND_ADMIN,
                payload: ADD_BRAND_ERROR
            });
        }
    });
}

export const actUpdateBrandAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}thuonghieu/${id}`,
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
            type : UPDATE_BRAND_ADMIN,
            payload : UPDATE_BRAND_SUCCESS
        })
    }).catch(error => {
        // console.log("actUpdateBrandAdmin error: ", error);
        // dispatch({
        //     type : UPDATE_BRAND_ADMIN,
        //     payload : UPDATE_BRAND_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdateBrandAdmin error: ', error.response.data.message);

            dispatch({
                type: UPDATE_BRAND_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdateBrandAdmin error: ', error);

            dispatch({
                type: UPDATE_BRAND_ADMIN,
                payload: UPDATE_BRAND_ERROR
            });
        }
    });
}

export const actDeleteBrandAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}thuonghieu/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_BRAND_ADMIN,
            payload : DELETE_BRAND_SUCCESS
        });
    }).catch(error => {
        // console.log("actDeleteBrandAdmin error: ", error);
        // dispatch({
        //     type: DELETE_BRAND_ADMIN,
        //     payload: DELETE_BRAND_ERROR
        // })

        if (error.response.data.message) {
            console.log('actDeleteBrandAdmin error: ', error.response.data.message);

            dispatch({
                type: DELETE_BRAND_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeleteBrandAdmin error: ', error);

            dispatch({
                type: DELETE_BRAND_ADMIN,
                payload: DELETE_BRAND_ERROR
            });
        }
    })
}
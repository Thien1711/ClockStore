
import axios from 'axios'
import { API_URL } from '../../constants/Config';
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_SUCCESS } from '../../constants/Message';


export const GET_PRODUCT_ADMIN = "GET_PRODUCT_ADMIN";
export const RESET_MESSAGE_PRODUCT_ADMIN = 'RESET_MESSAGE_PRODUCT_ADMIN';
export const ADD_PRODUCT_ADMIN = 'ADD_PRODUCT_ADMIN';
export const DELETE_PRODUCT_ADMIN = 'DELETE_PRODUCT_ADMIN';
export const UPDATE_PRODUCT_ADMIN = 'UPDATE_PRODUCT_ADMIN';

export const actResetMessageProductAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_PRODUCT_ADMIN,
        payload: ''
    })
}

export const actGetProductAdmin = (data) => (dispatch) => {
    axios.post(`${API_URL}sanpham/filter-admin`,
    data,
    {
        headers : {
            'Content-Type' : 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
    }).then((res) => {
        // console.log(res);
        dispatch({
            type : GET_PRODUCT_ADMIN,
            payload : res.data
        });
        // dispatch
    }).catch((err) => {
        console.log(err);
    })
}

export const actAddProductAdmin = (data) => (dispatch) => {
    console.log(data);
    axios.post(
        `${API_URL}sanpham`,
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
            type : ADD_PRODUCT_ADMIN,
            payload : ADD_PRODUCT_SUCCESS
        })
    }).catch(error => {
        if (error.response.data.message) {
            console.log('actDeleteProductAdmin error: ', error.response.data.message);
            dispatch({
                type: ADD_PRODUCT_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeleteProductAdmin error: ', error);
            dispatch({
                type: ADD_PRODUCT_ADMIN,
                payload: ADD_PRODUCT_ERROR
            });
        }
    });
}

export const actDeleteProductAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}sanpham/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_PRODUCT_ADMIN,
            payload : DELETE_PRODUCT_SUCCESS
        });
    }).catch(error => {
        if (error.response.data.message) {
            console.log('actDeleteProductAdmin error: ', error.response.data.message);
            dispatch({
                type: DELETE_PRODUCT_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeleteProductAdmin error: ', error);
            dispatch({
                type: DELETE_PRODUCT_ADMIN,
                payload: DELETE_PRODUCT_ERROR
            });
        }
    })
}

export const actUpdateProductAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}sanpham/${id}`,
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
            type : UPDATE_PRODUCT_ADMIN,
            payload : UPDATE_PRODUCT_SUCCESS
        })
    }).catch(error => {
        if (error.response.data.message) {
            console.log('actUpdateProductAdmin error: ', error.response.data.message);
            dispatch({
                type: UPDATE_PRODUCT_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdateProductAdmin error: ', error);
            dispatch({
                type: UPDATE_PRODUCT_ADMIN,
                payload: UPDATE_PRODUCT_ERROR
            });
        }
    });
}
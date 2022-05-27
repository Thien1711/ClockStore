import axios from "axios";
import { API_URL } from "../../constants/Config";
import { DELETE_COUPON_ERROR, DELETE_COUPON_SUCCESS, UPDATE_COUPON_STATUS_ERROR, UPDATE_COUPON_STATUS_SUCCESS } from "../../constants/Message";

export const GET_COUPON_ADMIN = 'GET_COUPON_ADMIN';
export const RESET_MESSAGE_COUPON_ADMIN = 'RESET_MESSAGE_COUPON_ADMIN';
export const UPDATE_COUPON_STATUS_ADMIN = 'UPDATE_COUPON_STATUS_ADMIN';
export const DELETE_COUPON_ADMIN = 'DELETE_COUPON_ADMIN';

export const actResetMessageCouponAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_COUPON_ADMIN,
        payload: {
            type : '',
            value : ''
        }
    })
}

export const actGetCouponAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}phieunhap/filter-admin`,
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
            type : GET_COUPON_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetCouponAdmin error: ', error);
    })
}

export const actUpdateCouponStatusAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}phieunhap/${id}`,
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
            type : UPDATE_COUPON_STATUS_ADMIN,
            payload : {
                type : "success",
                value : UPDATE_COUPON_STATUS_SUCCESS
            }
        });
    }).catch(error => {

        if (error.response.data.message) {
            console.log('actUpdateCouponStatusAdmin error: ', error.response.data.message);

            dispatch({
                type: UPDATE_COUPON_STATUS_ADMIN,
                payload: {
                    type: "error",
                    value: error.response.data.message
                }
            });
        }
        else {
            console.log('actUpdateCouponStatusAdmin error: ', error);

            dispatch({
                type: UPDATE_COUPON_STATUS_ADMIN,
                payload: {
                    type: "error",
                    value: UPDATE_COUPON_STATUS_ERROR
                }
            });
        }
    });
}

export const actDeleteCouponAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}phieunhap/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_COUPON_ADMIN,
            payload : {
                type : "success",
                value : DELETE_COUPON_SUCCESS
            }
        });
    }).catch(error => {
        if (error.response.data.message) {
            console.log('actDeleteCouponAdmin error: ', error.response.data.message);

            dispatch({
                type: DELETE_COUPON_ADMIN,
                payload: {
                    type: "error",
                    value: error.response.data.message
                }
            });
        }
        else {
            console.log('actDeleteCouponAdmin error: ', error);

            dispatch({
                type: DELETE_COUPON_ADMIN,
                payload: {
                    type: "error",
                    value: DELETE_COUPON_ERROR
                }
            });
        }
    })
}
import axios from "axios";
import { API_URL } from "../../constants/Config";
import { DELETE_BILL_ERROR, DELETE_BILL_SUCCESS, UPDATE_BILL_STATUS_ERROR, UPDATE_BILL_STATUS_SUCCESS } from "../../constants/Message";

export const GET_BILL_ADMIN = 'GET_BILL_ADMIN';
export const RESET_MESSAGE_BILL_ADMIN = 'RESET_MESSAGE_BILL_ADMIN';
export const UPDATE_BILL_STATUS_ADMIN = 'UPDATE_BILL_STATUS_ADMIN';
export const DELETE_BILL_ADMIN = 'DELETE_BILL_ADMIN';

export const actResetMessageBillAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_BILL_ADMIN,
        payload: {
            type : '',
            value : ''
        }
    })
}

export const actGetBillAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}donhang/filter-admin`,
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
            type : GET_BILL_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetBillAdmin error: ', error);
    })
}

export const actUpdateBillStatusAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}donhang/${id}`,
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
            type : UPDATE_BILL_STATUS_ADMIN,
            payload : {
                type : "success",
                value : UPDATE_BILL_STATUS_SUCCESS
            }
        });
    }).catch(error => {

        if (error.response.data.message) {
            console.log('actUpdateBillStatusAdmin error: ', error.response.data.message);

            dispatch({
                type: UPDATE_BILL_STATUS_ADMIN,
                payload: {
                    type: "error",
                    value: error.response.data.message
                }
            });
        }
        else {
            console.log('actUpdateBillStatusAdmin error: ', error);

            dispatch({
                type: UPDATE_BILL_STATUS_ADMIN,
                payload: {
                    type: "error",
                    value: UPDATE_BILL_STATUS_ERROR
                }
            });
        }
    });
}

export const actDeleteBillAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}donhang/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_BILL_ADMIN,
            payload : {
                type : "success",
                value : DELETE_BILL_SUCCESS
            }
        });
    }).catch(error => {
        if (error.response.data.message) {
            console.log('actDeleteBillAdmin error: ', error.response.data.message);

            dispatch({
                type: DELETE_BILL_ADMIN,
                payload: {
                    type: "error",
                    value: error.response.data.message
                }
            });
        }
        else {
            console.log('actDeleteBillAdmin error: ', error);

            dispatch({
                type: DELETE_BILL_ADMIN,
                payload: {
                    type: "error",
                    value: DELETE_BILL_ERROR
                }
            });
        }
    })
}
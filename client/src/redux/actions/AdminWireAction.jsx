import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ADD_WIRE_ERROR, ADD_WIRE_SUCCESS, DELETE_WIRE_ERROR, DELETE_WIRE_SUCCESS, UPDATE_WIRE_ERROR, UPDATE_WIRE_SUCCESS } from "../../constants/Message";


export const GET_WIRE_ADMIN = 'GET_WIRE_ADMIN';
export const GET_ALL_WIRE_ADMIN = 'GET_ALL_WIRE_ADMIN';
export const RESET_MESSAGE_WIRE_ADMIN = 'RESET_MESSAGE_WIRE_ADMIN';
export const ADD_WIRE_ADMIN = 'ADD_WIRE_ADMIN';
export const UPDATE_WIRE_ADMIN = 'UPDATE_WIRE_ADMIN';
export const DELETE_WIRE_ADMIN = 'DELETE_WIRE_ADMIN';

export const actResetMessageWireAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_WIRE_ADMIN,
        payload: ''
    })
}

export const actGetAllWireAdmin = () => (dispatch) => {
    axios.get(
        `${API_URL}kieuday`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_WIRE_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetAllWireAdmin error: ', error);
    })
}

export const actGetWireAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}kieuday/filter-admin`,
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
            type : GET_WIRE_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetWireAdmin error: ', error);
    })
}

export const actAddWireAdmin = (data) => (dispatch) => {
    // console.log(data);
    axios.post(
        `${API_URL}kieuday`,
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
            type : ADD_WIRE_ADMIN,
            payload : ADD_WIRE_SUCCESS
        })
        // return res.data;
    }).catch(error => {

        if (error.response.data.message) {
            console.log('actAddWireAdmin error: ', error.response.data.message);
            dispatch({
                type: ADD_WIRE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actAddWireAdmin error: ', error);
            dispatch({
                type: ADD_WIRE_ADMIN,
                payload: ADD_WIRE_ERROR
            });
        }
    });
}

export const actUpdateWireAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}kieuday/${id}`,
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
            type : UPDATE_WIRE_ADMIN,
            payload : UPDATE_WIRE_SUCCESS
        })
    }).catch(error => {
        // console.log("actUpdateWireAdmin error: ", error);
        // dispatch({
        //     type : UPDATE_WIRE_ADMIN,
        //     payload : UPDATE_WIRE_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdateWireAdmin error: ', error.response.data.message);
            dispatch({
                type: UPDATE_WIRE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdateWireAdmin error: ', error);
            dispatch({
                type: UPDATE_WIRE_ADMIN,
                payload: UPDATE_WIRE_ERROR
            });
        }
    });
}

export const actDeleteWireAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}kieuday/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_WIRE_ADMIN,
            payload : DELETE_WIRE_SUCCESS
        });
    }).catch(error => {
        // console.log("actDeleteWireAdmin error: ", error);
        // dispatch({
        //     type: DELETE_WIRE_ADMIN,
        //     payload: DELETE_WIRE_ERROR
        // })

        if (error.response.data.message) {
            console.log('actDeleteWireAdmin error: ', error.response.data.message);
            dispatch({
                type: DELETE_WIRE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeleteWireAdmin error: ', error);
            dispatch({
                type: DELETE_WIRE_ADMIN,
                payload: DELETE_WIRE_ERROR
            });
        }
    })
}
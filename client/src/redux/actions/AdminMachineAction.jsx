import axios from "axios";
import { API_URL } from "../../constants/Config";
import { ADD_MACHINE_ERROR, ADD_MACHINE_SUCCESS, DELETE_MACHINE_ERROR, DELETE_MACHINE_SUCCESS, UPDATE_MACHINE_ERROR, UPDATE_MACHINE_SUCCESS } from "../../constants/Message";

export const GET_MACHINE_ADMIN = 'GET_MACHINE_ADMIN';
export const RESET_MESSAGE_MACHINE_ADMIN = 'RESET_MESSAGE_MACHINE_ADMIN';
export const ADD_MACHINE_ADMIN = 'ADD_MACHINE_ADMIN';
export const UPDATE_MACHINE_ADMIN = 'UPDATE_MACHINE_ADMIN';
export const DELETE_MACHINE_ADMIN = 'DELETE_MACHINE_ADMIN';
export const GET_ALL_MACHINE_ADMIN = 'GET_ALL_MACHINE_ADMIN';


export const actResetMessageMachineAdmin = () => (dispatch) => {
    dispatch({
        type : RESET_MESSAGE_MACHINE_ADMIN,
        payload: ''
    })
}

export const actGetAllMachineAdmin = () => (dispatch) => {
    axios.get(
        `${API_URL}kieumay`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_ALL_MACHINE_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetAllMachineAdmin error: ', error);
    })
}

export const actGetMachineAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}kieumay/filter-admin`,
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
            type : GET_MACHINE_ADMIN,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetMachineAdmin error: ', error);
    })
}

export const actAddMachineAdmin = (data) => (dispatch) => {
    axios.post(
        `${API_URL}kieumay`,
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
            type : ADD_MACHINE_ADMIN,
            payload : ADD_MACHINE_SUCCESS
        })
        // return res.data;
    }).catch(error => {
        // console.log('actAddMachineAdmin - error: ', error);
        // dispatch({
        //     type : ADD_MACHINE_ADMIN,
        //     payload : ADD_MACHINE_ERROR
        // })

        if (error.response.data.message) {
            console.log('actAddMachineAdmin error: ', error.response.data.message);
            dispatch({
                type: ADD_MACHINE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actAddMachineAdmin error: ', error);
            dispatch({
                type: ADD_MACHINE_ADMIN,
                payload: ADD_MACHINE_ERROR
            });
        }
    });
}

export const actUpdateMachineAdmin = (data, id) => (dispatch) => {
    axios.put(
        `${API_URL}kieumay/${id}`,
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
            type : UPDATE_MACHINE_ADMIN,
            payload : UPDATE_MACHINE_SUCCESS
        })
    }).catch(error => {
        // console.log("actUpdateMachineAdmin error: ", error);
        // dispatch({
        //     type : UPDATE_MACHINE_ADMIN,
        //     payload : UPDATE_MACHINE_ERROR
        // })

        if (error.response.data.message) {
            console.log('actUpdateMachineAdmin error: ', error.response.data.message);
            dispatch({
                type: UPDATE_MACHINE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actUpdateMachineAdmin error: ', error);
            dispatch({
                type: UPDATE_MACHINE_ADMIN,
                payload: UPDATE_MACHINE_ERROR
            });
        }
    });
}

export const actDeleteMachineAdmin = (id) => (dispatch) => {
    axios.delete(
        `${API_URL}kieumay/${id}`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials: true,
            credentials: 'include',
        }
    ).then((result) => {
        dispatch({
            type : DELETE_MACHINE_ADMIN,
            payload : DELETE_MACHINE_SUCCESS
        });
    }).catch(error => {
        // console.log("actDeleteMachine error: ", error);
        // dispatch({
        //     type: DELETE_MACHINE_ADMIN,
        //     payload: DELETE_MACHINE_ERROR
        // })

        if (error.response.data.message) {
            console.log('actDeleteMachine error: ', error.response.data.message);
            dispatch({
                type: DELETE_MACHINE_ADMIN,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actDeleteMachine error: ', error);
            dispatch({
                type: DELETE_MACHINE_ADMIN,
                payload: DELETE_MACHINE_ERROR
            });
        }
    })
}
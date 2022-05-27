import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_DETAIL_BILL = 'GET_DETAIL_BILL';

export const actGetBillDetail = (id) => (dispatch) => {
    axios.get(
        `${API_URL}chitietdh/${id}`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_DETAIL_BILL,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetBillDetail error: ', error);
    })
}

export const actGetBillDetailAdmin = (id) => (dispatch) => {
    axios.get(
        `${API_URL}chitietdh/admin/${id}`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_DETAIL_BILL,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetBillDetailAdmin error: ', error);
    })
}
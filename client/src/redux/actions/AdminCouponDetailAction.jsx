import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_DETAIL_COUPON = 'GET_DETAIL_COUPON';

export const actGetCouponDetailAdmin = (id) => (dispatch) => {
    axios.get(
        `${API_URL}chitietpn/${id}`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_DETAIL_COUPON,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetCouponDetailAdmin error: ', error);
    })
}
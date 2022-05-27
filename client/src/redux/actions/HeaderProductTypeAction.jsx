import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_PRODUCT_TYPE_HEADER = 'GET_PRODUCT_TYPE_HEADER';

export const actGetProductTypeHeader = () => (dispatch) => {
    axios.get(
        `${API_URL}loaisanpham`,
        {
            headers : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials: 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_PRODUCT_TYPE_HEADER,
            payload: res.data
        })
    }).catch(error => {
        console.log("actGetProductTypeHeader error: ", error);
    })
}

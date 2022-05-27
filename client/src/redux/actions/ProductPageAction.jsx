import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_PRODUCT_PAGE = 'GET_PRODUCT_PAGE';

export const actGetProductPage = (id) => (dispatch) => {
    axios.get(
        `${API_URL}sanpham/product/${id}`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_PRODUCT_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetProductPage error: ', error);
    })
}
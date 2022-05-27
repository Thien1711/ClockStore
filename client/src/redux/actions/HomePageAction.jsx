import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_PRODUCT_HOME_PAGE = 'GET_PRODUCT_HOME_PAGE';

export const actGetProductHomePage = (data) => (dispatch) => {
    axios.get(
        `${API_URL}sanpham/home-page`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        dispatch({
            type : GET_PRODUCT_HOME_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetProductHomePage error: ', error);
    })
}
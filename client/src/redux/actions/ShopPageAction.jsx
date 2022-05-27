import axios from "axios";
import { API_URL } from "../../constants/Config";

export const GET_PRODUCT_SHOP_PAGE = 'GET_PRODUCT_SHOP_PAGE';
export const GET_BRANCH_SHOP_PAGE = 'GET_BRANCH_SHOP_PAGE';
export const GET_WIRE_SHOP_PAGE = 'GET_WIRE_SHOP_PAGE';
export const GET_MACHINE_SHOP_PAGE = 'GET_MACHINE_SHOP_PAGE';

export const actGetProductShopPage = (data) => (dispatch) => {
    axios.post(
        `${API_URL}sanpham/filter-shop`,
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
            type : GET_PRODUCT_SHOP_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetProductShopPage error: ', error);
    })
}

export const actGetBranchShopPage = () => (dispatch) => {
    axios.get(
        `${API_URL}thuonghieu`,
        {
            header : {
                'Content-Type' : 'application/json'
            },
            withCredentials : true,
            credentials : 'include'
        }
    ).then((res) => {
        // console.log("listbranch:", res);
        dispatch({
            type : GET_BRANCH_SHOP_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetBranchShopPage error: ', error);
    })
}

export const actGetWireShopPage = () => (dispatch) => {
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
            type : GET_WIRE_SHOP_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetWireShopPage error: ', error);
    })
}

export const actGetMachineShopPage = () => (dispatch) => {
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
            type : GET_MACHINE_SHOP_PAGE,
            payload : res.data
        })
    }).catch(error => {
        console.log('actGetMachineShopPage error: ', error);
    })
}

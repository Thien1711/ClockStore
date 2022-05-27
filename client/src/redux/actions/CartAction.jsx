import axios from "axios"
import { API_URL } from "../../constants/Config"
import { ADD_ONE_SP_FOR_CART_ERROR, ADD_ONE_SP_FOR_CART_SUCCESS, CHECKOUT_CART_ERROR, CHECKOUT_CART_SUCCESS, REMOVE_SP_FOR_CART_ERROR, REMOVE_SP_FOR_CART_SUCCESS, SUB_ONE_SP_FOR_CART_ERROR, SUB_ONE_SP_FOR_CART_SUCCESS } from "../../constants/Message";

export const LOAD_SP_FOR_CART = 'LOAD_SP_FOR_CART';
export const ADD_ONE_SP_FOR_CART = 'ADD_ONE_SP_FOR_CART';
export const SUB_ONE_SP_FOR_CART = 'SUB_ONE_SP_FOR_CART';
export const REMOVE_SP_FOR_CART = 'REMOVE_SP_FOR_CART';
export const RESET_MESSAGE_CART = 'RESET_MESSAGE_CART';
export const UPDATE_AMOUNT_SP_FOR_CART = 'UPDATE_AMOUNT_SP_FOR_CART';
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const RESET_CART = 'RESET_CART';

const updateAmountSPDonHang = (id, amount) => {
    var data = localStorage.getItem("donhang");
    amount = parseInt(amount);
    var temp = false;

    if (amount) {
        if (data) {
            if (data.search(id + "-") >= 0) {
                var dauVa = data.split('&');
                var dauNgang;

                for (let i = 0; i < dauVa.length; ++i) {
                    dauNgang = dauVa[i].split('-');
                    if (parseInt(dauNgang[0]) === id) {
                        dauVa[i] = id + '-' + amount;
                        temp = true;
                        break;
                    }
                }

                data = '';
                for (let i = 0; i < dauVa.length; ++i) {
                    if (dauVa[i]) {
                        data += dauVa[i] + '&';
                    }
                }
                localStorage.setItem("donhang", data);
            }
            else {
                data += id + "-" + amount + "&";
                localStorage.setItem("donhang", data);
                temp = true;
            }
        }
        else {
            data = id + "-" + amount + "&";
            localStorage.setItem("donhang", data);
            temp = true;
        }
    }
    else {
        temp = false;
    }

    return temp;
}

const updateOneSPDonHang = (id, amount) => {
    var data = localStorage.getItem("donhang");
    amount = parseInt(amount);
    if (amount !== 1 && amount !== -1) {
        // console.log(amount);
        return false;
    }

    if (data) {
        if (data.search(id + "-") >= 0) {
            var dauVa = data.split('&');
            var dauNgang;

            for (let i = 0; i < dauVa.length; ++i) {
                dauNgang = dauVa[i].split('-');
                if (parseInt(dauNgang[0]) === id) {
                    if (parseInt(dauNgang[1]) + amount >= 1) {
                        dauVa[i] = id + '-' + (parseInt(dauNgang[1]) + amount);
                    }
                    break;
                }
            }

            data = '';
            for (let i = 0; i < dauVa.length; ++i) {
                if (dauVa[i]) {
                    data += dauVa[i] + '&';
                }
            }
        }
        else {
            data += id + "-" + 1 + "&";
        }
    }
    else {
        data = id + "-" + 1 + "&";
    }
    localStorage.setItem('donhang', data);
    return true;
}

const removeSPDonHang = (id) => {
    var data = localStorage.getItem("donhang");
    var temp = false;
    if (data) {
        if (data.search(id + "-") >= 0) {
            var dauVa = data.split('&');
            var dauNgang;
            data = "";

            for (let i = 0; i < dauVa.length; ++i) {
                dauNgang = dauVa[i].split('-');
                if (parseInt(dauNgang[0]) === id) {
                    temp = true;
                    continue;
                }
                if (dauNgang[0]) {
                    data += dauNgang[0] + "-" + dauNgang[1] + "&";
                }
            }
            localStorage.setItem("donhang", data);
        }
    }

    return temp;
}

export const actResetMessageCart = () => (dispatch) => {
    dispatch({
        type: RESET_MESSAGE_CART,
        payload: ''
    })
}

export const actResetDataCart = () => (dispatch) => {
    dispatch({
        type: RESET_CART,
        payload: null
    })
}

export const actLoadSPForCart = () => (dispatch) => {
    let data = localStorage.getItem("donhang");
    axios.get(
        `${API_URL}cart/${data}`,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        if (res) {
            dispatch({
                type: LOAD_SP_FOR_CART,
                payload: res.data
            })
        }
    })
}

export const actAddOneSPForCart = (id) => (dispatch) => {
    let data = updateOneSPDonHang(id, 1); 

    if (data) {
        data = localStorage.getItem("donhang");
        axios.get(
            `${API_URL}cart/${data}`,
            {
                header: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                credentials: 'include'
            }
        ).then((res) => {
            if (res) {
                dispatch({
                    type: ADD_ONE_SP_FOR_CART,
                    payload: {
                        data: res.data,
                        message: ADD_ONE_SP_FOR_CART_SUCCESS
                    }
                })
            }
            else {
                dispatch({
                    type: ADD_ONE_SP_FOR_CART,
                    payload: {
                        data: null,
                        message: ADD_ONE_SP_FOR_CART_ERROR
                    }
                })
            }
        }).catch((error) => {
            console.log("actAddOneSPForCart error: ", error);
            dispatch({
                type: ADD_ONE_SP_FOR_CART,
                payload: {
                    data: null,
                    message: ADD_ONE_SP_FOR_CART_ERROR
                }
            })
        })
    }
}

export const actSubtractOneSPForCart = (id) => (dispatch) => {
    let data = updateOneSPDonHang(id, -1); 

    if (data) {
        data = localStorage.getItem("donhang");
        axios.get(
            `${API_URL}cart/${data}`,
            {
                header: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                credentials: 'include'
            }
        ).then((res) => {
            if (res) {
                dispatch({
                    type: SUB_ONE_SP_FOR_CART,
                    payload: {
                        data: res.data,
                        message: SUB_ONE_SP_FOR_CART_SUCCESS
                    }
                })
            }
            else {
                dispatch({
                    type: SUB_ONE_SP_FOR_CART,
                    payload: {
                        data: null,
                        message: SUB_ONE_SP_FOR_CART_ERROR
                    }
                })
            }
        }).catch((error) => {
            console.log("actSubtractOneSPForCart error: ", error);
            dispatch({
                type: SUB_ONE_SP_FOR_CART,
                payload: {
                    data: null,
                    message: SUB_ONE_SP_FOR_CART_ERROR
                }
            })
        })
    }
}

export const actUpdateAmountSPForCart = (id, amount) => (dispatch) => {
    let data = updateAmountSPDonHang(id, amount);

    if (data) {
        data = localStorage.getItem("donhang");
        axios.get(
            `${API_URL}cart/${data}`,
            {
                header: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                credentials: 'include'
            }
        ).then((res) => {
            if (res) {
                dispatch({
                    type: UPDATE_AMOUNT_SP_FOR_CART,
                    payload: {
                        data: res.data,
                        message: ADD_ONE_SP_FOR_CART_SUCCESS
                    }
                })
            }
            else {
                dispatch({
                    type: UPDATE_AMOUNT_SP_FOR_CART,
                    payload: {
                        data: null,
                        message: ADD_ONE_SP_FOR_CART_ERROR
                    }
                })
            }
        }).catch((error) => {
            console.log("actUpdateAmountSPForCart error: ", error);
            dispatch({
                type: UPDATE_AMOUNT_SP_FOR_CART,
                payload: {
                    data: null,
                    message: ADD_ONE_SP_FOR_CART_ERROR
                }
            })
        })
    }
}

export const actRemoveSPForCart = (id) => (dispatch) => {
    let data = removeSPDonHang(id);

    if (data) {
        data = localStorage.getItem("donhang");
        if(data) {
            axios.get(
                `${API_URL}cart/${data}`,
                {
                    header: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    credentials: 'include'
                }
            ).then((res) => {
                if (res) {
                    dispatch({
                        type: REMOVE_SP_FOR_CART,
                        payload: {
                            data: res.data,
                            message: REMOVE_SP_FOR_CART_SUCCESS
                        }
                    })
                }
                else {
                    dispatch({
                        type: REMOVE_SP_FOR_CART,
                        payload: {
                            data: null,
                            message: REMOVE_SP_FOR_CART_ERROR
                        }
                    })
                }
            }).catch((error) => {
                console.log("actRemoveSPForCart error: ", error);
                dispatch({
                    type: REMOVE_SP_FOR_CART,
                    payload: {
                        data: null,
                        message: REMOVE_SP_FOR_CART_ERROR
                    }
                })
            })
        }
        else {
            dispatch({
                type: REMOVE_SP_FOR_CART,
                payload: {
                    data: null,
                    message: REMOVE_SP_FOR_CART_SUCCESS
                }
            })
        }
    }
}

export const actCheckoutCart = (data) => (dispatch) => {
    axios.post(
        `${API_URL}cart/checkoutcart`,
        data,
        {
            header: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            credentials: 'include'
        }
    ).then((res) => {
        localStorage.removeItem("donhang");
        dispatch({
            type: CHECKOUT_CART,
            payload: CHECKOUT_CART_SUCCESS
        })
    }).catch((error) => {

        if (error.response.data.message) {
            console.log('actCheckoutCart error: ', error.response.data.message);

            dispatch({
                type: CHECKOUT_CART,
                payload: error.response.data.message
            });
        }
        else {
            console.log('actCheckoutCart error: ', error);

            dispatch({
                type: CHECKOUT_CART,
                payload: CHECKOUT_CART_ERROR
            });
        }
    })
}
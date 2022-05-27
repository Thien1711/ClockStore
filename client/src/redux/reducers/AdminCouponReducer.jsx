import { DELETE_COUPON_ADMIN, GET_COUPON_ADMIN, RESET_MESSAGE_COUPON_ADMIN, UPDATE_COUPON_STATUS_ADMIN } from "../actions/AdminCouponAction";

const initialState = {
    dataValue: {},
    message: {
        type: '',
        value: ''
    }
}


const AdminCouponReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_COUPON_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_COUPON_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case UPDATE_COUPON_STATUS_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_COUPON_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        default:
            return {
                ...state
            }
    }
}

export default AdminCouponReducer

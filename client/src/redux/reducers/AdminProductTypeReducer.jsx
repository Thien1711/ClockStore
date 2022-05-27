
// const initialState = {
//     dataValue : {
//         "listLSP": [
//             {
//                 "id": 1,
//                 "name": "ĐỒNG HỒ ĐỂ BÀN",
//                 "description": "Đồng hồ dành để bàn cho việc học và làm việc",
//                 "sanPhams": []
//             }
//         ],
//         "sort": "name-asc",
//         "search": "",
//         "pageIndex": 1,
//         "pageSize": 9,
//         "count": 5,
//         "range": 9,
//         "totalPage": 1
//     },
//     message : ''
// }

import {
    GET_PRODUCT_TYPE_ADMIN,
    UPDATE_PRODUCT_TYPE_ADMIN,
    ADD_PRODUCT_TYPE_ADMIN,
    DELETE_PRODUCT_TYPE_ADMIN,
    RESET_MESSAGE_LSP_ADMIN,
    GET_ALL_PRODUCT_TYPE_ADMIN
} from "../actions/AdminProductTypeAction";

const initialState = {
    dataValue: {},
    message: ''
};

const AdminProductTypeReducer = (state = initialState, action) => {       //action.type action.payload

    switch (action.type) {
        case RESET_MESSAGE_LSP_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_PRODUCT_TYPE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case GET_ALL_PRODUCT_TYPE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_PRODUCT_TYPE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_PRODUCT_TYPE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_PRODUCT_TYPE_ADMIN:
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

export default AdminProductTypeReducer

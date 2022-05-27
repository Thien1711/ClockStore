// const initialState = {
//     dataValue: {
//         listTH: [
//             {
//                 id: 3,
//                 name: "ĐỒNG HỒ TEINTOP"
//             }
//         ],
//         sort: "name-asc",
//         search: "",
//         pageIndex: 1,
//         pageSize: 9,
//         count: 3,
//         range: 9,
//         totalPage: 1
//     },
//     message : ''
// }

import { ADD_BRAND_ADMIN, DELETE_BRAND_ADMIN, GET_ALL_BRAND_ADMIN, GET_BRAND_ADMIN, RESET_MESSAGE_BRAND_ADMIN, UPDATE_BRAND_ADMIN } from "../actions/AdminBrandAction";

const initialState = {
    dataValue: {},
    message: ''
}


const AdminBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_BRAND_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_ALL_BRAND_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case GET_BRAND_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_BRAND_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_BRAND_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_BRAND_ADMIN:
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

export default AdminBrandReducer


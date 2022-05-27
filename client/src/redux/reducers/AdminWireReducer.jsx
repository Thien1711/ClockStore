// const initialState = {
//     dataValue: {
//         listKD: [
//             {
//                 id: 1,
//                 name: "Dây da"
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

import { ADD_WIRE_ADMIN, DELETE_WIRE_ADMIN, GET_ALL_WIRE_ADMIN, GET_WIRE_ADMIN, RESET_MESSAGE_WIRE_ADMIN, UPDATE_WIRE_ADMIN } from "../actions/AdminWireAction";

const initialState = {
    dataValue: {},
    message: ''
}


const AdminWireReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_WIRE_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_ALL_WIRE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case GET_WIRE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_WIRE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_WIRE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_WIRE_ADMIN:
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

export default AdminWireReducer


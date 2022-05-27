

// const initialState = {
//     dataValue: {
//         listKM: [
//             {
//                 id: 1,
//                 name: "Máy cơ"
//             },
//             {
//                 id: 2,
//                 name: "Máy điện tử - Pin"
//             }
//         ],
//         search: "",
//         sort: "name-asc",
//         pageIndex: 1,
//         pageSize: 9,
//         count: 2,
//         range: 9,
//         totalPage: 1
//     },
//     message : ''
// }

import {
    ADD_MACHINE_ADMIN, DELETE_MACHINE_ADMIN, GET_ALL_MACHINE_ADMIN, GET_MACHINE_ADMIN,
    RESET_MESSAGE_MACHINE_ADMIN,
    UPDATE_MACHINE_ADMIN
} from "../actions/AdminMachineAction";

const initialState = {
    dataValue: {},
    message: ''
}

const AdminMachineReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_MACHINE_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_ALL_MACHINE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case GET_MACHINE_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_MACHINE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_MACHINE_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_MACHINE_ADMIN:
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

export default AdminMachineReducer
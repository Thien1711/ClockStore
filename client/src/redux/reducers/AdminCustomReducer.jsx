
// const initialState = {
//     dataValue : {
//         "listKH": [
//             {
//                 "user": "thien",
//                 "password": "$2a$11$XEBzrWRO7huzaPNtZzbo2u19kRZzXKeQ4VwH1hMLta2Tfoh1oUONy",
//                 "name": "Nguyễn Ngọc Thiện",
//                 "phone": "0364117408",
//                 "mail": "tructruong.070202@gmail.com",
//                 "address": "Bình Định",
//                 "gender": "Nam",
//                 "dateborn": "2000-05-08T00:00:00",
//                 "status": 1,
//                 "hoadons": []
//             },
//         ],
//         "search": "036",
//         "sort": "name-asc",
//         "pageIndex": 1,
//         "pageSize": 9,
//         "count": 4,
//         "range": 9,
//         "totalPage": 1
//     },
//     message : ''
// }

import { CHANGE_STATUS_CUSTOM_ADMIN, GET_CUSTOM_ADMIN, RESET_MESSAGE_CUSTOM_ADMIN } from "../actions/AdminCustomAction";

const initialState = {
    dataValue: {},
    massage: ""
}

const AdminCustomReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_CUSTOM_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_CUSTOM_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case CHANGE_STATUS_CUSTOM_ADMIN:
            return {
                ...state,
                message: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default AdminCustomReducer
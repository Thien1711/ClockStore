
// const initialState = {
//     dataValue : {
//         "listNV": [
//             {
//                 "user": "bh01",
//                 "password": "$2a$11$eQgL4nlVRu2/O78Gun.Dh.aufNn2yKLfpwH5gpwa/pUMiUTKyQ.pi",
//                 "name": "Cung Xương Hồng Thiên",
//                 "phone": "0364117408",
//                 "address": "Hồ Chí Minh",
//                 "gender": "Nam",
//                 "dateborn": "2000-05-08T00:00:00",
//                 "quyenId": 2,
//                 "status": 1,
//                 "quyen": null,
//                 "hoaDons": [],
//                 "phieuNhaps": []
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

import { ADD_STAFF_ADMIN, CHANGE_STATUS_STAFF_ADMIN, GET_STAFF_ADMIN, RESET_MESSAGE_STAFF_ADMIN, UPDATE_PASSWORD_STAFF_ADMIN, UPDATE_PERMISSION_STAFF_ADMIN } from "../actions/AdminStaffAction"

const initialState = {
    dataValue: {},
    massage: ""
}

const AdminStaffReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_STAFF_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_STAFF_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case CHANGE_STATUS_STAFF_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case UPDATE_PASSWORD_STAFF_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case UPDATE_PERMISSION_STAFF_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case ADD_STAFF_ADMIN:
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

export default AdminStaffReducer
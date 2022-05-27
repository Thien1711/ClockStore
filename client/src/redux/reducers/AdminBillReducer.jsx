
// const initialState = {
//     dataValue: {
//         "listHD": [
//             {
//                 "id": 1,
//                 "kHuser": "thien405",
//                 "nVuser": "bh01",
//                 "phone": "0364117408",
//                 "address": "Hồ Chí Minh",
//                 "date_receice": "2020-05-08T05:04:06",
//                 "date_order": "2020-05-18T05:04:06",
//                 "total": 5480000,
//                 "status": 2,
//                 "kh": null,
//                 "nv": null
//             },
//         ],
//         "search": "bh01",
//         "status": 0,
//         "pageIndex": 1,
//         "pageSize": 9,
//         "count": 4,
//         "range": 9,
//         "totalPage": 1
//     },
//     message: ''
// }

import { DELETE_BILL_ADMIN, GET_BILL_ADMIN, RESET_MESSAGE_BILL_ADMIN, UPDATE_BILL_STATUS_ADMIN } from "../actions/AdminBillAction";

const initialState = {
    dataValue: {},
    message: {
        type: '',
        value: ''
    }
}


const AdminBillReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_BILL_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_BILL_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case UPDATE_BILL_STATUS_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_BILL_ADMIN:
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

export default AdminBillReducer

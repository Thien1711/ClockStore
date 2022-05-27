// const initialState = {
//     dataValue : {
//         "user": "thong",
//         "password": "$2a$11$B9Td1efkOvZGI5OhszCqtuauydej8WfkGolJo45oqCb.9tj690Wue",
//         "name": "Nguyễn Tấn Thông",
//         "phone": "0364117408",
//         "mail": "tructruong.070202@gmail.com",
//         "address": "Bình Định",
//         "gender": "Nam",
//         "dateborn": "2000-05-08T00:00:00",
//         "status": 1,
//         "hoadons": []
//     },
//     hoaDonValue: {
//         "listHD": [
//             {
//                 "id": 5,
//                 "kHuser": "thom",
//                 "nVuser": null,
//                 "phone": "0364117408",
//                 "address": "An Lão",
//                 "date_receice": null,
//                 "date_order": "2021-12-03T16:10:00.2352113",
//                 "total": 19160000,
//                 "status": 1,
//                 "kh": null,
//                 "nv": null
//             }
//         ],
//         "pageIndex": 1,
//         "pageSize": 9,
//         "count": 37,
//         "range": 9,
//         "totalPage": 5
//     },
//     message : ''
// }

import { ACT_GET_CURRENT_USER_KHACHHANG, ACT_KHACHHANG_LOGIN, ACT_KHACHHANG_LOGOUT, ACT_KHACHHANG_REGISTER, ACT_KHACHHANG_UPDATE_INFO, ACT_KHACHHANG_UPDATE_PASSWORD, GET_BILL_BY_USERKH, RESET_MESSAGE_USER_KHACHHANG } from "../actions/UserKhachHangAction";


const initialState = {
    dataValue: {},
    hoaDonValue: {},
    message: '',
}

const UserKhachHangReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACT_KHACHHANG_REGISTER:
            return {
                ...state,
                message: action.payload
            }
        case RESET_MESSAGE_USER_KHACHHANG:
            return {
                ...state,
                message: action.payload
            }
        case ACT_KHACHHANG_LOGIN:
            return {
                ...state,
                dataValue: action.payload.khachhang,
                message: action.payload.message
            }
        case ACT_GET_CURRENT_USER_KHACHHANG:
            return {
                ...state,
                dataValue: action.payload.khachhang
            }
        case ACT_KHACHHANG_LOGOUT:
            return {
                ...state,
                dataValue: action.payload.khachhang,
                message: action.payload.message
            }
        case ACT_KHACHHANG_UPDATE_INFO:
            return {
                ...state,
                dataValue: action.payload.khachhang,
                message: action.payload.message
            }
        case ACT_KHACHHANG_UPDATE_PASSWORD:
            return {
                ...state,
                dataValue: action.payload.khachhang ? action.payload.khachhang : state.dataValue,
                message: action.payload.message
            }
        case GET_BILL_BY_USERKH:
            return {
                ...state,
                hoaDonValue: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default UserKhachHangReducer

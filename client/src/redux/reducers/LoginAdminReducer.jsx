// const initialState = {
//     dataValue: {
//         "user": "thu",
//         "password": "$2a$11$9PRA30DpbhXCtOUimpkocOVkKXckmsv3f5jp7EPAr/kGzaL5j7m3q",
//         "name": "Nguyễn Thị Thu",
//         "phone": "0357765487",
//         "address": "Vũng Tàu",
//         "gender": "Nữ",
//         "dateborn": "2000-02-09T00:00:00",
//         "quyenId": 1,
//         "status": 1,
//         "quyen": {
//             "id": 1,
//             "name": "Nhân viên nhập hàng",
//             "details": "qlNhapHang-qlSanPham-qlPhieuNhap-qlNCC-qlThongKe-qlLoaiSanPham-qlThuongHieu"
//         },
//         "hoaDons": [],
//         "phieuNhaps": []
//     },
//     message: ""
// }


import { LOGIN_ADMIN, GET_USER, RESET_MESSAGE_USER_NHANVIEN, UPDATE_INFO_USER_ADMIN, UPDATE_PASS_USER_ADMIN, LOGOUT_ADMIN } from "../actions/LoginAdminAction";

const initialState = {
    dataValue: {},
    message: ""
}

const LoginAdminReducer = (state = initialState, action) => {       //action.type action.payload
    switch (action.type) {
        case RESET_MESSAGE_USER_NHANVIEN:
            return {
                ...state,
                message: action.payload
            }
        case LOGIN_ADMIN:
            return {
                ...state,
                dataValue: action.payload.nhanvien,
                message: action.payload.message
            }
        case LOGOUT_ADMIN:
            return {
                ...state,
                dataValue: action.payload.nhanvien,
                message: action.payload.message
            }
        case GET_USER:
            return {
                ...state,
                dataValue: action.payload
            }
        case UPDATE_INFO_USER_ADMIN:
            return {
                ...state,
                dataValue: (action.payload.nhanvien !== null) ? action.payload.nhanvien : state.dataValue,
                message: action.payload.message
            }
        case UPDATE_PASS_USER_ADMIN:
            return {
                ...state,
                dataValue: (action.payload.nhanvien !== null) ? action.payload.nhanvien : state.dataValue,
                message: action.payload.message
            }
        default:
            return {
                ...state
            }
    }
}

export default LoginAdminReducer
// const initialState = {
//     dataValue : {
//         "listQ": [
//             {
//                 "id": 4,
//                 "name": "Admin",
//                 "details": "qlNhapHang-qlNhanVien-qlSanPham-qlHoaDon-qlKhachHang-qlPhieuNhap-qlNCC-qlTaiKhoan-qlQuyen-qlThongKe-qlLoaiSanPham-qlThuongHieu",
//                 "nhanViens": []
//             }
//         ],
//         "search": "",
//         "sort": "name-asc",
//         "pageIndex": 1,
//         "pageSize": 9,
//         "count": 4,
//         "range": 9,
//         "totalPage": 1
//     },
//     message : ''
// }

import { ADD_PERMISSION_ADMIN, DELETE_PERMISSION_ADMIN, GETALL_PERMISSION_ADMIN, GET_PERMISSION_ADMIN, RESET_MESSAGE_PERMISSION_ADMIN, UPDATE_PERMISSION_ADMIN } from "../actions/AdminPermissionAction";

const initialState = {
    dataValue: {},
    message: ''
}

const AdminPermissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_PERMISSION_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_PERMISSION_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_PERMISSION_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_PERMISSION_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_PERMISSION_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case GETALL_PERMISSION_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default AdminPermissionReducer

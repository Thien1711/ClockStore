
import { ADD_PRODUCT_ADMIN, DELETE_PRODUCT_ADMIN, GET_PRODUCT_ADMIN, RESET_MESSAGE_PRODUCT_ADMIN, UPDATE_PRODUCT_ADMIN } from "../actions/AdminProductAction";

// const initialState = {
//     dataValue : {
//         listSP: [
//             {
//                 id: 282,
//                 lspId: 5,
//                 brandId: 6,
//                 wireId: 1,
//                 machineId: 1,
//                 nccId: 3,
//                 name: "Đồng hồ trang trí nghệ thuật họa tiết Lá DH54",
//                 amount: 28,
//                 price: 1450000,
//                 description: "NÉT CỔ ĐIỂN HIẾM CÓ: Đúng như tên gọi “Caballero”, Poniger P7.23-1 sở hữu nét đẹp cổ điển hiếm có, phảng phất phong vị xưa cũ. Chất cổ điển, lịch lãm toát lên từ màu sắc, kiểu dáng cũng như những chi tiết nhấn nhá tinh tế.",
//                 img: "/image/sp134.jpg",
//                 status: 1
//             }
//         ],
//         sort: "name-desc",
//         pageIndex: 2,
//         pageSize: 9,
//         count: 163,
//         range: 9,
//         totalPage: 19
//     },
//     message : ''
// }

const initialState = {
    dataValue: {},
    message: ''
};

const AdminProductReducer = (state = initialState, action) => {       //action.type action.payload
    switch (action.type) {
        case RESET_MESSAGE_PRODUCT_ADMIN:
            return {
                ...state,
                message: action.payload
            }
        case GET_PRODUCT_ADMIN:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_PRODUCT_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case UPDATE_PRODUCT_ADMIN:
            return {
                ...state,
                message: action.payload
            };
        case DELETE_PRODUCT_ADMIN:
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

export default AdminProductReducer
// const initialState = {
//     dataValue : {
//         "listSP": [
//             {
//                 "id": 1,
//                 "lspId": 4,
//                 "brandId": 1,
//                 "wireId": 1,
//                 "machineId": 1,
//                 "nccId": 2,
//                 "name": "Đồng hồ nam chính hãng LOBINNI L3603-4",
//                 "amount": 1,
//                 "price": 2680000,
//                 "description": "TÍNH NĂNG MOONPHASE: Ô cửa sổ với tính năng Moonphase (xem lịch tuần trăng – lịch âm) trên góc 6h có thể coi là điểm nhấn đắt giá của chiếc đồng hồ này. Mặt trăng tròn cùng các vì sao lấp lánh nổi bật trên nền trời đêm xanh thẳm chính là một thiết kế vô cùng bắt mắt.",
//                 "img": "/image/sp8.jpg",
//                 "status": 1,
//                 "lsp": null,
//                 "brand": null,
//                 "wire": null,
//                 "machine": null,
//                 "ncc": null,
//                 "chitietHDs": [],
//                 "chiTietPNs": []
//             },
//             {
//                 "id": 2,
//                 "lspId": 1,
//                 "brandId": 1,
//                 "wireId": 3,
//                 "machineId": 1,
//                 "nccId": 4,
//                 "name": "Đồng hồ để bàn chính hãng NAMKIN B945-2",
//                 "amount": 2,
//                 "price": 2850000,
//                 "description": "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
//                 "img": "/image/sp104.jpg",
//                 "status": 1,
//                 "lsp": null,
//                 "brand": null,
//                 "wire": null,
//                 "machine": null,
//                 "ncc": null,
//                 "chitietHDs": [],
//                 "chiTietPNs": []
//             }
//         ],
//         "total": 8380000,
//          "amount": 3
//     },
//     message : ""
// }

import { REMOVE_SP_FOR_CART_SUCCESS } from "../../constants/Message";
import { ADD_ONE_SP_FOR_CART, CHECKOUT_CART, LOAD_SP_FOR_CART, REMOVE_SP_FOR_CART, RESET_CART, RESET_MESSAGE_CART, SUB_ONE_SP_FOR_CART, UPDATE_AMOUNT_SP_FOR_CART } from "../actions/CartAction";


const initialState = {
    dataValue: null,
    message: ""
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MESSAGE_CART:
            return {
                ...state,
                message: action.payload
            }
        case LOAD_SP_FOR_CART:
            return {
                ...state,
                dataValue: action.payload
            }
        case ADD_ONE_SP_FOR_CART:
            return {
                ...state,
                dataValue: (action.payload.data) ? action.payload.data : state.dataValue,
                message: action.payload.message
            }
        case SUB_ONE_SP_FOR_CART:
            return {
                ...state,
                dataValue: (action.payload.data) ? action.payload.data : state.dataValue,
                message: action.payload.message
            }
        case UPDATE_AMOUNT_SP_FOR_CART:
            return {
                ...state,
                dataValue: (action.payload.data) ? action.payload.data : state.dataValue,
                message: action.payload.message
            }
        case REMOVE_SP_FOR_CART:
            return {
                ...state,
                dataValue: (action.payload.message === REMOVE_SP_FOR_CART_SUCCESS) ? action.payload.data : state.dataValue,
                message: action.payload.message
            }
        case CHECKOUT_CART:
            return {
                ...state,
                message: action.payload
            }
        case RESET_CART:
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

export default CartReducer
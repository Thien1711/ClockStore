// const initialState = {
//     "product": {
//         "id": 1,
//         "lspId": 4,
//         "brandId": 1,
//         "wireId": 1,
//         "machineId": 1,
//         "nccId": 2,
//         "name": "Đồng hồ nam chính hãng LOBINNI L3603-4",
//         "amount": 25,
//         "price": 2680000,
//         "description": "TÍNH NĂNG MOONPHASE: Ô cửa sổ với tính năng Moonphase (xem lịch tuần trăng – lịch âm) trên góc 6h có thể coi là điểm nhấn đắt giá của chiếc đồng hồ này. Mặt trăng tròn cùng các vì sao lấp lánh nổi bật trên nền trời đêm xanh thẳm chính là một thiết kế vô cùng bắt mắt.",
//         "img": "/image/sp8.jpg",
//         "status": 1,
//         "lsp": {
//             "id": 4,
//             "name": "ĐỒNG HỒ NAM",
//             "description": "Đồng hồ dành cho nam"
//         },
//         "brand": {
//             "id": 1,
//             "name": "THƯƠNG HIỆU NAMKIN"
//         },
//         "wire": {
//             "id": 1,
//             "name": "Dây da"
//         },
//         "machine": {
//             "id": 1,
//             "name": "Máy cơ"
//         },
//         "ncc": null,
//         "chitietHDs": [],
//         "chiTietPNs": []
//     },
//     "listRelationship": [
//         {
//             "id": 1,
//             "lspId": 4,
//             "brandId": 1,
//             "wireId": 1,
//             "machineId": 1,
//             "nccId": 2,
//             "name": "Đồng hồ nam chính hãng LOBINNI L3603-4",
//             "amount": 25,
//             "price": 2680000,
//             "description": "TÍNH NĂNG MOONPHASE: Ô cửa sổ với tính năng Moonphase (xem lịch tuần trăng – lịch âm) trên góc 6h có thể coi là điểm nhấn đắt giá của chiếc đồng hồ này. Mặt trăng tròn cùng các vì sao lấp lánh nổi bật trên nền trời đêm xanh thẳm chính là một thiết kế vô cùng bắt mắt.",
//             "img": "/image/sp8.jpg",
//             "status": 1,
//             "lsp": {
//                 "id": 4,
//                 "name": "ĐỒNG HỒ NAM",
//                 "description": "Đồng hồ dành cho nam"
//             },
//             "brand": {
//                 "id": 1,
//                 "name": "THƯƠNG HIỆU NAMKIN"
//             },
//             "wire": {
//                 "id": 1,
//                 "name": "Dây da"
//             },
//             "machine": {
//                 "id": 1,
//                 "name": "Máy cơ"
//             },
//             "ncc": null,
//             "chitietHDs": [],
//             "chiTietPNs": []
//         },
//     ]
// }

import { GET_PRODUCT_PAGE } from "../actions/ProductPageAction";

const initialState = {}

const ProductPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_PAGE:
            return action.payload;
    
        default:
            return {
                ...state
            }
    }
}

export default ProductPageReducer

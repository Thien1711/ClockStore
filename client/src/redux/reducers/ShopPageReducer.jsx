// const initialState = {
//     "listSP": [
//         {
//             "id": 116,
//             "lspId": 4,
//             "brandId": 1,
//             "wireId": 1,
//             "machineId": 1,
//             "nccId": 3,
//             "name": "Đồng hồ nam chính hãng LOBINNI L12030-1",
//             "amount": 33,
//             "price": 4650000,
//             "description": "Lobinni luôn quan niệm chiếc đồng hồ là thứ ghi lại những khoảnh khắc quý giá nhất trong cuộc sống. Để có được những chiếc đồng hồ có chất lượng tốt nhất Lobinni luôn tuyển chọn những người thợ thủ công có tay nghề cao, ít nhất 10 năm kinh nghiệm trong ngành thiết kế và sản xuất đồng hồ.",
//             "img": "/image/sp15.jpg",
//             "status": 1,
//             "lsp": {
//                 "id": 4,
//                 "name": "ĐỒNG HỒ NAM",
//                 "description": "Đồng hồ dành cho nam"
//             },
//             "brand": {
//                 "id": 1,
//                 "name": "ĐỒNG HỒ NAMKIN"
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
//         }
//     ],
//     lsp: {
//         id: 4,
//         name: "ĐỒNG HỒ NAM",
//         description: "Đồng hồ dành cho nam"
//     },
//     th: {
//         id: 1,
//         name: "ĐỒNG HỒ NAMKIN"
//     },
//     km: {
//         id: 1,
//         name: "Máy cơ"
//     },
//     kd: {
//         id: 1,
//         name: "Dây da"
//     },
//     "priceFrom": 1000,
//     "priceTo": 5600000,
//     "search": "",
//     "sort": "name-asc",
//     "pageIndex": 1,
//     "pageSize": 9,
//     "count": 7,
//     "range": 9,
//     "totalPage": 1
// }

import { GET_BRANCH_SHOP_PAGE, GET_MACHINE_SHOP_PAGE, GET_PRODUCT_SHOP_PAGE, GET_WIRE_SHOP_PAGE } from "../actions/ShopPageAction";

const initialState = {
    products: {},
    brands: [],
    machines: [],
    wires: []
}


const ShopPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_SHOP_PAGE:
            return {
                ...state,
                products: action.payload
            }
        case GET_BRANCH_SHOP_PAGE:
            return {
                ...state,
                brands: [...action.payload]
            }
        case GET_WIRE_SHOP_PAGE:
            return {
                ...state,
                wires: [...action.payload]
            }
        case GET_MACHINE_SHOP_PAGE:
            return {
                ...state,
                machines: [...action.payload]
            }
        default:
            return {
                ...state
            }
    }
}

export default ShopPageReducer


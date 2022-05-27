
// const initialState = [
//     {
//         "billId": 2,
//         "productId": 7,
//         "name": "Đồng hồ nam chính hãng LOBINNI L9010-3",
//         "amount": 1,
//         "price": 5280000,
//         "img": "/image/sp6.jpg",
//         "product": null
//     }
// ]

import { GET_DETAIL_BILL } from "../actions/BillDetailAction";

const initialState = [];

const BillDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_BILL:
            
            return action.payload;
    
        default:
            return [...state];
    }
}

export default BillDetailReducer
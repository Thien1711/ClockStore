// const initialState = [
//     {
//         "couponId": 1,
//         "productId": 28,
//         "name": "Đồng hồ nam chính hãng LOBINNI L16050-2",
//         "amount": 10,
//         "price": 4800000,
//         "img": "/image/sp4.jpg",
//         "coupon": null,
//         "product": null
//     }
// ]
import { GET_DETAIL_COUPON } from "../actions/AdminCouponDetailAction";

const initialState = [];

const AdminCouponDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAIL_COUPON:
            
            return action.payload;
    
        default:
            return [...state];
    }
}

export default AdminCouponDetailReducer
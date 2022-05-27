// const initialState = [
//     {
//         "key": 2020,
//         "value": 30240000
//     },
//     {
//         "key": 2021,
//         "value": 6740000
//     }
// ]

// const initialState = {
//     labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
//     datasets: [
//         {
//             label: 'Population',
//             data: [
//                 10000,
//                 181045,
//                 153060,
//                 106519,
//                 105162,
//                 95072
//             ],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(153, 102, 255, 0.6)',
//                 'rgba(255, 159, 64, 0.6)',
//                 'rgba(140, 99, 132, 0.6)'
//             ]
//         }
//     ]
// }

import { DOANH_THU_IN_YEAR_THONG_KE, DOANH_THU_IN_MONTH_THONG_KE, BILL_IN_YEAR_THONG_KE, BILL_IN_MONTH_THONG_KE, PRODUCT_IN_YEAR_THONG_KE, PRODUCT_IN_MONTH_THONG_KE } from "../actions/AdminStatisticalAction";

const initialState = {};

const AdminStatisticalReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOANH_THU_IN_YEAR_THONG_KE:
            return action.payload;
        case DOANH_THU_IN_MONTH_THONG_KE:
            return action.payload;
        case BILL_IN_YEAR_THONG_KE:
            return action.payload;
        case BILL_IN_MONTH_THONG_KE:
            return action.payload;
        case PRODUCT_IN_YEAR_THONG_KE:
            return action.payload;
        case PRODUCT_IN_MONTH_THONG_KE:
            return action.payload;
        default:
            return {
                ...state
            }
    }
}

export default AdminStatisticalReducer
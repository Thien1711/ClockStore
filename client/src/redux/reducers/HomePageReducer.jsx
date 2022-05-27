// const initialState = [
//     {
//         "lsp": {
//             "id": 1,
//             "name": "ĐỒNG HỒ ĐỂ BÀN",
//             "description": "Đồng hồ dành để bàn cho việc học và làm việc"
//         },
//         "listSP": [
//             {
//                 "id": 2,
//                 "lspId": 1,
//                 "brandId": 1,
//                 "wireId": 3,
//                 "machineId": 1,
//                 "nccId": 4,
//                 "name": "Đồng hồ để bàn chính hãng NAMKIN B945-2",
//                 "amount": 33,
//                 "price": 2850000,
//                 "description": "Là sản phẩm của đất nước USA, nơi cội nguồn của nền công nghiệp thế giới nên tất cả các dòng sản phẩm Đồng hồ Teintop đều được trải qua quy trình kiểm định nghiêm ngặt nên chất lượng được đảm bảo tốt nhất. Đồng hồ Teintop chính hãng với chất lượng tốt và giá rẻ khi bước chân vào thị trường Việt Nam đã trở thành một hiện tượng mà rất nhiều người dùng biết đến. Nó đáp ứng được nhu cầu ngon - bổ - rẻ của người dùng tại Việt Nam vì thế Đồng hồ NAMKIN trở thành thương hiệu tầm trung bán chạy nhất tại Việt Nam.",
//                 "img": "/image/sp104.jpg",
//                 "status": 1,
//                 "lsp": {
//                     "id": 1,
//                     "name": "ĐỒNG HỒ ĐỂ BÀN",
//                     "description": "Đồng hồ dành để bàn cho việc học và làm việc"
//                 },
//                 "brand": null,
//                 "wire": null,
//                 "machine": null,
//                 "ncc": null,
//                 "chitietHDs": [],
//                 "chiTietPNs": []
//             }
//         ]
//     },
// ]

import { GET_PRODUCT_HOME_PAGE } from "../actions/HomePageAction"

const initialState = []


const HomePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_HOME_PAGE:
            return action.payload;
        
        default:
            return [...state];
    }
}

export default HomePageReducer


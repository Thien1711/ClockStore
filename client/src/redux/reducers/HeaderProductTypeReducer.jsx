import { GET_PRODUCT_TYPE_HEADER } from "../actions/HeaderProductTypeAction";


const initialState = [];

const HeaderProductTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_TYPE_HEADER:
            return action.payload;
    
        default:
            return [...state]
    }
}

export default HeaderProductTypeReducer
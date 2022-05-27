import { applyMiddleware, createStore } from "redux";
import appReducers from "./reducers/appReducer";
import thunk from 'redux-thunk'

const Store = createStore(
    appReducers,
    applyMiddleware(thunk)
)

export default Store
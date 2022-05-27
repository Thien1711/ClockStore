import { combineReducers } from "redux";
import AdminProductReducer from "./AdminProductReducer";
import LoginAdminReducer from "./LoginAdminReducer";
import AdminProductTypeReducer from './AdminProductTypeReducer'
import HeaderProductTypeReducer from "./HeaderProductTypeReducer";
import AdminMachineReducer from "./AdminMachineReducer";
import AdminWireReducer from "./AdminWireReducer";
import AdminBillReducer from "./AdminBillReducer";
import AdminBrandReducer from "./AdminBrandReducer";
import ShopPageReducer from './ShopPageReducer'
import HomePageReducer from './HomePageReducer'
import ProductPageReducer from './ProductPageReducer'
import UserKhachHangReducer from './UserKhachHangReducer'
import AdminCustomReducer from './AdminCustomReducer'
import AdminStaffReducer from './AdminStaffReducer'
import AdminPermissionReducer from './AdminPermissionReducer'
import CartReducer from './CartReducer'
import BillDetailReducer from './BillDetailReducer'
import AdminCouponReducer from './AdminCouponReducer'
import AdminCouponDetailReducer from './AdminCouponDetailReducer'
import AdminImportGoodsReducer from './AdminImportGoodsReducer'
import AdminStatisticalReducer from './AdminStatisticalReducer'

const appReducers = combineReducers({
    LoginAdminReducer : LoginAdminReducer,
    AdminProductReducer : AdminProductReducer,
    AdminProductTypeReducer,
    AdminCustomReducer,
    AdminStaffReducer,
    AdminMachineReducer,
    AdminWireReducer,
    AdminPermissionReducer,
    AdminBrandReducer,
    AdminBillReducer,
    AdminCouponReducer,
    HeaderProductTypeReducer,
    ShopPageReducer,
    HomePageReducer,
    ProductPageReducer,
    UserKhachHangReducer,
    CartReducer,
    BillDetailReducer,
    AdminCouponDetailReducer,
    AdminImportGoodsReducer,
    AdminStatisticalReducer
})

export default appReducers
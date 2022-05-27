import './App.css';
import Shop from './pages/ShopPages/Shop/Shop';
import { Navigate, Route, Routes } from 'react-router';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import ProductsAdmin from './pages/AdminPages/ProductsAdmin/ProductsAdmin';
import ShopLayout from './layouts/ShopLayout/ShopLayout';
import LoginAdminPage from './pages/LoginAdminPage/LoginAdminPage';
import CustomAdmin from './pages/AdminPages/CustomAdmin/CustomAdmin';
import StaffAdmin from './pages/AdminPages/StaffAdmin/StaffAdmin';
import ProductTypeAdmin from './pages/AdminPages/ProductTypeAdmin/ProductTypeAdmin';
import PermissionAdmin from './pages/AdminPages/PermissionAdmin/PermissionAdmin';
import UserAdmin from './pages/AdminPages/UserAdmin/UserAdmin';
import Home from './pages/ShopPages/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import MachineAdmin from './pages/AdminPages/MachineAdmin/MachineAdmin';
import WireAdmin from './pages/AdminPages/WireAdmin/WireAdmin';
import BrandAdmin from './pages/AdminPages/BrandAdmin/BrandAdmin';
import Product from './pages/ShopPages/Product/Product';
import Register from './pages/ShopPages/Register/Register';
import Login from './pages/ShopPages/Login/Login';
import User from './pages/ShopPages/User/User';
import UserDetail from './components/ShopComponents/UserPageComponent/UserDetail';
import UserUpdateInfo from './components/ShopComponents/UserPageComponent/UserUpdateInfo';
import UserUpdatePassword from './components/ShopComponents/UserPageComponent/UserUpdatePassword';
import UserOrder from './components/ShopComponents/UserPageComponent/UserOrder';
import Cart from './pages/ShopPages/Cart/Cart';
import BillDetail from './pages/ShopPages/BillDetail/BillDetail';
import BillAdmin from './pages/AdminPages/BillAdmin/BillAdmin';
import BillDetailAdmin from './pages/AdminPages/BillDetailAdmin/BillDetailAdmin';
import CouponAdmin from './pages/AdminPages/CouponAdmin/CouponAdmin';
import CouponDetailAdmin from './pages/AdminPages/CouponDetailAdmin/CouponDetailAdmin';
import ImportGoodsAdmin from './pages/AdminPages/ImportGoodsAdmin/ImportGoodsAdmin';
import StatisticalAdmin from './pages/AdminPages/StatisticalAdmin/StatisticalAdmin';

function App() {
  return (
    <Routes>
      <Route path='/' exact element={<Navigate to="/home" />} />
      <Route element={<ShopLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/shop/:productTypeId' element={<Shop />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/bill-detail/:Id' element={<BillDetail />} />
        <Route path='/user' element={<Navigate to="/user/detail" />} />
        <Route element={<User />}>
          <Route path='/user/detail' element={<UserDetail />} />
          <Route path='/user/update-info' element={<UserUpdateInfo />} />
          <Route path='/user/update-pass' element={<UserUpdatePassword />} />
          <Route path='/user/order' element={<UserOrder />} />
        </Route>
      </Route>
      <Route element={<AdminLayout />}>
        <Route path='/admin/account' element={<UserAdmin />} />
        <Route path='/admin/products' element={<ProductsAdmin />} />
        <Route path='/admin/custom' element={<CustomAdmin />} />
        <Route path='/admin/staff' element={<StaffAdmin />} />
        <Route path='/admin/brand' element={<BrandAdmin />} />
        <Route path='/admin/product-type' element={<ProductTypeAdmin />} />
        <Route path='/admin/machine' element={<MachineAdmin />} />
        <Route path='/admin/wire' element={<WireAdmin />} />
        <Route path='/admin/bill' element={<BillAdmin />} />
        <Route path='/admin/permission' element={<PermissionAdmin />} />
        <Route path='/admin/coupon' element={<CouponAdmin />} />
        <Route path='/admin/import-goods' element={<ImportGoodsAdmin />} />
        <Route path='/admin/statistical' element={<StatisticalAdmin />} />
      </Route>
      <Route path='/admin/bill-detail/:Id' element={<BillDetailAdmin />} />
      <Route path='/admin/coupon-detail/:Id' element={<CouponDetailAdmin />} />
      <Route path="*" element={<NoMatch />} />
      <Route path='/auth/login' element={<LoginAdminPage /> } />
      
    </Routes>

  );
}

export default App;

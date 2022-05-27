import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { ACT_LOGOUT_ERROR, ACT_LOGOUT_SUCCESS } from '../../../constants/Message'
import { actGetUser, actLogoutAdmin, actResetMessageUserNhanVien } from '../../../redux/actions/LoginAdminAction'
import CustomLinkAdmin from '../CustomLinkAdmin/CustomLinkAdmin'
import { CustomLinkMobileMenuAdmin } from '../CustomLinkAdmin/CustomLinkAdmin'

var isLoginUser = false;

function AdminMenu() {
    const UserAdmin = useSelector(state => state.LoginAdminReducer)
    const [user, setUser] = useState('');

    const [elmLinkMobileAccount, setElmLinkMobileAccount] = useState(null);
    const [elmLinkMobileImportGoods, setElmLinkMobileImportGoods] = useState(null);
    const [elmLinkMobileCustom, setElmLinkMobileCustom] = useState(null);
    const [elmLinkMobileStaff, setElmLinkMobileStaff] = useState(null);
    const [elmLinkMobileBrand, setElmLinkMobileBrand] = useState(null);
    const [elmLinkMobileProducts, setElmLinkMobileProducts] = useState(null);
    const [elmLinkMobileProductType, setElmLinkMobileProductType] = useState(null);
    const [elmLinkMobileMachine, setElmLinkMobileMachine] = useState(null);
    const [elmLinkMobileWire, setElmLinkMobileWire] = useState(null);
    const [elmLinkMobilePermission, setElmLinkMobilePermission] = useState(null);
    const [elmLinkMobileBill, setElmLinkMobileBill] = useState(null);
    const [elmLinkMobileCoupon, setElmLinkMobileCoupon] = useState(null);
    const [elmLinkMobileStatistical, setElmLinkMobileStatistical] = useState(null);

    const [elmLinkAccount, setElmLinkAccount] = useState(null);
    const [elmLinkImportGoods, setElmLinkImportGoods] = useState(null);
    const [elmLinkCustom, setElmLinkCustom] = useState(null);
    const [elmLinkStaff, setElmLinkStaff] = useState(null);
    const [elmLinkBrand, setElmLinkBrand] = useState(null);
    const [elmLinkProducts, setElmLinkProducts] = useState(null);
    const [elmLinkProductType, setElmLinkProductType] = useState(null);
    const [elmLinkMachine, setElmLinkMachine] = useState(null);
    const [elmLinkWire, setElmLinkWire] = useState(null);
    const [elmLinkPermission, setElmLinkPermission] = useState(null);
    const [elmLinkBill, setElmLinkBill] = useState(null);
    const [elmLinkCoupon, setElmLinkCoupon] = useState(null);
    const [elmLinkStatistical, setElmLinkStatistical] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actGetUser());
    }, [dispatch])

    useEffect(() => {
        // console.log("Current User Admin : ", UserAdmin);
        if (isLoginUser) {
            if (!UserAdmin.dataValue.name) {
                navigate('/auth/login');
            }
            else {
                if (UserAdmin.dataValue.name) {
                    // console.log("USer: ", UserAdmin.dataValue.quyen.details.search("TaiKhoan") >= 0);

                    if(UserAdmin.dataValue.quyen.details.search("TaiKhoan") >= 0){
                        setElmLinkMobileAccount(<CustomLinkMobileMenuAdmin to='/admin/account'>Tài khoản</CustomLinkMobileMenuAdmin>)
                        setElmLinkAccount(<CustomLinkAdmin to='/admin/account'>Tài khoản</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileAccount(null)
                        setElmLinkAccount(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("NhapHang") >= 0){
                        setElmLinkMobileImportGoods(<CustomLinkMobileMenuAdmin to='/admin/import-goods'>Nhập hàng</CustomLinkMobileMenuAdmin>)
                        setElmLinkImportGoods(<CustomLinkAdmin to='/admin/import-goods'>Nhập hàng</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileImportGoods(null)
                        setElmLinkImportGoods(null)
                    }
                    
                    if(UserAdmin.dataValue.quyen.details.search("KhachHang") >= 0){
                        setElmLinkMobileCustom(<CustomLinkMobileMenuAdmin to='/admin/custom'>Khách hàng</CustomLinkMobileMenuAdmin>)
                        setElmLinkCustom(<CustomLinkAdmin to='/admin/custom'>Khách hàng</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileCustom(null)
                        setElmLinkCustom(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("NhanVien") >= 0){
                        setElmLinkMobileStaff(<CustomLinkMobileMenuAdmin to='/admin/staff'>Nhân viên</CustomLinkMobileMenuAdmin>)
                        setElmLinkStaff(<CustomLinkAdmin to="/admin/staff">Nhân viên</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileStaff(null)
                        setElmLinkStaff(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("ThuongHieu") >= 0){
                        setElmLinkMobileBrand(<CustomLinkMobileMenuAdmin to='/admin/brand'>Thương hiệu</CustomLinkMobileMenuAdmin>)
                        setElmLinkBrand(<CustomLinkAdmin to="/admin/brand">Thương hiệu</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileBrand(null)
                        setElmLinkBrand(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("SanPham") >= 0){
                        setElmLinkMobileProducts(<CustomLinkMobileMenuAdmin to='/admin/products'>Sản phẩm</CustomLinkMobileMenuAdmin>)
                        setElmLinkProducts(<CustomLinkAdmin to="/admin/products">Sản phẩm</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileProducts(null)
                        setElmLinkProducts(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("LoaiSanPham") >= 0){
                        setElmLinkMobileProductType(<CustomLinkMobileMenuAdmin to='/admin/product-type'>Loại sản phẩm</CustomLinkMobileMenuAdmin>)
                        setElmLinkProductType(<CustomLinkAdmin to="/admin/product-type">Loại sản phẩm</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileProductType(null)
                        setElmLinkProductType(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("KieuMay") >= 0){
                        setElmLinkMobileMachine(<CustomLinkMobileMenuAdmin to="/admin/machine">Kiểu máy</CustomLinkMobileMenuAdmin>)
                        setElmLinkMachine(<CustomLinkAdmin to="/admin/machine">Kiểu máy</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileMachine(null)
                        setElmLinkMachine(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("KieuDay") >= 0){
                        setElmLinkMobileWire(<CustomLinkMobileMenuAdmin to="/admin/wire">Kiểu dây</CustomLinkMobileMenuAdmin>)
                        setElmLinkWire(<CustomLinkAdmin to="/admin/wire">Kiểu dây</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileWire(null)
                        setElmLinkWire(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("Quyen") >= 0){
                        setElmLinkMobilePermission(<CustomLinkMobileMenuAdmin to='/admin/permission'>Quyền</CustomLinkMobileMenuAdmin>)
                        setElmLinkPermission(<CustomLinkAdmin to="/admin/permission">Quyền</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobilePermission(null)
                        setElmLinkPermission(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("DonHang") >= 0){
                        setElmLinkMobileBill(<CustomLinkMobileMenuAdmin to='/admin/bill'>Đơn hàng</CustomLinkMobileMenuAdmin>)
                        setElmLinkBill(<CustomLinkAdmin to="/admin/bill">Đơn hàng</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileBill(null)
                        setElmLinkBill(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("PhieuNhap") >= 0){
                        setElmLinkMobileCoupon(<CustomLinkMobileMenuAdmin to='/admin/coupon'>Phiếu nhập</CustomLinkMobileMenuAdmin>)
                        setElmLinkCoupon(<CustomLinkAdmin to="/admin/coupon">Phiếu nhập</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileCoupon(null)
                        setElmLinkCoupon(null)
                    }

                    if(UserAdmin.dataValue.quyen.details.search("ThongKe") >= 0){
                        setElmLinkMobileStatistical(<CustomLinkMobileMenuAdmin to='/admin/statistical'>Thống kê</CustomLinkMobileMenuAdmin>)
                        setElmLinkStatistical(<CustomLinkAdmin to="/admin/statistical">Thống kê</CustomLinkAdmin>)
                    }
                    else {
                        setElmLinkMobileStatistical(null)
                        setElmLinkStatistical(null)
                    }
                }
            }
        }
        else {
            isLoginUser = true;
        }
        setUser(UserAdmin.dataValue.name)


    }, [UserAdmin.dataValue, navigate])

    useEffect(() => {
        console.log(UserAdmin.message)
        switch (UserAdmin.message) {
            case ACT_LOGOUT_SUCCESS:
                toast.success(UserAdmin.message);
                dispatch(actResetMessageUserNhanVien());
                break;
            case ACT_LOGOUT_ERROR:
                toast.error(UserAdmin.message);
                dispatch(actResetMessageUserNhanVien());
                break;

            default:
                break;
        }
    }, [UserAdmin.message, dispatch])

    const submitLogout = () => {
        dispatch(actLogoutAdmin());
    }

    return (
        <div>
            <div id="accordianId" role="tablist" aria-multiselectable="true">
                <div className="card">
                    <div className="card-header" role="tab" id="section1HeaderId">
                        <h5 className="mb-0">
                            <button type="button" className="btn btn-info btn-collapse" data-target="#section1ContentId" data-toggle="collapse" aria-pressed="false" autoComplete="false">
                                <i className="fa fa-align-justify" aria-hidden="true" />
                            </button>
                            <a className="navbar-brand">Admin</a>
                        </h5>
                    </div>
                    <div id="section1ContentId" className="collapse in" role="tabpanel" aria-labelledby="section1HeaderId">

                        {elmLinkMobileAccount}
                        {elmLinkMobileImportGoods}
                        {elmLinkMobileCustom}
                        {elmLinkMobileStaff}
                        {elmLinkMobileBrand}
                        {elmLinkMobileProducts}
                        {elmLinkMobileProductType}
                        {elmLinkMobileMachine}
                        {elmLinkMobileWire}
                        {elmLinkMobilePermission}
                        {elmLinkMobileBill}
                        {elmLinkMobileCoupon}
                        {elmLinkMobileStatistical}

                    </div>
                </div>
            </div>
            <div className="sidebar">
                <h3>Admin</h3>
                {elmLinkAccount}
                {elmLinkImportGoods}
                {elmLinkCustom}
                {elmLinkStaff}
                {elmLinkBrand}
                {elmLinkProducts}
                {elmLinkProductType}
                {elmLinkMachine}
                {elmLinkWire}
                {elmLinkPermission}
                {elmLinkBill}
                {elmLinkCoupon}
                {elmLinkStatistical}

            </div>

            <nav className="navbar navbar-inverse border-bottom">
                <ul className="nav navbar-nav">
                </ul>
                <p className="navbar-text"><span>{user}</span> | <button onClick={submitLogout}>Đăng xuất</button></p>
            </nav>
        </div>
    )
}

export default AdminMenu

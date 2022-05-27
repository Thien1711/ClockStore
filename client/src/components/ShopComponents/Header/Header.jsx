import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ACT_LOGOUT_ERROR, ACT_LOGOUT_SUCCESS } from '../../../constants/Message'
import { actGetProductTypeHeader } from '../../../redux/actions/HeaderProductTypeAction'
import { actGetCurrentUserKhachHang, actLogoutKhachHang, actResetMessageUserKhachHang } from '../../../redux/actions/UserKhachHangAction'
import CustomLinkShop from '../CustomLinkShop/CustomLinkShop'
import HeaderControl from '../HeaderControl/HeaderControl'
import './Header.css'

function Header() {

    const HeaderProductTypeReducer = useSelector(state => state.HeaderProductTypeReducer);
    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [elmCustomLinks, setElmCustomLinks] = useState(null);
    const [elmUser, setElmUser] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetProductTypeHeader());
        dispatch(actGetCurrentUserKhachHang());
    }, [dispatch])

    useEffect(() => {
        // console.log(HeaderProductTypeReducer);
        var result = null;
        if (HeaderProductTypeReducer.length > 0) {
            result = HeaderProductTypeReducer.map((loaiSanPham, index) => {
                return <CustomLinkShop key={index} to={`/shop/${loaiSanPham.id}`}>{loaiSanPham.name}</CustomLinkShop>
            });
        }

        setElmCustomLinks(result);
    }, [HeaderProductTypeReducer])

    useEffect(() => {
        setElmUser(
            <div className="ht-right">
                <Link to='/register' className="login-panel"><i className="fa fa-user" />Đăng ký</Link>

                <div className="top-social">
                    <Link to='/login' className="ml-3"><i className="fa fa-user" />&nbsp;Đăng nhập</Link>
                </div>
            </div>
        );

        if (UserKhachHangReducer.dataValue.name) {
            setElmUser(
                <div className="ht-right">
                    <a className="login-panel" onClick={clickLogout}><i className="fa fa-user" />Đăng xuất</a>
                    <div className="top-social">
                        <Link to='/user' className="ml-3">{UserKhachHangReducer.dataValue.name}</Link>
                    </div>
                </div>
            );
        }

        // console
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [UserKhachHangReducer.dataValue])

    useEffect(() => {
        switch (UserKhachHangReducer.message) {
            case ACT_LOGOUT_SUCCESS:
                toast.success(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            case ACT_LOGOUT_ERROR:
                toast.error(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            default:
                break;
        }
    }, [UserKhachHangReducer.message, dispatch])
    

    const clickLogout = () => {
        dispatch(actLogoutKhachHang());
    }

    return (
        <header className="header-section">
            <div className="header-top">
                <div className="container">
                    <div className="ht-left">
                        <div className="mail-service">
                            <i className=" fa fa-envelope" />
                            thienabc926@gmail.com
                        </div>
                        <div className="phone-service">
                            <i className=" fa fa-phone" />
                            036.411.7408
                        </div>
                    </div>
                    {/* <div className="ht-right">
                        <Link to='/login' className="login-panel"><i className="fa fa-user" />Đăng nhập</Link>
                        <div className="top-social">
                            <Link to='/login' className="ml-3"><i className="fa fa-user" /> &nbsp;Đăng ký</Link>
                        </div>
                    </div> */}
                    {elmUser}
                </div>
            </div>
            <div className="container">
                <div className="inner-header">

                    <HeaderControl />

                </div>
            </div>
            <div className="nav-item">
                <div className="container">
                    {/* <div className="nav-depart">
                        <div className="depart-btn">
                            <i className="ti-menu" />
                            <span>All departments</span>
                            <ul className="depart-hover">
                                <li className="active"><a href="#">Women’s Clothing</a></li>
                                <li><a href="#">Men’s Clothing</a></li>
                                <li><a href="#">Underwear</a></li>
                                <li><a href="#">Kid's Clothing</a></li>
                                <li><a href="#">Brand Fashion</a></li>
                                <li><a href="#">Accessories/Shoes</a></li>
                                <li><a href="#">Luxury Brands</a></li>
                                <li><a href="#">Brand Outdoor Apparel</a></li>
                            </ul>
                        </div>
                    </div> */}
                    <nav className="nav-menu mobile-menu">
                        <ul>
                            {/* <li><a href="./index.html">Home</a></li>
                            <li><a href="./shop.html">Shop</a></li>
                            <li><a href="#">Collection</a>
                                <ul className="dropdown">
                                    <li><a href="#">Men's</a></li>
                                    <li><a href="#">Women's</a></li>
                                    <li><a href="#">Kid's</a></li>
                                </ul>
                            </li>
                            <li><a href="./blog.html">Blog</a></li>
                            <li><a href="./contact.html">Contact</a></li>
                            <li><a href="#">Pages</a>
                                <ul className="dropdown">
                                    <li><a href="./blog-details.html">Blog Details</a></li>
                                    <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                    <li><a href="./check-out.html">Checkout</a></li>
                                    <li><a href="./faq.html">Faq</a></li>
                                    <li><a href="./register.html">Register</a></li>
                                    <li><a href="./login.html">Login</a></li>
                                </ul>
                            </li> */}
                            <CustomLinkShop to='/home'>Trang chủ</CustomLinkShop>
                            {/* <CustomLinkShop to='/shop/1'>Đồng hồ nam</CustomLinkShop> */}
                            {elmCustomLinks}
                        </ul>
                    </nav>
                    <div id="mobile-menu-wrap" />
                </div>
            </div>
        </header>
    )
}

export default Header

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import UserPageNav from '../../../components/ShopComponents/UserPageComponent/UserPageNav'

var isDisplayUser = false;

function User() {

    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)
    const navigate = useNavigate();
    useEffect(() => {
        if(isDisplayUser && !UserKhachHangReducer.dataValue.name) {
            navigate('/login');
        }
        else {
            isDisplayUser = true;
        }
    }, [UserKhachHangReducer.dataValue, navigate])

    return (
        <div>
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <Link to="/home"><i className="fa fa-home" /> Trang chủ</Link>
                                <span>Tài khoản</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <section className="product-shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
                            <UserPageNav />
                        </div>
                        
                        <Outlet />

                    </div>
                </div>
            </section>
        </div>

    )
}

export default User

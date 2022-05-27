import React from 'react'
import { Link } from 'react-router-dom'

function UserPageNav() {
    return (
        <div className="filter-widget">
            <h4 className="fw-title">Thông tin cá nhân</h4>
            <ul className="filter-catagories">
                <li><Link to='/user/detail'>Xem thông tin cá nhân</Link></li>
                <li><Link to='/user/update-info'>Sửa thông tin cá nhân</Link></li>
                <li><Link to='/user/update-pass'>Sửa mật khẩu</Link></li>
                <li><Link to='/user/order'>Xem đơn hàng</Link></li>
            </ul>
        </div>
    )
}

export default UserPageNav

import React from 'react'
import {Link} from 'react-router-dom'
import './NoMatch.css'

function NoMatch() {
    return (
        <div>
            <h2>Không tìm thấy trang! Lỗi 404</h2>
            <p>
                <Link to="/" className="link">Trở về trang chủ</Link>
            </p>
        </div>
    )
}

export default NoMatch

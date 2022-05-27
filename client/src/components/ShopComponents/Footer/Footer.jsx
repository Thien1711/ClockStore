import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="footer-left">
                            <div className="footer-logo">
                                <a href="#"><img src="img/footer-logo.png" /></a>
                            </div>
                            <ul>
                                <li>Địa chỉ: 273 An Dương Vương, phường 3, quận 5, TP.HCM</li>
                                <li>Số điện thoại: +84 36.411.7408</li>
                                <li>Thư điện tử: tructruong.070202@gmail.com</li>
                            </ul>
                            <div className="footer-social">
                                <a href="https://www.facebook.com/thien926/"><i className="fa fa-facebook" /></a>
                                <a href="#"><i className="fa fa-instagram" /></a>
                                <a href="#"><i className="fa fa-twitter" /></a>
                                <a href="#"><i className="fa fa-pinterest" /></a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-lg-2 offset-lg-1">
                        <div className="footer-widget">
                            <h5>Information</h5>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Checkout</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Serivius</a></li>
                            </ul>
                        </div>
                    </div> */}
                    <div className="col-lg-3">
                        <div className="footer-widget">
                            <h5>Tài khoản của tôi</h5>
                            <ul>
                                <li><Link to="/user">Tài khoản của tôi</Link></li>
                                <li><Link to="/cart">Giỏ hàng</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="newslatter-item">
                            <h5>Tham gia với chúng tôi</h5>
                            <p>Nhận thông tin cập nhật qua E-mail về sản phẩm mới nhất của chúng tôi.</p>
                            <form action="#" className="subscribe-form">
                                <input type="text" placeholder="Enter Your Mail" />
                                <button type="button">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer

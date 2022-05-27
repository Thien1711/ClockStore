import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartItem from '../../../components/ShopComponents/CartComponent/CartItem'
import { actCheckoutCart, actRemoveSPForCart, actSubtractOneSPForCart, actUpdateAmountSPForCart } from '../../../redux/actions/CartAction'

function Cart() {

    const CartReducer = useSelector(state => state.CartReducer)
    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [elmListItem, setelmListItem] = useState(null);
    const [address, setAddress] = useState('');

    // var user = '';

    const dispatch = useDispatch();

    useEffect(() => {
        if (UserKhachHangReducer.address) {
            setAddress(UserKhachHangReducer.address);
        }

        // if (UserKhachHangReducer.user) {
        //     user = UserKhachHangReducer.user;
        // }
    }, [UserKhachHangReducer])

    useEffect(() => {
        setTotal(0);
        setAmount(0);
        var result = null;
        console.log(CartReducer.dataValue);

        if (CartReducer.dataValue) {
            result = CartReducer.dataValue.listSP.map((cartItem, index) => {
                return <CartItem submitSubtractAmountSP={submitSubtractAmountSP} submitUpdateAmountSP={submitUpdateAmountSP} removeSPForCart={removeSPForCart} cartItem={cartItem} key={index} />
            })
            setTotal(CartReducer.dataValue.total)
            setAmount(CartReducer.dataValue.amount)

        }
        setelmListItem(result);
    }, [CartReducer.dataValue])

    const removeSPForCart = (id) => {
        dispatch(actRemoveSPForCart(id));
    }

    const submitUpdateAmountSP = (id, amount) => {
        dispatch(actUpdateAmountSPForCart(id, amount));
    }

    const submitSubtractAmountSP = (id) => {
        dispatch(actSubtractOneSPForCart(id))
    }

    const submitThanhToan = () => {
        if(!address) {
            toast.error("Chưa nhập địa chỉ giao hàng!");
            return;
        }

        var data = {
            address : address,
            donhang : localStorage.getItem("donhang")
        }

        console.log(data);

        dispatch(actCheckoutCart(data));
    }

    return (
        <div>
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text product-more">
                                <Link to='/home'><i className="fa fa-home" /> Trang chủ</Link>
                                <span>Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="shopping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Hình ảnh</th>
                                            <th className="p-name">Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng tiền</th>
                                            <th><i className="ti-close" /></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <CartItem />
                                        <CartItem />
                                        <CartItem /> */}
                                        {elmListItem}
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="discount-coupon">
                                        <h6>Phương thức giao hàng</h6>

                                        <select id="input" className="form-control" required="required">
                                            <option value>Thanh toán khi nhận hàng</option>
                                            <option disabled value={1}>Thanh toán online - Đang xây dựng</option>
                                        </select>


                                    </div>
                                    <div className="discount-coupon">
                                        <h6>Địa chỉ giao hàng</h6>
                                        <form className="coupon-form">
                                            <input value={address} onChange={(e) => setAddress(e.target.value)} style={{ color: 'black' }} type="text" placeholder="Nhập địa chỉ giao hàng" />
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="proceed-checkout">
                                        <ul>
                                            <li className="subtotal">Tổng sản phẩm <span>{amount}</span></li>
                                            <li className="cart-total">Thành tiền <span>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></li>
                                        </ul>
                                        <a style={{color: 'white'}} onClick={submitThanhToan} className="proceed-btn">THANH TOÁN</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}

export default Cart

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actLoadSPForCart, actRemoveSPForCart, actResetDataCart, actResetMessageCart } from '../../../redux/actions/CartAction';
import { API_URL_IMG } from '../../../constants/Config';
import { ADD_ONE_SP_FOR_CART_ERROR, ADD_ONE_SP_FOR_CART_SUCCESS, CHECKOUT_CART_ERROR, CHECKOUT_CART_SUCCESS, REMOVE_SP_FOR_CART_ERROR, REMOVE_SP_FOR_CART_SUCCESS, SUB_ONE_SP_FOR_CART_ERROR, SUB_ONE_SP_FOR_CART_SUCCESS } from '../../../constants/Message';
import { toast } from 'react-toastify';

function HeaderControl() {

    const CartReducer = useSelector(state => state.CartReducer)
    const [search, setSearch] = useState('');
    const [amount, setAmount] = useState('');
    const [elmListCart, setElmListCart] = useState(null);
    const [total, setTotal] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actLoadSPForCart());
    }, [dispatch])

    useEffect(() => {
        setAmount(0);
        setElmListCart(null);
        setTotal('');

        if (CartReducer.dataValue) {
            setAmount(CartReducer.dataValue.amount)
            setTotal(CartReducer.dataValue.total)

            let result = null;
            result = CartReducer.dataValue.listSP.map((item, index) => {
                return (
                    <tr key={index}>
                        <td className="si-pic"><img src={`${API_URL_IMG}${item.img}`} /></td>
                        <td className="si-text">
                            <div className="product-selected">
                                <p>{item.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} x {item.amount}</p>
                                <h6>{item.name}</h6>
                            </div>
                        </td>
                        <td className="si-close">
                            <i className="ti-close" onClick={() => removeSPForCart(item.id)} />
                        </td>
                    </tr>
                )
            })

            setElmListCart(result);
        }
    }, [CartReducer.dataValue])

    useEffect(() => {
        switch (CartReducer.message) {
            case ADD_ONE_SP_FOR_CART_SUCCESS:
            case SUB_ONE_SP_FOR_CART_SUCCESS:
            case REMOVE_SP_FOR_CART_SUCCESS:
                toast.success(CartReducer.message);
                dispatch(actResetMessageCart())
                break;
            case CHECKOUT_CART_SUCCESS:
                toast.success(CartReducer.message);
                dispatch(actResetDataCart());
                dispatch(actResetMessageCart())
                break;
            case ADD_ONE_SP_FOR_CART_ERROR:
            case SUB_ONE_SP_FOR_CART_ERROR:
            case REMOVE_SP_FOR_CART_ERROR:
            case CHECKOUT_CART_ERROR:
                toast.error(CartReducer.message);
                dispatch(actResetMessageCart())
                break;

            default:
                if (CartReducer.message) {
                    toast.error(CartReducer.message);
                    dispatch(actResetMessageCart())
                }
                break;
        }
    }, [CartReducer.message, dispatch])

    const searchSubmit = (e) => {
        e.preventDefault();
        navigate('/shop/' + search);
    }

    const removeSPForCart = (id) => {
        dispatch(actRemoveSPForCart(id));
    }

    return (
        <div className="row">
            <div className="col-lg-2 col-md-2">
                <div className="logo">
                    <Link to='/'>
                        <img src="/img/logo.png" />
                    </Link>
                </div>
            </div>
            <div className="col-lg-7 col-md-7">
                <div className="advanced-search">
                    <form onSubmit={searchSubmit} className="input-group form-search-shop">
                        <input type="text" className="input-search-shop" placeholder="Tên sản phẩm" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="submit"><i className="ti-search" /></button>
                    </form>
                </div>
            </div>
            <div className="col-lg-3 text-right col-md-3">
                <ul className="nav-right">
                    <li className="cart-icon">
                        <Link to='/cart'>
                            <i className="icon_bag_alt" />
                            <span>{amount}</span>
                        </Link>
                        <div className="cart-hover">
                            <div className="select-items">
                                <table>
                                    <tbody>
                                        {/* <tr>
                                            <td className="si-pic"><img src="/img/select-product-1.jpg" /></td>
                                            <td className="si-text">
                                                <div className="product-selected">
                                                    <p>$60.00 x 1</p>
                                                    <h6>Kabino Bedside Table</h6>
                                                </div>
                                            </td>
                                            <td className="si-close">
                                                <i className="ti-close" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="si-pic"><img src="/img/select-product-2.jpg" /></td>
                                            <td className="si-text">
                                                <div className="product-selected">
                                                    <p>$60.00 x 1</p>
                                                    <h6>Kabino Bedside Table</h6>
                                                </div>
                                            </td>
                                            <td className="si-close">
                                                <i className="ti-close" />
                                            </td>
                                        </tr> */}
                                        {elmListCart}
                                    </tbody>
                                </table>
                            </div>
                            <div className="select-total">
                                <span>Tổng:</span>
                                <h5>{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h5>
                            </div>
                            <div className="select-button">
                                <Link to='/cart' className="primary-btn view-card">Xem chi tiết</Link>
                            </div>
                        </div>
                    </li>
                    <li className="cart-price">{total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderControl

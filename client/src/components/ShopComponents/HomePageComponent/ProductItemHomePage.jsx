import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL_IMG } from '../../../constants/Config';
import { actAddOneSPForCart } from '../../../redux/actions/CartAction';

function ProductItemHomePage(props) {
    const { sanpham } = props;

    const dispatch = useDispatch();

    const submitAddOneSPForCart = (id) => {
        dispatch(actAddOneSPForCart(id));
    }
    
    return (
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
            <div className="product-item">
                <div className="pi-pic">
                    <img src={`${API_URL_IMG}${sanpham.img}`} />
                    <ul>
                        <li className="w-icon active"><a onClick={() => submitAddOneSPForCart(sanpham.id)}><i className="icon_bag_alt" /></a></li>
                        <li className="quick-view"><Link to={`/product/${sanpham.id}`}>Xem chi tiết</Link></li>
                    </ul>
                </div>
                <div className="pi-text">
                    <Link to={`/product/${sanpham.id}`}>
                        <h5>{sanpham.name}</h5>
                    </Link>
                    <div className="product-price">
                        {sanpham.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItemHomePage

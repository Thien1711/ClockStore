import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL_IMG } from '../../../constants/Config';
import { actAddOneSPForCart } from '../../../redux/actions/CartAction';

function ProductItem(props) {
    const { product } = props;
    const dispatch = useDispatch();

    const submitAddOneSPForCart = (id) => {
        dispatch(actAddOneSPForCart(id));
    }
    
    return (
        <div className="col-lg-4 col-sm-6">
            <div className="product-item">
                <div className="pi-pic">
                    <img src={`${API_URL_IMG}${product.img}`} />
                    <ul>
                        <li className="w-icon active"><a onClick={() => submitAddOneSPForCart(product.id)}><i className="icon_bag_alt" /></a></li>
                        <li className="quick-view"><Link to={`/product/${product.id}`}>Xem chi tiết</Link></li>
                    </ul>
                </div>
                <div className="pi-text">
                    {/* <div className="catagory-name">{product.name}</div> */}
                    <Link to={`/product/${product.id}`}>
                        <h5>{product.name}</h5>
                    </Link>
                    <div className="product-price">
                        {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                        <br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem

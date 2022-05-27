import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { API_URL_IMG } from '../../../constants/Config';

function ProductDetail(props) {
    const { product } = props;

    const [amount, setAmount] = useState(1);

    const changeAmount = (value) => {
        var format = /\D/g;
        if(!format.test(value)) {
            if(parseInt(value) === 0) {
                setAmount(1);
            }
            else {
                setAmount(value);
            }
        }
    }

    const plusAmount = () => {
        if(!amount) {
            setAmount(1);
            return;
        }
        setAmount(parseInt(amount) + 1);
    }

    const minusAmount = () => {
        if(!amount) {
            setAmount(1);
            return;
        }
        let value = parseInt(amount)-1;
        if(value <= 0) {
            setAmount(1);
        }
        else {
            setAmount(value);
        }
    }

    const submitAddSP = () => {
        if(parseInt(amount)) {
            props.submitAddSP(product.id, amount);
        }
    }

    return (
        <section className="product-shop spad page-details">
            <div className="container">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="product-pic-zoom">
                                    <img
                                        className="product-big-img"
                                        src={`${API_URL_IMG}${product.img}`}
                                    />
                                </div>

                            </div>
                            <div className="col-lg-6">
                                <div className="product-details mt-3">
                                    <div className="pd-title">
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className="pd-desc">
                                        <h4>
                                        {product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                        </h4>
                                    </div>

                                    <div className="quantity">
                                        <button onClick={minusAmount} type="button" className="btn primary-btn mr-3">
                                            <i className="fa fa-minus" />
                                        </button>
                                        <div className="pro-qty">
                                            <input type="text" maxLength='9' value={amount} onChange={(e) => changeAmount(e.target.value)}/>
                                        </div>
                                        <button onClick={plusAmount} type="button" className="btn primary-btn">
                                            <i className="fa fa-plus" />
                                        </button>
                                    </div>
                                    <button onClick={submitAddSP} className="primary-btn btn">
                                        Thêm sản phẩm
                                    </button>
                                    <ul className="pd-tags mt-4">
                                        <li>
                                            <span>Loại sản phẩm: </span>{product.lsp.name}
                                        </li>
                                        <li>
                                            <span>Thương hiệu: </span>{product.brand.name}
                                        </li>
                                        <li>
                                            <span>Kiểu dây: </span>{product.wire.name}
                                        </li>
                                        <li>
                                            <span>Kiểu máy: </span>{product.machine.name}
                                        </li>
                                    </ul>
                                    <div className="pd-share">
                                        <div className="p-code">Mã sản phẩm : {product.id}</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="product-tab">
                            <div className="tab-item">

                            </div>
                            <div className="tab-item-content">
                                <div className="tab-content">
                                    <div
                                        className="tab-pane fade-in active"
                                        id="tab-1"
                                        role="tabpanel"
                                    >
                                        <div className="product-content">
                                            <div className="row">
                                                <div className="col-lg-7">
                                                    <h5>Mô tả</h5>
                                                    <p>
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetail

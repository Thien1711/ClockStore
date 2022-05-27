import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoaiSanPhamHomePage from '../../../components/ShopComponents/HomePageComponent/LoaiSanPhamHomePage';
import { actGetProductHomePage } from '../../../redux/actions/HomePageAction';
import './Home.css'

function Home() {

    const HomePageReducer = useSelector(state => state.HomePageReducer);
    const dispatch = useDispatch();

    const [elements, setElements] = useState(null);

    useEffect(() => {
        dispatch(actGetProductHomePage());
    }, [dispatch])

    useEffect(() => {
        var result = null;
        if (HomePageReducer.length > 0) {
            result = HomePageReducer.map((item, index) => {
                return <LoaiSanPhamHomePage item={item} key={index} />
            })
        }
        setElements(result);
    }, [HomePageReducer])

    return (
        <div>
            {elements}
            {/* <div className="product-list">
                <div className="filter-control">
                    <h2>Sản phẩm bán chạy</h2>
                </div>
                <div className="row ml-5 mr-5">

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <div className="product-item">
                            <div className="pi-pic">
                                <img src='/img/products/women-3.jpg' />
                                <ul>
                                    <li className="w-icon active"><a href="#"><i className="icon_bag_alt" /></a></li>
                                    <li className="quick-view"><a href="#">Xem chi tiết</a></li>
                                </ul>
                            </div>
                            <div className="pi-text">
                                <a href="#">
                                    <h5>Sản phẩm</h5>
                                </a>
                                <div className="product-price">
                                    5000000đ
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="owl-dots" ><a>Xem thêm</a></div>
            </div> */}
        </div>

    )
}

export default Home

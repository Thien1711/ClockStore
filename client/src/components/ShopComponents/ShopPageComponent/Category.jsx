import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Branch from './Branch';
import Machine from './Machine';
import Wire from './Wire';

function Category(props) {

    const { products } = props;
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(products.priceFrom <= 0) {
            setPriceFrom('');
        }
        else {
            setPriceFrom("" + products.priceFrom);
        }

        if(products.priceTo <= 0) {
            setPriceTo('');
        }
        else {
            setPriceTo("" + products.priceTo);
        }
    }, [products.priceFrom, products.priceTo])

    const clickHandle = () => {
        let format = /\D/ig;
        let valueFrom = priceFrom.trim();
        let valueTo = priceTo.trim();

        if(format.test(valueFrom)) {
            toast.error("Giá sản phẩm phải là chữ số và lớn hơn hoặc bằng 0");
            return;
        }

        if(format.test(valueTo)) {
            toast.error("Giá sản phẩm phải là chữ số và lớn hơn hoặc bằng 0");
            return;
        }

        if(parseInt(valueTo) < parseInt(valueFrom)) {
            toast.error("Giá đến phải lớn hơn hoặc bằng giá bắt đầu");
            return;
        }

        var urlPage = "?";
        if (products.th) {
            urlPage += "branchId=" + products.th.id + "&";
        }
        if (products.km) {
            urlPage += "machineId=" + products.km.id + "&";
        }
        if (products.kd) {
            urlPage += "wireId=" + products.kd.id + "&";
        }

        urlPage += "price=" + valueFrom + "-" + valueTo + "&";

        urlPage += "sort=" + products.sort + "&pageIndex=" + products.pageIndex;

        navigate(urlPage);
    }

    return (
        <div className="col-lg-3 col-md-6 col-sm-8 order-2 order-lg-1 produts-sidebar-filter">
            <Branch />

            <Machine />

            <Wire />

            <div className="filter-widget">
                <h4 className="fw-title">Giá</h4>
                <div className="filter-range-wrap">
                    <div className="range-slider">
                        <div className="price-input">
                            Từ: 
                            <input type="text" id="minamount" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)}/>
                            Đến: 
                            <input type="text" id="maxamount" value={priceTo} onChange={(e) => setPriceTo(e.target.value)}/>
                        </div>
                    </div>
                </div>
                
                <button onClick={clickHandle} type="button" className="btn filter-btn">Tìm</button>
                
                {/* <a href="#" className="filter-btn">Tìm</a> */}
            </div>
            
        </div>
    )
}

export default Category

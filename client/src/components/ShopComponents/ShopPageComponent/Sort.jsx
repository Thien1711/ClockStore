import React from 'react'
import { useNavigate } from 'react-router';

function Sort(props) {
    const { products } = props;

    const navigate = useNavigate();

    const changeSort = (value) => {
        var urlPage = "?";
        var price = "";
        if (products.th) {
            urlPage += "branchId=" + products.th.id + "&";
        }
        if (products.km) {
            urlPage += "machineId=" + products.km.id + "&";
        }
        if (products.kd) {
            urlPage += "wireId=" + products.kd.id + "&";
        }

        if (products.priceFrom >= 0 && products.priceTo >= 0) {
            price = "price=" + products.priceFrom + "-" + products.priceTo + "&";
        }
        else {
            if (products.priceFrom < 0 && products.priceTo >= 0) {
                price = "price=0-" + products.priceTo + "&";
            }
            else {
                if (products.priceFrom >= 0 && products.priceTo < 0) {
                    price = "price=" + products.priceFrom + "-max&";
                }
                else {
                    price = "";
                }
            }
        }

        urlPage += price + "sort=" + value + "&pageIndex=" + products.pageIndex;

        navigate(urlPage);
        // props.changeSort(urlPage);
    }

    return (
        <div className="row">
            <div className="col-lg-7 col-md-7">

                <div className="select-option">
                    <select className="sorting" value={products.sort} onChange={(e) => changeSort(e.target.value)}>
                        <option value="name-asc">Sắp xếp theo Tên : A-Z</option>
                        <option value="name-desc">Sắp xếp theo Tên : Z-A</option>
                        <option value="price-asc">Sắp xếp theo Giá : Tăng dần</option>
                        <option value="price-desc">Sắp xếp theo Giá : Giảm dần</option>
                    </select>
                    {/* <select className="p-show">
                        <option value>Show:</option>
                    </select> */}
                </div>
            </div>
            {/* <div className="col-lg-5 col-md-5 text-right">
                <p>Show 01- 09 Of 36 Product</p>
            </div> */}

        </div>
    )
}

export default Sort

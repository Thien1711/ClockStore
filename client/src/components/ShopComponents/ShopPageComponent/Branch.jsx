import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actGetBranchShopPage } from '../../../redux/actions/ShopPageAction';

function Branch() {
    const ShopPageReducer = useSelector(state => state.ShopPageReducer);
    const [elmBranchs, setElmBranchs] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetBranchShopPage());
    }, [dispatch])

    useEffect(() => {
        var ulrlPage = "";
        if(ShopPageReducer.products.km) {
            ulrlPage += "machineId=" +  ShopPageReducer.products.km.id + "&";
        }
        if(ShopPageReducer.products.kd) {
            ulrlPage += "wireId=" +  ShopPageReducer.products.kd.id + "&";
        }
        ulrlPage += "sort=" + ShopPageReducer.products.sort + "&pageIndex=1";
        
        var result = null;
        result = ShopPageReducer.brands.map((branch, index) => {
            return <li key={index}><Link to={`?branchId=${branch.id}&${ulrlPage}`}>{branch.name}</Link></li>
        })

        setElmBranchs(result);
    }, [ShopPageReducer.brands, ShopPageReducer.products])
    return (
        <div className="filter-widget">
            <h4 className="fw-title">Thương hiệu</h4>
            <ul className="filter-catagories category-scroll">
                {/* <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li> */}
                {elmBranchs}
            </ul>
        </div>
    )
}

export default Branch

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actGetWireShopPage } from '../../../redux/actions/ShopPageAction';

function Wire() {
    const ShopPageReducer = useSelector(state => state.ShopPageReducer);
    const [elmWires, setElmWires] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetWireShopPage());
    }, [dispatch])

    useEffect(() => {
        var ulrlPage = "";
        if(ShopPageReducer.products.th) {
            ulrlPage += "branchId=" +  ShopPageReducer.products.th.id + "&";
        }
        if(ShopPageReducer.products.km) {
            ulrlPage += "machineId=" +  ShopPageReducer.products.km.id + "&";
        }
        ulrlPage += "sort=" + ShopPageReducer.products.sort + "&pageIndex=1";
        
        var result = null;
        result = ShopPageReducer.wires.map((wire, index) => {
            return <li key={index}><Link to={`?wireId=${wire.id}&${ulrlPage}`}>{wire.name}</Link></li>
        })

        setElmWires(result);
    }, [ShopPageReducer.wires, ShopPageReducer.products])
    return (
        <div className="filter-widget">
            <h4 className="fw-title">Kiểu dây</h4>
            <ul className="filter-catagories category-scroll">
                {/* <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Men</a></li>
                <li><a href="#">Women</a></li>
                <li><a href="#">Kids</a></li>
                <li><a href="#">Men</a></li> */}
                {elmWires}
            </ul>
        </div>
    )
}

export default Wire

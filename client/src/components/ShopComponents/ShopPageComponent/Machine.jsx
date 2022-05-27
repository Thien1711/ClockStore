import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actGetMachineShopPage } from '../../../redux/actions/ShopPageAction';

function Machine() {
    const ShopPageReducer = useSelector(state => state.ShopPageReducer);
    const [elmMachines, setElmMachines] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetMachineShopPage());
    }, [dispatch])

    useEffect(() => {
        var ulrlPage = "";
        if(ShopPageReducer.products.th) {
            ulrlPage += "branchId=" +  ShopPageReducer.products.th.id + "&";
        }
        if(ShopPageReducer.products.kd) {
            ulrlPage += "wireId=" +  ShopPageReducer.products.kd.id + "&";
        }
        ulrlPage += "sort=" + ShopPageReducer.products.sort + "&pageIndex=1";
        
        var result = null;
        result = ShopPageReducer.machines.map((machine, index) => {
            return <li key={index}><Link to={`?machineId=${machine.id}&${ulrlPage}`}>{machine.name}</Link></li>
        })

        setElmMachines(result);
    }, [ShopPageReducer.machines, ShopPageReducer.products])
    return (
        <div className="filter-widget">
            <h4 className="fw-title">Kiểu máy</h4>
            <ul className="filter-catagories category-scroll">
                {/* <li><a href="#">Men</a></li>*/}
                {elmMachines}

            </ul>
        </div>
    )
}

export default Machine

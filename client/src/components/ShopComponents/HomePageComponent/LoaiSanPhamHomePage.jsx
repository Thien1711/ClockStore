import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import ProductItemHomePage from './ProductItemHomePage'

function LoaiSanPhamHomePage(props) {

    const {item} = props;

    const showListSP = useCallback(
        () => {
            console.log('showListSP');
            var result = null;
    
            result = item.listSP.map((sp, index) => {
                return <ProductItemHomePage sanpham={sp} key={index}/>
            })
    
            return result;
        },
        [item],
    )

    return (
        <div className="product-list">
            <div className="filter-control">
                <h2>{item.lsp.name}</h2>
            </div>
            <div className="row ml-5 mr-5">

                {showListSP()}
            </div>
            <div className="owl-dots text-center" ><Link to={`/shop/${item.lsp.id}`} className="hoverNone">Xem thêm</Link></div>
        </div>
    )
}

export default LoaiSanPhamHomePage

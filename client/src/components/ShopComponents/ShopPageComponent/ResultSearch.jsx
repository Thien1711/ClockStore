import React, { useEffect, useState } from 'react'

function ResultSearch(props) {
    const { products } = props;
    const [search, setSearch] = useState(null);
    const [LSP, setLSP] = useState(null);
    const [TH, setTH] = useState(null);
    const [KM, setKM] = useState(null);
    const [KD, setKD] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        // console.log(products);
        if(products.search) {
            setSearch(<a>Từ khóa tìm kiếm: {products.search}</a>);
        }
        else {
            setSearch(null);
        }

        if(products.lsp) {
            setLSP(<a>Loại sản phẩm: {products.lsp.name}</a>);
        }else {
            setLSP(null);
        }
        
        if(products.th) {
            setTH(<a>Thương hiệu: {products.th.name}</a>);
        }else {
            setTH(null);
        }
        
        if(products.kd) {
            setKD(<a>Kiểu dây: {products.kd.name}</a>);
        }else {
            setKD(null);
        }
        
        if(products.km) {
            setKM(<a>Kiểu máy: {products.km.name}</a>);
        }else {
            setKM(null);
        }

        if(products.priceFrom >= 0 && products.priceTo >= 0) {
            setPrice(<a>Giá từ {products.priceFrom.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} đến {products.priceTo.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</a>)
        }
        else {
            if(products.priceFrom < 0 && products.priceTo >= 0) {
                setPrice(<a>Giá từ 0đ đến {products.priceTo.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</a>)
            }
            else {
                if(products.priceFrom >= 0 && products.priceTo < 0) {
                    setPrice(<a>Giá từ {products.priceFrom.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})} đến MAX</a>)
                }
                else {
                    setPrice(<a>Giá : TẤT CẢ</a>)
                }
            }
        }
        
    }, [products])
    
    

    return (
        <div className="filter-widget">
            <h4 className="fw-title">Kết quả tìm kiếm</h4>
            <div className="fw-tags">
                {search}
                {LSP}
                {TH}
                {KD}
                {KM}
                {price}
                {/* <a>Backpack</a> */}
            </div>
        </div>
    )
}

export default ResultSearch

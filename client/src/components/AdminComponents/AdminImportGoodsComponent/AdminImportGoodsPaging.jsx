import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminImportGoodsPaging(props) {
    const { dataLoad } = props;
    // State phân trang
    const [previous, setPrevious] = useState(null);
    const [elmsPhanTrang, setElmsPhanTrang] = useState(null);
    const [next, setNext] = useState(null);
    const [notFound, setNotFound] = useState('Không tìm thấy sản phẩm nào nào!');

    useEffect(() => {
        var result = null, pageIndex = dataLoad.pageIndex;
        var search = dataLoad.search, typeSearch = dataLoad.typeSearch;
        var nextPage = null, previousPage = null;
        if (dataLoad.pageIndex) {
            var totalPage = dataLoad.totalPage;
            var pageMin, pageMax;
            var range = dataLoad.range, middle = totalPage / 2;
            if (totalPage <= range) {
                pageMin = 1;
                pageMax = totalPage;
            } else {
                if (pageIndex < middle) {
                    if (pageIndex > range) {
                        if (range % 2 === 0) {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2);
                        }
                        else {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2) + 1;
                        }
                    } else {
                        pageMin = 1;
                        pageMax = range;
                    }
                } else {
                    if (middle + range > totalPage) {
                        pageMin = totalPage - range;
                        pageMax = totalPage;
                    } else {
                        if (range % 2 === 0) {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2);
                        }
                        else {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2) + 1;
                        }
                    }
                }
            }
            if (pageMax > totalPage) {
                pageMax = totalPage;
                pageMin = pageMax - range + 1;
            }
            if (pageMin < pageMax - range + 1 || pageMin > pageMax - range + 1) {
                pageMin = pageMax - range + 1;
            }
            if (pageMin < 1) {
                pageMin = 1;
            }

            range = pageMax + 1 - pageMin;

            var array = new Array();
            for (let i = 0; i < range; ++i) {
                array.push(pageMin + i);
            }
            result = array.map((element, index) => {
                if (pageIndex === element) {
                    return <Link key={index} className='btn btn-info' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=${pageIndex}`}>{element}</Link>
                }
                return <Link key={index} className='btn btn-default' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=${element}`}>{element}</Link>
            });

            if (pageIndex !== 1) {
                previousPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=1`}><i className="fa fa-angle-double-left" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=${pageIndex - 1}`}><i className="fa fa-angle-left" aria-hidden="true" /></Link>
                </>
            }

            if (pageIndex !== totalPage && totalPage !== 0) {
                nextPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=${pageIndex + 1}`}><i className="fa fa-angle-right" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&typeSearch=${typeSearch}&pageIndex=${totalPage}`}><i className="fa fa-angle-double-right" aria-hidden="true" /></Link>

                </>;
            }

            if(totalPage === 1) {
                result = null;
            }
        }
        
        if (dataLoad.listSP && dataLoad.listSP.length > 0) {
            setElmsPhanTrang(result);
            if(!result) {
                setNext(null);
                setPrevious(null);
            }
            else {
                setNext(nextPage);
                setPrevious(previousPage);
            }
            setNotFound(null);
        }
        else {
            setElmsPhanTrang(null);
            setNext(null);
            setPrevious(null);
            setNotFound('Không tìm thấy sản phẩm nào nào!');
        }
    }, [dataLoad])
    return (
        <div className='class-phan-trang mb-4'>
            {/* <Link className='btn btn-default' to='1'><i className="fa fa-angle-double-left" aria-hidden="true" /></Link>
            <Link className='btn btn-default' to='1'><i className="fa fa-angle-left" aria-hidden="true" /></Link>
            <Link className='btn btn-info' to='1'>1</Link>
            <Link className='btn btn-default' to='2'>2</Link>
            <Link className='btn btn-default' to='1'><i className="fa fa-angle-right" aria-hidden="true" /></Link>
            <Link className='btn btn-default' to='1'><i className="fa fa-angle-double-right" aria-hidden="true" /></Link> */}
            {previous}
            {elmsPhanTrang}
            {next}
            {notFound}
        </div>
    )
}

export default AdminImportGoodsPaging

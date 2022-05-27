import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminCustomPaging(props) {
    const { dataValue } = props;
    // State phân trang
    const [previous, setPrevious] = useState(null);
    const [elmsPhanTrang, setElmsPhanTrang] = useState(null);
    const [next, setNext] = useState(null);
    const [notFound, setNotFound] = useState('Không tìm tài khoản khách hàng nào!');

    useEffect(() => {
        var result = null, pageIndex = dataValue.pageIndex;
        var search = dataValue.search, sort = dataValue.sort;
        var nextPage = null, previousPage = null;
        if (dataValue.pageIndex) {
            var totalPage = dataValue.totalPage;
            var pageMin, pageMax;
            var range = dataValue.range, middle = totalPage / 2;
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
                    return <Link key={index} className='btn btn-info' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex}`}>{element}</Link>
                }
                return <Link key={index} className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${element}`}>{element}</Link>
            });

            if (pageIndex !== 1) {
                previousPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=1`}><i className="fa fa-angle-double-left" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex - 1}`}><i className="fa fa-angle-left" aria-hidden="true" /></Link>
                </>
            }

            if (pageIndex !== totalPage && totalPage !== 0) {
                nextPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex + 1}`}><i className="fa fa-angle-right" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${totalPage}`}><i className="fa fa-angle-double-right" aria-hidden="true" /></Link>

                </>;
            }

            if(totalPage === 1) {
                result = null;
            }
        }
        
        if (dataValue.listKH && dataValue.listKH.length > 0) {
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
            setNotFound('Không tìm thấy tài khoản khách hàng nào!');
        }
    }, [dataValue])
    return (
        <div className='class-phan-trang'>
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

export default AdminCustomPaging

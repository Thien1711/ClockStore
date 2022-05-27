import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { actAddProductAdmin, actDeleteProductAdmin, actGetProductAdmin, actResetMessageProductAdmin, actUpdateProductAdmin } from '../../../redux/actions/AdminProductAction';
import './ProductsAdmin.css'
import AdminProductItem from '../../../components/AdminComponents/AdminProductComponent/AdminProductItem'
import AdminProductControl from '../../../components/AdminComponents/AdminProductComponent/AdminProductControl';
import AdminProductFormActionAdd from '../../../components/AdminComponents/AdminProductComponent/AdminProductFormActionAdd';
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_SUCCESS } from '../../../constants/Message';
import { toast } from 'react-toastify';
import AdminProductFormActionUpdate from '../../../components/AdminComponents/AdminProductComponent/AdminProductFormActionUpdate';


function ProductsAdmin() {

    const AdminProductReducer = useSelector(state => state.AdminProductReducer);

    const location = useLocation();
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [search, setSearch] = useState('');

    const [actionValue, setActionValue] = useState('');

    // html list sản phẩm
    const [elmsListSP, setElmsListSP] = useState(null);

    // State phân trang
    const [previous, setPrevious] = useState(null);
    const [elmsPhanTrang, setElmsPhanTrang] = useState(null);
    const [next, setNext] = useState(null);
    const [itemEdit, setItemEdit] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const utf8_from_str = (s) => {
        var temp = decodeURIComponent(s);
        temp = temp.split("+");
        temp = temp.join(" ");
        return temp;
    }

    // Khi url thay đổi => sort, pageIndex thay đổi => setSort, setPageIndex
    useEffect(() => {
        var {search} = location;
        if(search === "") {
            setSort('name-asc');
            setPageIndex(1);
            setSearch('');
        } 
        else {
            var dauHoi = search.split('?');
            var dauVa = dauHoi[dauHoi.length-1].split('&');
            var dauBang;
            for(let i = 0; i < dauVa.length; ++i) {
                dauBang = dauVa[i].split('=');
                switch (dauBang[0]) {
                    case "sort":
                        setSort(dauBang[1]);
                        break;
                    case "pageIndex":
                        var value = parseInt(dauBang[1]);
                        if(value) {
                            setPageIndex(value);
                        }
                        else {
                            setPageIndex(1);
                        }
                        
                        break;
                    case "search":
                        setSearch(utf8_from_str(dauBang[1]));
                        break;
                    default:
                        break;
                }
            }
        }
        // console.log("Location: ", location.search);
    }, [location]);

    // khi sort, pageIndex thay đổi => load lại sản phẩm
    useEffect(() => {
        var data = {
            search : search,
            sort: sort,
            pageIndex: pageIndex
        }
        dispatch(actGetProductAdmin(data));
    }, [search, sort, pageIndex, dispatch]);

    // khi sản phẩm thay đổi => show danh sách sản phẩm và phân trang
    useEffect(() => {
        // console.log(AdminProductReducer);

        // show danh sách sản phẩm
        var result = null;
        if (AdminProductReducer.dataValue.listSP) {
            result = AdminProductReducer.dataValue.listSP.map((product, index) => {
                return <AdminProductItem key={index} index={index} product={product} actionDelete={actionDelete} setActionValue={setActionValue} setItemEdit={setItemEdit}/>
            });
        }
        setElmsListSP(result);

        // show phân trang
        result = null;
        var nextPage = null, previousPage = null;
        if(AdminProductReducer.dataValue.pageIndex) {
            var totalPage = AdminProductReducer.dataValue.totalPage;
            var pageMin, pageMax;
            var range = AdminProductReducer.dataValue.range, middle = totalPage/2;
            if (totalPage <= range) {
                pageMin = 1;
                pageMax = totalPage;
            } else {
                if (pageIndex < middle) {
                    if (pageIndex > range) {
                        if(range % 2 === 0) {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2);
                        }
                        else{
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
                        if(range % 2 === 0) {
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2);
                        }
                        else{
                            pageMin = pageIndex - Math.floor(range / 2);
                            pageMax = pageIndex + Math.floor(range / 2) + 1;
                        }
                        // pageMin = pageIndex - Math.floor(range / 2);
                        // pageMax = pageIndex - 1 + 1 + Math.floor(range / 2);
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
            if(pageMin < 1) {
                pageMin = 1;
            }

            range = pageMax + 1 - pageMin;
            
            var array = new Array();
            for(let i = 0; i < range; ++i) {
                array.push(pageMin+i);
            }
            result = array.map((element, index) => {
                if(pageIndex === element) {
                    return <Link key={index} className='btn btn-info' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex}`}>{element}</Link>
                }
                return <Link key={index} className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${element}`}>{element}</Link>
            }); 

            if(pageIndex !== 1) {
                previousPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=1`}><i className="fa fa-angle-double-left" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex-1}`}><i className="fa fa-angle-left" aria-hidden="true" /></Link>
                </>
            }

            if(pageIndex !== totalPage && totalPage !== 0) {
                nextPage = <>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${pageIndex+1}`}><i className="fa fa-angle-right" aria-hidden="true" /></Link>
                    <Link className='btn btn-default' to={`?search=${search}&sort=${sort}&pageIndex=${totalPage}`}><i className="fa fa-angle-double-right" aria-hidden="true" /></Link>
                    
                </>;
            }

            if(totalPage === 1) {
                result = null;
            }
        }

        // if (AdminProductReducer.dataValue.listSP && AdminProductReducer.dataValue.listSP.length > 0) {
        //     setElmsPhanTrang(result);
        //     if(!result) {
        //         setNext(null);
        //         setPrevious(null);
        //     }
        //     else {
        //         setNext(nextPage);
        //         setPrevious(previousPage);
        //     }
        //     // setNotFound(null);
        // }
        // else {
        //     setElmsPhanTrang(null);
        //     setNext(null);
        //     setPrevious(null);
        //     // setNotFound('Không tìm thấy quyền nào!');
        // }

        setElmsPhanTrang(result);
        setNext(nextPage);
        setPrevious(previousPage);
    }, [AdminProductReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminProductReducer.message) {
            case ADD_PRODUCT_SUCCESS:
            case DELETE_PRODUCT_SUCCESS:
            case UPDATE_PRODUCT_SUCCESS:
                toast.success(AdminProductReducer.message);
                var filter = {
                    search : search,
                    sort: sort,
                    pageIndex:pageIndex
                }
                // console.log(filter);
                dispatch(actGetProductAdmin(filter));
                dispatch(actResetMessageProductAdmin());
                break;
            case ADD_PRODUCT_ERROR: 
            case DELETE_PRODUCT_ERROR:
            case UPDATE_PRODUCT_ERROR:
                toast.error(AdminProductReducer.message); 
                dispatch(actResetMessageProductAdmin());
                break;
            default:
                if(AdminProductReducer.message) {
                    toast.error(AdminProductReducer.message); 
                    dispatch(actResetMessageProductAdmin());
                }
                break;
        }
    }, [AdminProductReducer.message, dispatch])

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                    return <AdminProductFormActionAdd setActionValue={setActionValue} submitActionAddForm={submitActionAddForm} />
                case 'update':
                    return <AdminProductFormActionUpdate submitActionUpdateForm={submitActionUpdateForm} setActionValue={setActionValue} itemEdit={itemEdit}/>
            
                default:
                    return null;
            }
        },
        [actionValue, itemEdit],
    )

    const submitActionAddForm = (data) => {
        dispatch(actAddProductAdmin(data));
        setActionValue('');
    }

    const submitActionUpdateForm = (data, id) => {
        // console.log(data.lspId);
        dispatch(actUpdateProductAdmin(data, id));
        setActionValue('');
    }

    const changeSort = (sortValue) => {
        navigate('/admin/products?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const changeSearch = (searchValue) => {
        navigate('/admin/products?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        setActionValue('');
        var res = window.confirm("Bạn có chắc muốn xóa sản phẩm có Id = " + id + " không?");
        if(res) {
            dispatch(actDeleteProductAdmin(id));
        }
        else {
            toast.error(DELETE_PRODUCT_ERROR);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý sản phẩm</h3>
                <hr />
            </div>
            <AdminProductControl setActionValue={setActionValue} sort={sort} changeSort={changeSort} changeSearch={changeSearch}/>

            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>ID</th>
                            <th>Mã loại sản phẩm</th>
                            <th>Mã thương hiệu</th>
                            <th>Mã dây</th>
                            <th>Mã máy</th>
                            {/* <th>Mã nhà cung cấp</th> */}
                            <th>Tên</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Hình ảnh</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elmsListSP}
                    </tbody>
                </table>
            </div>

            <div className='class-phan-trang'>
                {previous}
                {elmsPhanTrang}
                {next}
            </div>

            <div className="row mt-3 ml-3 mr-3">
                {/* <AdminProductFormActionAdd submitActionAddForm={submitActionAddForm} /> */}
                {showForm()}
            </div>

        </div>
    )
}

export default ProductsAdmin

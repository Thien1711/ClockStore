import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { ADD_BRAND_ERROR, ADD_BRAND_SUCCESS, DELETE_BRAND_ERROR, DELETE_BRAND_SUCCESS, UPDATE_BRAND_ERROR, UPDATE_BRAND_SUCCESS } from '../../../constants/Message';
import { toast } from 'react-toastify';
import { actAddBrandAdmin, actDeleteBrandAdmin, actGetBrandAdmin, actResetMessageBrandAdmin, actUpdateBrandAdmin } from '../../../redux/actions/AdminBrandAction'
import AdminBrandItem from '../../../components/AdminComponents/AdminBrandComponent/AdminBrandItem'
import AdminBrandFormAction from '../../../components/AdminComponents/AdminBrandComponent/AdminBrandFormAction'
import AdminBrandControl from '../../../components/AdminComponents/AdminBrandComponent/AdminBrandControl'
import AdminBrandPaging from '../../../components/AdminComponents/AdminBrandComponent/AdminBrandPaging'

function BrandAdmin() {
    const AdminBrandReducer = useSelector(state => state.AdminBrandReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListBrands, setElmListBrands] = useState(null);

    const [actionValue, setActionValue] = useState('');
    const [formValue, setFormValue] = useState({id: null, name: ''});

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const utf8_from_str = (s) => {
        var temp = decodeURIComponent(s);
        temp = temp.split("+");
        temp = temp.join(" ");
        return temp;
    }

    // Load sort, search, pageIndex
    useEffect(() => {
        // console.log("location: ", location);
        var { search } = location;
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
    }, [location])

    useEffect(() => {
        var data = {
            sort,
            search,
            pageIndex
        }
        dispatch(actGetBrandAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log()
        var result = null;
        if(AdminBrandReducer.dataValue.listTH && AdminBrandReducer.dataValue.listTH.length > 0) {
            result = AdminBrandReducer.dataValue.listTH.map((item, index) => {
                return <AdminBrandItem key={index} brand={item} index={index} actionUpdate={actionUpdate} actionDelete={actionDelete}/>
            })
        }
        setElmListBrands(result);
    }, [AdminBrandReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminBrandReducer.message) {
            case ADD_BRAND_SUCCESS:
            case DELETE_BRAND_SUCCESS:
            case UPDATE_BRAND_SUCCESS:
                toast.success(AdminBrandReducer.message);
                var filter = {
                    search : search,
                    sort: sort,
                    pageIndex:pageIndex
                }
                // console.log(filter);
                dispatch(actGetBrandAdmin(filter));
                dispatch(actResetMessageBrandAdmin());
                break;
            case ADD_BRAND_ERROR : 
            case DELETE_BRAND_ERROR:
            case UPDATE_BRAND_ERROR :
                toast.error(AdminBrandReducer.message); 
                dispatch(actResetMessageBrandAdmin());
                break;
            default:
                if(AdminBrandReducer.message) {
                    toast.error(AdminBrandReducer.message); 
                    dispatch(actResetMessageBrandAdmin());
                }
                break;
        }
    }, [AdminBrandReducer.message, dispatch])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/Brand?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/Brand?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                case 'update':
                    return <AdminBrandFormAction formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm}/>
            
                default:
                    return null;
            }
        },
        [actionValue, formValue],
    )

    const actionAdd = () => {
        setFormValue({id: null, name:''});
        setActionValue("add");
    }

    const actionUpdate = (data) => {
        setFormValue(data);
        setActionValue("update");
    }

    const submitActionForm = (data, action) => {
        switch (action) {
            case 'add':
                dispatch(actAddBrandAdmin(data));
                setActionValue('');
                break;
            case 'update':
                dispatch(actUpdateBrandAdmin(data, data.id))
                setActionValue('');
                break;
            default:
                break;
        }
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        var res = window.confirm("Bạn có chắc muốn xóa thương hiệu có Id = " + id + " không?");
        if(res) {
            dispatch(actDeleteBrandAdmin(id));
        }
        else {
            toast.error(DELETE_BRAND_ERROR);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý thương hiệu</h3>
                <hr />
            </div>
            
            <AdminBrandControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} actionAdd={actionAdd}/>

            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <AdminBrandItem /> */}
                        {elmListBrands}
                    </tbody>
                </table>
            </div>

            <AdminBrandPaging dataValue={AdminBrandReducer.dataValue}/>

            {showForm()}

        </div>
    )
}

export default BrandAdmin

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { actAddPermissionAdmin, actDeletePermissionAdmin, actGetPermissionAdmin, actResetMessagePermissionAdmin, actUpdatePermissionAdmin } from '../../../redux/actions/AdminPermissionAction';
import AdminPermissionItem from '../../../components/AdminComponents/AdminPermissionComponent/AdminPermissionItem'
import AdminPermissionFormAction from '../../../components/AdminComponents/AdminPermissionComponent/AdminPermissionFormAction'
import AdminPermissionControl from '../../../components/AdminComponents/AdminPermissionComponent/AdminPermissionControl'
import AdminPermissionPaging from '../../../components/AdminComponents/AdminPermissionComponent/AdminPermissionPaging'
import { ADD_PERMISSION_ERROR, ADD_PERMISSION_SUCCESS, DELETE_PERMISSION_ERROR, DELETE_PERMISSION_SUCCESS, UPDATE_PERMISSION_ERROR, UPDATE_PERMISSION_SUCCESS } from '../../../constants/Message';

function PermissionAdmin() {

    const AdminPermissionReducer = useSelector(state => state.AdminPermissionReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListPermissions, setElmListPermissions] = useState(null);

    const [actionValue, setActionValue] = useState('');
    const [formValue, setFormValue] = useState({ id: null, name: '', details: '' });

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
        if (search === "") {
            setSort('name-asc');
            setPageIndex(1);
            setSearch('');
        }
        else {
            var dauHoi = search.split('?');
            var dauVa = dauHoi[dauHoi.length - 1].split('&');
            var dauBang;
            for (let i = 0; i < dauVa.length; ++i) {
                dauBang = dauVa[i].split('=');
                switch (dauBang[0]) {
                    case "sort":
                        setSort(dauBang[1]);
                        break;
                    case "pageIndex":
                        var value = parseInt(dauBang[1]);
                        if (value) {
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
        dispatch(actGetPermissionAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log(AdminPermissionReducer.dataValue)
        var result = null;
        if (AdminPermissionReducer.dataValue.listQ && AdminPermissionReducer.dataValue.listQ.length > 0) {
            result = AdminPermissionReducer.dataValue.listQ.map((item, index) => {
                return <AdminPermissionItem key={index} permission={item} index={index} actionUpdate={actionUpdate} actionDelete={actionDelete} />
            })
        }
        setElmListPermissions(result);
    }, [AdminPermissionReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminPermissionReducer.message) {
            case ADD_PERMISSION_SUCCESS:
            case DELETE_PERMISSION_SUCCESS:
            case UPDATE_PERMISSION_SUCCESS:
                toast.success(AdminPermissionReducer.message);
                var filter = {
                    search: search,
                    sort: sort,
                    pageIndex: pageIndex
                }
                // console.log(filter);
                dispatch(actGetPermissionAdmin(filter));
                dispatch(actResetMessagePermissionAdmin());
                break;
            case ADD_PERMISSION_ERROR:
            case DELETE_PERMISSION_ERROR:
            case UPDATE_PERMISSION_ERROR:
                toast.error(AdminPermissionReducer.message);
                dispatch(actResetMessagePermissionAdmin());
                break;
            default:
                if (AdminPermissionReducer.message) {
                    toast.error(AdminPermissionReducer.message);
                    dispatch(actResetMessagePermissionAdmin());
                }
                break;
        }
    }, [AdminPermissionReducer.message])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/permission?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/permission?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                case 'update':
                    return <AdminPermissionFormAction formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />

                default:
                    return null;
            }
        },
        [actionValue, formValue],
    )

    const actionAdd = () => {
        setFormValue({ id: null, name: '', details: '' });
        setActionValue("add");
    }

    const actionUpdate = (data) => {
        setFormValue(data);
        setActionValue("update");
    }

    const submitActionForm = (data, action) => {
        switch (action) {
            case 'add':
                dispatch(actAddPermissionAdmin(data));
                setActionValue('');
                break;
            case 'update':
                dispatch(actUpdatePermissionAdmin(data, data.id))
                setActionValue('');
                break;
            default:
                break;
        }
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        var res = window.confirm("Bạn có chắc muốn xóa quyền có Id = " + id + " không?");
        if (res) {
            dispatch(actDeletePermissionAdmin(id));
        }
        else {
            toast.error(DELETE_PERMISSION_ERROR);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý quyền</h3>
                <hr />
            </div>

            <AdminPermissionControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} actionAdd={actionAdd} />

            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Chi tiết quyền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <AdminPermissionItem /> */}
                        {elmListPermissions}
                    </tbody>
                </table>
            </div>

            <AdminPermissionPaging dataValue={AdminPermissionReducer.dataValue} />

            {showForm()}

        </div>
    )
}

export default PermissionAdmin

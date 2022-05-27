import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { ADD_WIRE_ERROR, ADD_WIRE_SUCCESS, DELETE_WIRE_ERROR, DELETE_WIRE_SUCCESS, UPDATE_WIRE_ERROR, UPDATE_WIRE_SUCCESS } from '../../../constants/Message';
import { toast } from 'react-toastify';
import { actAddWireAdmin, actDeleteWireAdmin, actGetWireAdmin, actResetMessageWireAdmin, actUpdateWireAdmin } from '../../../redux/actions/AdminWireAction'
import AdminWireItem from '../../../components/AdminComponents/AdminWireComponent/AdminWireItem'
import AdminWireFormAction from '../../../components/AdminComponents/AdminWireComponent/AdminWireFormAction'
import AdminWireControl from '../../../components/AdminComponents/AdminWireComponent/AdminWireControl'
import AdminWirePaging from '../../../components/AdminComponents/AdminWireComponent/AdminWirePaging'

function WireAdmin() {
    const AdminWireReducer = useSelector(state => state.AdminWireReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListWires, setElmListWires] = useState(null);

    const [actionValue, setActionValue] = useState('');
    const [formValue, setFormValue] = useState({ id: null, name: '' });

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
        dispatch(actGetWireAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log()
        var result = null;
        if (AdminWireReducer.dataValue.listKD && AdminWireReducer.dataValue.listKD.length > 0) {
            result = AdminWireReducer.dataValue.listKD.map((item, index) => {
                return <AdminWireItem key={index} wire={item} index={index} actionUpdate={actionUpdate} actionDelete={actionDelete} />
            })
        }
        setElmListWires(result);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AdminWireReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminWireReducer.message) {
            case ADD_WIRE_SUCCESS:
            case DELETE_WIRE_SUCCESS:
            case UPDATE_WIRE_SUCCESS:
                toast.success(AdminWireReducer.message);
                var filter = {
                    search: search,
                    sort: sort,
                    pageIndex: pageIndex
                }
                // console.log(filter);
                dispatch(actGetWireAdmin(filter));
                dispatch(actResetMessageWireAdmin());
                break;
            case ADD_WIRE_ERROR:
            case DELETE_WIRE_ERROR:
            case UPDATE_WIRE_ERROR:
                toast.error(AdminWireReducer.message);
                dispatch(actResetMessageWireAdmin());
                break;
            default:
                if (AdminWireReducer.message) {
                    toast.error(AdminWireReducer.message);
                    dispatch(actResetMessageWireAdmin());
                }
                break;
        }
    }, [AdminWireReducer.message])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/wire?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/wire?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                case 'update':
                    return <AdminWireFormAction formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />

                default:
                    return null;
            }
        },
        [actionValue, formValue],
    )

    const actionAdd = () => {
        setFormValue({ id: null, name: '' });
        setActionValue("add");
    }

    const actionUpdate = (data) => {
        setFormValue(data);
        setActionValue("update");
    }

    const submitActionForm = (data, action) => {
        switch (action) {
            case 'add':
                dispatch(actAddWireAdmin(data));
                setActionValue('');
                break;
            case 'update':
                dispatch(actUpdateWireAdmin(data, data.id))
                setActionValue('');
                break;
            default:
                break;
        }
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        var res = window.confirm("Bạn có chắc muốn xóa kiểu dây có Id = " + id + " không?");
        if (res) {
            dispatch(actDeleteWireAdmin(id));
        }
        else {
            toast.error(DELETE_WIRE_ERROR);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý kiểu dây</h3>
                <hr />
            </div>

            <AdminWireControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} actionAdd={actionAdd} />

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
                        {/* <AdminWireItem /> */}
                        {elmListWires}
                    </tbody>
                </table>
            </div>

            <AdminWirePaging dataValue={AdminWireReducer.dataValue} />

            {showForm()}

        </div>
    )
}

export default WireAdmin

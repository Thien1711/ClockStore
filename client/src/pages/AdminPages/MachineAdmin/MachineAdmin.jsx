import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import AdminMachineControl from '../../../components/AdminComponents/AdminMachineComponent/AdminMachineControl'
import AdminMachineFormAction from '../../../components/AdminComponents/AdminMachineComponent/AdminMachineFormAction'
import AdminMachineItem from '../../../components/AdminComponents/AdminMachineComponent/AdminMachineItem'
import AdminMachinePaging from '../../../components/AdminComponents/AdminMachineComponent/AdminMachinePaging'
import { ADD_MACHINE_ERROR, ADD_MACHINE_SUCCESS, DELETE_MACHINE_ERROR, DELETE_MACHINE_SUCCESS, UPDATE_MACHINE_ERROR, UPDATE_MACHINE_SUCCESS } from '../../../constants/Message'
import { actAddMachineAdmin, actDeleteMachineAdmin, actGetMachineAdmin, actResetMessageMachineAdmin, actUpdateMachineAdmin } from '../../../redux/actions/AdminMachineAction'

function MachineAdmin() {

    const AdminMachineReducer = useSelector(state => state.AdminMachineReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListMachines, setElmListMachines] = useState(null);

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
        dispatch(actGetMachineAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        var result = null;
        if (AdminMachineReducer.dataValue.listKM && AdminMachineReducer.dataValue.listKM.length > 0) {
            result = AdminMachineReducer.dataValue.listKM.map((item, index) => {
                return <AdminMachineItem key={index} machine={item} index={index} actionUpdate={actionUpdate} actionDelete={actionDelete} />
            })
        }
        setElmListMachines(result);
    }, [AdminMachineReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminMachineReducer.message) {
            case ADD_MACHINE_SUCCESS:
            case DELETE_MACHINE_SUCCESS:
            case UPDATE_MACHINE_SUCCESS:
                toast.success(AdminMachineReducer.message);
                var filter = {
                    search: search,
                    sort: sort,
                    pageIndex: pageIndex
                }
                dispatch(actGetMachineAdmin(filter));
                dispatch(actResetMessageMachineAdmin());
                break;
            case ADD_MACHINE_ERROR:
            case DELETE_MACHINE_ERROR:
            case UPDATE_MACHINE_ERROR:
                toast.error(AdminMachineReducer.message);
                dispatch(actResetMessageMachineAdmin());
                break;
            default:
                if (AdminMachineReducer.message) {
                    toast.error(AdminMachineReducer.message);
                    dispatch(actResetMessageMachineAdmin());
                }
                break;
        }
    }, [AdminMachineReducer.message])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/machine?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/machine?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                case 'update':
                    return <AdminMachineFormAction formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />

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
                dispatch(actAddMachineAdmin(data));
                setActionValue('');
                break;
            case 'update':
                dispatch(actUpdateMachineAdmin(data, data.id))
                setActionValue('');
                break;
            default:
                break;
        }
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        var res = window.confirm("Bạn có chắc muốn xóa kiểu máy có Id = " + id + " không?");
        if (res) {
            dispatch(actDeleteMachineAdmin(id));
        }
        else {
            toast.error(DELETE_MACHINE_ERROR);
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý kiểu máy</h3>
                <hr />
            </div>

            <AdminMachineControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} actionAdd={actionAdd} />

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
                        {/* <AdminMachineItem /> */}
                        {elmListMachines}
                    </tbody>
                </table>
            </div>

            <AdminMachinePaging dataValue={AdminMachineReducer.dataValue} />

            {showForm()}

        </div>
    )
}

export default MachineAdmin

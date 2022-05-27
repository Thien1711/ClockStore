import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { actAddStaffAdmin, actChangeStatusStaffAdmin, actGetStaffAdmin, actResetMessageStaffAdmin, actUpdatePasswordStaffAdmin, actUpdatePermissionStaffAdmin } from '../../../redux/actions/AdminStaffAction';
import { ACT_CHANGE_STATUS_STAFF_ADMIN_ERROR, ACT_OFF_STATUS_STAFF_ADMIN_SUCCESS, ACT_ON_STATUS_STAFF_ADMIN_SUCCESS, ADD_STAFF_ADMIN_ERROR, ADD_STAFF_ADMIN_SUCCESS, UPDATE_PASS_STAFF_ADMIN_ERROR, UPDATE_PASS_STAFF_ADMIN_SUCCESS, UPDATE_PERMISSION_STAFF_ADMIN_ERROR, UPDATE_PERMISSION_STAFF_ADMIN_SUCCESS } from '../../../constants/Message';
import { toast } from 'react-toastify';
import AdminStaffControl from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffControl'
import AdminStaffItem from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffItem'
import AdminStaffPaging from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffPaging'
import AdminStaffFormAction from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffFormAction';
import { actGetAllPermissionAdmin } from '../../../redux/actions/AdminPermissionAction';
import AdminStaffFormUpdatePassword from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffFormUpdatePassword';
import AdminStaffFormUpdatePermission from '../../../components/AdminComponents/AdminStaffComponent/AdminStaffFormUpdatePermission';


function StaffAdmin() {
    const AdminStaffReducer = useSelector(state => state.AdminStaffReducer)
    const AdminPermissionReducer = useSelector(state => state.AdminPermissionReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListStaffs, setElmListStaffs] = useState(null);

    const [actionValue, setActionValue] = useState('');
    const [formValue, setFormValue] = useState({ user: '', password: '', rePassword: '' });

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
        dispatch(actGetStaffAdmin(data));
        dispatch(actGetAllPermissionAdmin());
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log(AdminStaffReducer.dataValue)
        var result = null;
        if (AdminStaffReducer.dataValue.listNV && AdminStaffReducer.dataValue.listNV.length > 0) {
            result = AdminStaffReducer.dataValue.listNV.map((item, index) => {
                return <AdminStaffItem key={index} staff={item} index={index}
                    submitChangeStatus={submitChangeStatus} actUpdatePass={actUpdatePass}
                    actUpdatePermission={actUpdatePermission} />
            })
        }
        setElmListStaffs(result);
    }, [AdminStaffReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminStaffReducer.message) {
            case ACT_OFF_STATUS_STAFF_ADMIN_SUCCESS:
            case ADD_STAFF_ADMIN_SUCCESS:
            case UPDATE_PASS_STAFF_ADMIN_SUCCESS:
            case UPDATE_PERMISSION_STAFF_ADMIN_SUCCESS:
            case ACT_ON_STATUS_STAFF_ADMIN_SUCCESS:
                toast.success(AdminStaffReducer.message);
                var filter = {
                    search: search,
                    sort: sort,
                    pageIndex: pageIndex
                }
                // console.log(filter);
                dispatch(actGetStaffAdmin(filter));
                dispatch(actResetMessageStaffAdmin());
                break;
            case ACT_CHANGE_STATUS_STAFF_ADMIN_ERROR:
            case UPDATE_PASS_STAFF_ADMIN_ERROR:
            case UPDATE_PERMISSION_STAFF_ADMIN_ERROR:
            case ADD_STAFF_ADMIN_ERROR:
                toast.error(AdminStaffReducer.message);
                dispatch(actResetMessageStaffAdmin());
                break;
            default:
                if(AdminStaffReducer.message) {
                    toast.error(AdminStaffReducer.message);
                    dispatch(actResetMessageStaffAdmin());
                }
                break;
        }
    }, [AdminStaffReducer.message, dispatch])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/staff?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/staff?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const submitChangeStatus = (user) => {
        // console.log(user);
        dispatch(actChangeStatusStaffAdmin(user));
    }

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'add':
                    return <AdminStaffFormAction listQ={AdminPermissionReducer.dataValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />
                case 'update-pass':
                    return <AdminStaffFormUpdatePassword formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />;
                case 'update-permission':
                    return <AdminStaffFormUpdatePermission listQ={AdminPermissionReducer.dataValue} formValue={formValue} setActionValue={setActionValue} submitActionForm={submitActionForm} />;

                default:
                    return null;
            }
        },
        [actionValue, formValue],
    )

    const actUpdatePass = (user) => {
        // console.log("user pass, ", user);
        setFormValue({ user: user, password: "", rePassword: "" });
        setActionValue("update-pass");
    }

    const actUpdatePermission = (user, quyenId) => {
        // console.log(user + " " + quyenId)
        setFormValue({ user: user, quyenId: quyenId });
        setActionValue("update-permission");
    }

    const submitActionForm = (data, action) => {
        switch (action) {
            case 'add':
                dispatch(actAddStaffAdmin(data));
                setActionValue('');
                break;
            case 'update-pass':
                dispatch(actUpdatePasswordStaffAdmin(data))
                setActionValue('');
                break;
            case 'update-permission':
                dispatch(actUpdatePermissionStaffAdmin(data))
                setActionValue('');
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý nhân viên</h3>
                <hr />
            </div>

            <AdminStaffControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} setActionValue={setActionValue} />

            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Quyền</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elmListStaffs}
                    </tbody>
                </table>
            </div>

            <AdminStaffPaging dataValue={AdminStaffReducer.dataValue} />

            {showForm()}

        </div>
    )
}

export default StaffAdmin

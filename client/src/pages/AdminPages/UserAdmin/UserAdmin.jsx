import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import AdminUserFormInfo from '../../../components/AdminComponents/AdminUserComponent/AdminUserFormInfo';
import AdminUserFormPassword from '../../../components/AdminComponents/AdminUserComponent/AdminUserFormPassword';
import { ACT_LOGIN_PASSWORD_ERROR, ACT_LOGOUT_ERROR, ACT_LOGOUT_SUCCESS, UPDATE_INFO_USER_ADMIN_ERROR, UPDATE_INFO_USER_ADMIN_SUCCESS, UPDATE_PASS_USER_ADMIN_ERROR, UPDATE_PASS_USER_ADMIN_SUCCESS } from '../../../constants/Message';
import { actGetUser, actResetMessageUserNhanVien, actUpdateInfoUserAdmin, actUpdatePasswordUserAdmin } from '../../../redux/actions/LoginAdminAction';

function UserAdmin() {

    const UserAdmin = useSelector(state => state.LoginAdminReducer)

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateborn] = useState('');
    const [quyen, setQuyen] = useState('');

    const [actionValue, setActionValue] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetUser());
    }, [dispatch])

    useEffect(() => {
        // console.log("Current User Admin : ", UserAdmin);
        if(UserAdmin.dataValue.quyen && UserAdmin.dataValue.quyen.details.search("TaiKhoan") >= 0) {
            if (UserAdmin.dataValue.user) {
                setUser(UserAdmin.dataValue.user);
            }
            if (UserAdmin.dataValue.name) {
                setName(UserAdmin.dataValue.name);
            }
            if (UserAdmin.dataValue.phone) {
                setPhone(UserAdmin.dataValue.phone);
            }
            if (UserAdmin.dataValue.address) {
                setAddress(UserAdmin.dataValue.address);
            }
            if (UserAdmin.dataValue.gender) {
                setGender(UserAdmin.dataValue.gender);
            }
            if (UserAdmin.dataValue.dateborn) {
                setDateborn(UserAdmin.dataValue.dateborn.split("T")[0]);
            }
            if (UserAdmin.dataValue.quyen) {
                setQuyen(UserAdmin.dataValue.quyen.id + " - " + UserAdmin.dataValue.quyen.name);
            }
        }
        
    }, [UserAdmin.dataValue])

    useEffect(() => {
        switch (UserAdmin.message) {
            case UPDATE_INFO_USER_ADMIN_SUCCESS:
            case UPDATE_PASS_USER_ADMIN_SUCCESS:
                toast.success(UserAdmin.message)
                dispatch(actResetMessageUserNhanVien());
                setActionValue('');
                break;
            case UPDATE_INFO_USER_ADMIN_ERROR:
            case UPDATE_PASS_USER_ADMIN_ERROR:
            case ACT_LOGIN_PASSWORD_ERROR:
                toast.error(UserAdmin.message)
                dispatch(actResetMessageUserNhanVien());
                break;
            default:
                if(UserAdmin.message && UserAdmin.message !== ACT_LOGOUT_SUCCESS && UserAdmin.message !== ACT_LOGOUT_ERROR ) {
                    toast.error(UserAdmin.message)
                    dispatch(actResetMessageUserNhanVien());
                }
                break;
        }
    }, [UserAdmin.message, dispatch])

    const showForm = useCallback(
        () => {
            switch (actionValue) {
                case 'update-info':
                    return <AdminUserFormInfo submitFormUpdateInfo={submitFormUpdateInfo} dataValue={UserAdmin.dataValue} setActionValue={setActionValue}/>
                case 'update-pass':
                    return <AdminUserFormPassword submitFormUpdatePassword={submitFormUpdatePassword} dataValue={UserAdmin.dataValue} setActionValue={setActionValue}/>
                default:
                    return null;
            }
        },
        [actionValue],
    )

    const submitFormUpdateInfo = (data) => {
        dispatch(actUpdateInfoUserAdmin(data));
    }

    const submitFormUpdatePassword = (data) => {
        dispatch(actUpdatePasswordUserAdmin(data));
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý tài khoản</h3>
                <hr />
            </div>
            <div className="row">
                <button onClick={() => setActionValue("update-info")} type="button" className="btn btn-primary ml-2">Sửa tài khoản <i className="fa fa-plus-circle" aria-hidden="true" /></button>
                <button onClick={() => setActionValue("update-pass")} type="button" className="btn btn-danger ml-2">Thay đổi mật khẩu <i className="fa fa-edit" aria-hidden="true" /></button>
            </div>

            <div className="row mt-3">
                <table className="table table-hover ">
                    <tbody>
                        <tr>
                            <td className="font-weight-bold">Tên tài khoản: </td>
                            <td>{user}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Họ tên: </td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Số điện thoại: </td>
                            <td>{phone}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Địa chỉ: </td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Giới tính: </td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Ngày sinh: </td>
                            <td>{dateborn.split("T")[0]}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold">Quyền: </td>
                            <td>{quyen}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showForm()}
        </div>

    )
}

export default UserAdmin
import React, { useEffect, useState } from 'react'
import './LoginAdminPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actLoginAdmin, actResetMessageUserNhanVien } from '../../redux/actions/LoginAdminAction';
import { ACT_LOGIN_ERROR, ACT_LOGIN_PASSWORD_ERROR, ACT_LOGIN_SUCCESS, ACT_LOGIN_USER_ERROR, ACT_LOGIN_USER_STATUS_ERROR } from '../../constants/Message';
import { toast } from 'react-toastify';

function LoginAdmin() {

    const loginAdmin = useSelector(state => state.LoginAdminReducer)
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [noteUser, setNoteUser] = useState('');
    const [notePassword, setNotePassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        switch (loginAdmin.message) {
            case ACT_LOGIN_SUCCESS:
                toast.success(loginAdmin.message);
                dispatch(actResetMessageUserNhanVien())
                navigate("/admin/account")
                break;
            case ACT_LOGIN_ERROR:
            case ACT_LOGIN_PASSWORD_ERROR:
            case ACT_LOGIN_USER_ERROR:
            case ACT_LOGIN_USER_STATUS_ERROR:
                toast.error(loginAdmin.message);
                dispatch(actResetMessageUserNhanVien())
                break;
            default:
                break;
        }
    }, [dispatch, loginAdmin.message, navigate])

    const onSubmit = (e) => {
        e.preventDefault();
        let temp = true;
        var format = /^[a-zA-Z][\w]{1,}/g;

        setNoteUser('');
        setNotePassword('');

        if(!user) {
            temp = false;
            setNoteUser('Tài khoản là bắt buộc!');
        }
        else {
            if(user.length < 3 || user.length > 25) {
                temp = false;
                setNoteUser("Tài khoản từ 3 đến 25 kí tự!");
            }
            else {
                if(!format.test(user)) {
                    temp = false;
                    setNoteUser("Tài khoản phải bắt đầu bằng chữ!");
                }
            }
        }

        if(!password) {
            temp = false;
            setNotePassword('Mật khẩu là bắt buộc!');
        }
        else {
            if(password.length < 4 || password.length > 25) {
                temp = false;
                setNotePassword('Mật khẩu từ 4 đến 25 kí tự!');
            }
        }

        if(!temp) {
            return;
        }

        const data = {
            user: user,
            password : password
        }

        dispatch(actLoginAdmin(data));
    }

    return (
        <div className="bg">
            <div className="row">
                <form className="form" onSubmit={onSubmit}>
                    <div className="form-group mx-auto">
                        <legend>Đăng nhập</legend>
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputEmail1">Tên đăng nhập : </label>
                        <input type="text" className="form-control" value={user} onChange={(e) => setUser(e.target.value)}/>
                        <small className="note form-text text-muted">{noteUser}</small>
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="exampleInputPassword1">Mật khẩu : </label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <small className="note form-text text-muted">{notePassword}</small>
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 btn-login-admin">Đăng nhập</button>
                </form>
            </div>
        </div>

    )
}

export default LoginAdmin

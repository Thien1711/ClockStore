import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ACT_LOGIN_ERROR, ACT_LOGIN_PASSWORD_ERROR, ACT_LOGIN_SUCCESS, ACT_LOGIN_USER_ERROR } from '../../../constants/Message';
import { actLoginKhachHang, actResetMessageUserKhachHang } from '../../../redux/actions/UserKhachHangAction';

function Login() {

    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [noteUser, setNoteUser] = useState('');
    const [notePassword, setNotePassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        switch (UserKhachHangReducer.message) {
            case ACT_LOGIN_SUCCESS:
                setUser('');
                setPassword('');
                toast.success(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            case ACT_LOGIN_ERROR:
            case ACT_LOGIN_PASSWORD_ERROR:
            case ACT_LOGIN_USER_ERROR:
                toast.error(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            default:
                if(UserKhachHangReducer.message) {
                    toast.error(UserKhachHangReducer.message);
                    dispatch(actResetMessageUserKhachHang())
                }
                break;
        }

        console.log(UserKhachHangReducer)
    }, [UserKhachHangReducer.message, dispatch])

    const submitHandle = (e) => {
        e.preventDefault();

        setNoteUser('');
        setNotePassword('');

        let temp = true;
        var format = /^[a-zA-Z][\w]{1,}/g;

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

        var data = {
            user,
            password
        }

        dispatch(actLoginKhachHang(data));
        
    }
    return (
        <div>
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <Link to='/home'><i className="fa fa-home" /> Trang chủ</Link>
                                <span>Đăng nhập</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="register-login-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="register-form">
                                <h2>Đăng nhập</h2>
                                <form onSubmit={submitHandle}>
                                    <div className="group-input">
                                        <label htmlFor="user">Tài khoản *</label>
                                        <input type="text" id="user" value={user} onChange={(e) => setUser(e.target.value)}/>
                                        <span className="note-validate">{noteUser}</span>
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="password">Mật khẩu *</label>
                                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        <span className="note-validate">{notePassword}</span>
                                    </div>
                                    
                                    <button type="submit" className="site-btn register-btn">Đăng nhập</button>
                                </form>
                                <div className="switch-login">
                                    <Link to='/register' className="or-login">Đăng ký</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

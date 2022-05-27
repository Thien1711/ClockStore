import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ACT_REGISTER_ERROR, ACT_REGISTER_SUCCESS } from '../../../constants/Message';
import { actRegisterKhachHang, actResetMessageUserKhachHang } from '../../../redux/actions/UserKhachHangAction';
import './Register.css'

function Register() {

    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateborn] = useState('');

    const [noteUser, setNoteUser] = useState('');
    const [notePassword, setNotePassword] = useState('');
    const [noteName, setNoteName] = useState('');
    const [notePhone, setNotePhone] = useState('');
    const [noteMail, setNoteMail] = useState('');
    const [noteAddress, setNoteAddress] = useState('');
    const [noteGender, setNoteGender] = useState('');
    const [noteDateborn, setNoteDateborn] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        switch (UserKhachHangReducer.message) {
            case ACT_REGISTER_SUCCESS:
                toast.success(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            case ACT_REGISTER_ERROR:
                toast.error(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang())
                break;
            default:
                break;
        }
    }, [UserKhachHangReducer.message, dispatch])

    const submitHandle = (e) => {
        e.preventDefault();

        setNoteUser('');
        setNotePassword('');
        setNoteName('');
        setNotePhone('');
        setNoteMail('');
        setNoteAddress('');
        setNoteGender('');
        setNoteDateborn('');

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
        
        if(!name) {
            temp = false;
            setNoteName('Họ tên là bắt buộc!');
        }
        else {
            if(name.length < 4 || name.length > 100) {
                temp = false;
                setNoteName('Họ tên từ 4 đến 100 kí tự!');
            }
        }

        if(!phone) {
            temp = false;
            setNotePhone('Số điện thoại là bắt buộc!');
        }
        else {
            if(phone.length !== 10) {
                temp = false;
                setNotePhone('Số điện thoại phải có 10 kí tự!');
            }
            else {
                format = /^(09|03|07|08|05)+([0-9]{8})/;
                if(!format.test(phone)) {
                    temp = false;
                    setNotePhone('Số điện thoại bắt đầu từ 03, 05, 07, 08, 09');
                }
            }
        }

        if(!mail) {
            temp = false;
            setNoteMail('Thư điện tử là bắt buộc!');
        } 

        if(!address) {
            temp = false;
            setNoteAddress('Địa chỉ là bắt buộc!');
        } 

        if(!gender) {
            temp = false;
            setNoteGender('Giới tính là bắt buộc!');
        }
        else {
            if(gender !== 'Nam' && gender !== 'Nữ') {
                setNoteGender('Giới tính phải là Nam hoặc Nữ!');
            }
        }

        if(!dateborn) {
            temp = false;
            setNoteDateborn('Ngày sinh là bắt buộc!');
        }

        if(!temp) {
            return;
        }
        
        var data = {
            user,
            password,
            name,
            phone,
            mail,
            address,
            gender,
            dateborn,
            status : 1
        }

        dispatch(actRegisterKhachHang(data));
    }

    return (
        <div>

            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <Link to='/home'><i className="fa fa-home" /> Trang chủ</Link>
                                <span>Đăng ký</span>
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
                                <h2>Đăng ký</h2>
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
                                    <div className="group-input">
                                        <label htmlFor="name">Họ tên *</label>
                                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                        <span className="note-validate">{noteName}</span>
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="phone">Số điện thoại *</label>
                                        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                        <span className="note-validate">{notePhone}</span>
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="mail">Thư điện tử *</label>
                                        <input type="email" id="mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
                                        <span className="note-validate">{noteMail}</span>
                                    </div>
                                    <div className="group-input">
                                        <label htmlFor="address">Địa chỉ *</label>
                                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                        <span className="note-validate">{noteAddress}</span>
                                    </div>

                                    <div className="radio" style={{ fontSize: "19px" }}>
                                        <label htmlFor="gender">Giới tính *</label>
                                        <label className="ml-3">
                                            <input type="radio" name="gender" value="Nam" onChange={() => setGender('Nam')}/>&nbsp;
                                            Nam
                                        </label>
                                        <label className="ml-3">
                                            <input type="radio" name="gender" value="Nữ" onChange={() => setGender('Nữ')}/>&nbsp;
                                            Nữ
                                        </label>
                                    </div>
                                    <span className="note-validate">{noteGender}</span>

                                    <div className="group-input mt-4">
                                        <label htmlFor="dateborn">Ngày sinh *</label>
                                        <input type="date" id="dateborn" value={dateborn} onChange={(e) => setDateborn(e.target.value)}/>
                                        <span className="note-validate">{noteDateborn}</span>
                                    </div>
                                    <button type="submit" className="site-btn register-btn">Đăng ký</button>
                                </form>
                                <div className="switch-login">
                                    <Link to='/login' className="or-login">Đăng nhập</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register

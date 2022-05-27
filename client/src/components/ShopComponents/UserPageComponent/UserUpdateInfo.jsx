import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { ACT_KHACHHANG_NOTFOUND_ERROR, ACT_KHACHHANG_NOT_LOGIN_ERROR, ACT_UPDATE_KHACHHANG_INFO_ERROR, ACT_UPDATE_KHACHHANG_INFO_SUCCESS } from '../../../constants/Message';
import { actResetMessageUserKhachHang, actUpdateInfoKhachHang } from '../../../redux/actions/UserKhachHangAction';

function UserUpdateInfo() {

    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateBorn] = useState('');
    const [genderNam, setGenderNam] = useState(false);
    const [genderNu, setGenderNu] = useState(false);

    const [noteName, setNoteName] = useState('');
    const [notePhone, setNotePhone] = useState('');
    const [noteMail, setNoteMail] = useState('');
    const [noteAddress, setNoteAddress] = useState('');
    const [noteGender, setNoteGender] = useState('');
    const [noteDateBorn, setNoteDateBorn] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (UserKhachHangReducer.dataValue.user) {
            setUser(UserKhachHangReducer.dataValue.user);
        }

        if (UserKhachHangReducer.dataValue.name) {
            setName(UserKhachHangReducer.dataValue.name);
        }

        if (UserKhachHangReducer.dataValue.phone) {
            setPhone(UserKhachHangReducer.dataValue.phone);
        }

        if (UserKhachHangReducer.dataValue.mail) {
            setMail(UserKhachHangReducer.dataValue.mail);
        }

        if (UserKhachHangReducer.dataValue.address) {
            setAddress(UserKhachHangReducer.dataValue.address);
        }

        if (UserKhachHangReducer.dataValue.gender) {
            if (UserKhachHangReducer.dataValue.gender === "Nam") {
                setGenderNam(true);
                setGenderNu(false);
            }
            else {
                setGenderNam(false);
                setGenderNu(true);
            }
            setGender(UserKhachHangReducer.dataValue.gender);
        }

        if (UserKhachHangReducer.dataValue.dateborn) {
            let born = UserKhachHangReducer.dataValue.dateborn.split("T")[0];
            setDateBorn(born);
        }
    }, [UserKhachHangReducer.dataValue])

    useEffect(() => {
        switch (UserKhachHangReducer.message) {
            case ACT_UPDATE_KHACHHANG_INFO_SUCCESS:
                toast.success(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang());
                break;
            case ACT_KHACHHANG_NOT_LOGIN_ERROR:
            case ACT_KHACHHANG_NOTFOUND_ERROR:
            case ACT_UPDATE_KHACHHANG_INFO_ERROR:
                toast.error(UserKhachHangReducer.message);
                dispatch(actResetMessageUserKhachHang());
                break;
            default:
                break;
        }
    }, [UserKhachHangReducer.message, dispatch])

    const onChangeGender = (e) => {
        var value = e.target.value;

        if (value === "Nam") {
            setGender('Nam');
            setGenderNam(true);
            setGenderNu(false);
        }
        else {
            setGender('Nữ');
            setGenderNam(false);
            setGenderNu(true);
        }
    }

    const submitBtnHuy = () => {
        navigate('/user/detail');
    }

    const submitUpdate = () => {
        setNoteName('');
        setNotePhone('');
        setNoteAddress('');
        setNoteMail('');
        setNoteGender('');
        setNoteDateBorn('');

        let temp = true;
        var format = /^[a-zA-Z][\w]{1,}/g;

        if (!name) {
            temp = false;
            setNoteName('Họ tên là bắt buộc!');
        }
        else {
            if (name.length < 4 || name.length > 100) {
                temp = false;
                setNoteName('Họ tên từ 4 đến 100 kí tự!');
            }
        }

        if (!phone) {
            temp = false;
            setNotePhone('Số điện thoại là bắt buộc!');
        }
        else {
            if (phone.length !== 10) {
                temp = false;
                setNotePhone('Số điện thoại phải có 10 kí tự!');
            }
            else {
                format = /^(09|03|07|08|05)+([0-9]{8})/;
                if (!format.test(phone)) {
                    temp = false;
                    setNotePhone('Số điện thoại bắt đầu từ 03, 05, 07, 08, 09');
                }
            }
        }

        if (!mail) {
            temp = false;
            setNoteMail('Thư điện tử là bắt buộc!');
        }

        if (!address) {
            temp = false;
            setNoteAddress('Địa chỉ là bắt buộc!');
        }

        if (!gender) {
            temp = false;
            setNoteGender('Giới tính là bắt buộc!');
        }
        else {
            if (gender !== 'Nam' && gender !== 'Nữ') {
                setNoteGender('Giới tính phải là Nam hoặc Nữ!');
            }
        }

        if (!dateborn) {
            temp = false;
            setNoteDateBorn('Ngày sinh là bắt buộc!');
        }

        if (!temp) {
            return;
        }

        var data = {
            user,
            name,
            phone,
            mail,
            address,
            gender,
            dateborn
        }

        dispatch(actUpdateInfoKhachHang(data));
    }

    return (
        <div className="col-lg-9 order-1 order-lg-2">
            <div className="product-show-option">
                <h4>Sửa thông tin cá nhân</h4>
            </div>
            <form>
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <td>Họ và tên: </td>
                            <td>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className="note-validate">{noteName}</td>
                        </tr>
                        <tr>
                            <td>Điện thoại: </td>
                            <td>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className="note-validate">{notePhone}</td>
                        </tr>
                        <tr>
                            <td>Thư điện tử: </td>
                            <td>
                                <input value={mail} onChange={(e) => setMail(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className="note-validate">{noteMail}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ: </td>
                            <td>
                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className="note-validate">{noteAddress}</td>
                        </tr>
                        <tr>
                            <td>Giới tính: </td>
                            <td>
                                <label className="ml-3">
                                    <input type="radio" name="gender" value="Nam" checked={genderNam} onChange={(e) => onChangeGender(e)} />&nbsp;
                                    Nam
                                </label>
                                <label className="ml-3">
                                    <input type="radio" name="gender" value="Nữ" checked={genderNu} onChange={(e) => onChangeGender(e)} />&nbsp;
                                    Nữ
                                </label>
                            </td>
                            <td className="note-validate">{noteGender}</td>
                        </tr>
                        <tr>
                            <td>Ngày sinh: </td>
                            <td>
                                <input value={dateborn} onChange={(e) => setDateBorn(e.target.value)} type="date" className="form-control" required="required" />
                            </td>
                            <td className="note-validate">{noteDateBorn}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={submitUpdate} type="button" className="btn btn-primary">Sửa</button>
                <button onClick={submitBtnHuy} type="button" className="btn btn-danger ml-3">Hủy</button>
            </form>
        </div>
    )
}

export default UserUpdateInfo

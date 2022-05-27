import React, { useEffect, useState } from 'react'

function AdminStaffFormAction(props) {

    const { listQ } = props;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [rePass, setRePass] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateBorn] = useState('');
    const [quyenId, setQuyenId] = useState(1);
    const [elmListQuyen, setElmListQuyen] = useState(null);

    const [noteUser, setNoteUser] = useState('');
    const [notePassword, setNotePassword] = useState('');
    const [noteRePassword, setNoteRePassword] = useState('');
    const [noteName, setNoteName] = useState('');
    const [notePhone, setNotePhone] = useState('');
    const [noteMail, setNoteMail] = useState('');
    const [noteAddress, setNoteAddress] = useState('');
    const [noteGender, setNoteGender] = useState('');
    const [noteDateBorn, setNoteDateBorn] = useState('');

    useEffect(() => {
        console.log("AdminStaffFormAction: ", listQ);
        var result = null;
        if(listQ && listQ.length > 0) {
            result = listQ.map((quyen, index) => {
                return (<option key={index} value={`${quyen.id}`}>{quyen.id} - {quyen.name}</option>)
            })
        }

        setElmListQuyen(result);
    }, [listQ])

    const submitThemNV = () => {
        // e.preventDefault();

        setNoteUser('');
        setNotePassword('');
        setNoteRePassword('');
        setNoteName('');
        setNotePhone('');
        setNoteMail('');
        setNoteAddress('');
        setNoteGender('');
        setNoteDateBorn('');

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

        if(!rePass) {
            temp = false;
            setNoteRePassword('Nhập lại mật khẩu là bắt buộc!');
        }
        else {
            if(rePass !== password) {
                temp = false;
                setNoteRePassword('Mật khẩu không khớp!');
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
            setNoteDateBorn('Ngày sinh là bắt buộc!');
        }

        if(!temp) {
            return;
        }

        var data = {
            user,
            password,
            name,
            phone,
            address,
            gender,
            dateborn,
            quyenId : parseInt(quyenId),
            status : 0
        }

        props.submitActionForm(data, "add");
    }

    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Thêm nhân viên</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Tài khoản</td>
                        <td>
                            <input value={user} onChange={(e) => setUser(e.target.value)} type="text" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteUser}</td>
                    </tr>
                    <tr>
                        <td>Mật khẩu</td>
                        <td>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{notePassword}</td>
                    </tr>
                    <tr>
                        <td>Nhập lại mật khẩu</td>
                        <td>
                            <input value={rePass} onChange={(e) => setRePass(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteRePassword}</td>
                    </tr>
                    <tr>
                        <td>Họ tên</td>
                        <td>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteName}</td>
                    </tr>
                    <tr>
                        <td>Số điện thoại</td>
                        <td>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" required="required" />

                        </td>
                        <td className="note-validate">{notePhone}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteAddress}</td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>
                            <label className="ml-1">
                                <input type="radio" name="gender" value="Nam" onChange={() => setGender('Nam')} />&nbsp;
                                Nam
                            </label>
                            <label className="ml-3">
                                <input type="radio" name="gender" value="Nữ" onChange={() => setGender('Nữ')} />&nbsp;
                                Nữ
                            </label>
                        </td>
                        <td className="note-validate">{noteGender}</td>
                    </tr>
                    <tr>
                        <td>Ngày sinh</td>
                        <td>
                            <input value={dateborn} onChange={(e) => setDateBorn(e.target.value)} type="date" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteDateBorn}</td>
                    </tr>
                    <tr>
                        <td>Quyền</td>
                        <td>
                            {/* <input type="text" className="form-control" required="required" /> */}
                            <select value={quyenId} onChange={(e) => setQuyenId(e.target.value)} className="form-control" required="required">
                                {/* <option value="" /> */}
                                {elmListQuyen}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={submitThemNV} type="button" className="btn btn-primary mr-2">Thêm</button>
                <button onClick={() => props.setActionValue("")} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminStaffFormAction

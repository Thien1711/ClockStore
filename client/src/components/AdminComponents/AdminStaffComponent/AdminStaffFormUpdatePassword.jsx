import React, { useCallback, useEffect, useState } from 'react'

function AdminStaffFormUpdatePassword(props) {
    const { formValue } = props;

    const [user, setUser] = useState(formValue.user)
    const [password, setPassword] = useState(formValue.password)
    const [rePassword, setRePassword] = useState(formValue.rePassword)

    const [notePassword, setNotePassword] = useState('')
    const [noteRePassword, setNoteRePassword] = useState('')

    useEffect(() => {
        setUser(formValue.user);
        setPassword(formValue.password);
        setRePassword(formValue.rePassword);
    }, [formValue])

    const submitUpdatePass = () => {
        setNotePassword('');
        setNoteRePassword('');

        let temp = true;
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

        if(!rePassword) {
            temp = false;
            setNoteRePassword('Nhập lại mật khẩu là bắt buộc!');
        }
        else {
            if(rePassword !== password) {
                temp = false;
                setNoteRePassword('Mật khẩu không khớp!');
            }
        }

        if(!temp) {
            return;
        }

        var data = {
            user,
            password,
            rePassword
        }

        props.submitActionForm(data, "update-pass");
    }

    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa mật khẩu nhân viên có tài khoản : {user}</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Mật khẩu mới</td>
                        <td>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{notePassword}</td>
                    </tr>
                    <tr>
                        <td>Nhập lại mật khẩu</td>
                        <td>
                            <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteRePassword}</td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={submitUpdatePass} className="btn btn-primary mr-2">Sửa</button>
                <button onClick={() => props.setActionValue("")} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminStaffFormUpdatePassword

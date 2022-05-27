import React, { useEffect, useState } from 'react'

function AdminUserFormPassword(props) {
    const { dataValue } = props;

    const [user, setUser] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [noteOldPassword, setNoteOldPassword] = useState('');
    const [noteNewPassword, setNoteNewPassword] = useState('');
    const [noteRePassword, setNoteRePassword] = useState('');

    useEffect(() => {
        setUser(dataValue.user)
        
    }, [dataValue])

    const submitBtnUpdate = () => {
        let temp = true;

        if (!oldPassword) {
            temp = false;
            setNoteOldPassword('Mật khẩu là bắt buộc!');
        }
        else {
            if (oldPassword.length < 4 || oldPassword.length > 25) {
                temp = false;
                setNoteOldPassword('Mật khẩu từ 4 đến 25 kí tự!');
            }
        }

        if (!newPassword) {
            temp = false;
            setNoteNewPassword('Mật khẩu mới là bắt buộc!');
        }
        else {
            if (newPassword.length < 4 || newPassword.length > 25) {
                temp = false;
                setNoteNewPassword('Mật khẩu mới từ 4 đến 25 kí tự!');
            }
        }

        if (rePassword !== newPassword) {
            temp = false;
            setNoteRePassword('Mật khẩu mới không khớp!');
        }

        if (!temp) {
            return;
        }

        var data = {
            user,
            oldPassword,
            newPassword,
            rePassword
        }

        props.submitFormUpdatePassword(data);
    }
    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa mật khẩu</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Nhập mật khẩu cũ: </td>
                        <td>
                            <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteOldPassword}</td>
                    </tr>
                    <tr>
                        <td>Nhập mật khẩu mới: </td>
                        <td>
                            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteNewPassword}</td>
                    </tr>
                    <tr>
                        <td>Nhập lại mật khẩu mới: </td>
                        <td>
                            <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteRePassword}</td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={submitBtnUpdate} type="button" className="btn btn-primary mr-2">Sửa</button>
                <button onClick={() => props.setActionValue('')} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminUserFormPassword

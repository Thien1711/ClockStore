import React, { useEffect, useState } from 'react'

function AdminUserFormInfo(props) {
    const { dataValue } = props;

    const [user, setUser] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateBorn] = useState('');

    const [genderNam, setGenderNam] = useState(false);
    const [genderNu, setGenderNu] = useState(false);

    const [notePhone, setNotePhone] = useState('');
    const [noteName, setNoteName] = useState('');
    const [noteAddress, setNoteAddress] = useState('');
    const [noteGender, setNoteGender] = useState('');
    const [noteDateBorn, setNoteDateBorn] = useState('');

    useEffect(() => {

        if (dataValue.quyen && dataValue.quyen.details.search("TaiKhoan") >= 0) {
            setUser(dataValue.user)
            setPhone(dataValue.phone)
            setName(dataValue.name)
            setAddress(dataValue.address)
            setGender(dataValue.gender)
            setDateBorn(dataValue.dateborn)

            if (dataValue.gender === "Nam") {
                setGenderNam(true);
                setGenderNu(false);
            }
            else {
                setGenderNam(false);
                setGenderNu(true);
            }
        }
    }, [dataValue])

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

    const submitUpdate = () => {
        setNoteName('');
        setNotePhone('');
        setNoteAddress('');
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
            address,
            gender,
            dateborn
        }

        // console.log(data);
        props.submitFormUpdateInfo(data)
    }

    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa thông tin cá nhân</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
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
                        <td>Giới tính: </td>
                        <td>
                            <label className="ml-1">
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
                        <td>Ngày sinh</td>
                        <td>
                            <input value={dateborn.split("T")[0]} onChange={(e) => setDateBorn(e.target.value)} type="date" className="form-control" required="required" />
                        </td>
                        <td className="note-validate">{noteDateBorn}</td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={submitUpdate} type="button" className="btn btn-primary mr-2">Sửa</button>
                <button onClick={() => props.setActionValue('')} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminUserFormInfo

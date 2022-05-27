import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function UserDetail() {

    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dateborn, setDateBorn] = useState('');

    useEffect(() => {
        if(UserKhachHangReducer.dataValue.name) {
            setName(UserKhachHangReducer.dataValue.name);
        }

        if(UserKhachHangReducer.dataValue.phone) {
            setPhone(UserKhachHangReducer.dataValue.phone);
        }

        if(UserKhachHangReducer.dataValue.mail) {
            setMail(UserKhachHangReducer.dataValue.mail);
        }

        if(UserKhachHangReducer.dataValue.address) {
            setAddress(UserKhachHangReducer.dataValue.address);
        }

        if(UserKhachHangReducer.dataValue.gender) {
            setGender(UserKhachHangReducer.dataValue.gender);
        }

        if(UserKhachHangReducer.dataValue.dateborn) {
            let born = UserKhachHangReducer.dataValue.dateborn.split("T");
            setDateBorn(born[0]);
        }
    }, [UserKhachHangReducer.dataValue])

    return (
        <div className="col-lg-9 order-1 order-lg-2">
            <div className="product-show-option">
                <h4>Xem thông tin cá nhân</h4>
            </div>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>Họ và tên: </td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Điện thoại</td>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <td>Thư điện tử</td>
                        <td>{mail}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ</td>
                        <td>{address}</td>
                    </tr>
                    <tr>
                        <td>Giới tính</td>
                        <td>{gender}</td>
                    </tr>
                    <tr>
                        <td>Ngày sinh</td>
                        <td>{dateborn}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UserDetail

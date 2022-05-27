import React from 'react'

function AdminStaffItem(props) {
    const { staff, index } = props;

    const showStatus = () => {
        if(staff.status === 1) {
            return (
                <button onClick={() => props.submitChangeStatus(staff.user)} type="button" className="btn btn-success">Kích hoạt</button>
            )
        }
        return (
            <button onClick={() => props.submitChangeStatus(staff.user)} type="button" className="btn btn-danger">Ẩn</button>
        )
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{staff.user}</td>
            <td>{staff.name}</td>
            <td>{staff.phone}</td>
            <td>{staff.quyenId}</td>
            <td>{staff.address}</td>
            <td>{staff.gender}</td>
            <td>{staff.dateborn.split("T")[0]}</td>
            <td>{showStatus()}</td>
            <td>
                <button onClick={() => props.actUpdatePermission(staff.user, staff.quyenId)} type="button" className="btn btn-info">Sửa quyền</button>
                <button onClick={() => props.actUpdatePass(staff.user)} type="button" className="btn btn-warning ml-1">Sửa pass</button>
            </td>

        </tr>
    )
}

export default AdminStaffItem

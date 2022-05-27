import React from 'react'

function AdminPermissionItem(props) {

    const { permission, index } = props;

    const actionBtnSua = () => {
        var data = {
            id : permission.id,
            name : permission.name,
            details : permission.details
        }
        props.actionUpdate(data);
    }
    
    return (
        <tr>
            <td>{index+1}</td>
            <td>{permission.id}</td>
            <td>{permission.name}</td>
            <td>{permission.details}</td>
            <td>
                <button onClick={actionBtnSua} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(permission.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminPermissionItem

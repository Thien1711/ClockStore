import React from 'react'

function AdminWireItem(props) {

    const { wire, index } = props;

    const actionBtnSua = () => {
        var data = {
            id : wire.id,
            name : wire.name
        }
        props.actionUpdate(data);
    }
    
    return (
        <tr>
            <td>{index+1}</td>
            <td>{wire.id}</td>
            <td>{wire.name}</td>
            <td>
                <button onClick={actionBtnSua} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(wire.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminWireItem

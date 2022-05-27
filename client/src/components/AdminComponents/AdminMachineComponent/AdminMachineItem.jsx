import React from 'react'

function AdminMachineItem(props) {

    const { machine, index } = props;

    const actionBtnSua = () => {
        var data = {
            id : machine.id,
            name : machine.name
        }
        props.actionUpdate(data);
    }
    
    return (
        <tr>
            <td>{index+1}</td>
            <td>{machine.id}</td>
            <td>{machine.name}</td>
            <td>
                <button onClick={actionBtnSua} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(machine.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminMachineItem

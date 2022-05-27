import React from 'react'

function AdminBrandItem(props) {

    const { brand, index } = props;

    const actionBtnSua = () => {
        var data = {
            id : brand.id,
            name : brand.name
        }
        props.actionUpdate(data);
    }
    
    return (
        <tr>
            <td>{index+1}</td>
            <td>{brand.id}</td>
            <td>{brand.name}</td>
            <td>
                <button onClick={actionBtnSua} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(brand.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminBrandItem

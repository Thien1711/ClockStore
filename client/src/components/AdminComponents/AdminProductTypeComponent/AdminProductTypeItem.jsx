import React from 'react'

function AdminProductTypeItem(props) {

    const { index, productType } = props;

    const actionBtnSua = () => {
        var data = {
            id : productType.id,
            name : productType.name,
            description : productType.description
        }
        props.actionUpdate(data);
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{ productType.id }</td>
            <td>{ productType.name }</td>
            <td>{ productType.description }</td>
            <td>
                <button type="button" className="btn btn-info" onClick={actionBtnSua}>Sửa</button>
                <button type="button" className="btn btn-warning ml-1" onClick={() => props.actionDelete(productType.id)}>Xóa</button>
            </td>

        </tr>
    )
}

export default AdminProductTypeItem

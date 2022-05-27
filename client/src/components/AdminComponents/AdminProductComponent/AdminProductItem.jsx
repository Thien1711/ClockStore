import React from 'react'

import { API_URL_IMG } from '../../../constants/Config';

function AdminProductItem(props) {

    const { index, product } = props;

    const showStatus = () => {
        if(product.status === 1) {
            return (
                <span className="btn btn-success" style={{cursor: 'auto'}}>
                    Kích hoạt
                </span>
            )
        }
        return (
            <span className="btn btn-danger" style={{cursor: 'auto'}}>
                Ẩn
            </span>
        )
    }

    const handleUpdateClick = () => {
        // alert()
        
        props.setItemEdit(product);
        props.setActionValue('update');
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{product.id}</td>
            <td>{product.lspId}</td>
            <td>{product.brandId}</td>
            <td>{product.wireId}</td>
            <td>{product.machineId}</td>
            {/* <td>{product.nccId}</td> */}
            <td>{product.name}</td>
            <td>{product.amount}</td>
            <td>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>{product.description}</td>
            <td>
                <img src={`${API_URL_IMG + product.img}`} alt="product"/>
            </td>
            <td>
                {showStatus()}
            </td>
            <td>
                <button onClick={handleUpdateClick} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(product.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminProductItem

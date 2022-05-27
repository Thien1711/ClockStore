import React from 'react'
import { API_URL_IMG } from '../../../constants/Config';

function AdminImportProductLoadItem(props) {
    const { item, index } = props;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.lsp.name}</td>
            <td>{item.brand.name}</td>
            <td>{item.wire.name}</td>
            <td>{item.machine.name}</td>
            <td className="col-md-1">
                <img className="img-responsive" src={`${API_URL_IMG + item.img}`} />
            </td>
            <td>
                <button onClick={() => props.setItemChoose(item)} type="button" className="btn btn-info">Chọn</button>
            </td>
        </tr>
    )
}

export default AdminImportProductLoadItem

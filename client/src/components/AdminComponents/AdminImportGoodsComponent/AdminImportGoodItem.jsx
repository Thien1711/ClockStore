import React, { useState } from 'react'
import { API_URL_IMG } from '../../../constants/Config';

function AdminImportGoodItem(props) {

    const {item} = props;

    const [amount, setAmount] = useState(item.amount)
    const [price, setPrice] = useState(item.price)

    const changePrice = (value) => {
        value = parseInt(value)
        if(value) {
            setPrice(value);
            props.changeDataAction(item.id, amount, value);
        }
    }

    const changeAmount = (value) => {
        value = parseInt(value)
        if(value) {
            setAmount(value);
            props.changeDataAction(item.id, value, price);
        }
    }

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td className="col-md-1">
                <img className="img-responsive" src={`${API_URL_IMG}${item.img}`} />
            </td>
            <td>
                <input value={amount} onChange={(e) => changeAmount(e.target.value)} type="text" className="form-control" required="required" />
            </td>
            <td>
                <input value={price} onChange={(e) => changePrice(e.target.value)} type="text" className="form-control" required="required" />
            </td>
            <td>{(item.amount * item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>
                <button onClick={() => props.deleteItemAction(item.id)} type="button" className="btn btn-danger">Xóa</button>
            </td>
        </tr>
    )
}

export default AdminImportGoodItem

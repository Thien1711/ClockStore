import React from 'react'
import { API_URL_IMG } from '../../../constants/Config';

function AdminCouponDetailItem(props) {
    const { item } = props;

    return (
        <tr>
            <td>{item.productId}</td>
            <td className="cart-pic first-row"><img src={`${API_URL_IMG}${item.img}`} /></td>
            <td className="cart-title first-row">
                <h5>{item.name}</h5>
            </td>
            <td className="p-price first-row">{item.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td className="qua-col first-row">
                {item.amount}
            </td>
            <td className="total-price first-row">{(item.price*item.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
        </tr>
    )
}

export default AdminCouponDetailItem

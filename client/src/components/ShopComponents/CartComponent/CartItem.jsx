import React, { useState } from 'react'
import { API_URL_IMG } from '../../../constants/Config';

function CartItem(props) {
    const { cartItem } = props;

    const [amount, setAmount] = useState(cartItem.amount);

    const onChangeAmount = (value) => {
        value = parseInt(value);
        if(value) {
            if(value !== amount) {
                setAmount(value);
                props.submitUpdateAmountSP(cartItem.id, value);
            }
        }
        // console.log(value);
    }

    const addAmount = () => {
        var value = parseInt(amount) + 1;
        setAmount(value);
        props.submitUpdateAmountSP(cartItem.id, value);
    }

    const subAdmount = () => {
        if(parseInt(amount) - 1 >= 1) {
            var value = parseInt(amount) - 1;
            setAmount(value);
            props.submitSubtractAmountSP(cartItem.id);
        }
    }

    return (
        <tr>
            <td className="cart-pic first-row"><img src={`${API_URL_IMG}${cartItem.img}`} /></td>
            <td className="cart-title first-row">
                <h5>{cartItem.name}</h5>
            </td>
            <td className="p-price first-row">{cartItem.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td className="qua-col first-row">
                <div className="quantity">
                    <button onClick={subAdmount} type="button" className="btn primary-btn mr-1">
                        <i className="fa fa-minus" />
                    </button>
                    <div className="pro-qty">
                        <input type="text" maxLength='9' defaultValue={1} value={amount} onChange={(e) => onChangeAmount(e.target.value)}/>
                    </div>
                    <button onClick={addAmount} type="button" className="btn primary-btn ml-1">
                        <i className="fa fa-plus" />
                    </button>
                </div>
            </td>
            <td className="total-price first-row">{(cartItem.price*cartItem.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td onClick={() => props.removeSPForCart(cartItem.id)} className="close-td first-row"><i className="ti-close" /></td>
        </tr>
    )
}

export default CartItem

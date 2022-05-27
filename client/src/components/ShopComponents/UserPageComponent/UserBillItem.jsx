import React from 'react'

function UserBillItem(props) {
    const { item } = props;

    const showStatus = () => {
        switch (item.status) {
            case 1:
                return 'Đang xử lý'
            case 2:
                return 'Đang giao hàng'
            case 3:
                return 'Đã giao hàng'
            case 4:
                return 'Đã hủy đơn hàng'
            default:
                return '';
        }
    }

    const showDateOrder = () => {
        // console.log(item.date_order)
        if(item.date_order) {
            var res = item.date_order.split("T");
            res = res[0] + " " + res[1];
            return res;
        }
        return '';
    }

    const showDateReceive = () => {
        // console.log(item.date_order)
        if(item.date_receice) {
            var res = item.date_receice.split("T");
            res = res[0] + " " + res[1];
            return res;
        }
        return '';
    }

    const btnDetailBill = () => {
        const newWindow = window.open(`/bill-detail/${item.id}`, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null
    }

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.phone}</td>
            <td>{item.address}</td>
            <td>{showDateOrder()}</td>
            <td>{showDateReceive()}</td>
            <td>{item.total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>{showStatus()}</td>
            <td>
                <button onClick={btnDetailBill} type="button" className="btn btn-info">
                    <i className="fa fa-eye"></i>
                </button>
            </td>
        </tr>
    )
}

export default UserBillItem

import React from 'react'

function AdminBillItem(props) {

    const { bill, index } = props;

    // const actionBtnSua = () => {
    //     var data = {
    //         id : bill.id,
    //         name : bill.name
    //     }
    //     props.actionUpdate(data);
    // }

    const showStatus = () => {
        switch (bill.status) {
            case 1:
                return 'Đang xử lý';
            case 2:
                return 'Đang giao hàng';
            case 3:
                return 'Đã giao hàng';
            case 4:
                return 'Đã hủy đơn hàng';

            default:
                return '';
        }
    }

    const showDate = (value) => {
        if(value) {
            value = value.split("T");
            value = value.join(" ");

            return value;
        }
        return '';
    }

    const btnDetailBill = () => {
        const newWindow = window.open(`/admin/bill-detail/${bill.id}`, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{bill.id}</td>
            <td>{bill.kHuser}</td>
            <td>{bill.nVuser}</td>
            <td>{bill.phone}</td>
            <td>{bill.address}</td>
            <td>{showDate(bill.date_receice)}</td>
            <td>{showDate(bill.date_order)}</td>
            <td>{bill.total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>{showStatus()}</td>
            <td>
                <button onClick={() => props.setItemEdit(bill)} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(bill.id)} type="button" className="btn btn-warning ml-1">Xóa</button>
                <button onClick={btnDetailBill} className="btn btn-success">Xem</button>
            </td>
        </tr>
    )
}

export default AdminBillItem

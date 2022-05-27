import React from 'react'

function AdminCouponItem(props) {

    const { coupon, index } = props;

    // const actionBtnSua = () => {
    //     var data = {
    //         id : coupon.id,
    //         name : coupon.name
    //     }
    //     props.actionUpdate(data);
    // }

    // const showStatus = () => {
    //     switch (coupon.status) {
    //         case 1:
    //             return 'Đã hoàn thành';
    //         case 2:
    //             return 'Đã hủy';
    //         default:
    //             return '';
    //     }
    // }

    const showDate = (value) => {
        if(value) {
            value = value.split("T");
            value = value.join(" ");

            return value;
        }
        return '';
    }

    const btnDetailCoupon = () => {
        const newWindow = window.open(`/admin/coupon-detail/${coupon.id}`, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{coupon.id}</td>
            <td>{coupon.nVuser}</td>
            <td>{coupon.nameNCC}</td>
            <td>{coupon.phone}</td>
            <td>{coupon.mail}</td>
            <td>{coupon.address}</td>
            <td>{showDate(coupon.date_receice)}</td>
            <td>{coupon.total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
            <td>
                {/* <button onClick={() => props.setItemEdit(coupon)} type="button" className="btn btn-info">Sửa</button>
                <button onClick={() => props.actionDelete(coupon.id)} type="button" className="btn btn-warning ml-1">Xóa</button> */}
                <button onClick={btnDetailCoupon} className="btn btn-success">Xem</button>
            </td>
        </tr>
    )
}

export default AdminCouponItem

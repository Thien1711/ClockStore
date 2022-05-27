import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { actGetBillByUserKH } from '../../../redux/actions/UserKhachHangAction'
import UserBillItem from './UserBillItem'
import UserBillPaging from './UserBillPaging'

function UserOrder() {
    const UserKhachHangReducer = useSelector(state => state.UserKhachHangReducer)

    const [elmBillItem, setelmBillItem] = useState(null);

    const [pageIndex, setPageIndex] = useState(1)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {

        var { search } = location;

        if(search === "") {
            setPageIndex(1);
            dispatch(actGetBillByUserKH(1));
        } 
        else {
            var dauHoi = search.split('?');
            var dauVa = dauHoi[dauHoi.length-1].split('&');
            var dauBang;
            for(let i = 0; i < dauVa.length; ++i) {
                dauBang = dauVa[i].split('=');
                switch (dauBang[0]) {
                    case "pageIndex":
                        var value = parseInt(dauBang[1]);
                        if(value) {
                            dispatch(actGetBillByUserKH(value));
                            setPageIndex(value);
                        }
                        else {
                            setPageIndex(1);
                            dispatch(actGetBillByUserKH(1));
                        }
                        
                        break;
                    default:
                        break;
                }
            }
        }
    }, [dispatch, location])

    useEffect(() => {
        // console.log("Hoa DOn: ", UserKhachHangReducer.hoaDonValue)
        if(!UserKhachHangReducer.hoaDonValue.listHD) {
            setelmBillItem(null);
        }
        else {
            
            var result = null;
            result = UserKhachHangReducer.hoaDonValue.listHD.map((item, index) => {
                return <UserBillItem key={index} item={item} />
            })
            setelmBillItem(result);
        }
    }, [UserKhachHangReducer.hoaDonValue, dispatch, pageIndex])

    return (
        <div className="col-lg-9 order-1 order-lg-2">
            <div className="product-show-option">
                <h4>Xem thông tin đơn hàng</h4>
            </div>
            <table className="table table-hover">

                <thead>
                    <tr>
                        <th>Mã hóa đơn</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th>Ngày đặt</th>
                        <th>Ngày nhận</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {elmBillItem}
                    
                </tbody>
            </table>
            <UserBillPaging hoaDonValue={UserKhachHangReducer.hoaDonValue}/>
        </div>
    )
}

export default UserOrder

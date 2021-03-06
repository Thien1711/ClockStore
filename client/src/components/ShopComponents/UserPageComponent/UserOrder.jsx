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
                <h4>Xem th??ng tin ????n h??ng</h4>
            </div>
            <table className="table table-hover">

                <thead>
                    <tr>
                        <th>M?? h??a ????n</th>
                        <th>S??? ??i???n tho???i</th>
                        <th>?????a ch???</th>
                        <th>Ng??y ?????t</th>
                        <th>Ng??y nh???n</th>
                        <th>T???ng ti???n</th>
                        <th>Tr???ng th??i</th>
                        <th>H??nh ?????ng</th>
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

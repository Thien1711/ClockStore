import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AdminCouponControl from '../../../components/AdminComponents/AdminCouponComponent/AdminCouponControl';
import AdminCouponItem from '../../../components/AdminComponents/AdminCouponComponent/AdminCouponItem';
import AdminCouponPaging from '../../../components/AdminComponents/AdminCouponComponent/AdminCouponPaging';
import { actGetCouponAdmin, actResetMessageCouponAdmin } from '../../../redux/actions/AdminCouponAction';

function CouponAdmin() {
    const AdminCouponReducer = useSelector(state => state.AdminCouponReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListBills, setElmListBills] = useState(null);
    // const [itemEdit, setItemEdit] = useState('');

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const utf8_from_str = (s) => {
        var temp = decodeURIComponent(s);
        temp = temp.split("+");
        temp = temp.join(" ");
        return temp;
    }

    // Load status, search, pageIndex
    useEffect(() => {
        // console.log("location: ", location);
        var { search } = location;
        if(search === "") {
            setSort('date-desc');
            setPageIndex(1);
            setSearch('');
        } 
        else {
            var dauHoi = search.split('?');
            var dauVa = dauHoi[dauHoi.length-1].split('&');
            var dauBang, value;
            for(let i = 0; i < dauVa.length; ++i) {
                dauBang = dauVa[i].split('=');
                switch (dauBang[0]) {
                    case "sort":
                        setSort(dauBang[1]);
                        break;
                    case "pageIndex":
                        value = parseInt(dauBang[1]);
                        if(value) {
                            setPageIndex(value);
                        }
                        else {
                            setPageIndex(1);
                        }
                        
                        break;
                    case "search":
                        setSearch(utf8_from_str(dauBang[1]));
                        break;
                    default:
                        break;
                }
            }
        }
    }, [location])

    useEffect(() => {
        var data = {
            sort,
            search,
            pageIndex
        }
        dispatch(actGetCouponAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log()
        var result = null;
        if(AdminCouponReducer.dataValue.listPN && AdminCouponReducer.dataValue.listPN.length > 0) {
            result = AdminCouponReducer.dataValue.listPN.map((item, index) => {
                return <AdminCouponItem key={index} coupon={item} index={index} />
            })
        }
        setElmListBills(result);
    }, [AdminCouponReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        if(AdminCouponReducer.message) {
            if(AdminCouponReducer.message.type === "success") {
                toast.success(AdminCouponReducer.message.value);
                var filter = {
                    search : search,
                    sort: sort,
                    pageIndex:pageIndex
                }
                // console.log(filter);
                dispatch(actGetCouponAdmin(filter));
                dispatch(actResetMessageCouponAdmin());
            }
            else if(AdminCouponReducer.message.type === "error") {
                toast.error(AdminCouponReducer.message.value); 
                dispatch(actResetMessageCouponAdmin());
            }
        }
    }, [AdminCouponReducer.message, dispatch])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/coupon?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/coupon?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    // Thực hiện thao tác xóa
    // const actionDelete = (id) => {
    //     var res = window.confirm("Bạn có chắc muốn xóa phiếu nhập có Id = " + id + " không?");
    //     if(res) {
    //         dispatch(actDeleteCouponAdmin(id));
    //     }
    //     else {
    //         toast.error(DELETE_COUPON_ERROR);
    //     }
    // }

    // const showForm = useCallback(
    //     () => {
    //         if(itemEdit) {
    //             return <AdmimCouponFormAction itemEdit={itemEdit} setItemEdit={setItemEdit} submitUpdateCouponStatus={submitUpdateCouponStatus}/>
    //         }
    //         return null;
    //     },
    //     [itemEdit],
    // )

    // const submitUpdateCouponStatus = (data, id) => {
    //     dispatch(actUpdateCouponStatusAdmin(data, id));
    //     setItemEdit('');
    // }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý phiếu nhập</h3>
                <hr />
            </div>
            
            <AdminCouponControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort} />
            
            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Nhân viên</th>
                            <th>Người cung cấp</th>
                            <th>Số điện thoại</th>
                            <th>Thư điện tử</th>
                            <th>Địa chỉ</th>
                            <th>Ngày lập</th>
                            <th>Tổng</th>
                            {/* <th>Trạng thái</th> */}
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <AdminWireItem /> */}
                        {elmListBills}
                    </tbody>
                </table>
            </div>

            <AdminCouponPaging dataValue={AdminCouponReducer.dataValue}/>

            {/* {showForm()} */}

        </div>
    )
}

export default CouponAdmin

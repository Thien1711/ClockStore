import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import AdminBillFormAction from '../../../components/AdminComponents/AdminBillComponent/AdmimBillFormAction';
import AdminBillControl from '../../../components/AdminComponents/AdminBillComponent/AdminBillControl'
import AdminBillItem from '../../../components/AdminComponents/AdminBillComponent/AdminBillItem';
import AdminBillPaging from '../../../components/AdminComponents/AdminBillComponent/AdminBillPaging';
import { DELETE_BILL_ERROR } from '../../../constants/Message';
import { actDeleteBillAdmin, actGetBillAdmin, actResetMessageBillAdmin, actUpdateBillStatusAdmin } from '../../../redux/actions/AdminBillAction';

function BillAdmin() {

    const AdminBillReducer = useSelector(state => state.AdminBillReducer)

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListBills, setElmListBills] = useState(null);
    const [itemEdit, setItemEdit] = useState('');

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
            setStatus(0);
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
                    case "status":
                        value = parseInt(dauBang[1]);
                        if(value) {
                            setStatus(value);
                        }
                        else {
                            setStatus(0);
                        }
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
            status,
            search,
            pageIndex
        }
        dispatch(actGetBillAdmin(data));
    }, [search, status, pageIndex, dispatch])

    useEffect(() => {
        // console.log()
        var result = null;
        if(AdminBillReducer.dataValue.listHD && AdminBillReducer.dataValue.listHD.length > 0) {
            result = AdminBillReducer.dataValue.listHD.map((item, index) => {
                return <AdminBillItem key={index} bill={item} index={index} actionDelete={actionDelete} setItemEdit={setItemEdit}/>
            })
        }
        setElmListBills(result);
    }, [AdminBillReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        if(AdminBillReducer.message) {
            if(AdminBillReducer.message.type === "success") {
                toast.success(AdminBillReducer.message.value);
                var filter = {
                    search : search,
                    status: status,
                    pageIndex:pageIndex
                }
                // console.log(filter);
                dispatch(actGetBillAdmin(filter));
                dispatch(actResetMessageBillAdmin());
            }
            else if(AdminBillReducer.message.type === "error") {
                toast.error(AdminBillReducer.message.value); 
                dispatch(actResetMessageBillAdmin());
            }
        }
    }, [AdminBillReducer.message, dispatch])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/bill?search=' + searchValue + '&status=' + status + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi status
    const changeStatus = (statusValue) => {
        navigate('/admin/bill?search=' + search + '&status=' + statusValue + '&pageIndex=' + 1);
    }

    // Thực hiện thao tác xóa
    const actionDelete = (id) => {
        var res = window.confirm("Bạn có chắc muốn xóa đơn hàng có Id = " + id + " không?");
        if(res) {
            dispatch(actDeleteBillAdmin(id));
        }
        else {
            toast.error(DELETE_BILL_ERROR);
        }
    }

    const showForm = useCallback(
        () => {
            if(itemEdit) {
                return <AdminBillFormAction itemEdit={itemEdit} setItemEdit={setItemEdit} submitUpdateBillStatus={submitUpdateBillStatus}/>
            }
            return null;
        },
        [itemEdit],
    )

    const submitUpdateBillStatus = (data, id) => {
        dispatch(actUpdateBillStatusAdmin(data, id));
        setItemEdit('');
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý đơn hàng</h3>
                <hr />
            </div>
            
            <AdminBillControl search={search} status={status} changeSearch={changeSearch} changeStatus={changeStatus} />
            
            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Id</th>
                            <th>Khách hàng</th>
                            <th>Nhân viên</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Ngày nhận</th>
                            <th>Ngày đặt</th>
                            <th>Tổng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <AdminWireItem /> */}
                        {elmListBills}
                    </tbody>
                </table>
            </div>

            <AdminBillPaging dataValue={AdminBillReducer.dataValue}/>

            {showForm()}

        </div>
    )
}

export default BillAdmin

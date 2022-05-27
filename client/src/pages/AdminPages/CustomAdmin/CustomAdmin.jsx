import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import AdminCustomControl from '../../../components/AdminComponents/AdminCustomComponent/AdminCustomControl'
// import AdminCustomFormInfoAction from '../../../components/AdminComponents/AdminCustomComponent/AdminCustomFormInfoAction'
import AdminCustomItem from '../../../components/AdminComponents/AdminCustomComponent/AdminCustomItem'
import AdminCustomPaging from '../../../components/AdminComponents/AdminCustomComponent/AdminCustomPaging'
import { ACT_CHANGE_STATUS_KHACHHANG_ADMIN_ERROR, ACT_OFF_STATUS_KHACHHANG_ADMIN_SUCCESS, ACT_ON_STATUS_KHACHHANG_ADMIN_SUCCESS } from '../../../constants/Message'
import { actChangeStatusCustomAdmin, actGetCustomAdmin, actResetMessageCustomAdmin } from '../../../redux/actions/AdminCustomAction'

function CustomAdmin() {

    const AdminCustomReducer = useSelector(state => state.AdminCustomReducer)

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name-asc');
    const [pageIndex, setPageIndex] = useState(1);
    const [elmListCustoms, setElmListCustoms] = useState(null);

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const utf8_from_str = (s) => {
        var temp = decodeURIComponent(s);
        temp = temp.split("+");
        temp = temp.join(" ");
        return temp;
    }

    // Load sort, search, pageIndex
    useEffect(() => {
        // console.log("location: ", location);
        var { search } = location;
        if(search === "") {
            setSort('name-asc');
            setPageIndex(1);
            setSearch('');
        } 
        else {
            var dauHoi = search.split('?');
            var dauVa = dauHoi[dauHoi.length-1].split('&');
            var dauBang;
            for(let i = 0; i < dauVa.length; ++i) {
                dauBang = dauVa[i].split('=');
                switch (dauBang[0]) {
                    case "sort":
                        setSort(dauBang[1]);
                        break;
                    case "pageIndex":
                        var value = parseInt(dauBang[1]);
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
        dispatch(actGetCustomAdmin(data));
    }, [search, sort, pageIndex, dispatch])

    useEffect(() => {
        // console.log(AdminCustomReducer.dataValue)
        var result = null;
        if(AdminCustomReducer.dataValue.listKH && AdminCustomReducer.dataValue.listKH.length > 0) {
            result = AdminCustomReducer.dataValue.listKH.map((item, index) => {
                return <AdminCustomItem key={index} custom={item} index={index} submitChangeStatus={submitChangeStatus}/>
            })
        }
        setElmListCustoms(result);
    }, [AdminCustomReducer.dataValue])

    // Hiên thông báo các sự kiện
    useEffect(() => {
        switch (AdminCustomReducer.message) {
            case ACT_OFF_STATUS_KHACHHANG_ADMIN_SUCCESS:
            case ACT_ON_STATUS_KHACHHANG_ADMIN_SUCCESS:
                toast.success(AdminCustomReducer.message);
                var filter = {
                    search : search,
                    sort: sort,
                    pageIndex:pageIndex
                }
                // console.log(filter);
                dispatch(actGetCustomAdmin(filter));
                dispatch(actResetMessageCustomAdmin());
                break;
            case ACT_CHANGE_STATUS_KHACHHANG_ADMIN_ERROR : 
                toast.error(AdminCustomReducer.message); 
                dispatch(actResetMessageCustomAdmin());
                break;
            default:
                if(AdminCustomReducer.message) {
                    toast.error(AdminCustomReducer.message); 
                    dispatch(actResetMessageCustomAdmin());
                }
                break;
        }
    }, [AdminCustomReducer.message])

    // đi đến URL khác khi search
    const changeSearch = (searchValue) => {
        navigate('/admin/custom?search=' + searchValue + '&sort=' + sort + '&pageIndex=' + 1);
    }

    // đi đến URL khác khi sort
    const changeSort = (sortValue) => {
        navigate('/admin/custom?search=' + search + '&sort=' + sortValue + '&pageIndex=' + pageIndex);
    }

    const submitChangeStatus = (user) => {
        // console.log(user);
        dispatch(actChangeStatusCustomAdmin(user));
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">Quản lý khách hàng</h3>
                <hr />
            </div>
            
            <AdminCustomControl search={search} sort={sort} changeSearch={changeSearch} changeSort={changeSort}/>

            <div className="row mt-3">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tài khoản</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Thư điện tử</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Ngày sinh</th>
                            <th>Trạng thái</th>
                            {/* <th>Hành động</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {elmListCustoms}
                    </tbody>
                </table>
            </div>

            <AdminCustomPaging dataValue={AdminCustomReducer.dataValue} />

            {/* <AdminCustomFormInfoAction /> */}

        </div>
    )
}

export default CustomAdmin

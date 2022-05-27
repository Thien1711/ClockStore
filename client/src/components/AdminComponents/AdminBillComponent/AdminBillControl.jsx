import React, { useEffect, useState } from 'react'

function AdminBillControl(props) {

    const [search, setSearch] = useState(props.search);

    useEffect(() => {
        setSearch(props.search);
    }, [props.search])

    const onSubmit = (e) => {
        e.preventDefault();
        props.changeSearch(search);
    }

    return (
        <div className="row">
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                <form onSubmit={onSubmit} className="form-horizontal">
                    <div className="input-group">
                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Tìm kiếm theo nhân viên, khách hàng, địa chỉ đơn hàng" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-info ml-2" >Tìm kiếm</button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <select className="form-control" required="required" value={props.status} onChange={(e) => props.changeStatus(e.target.value)} >
                    <option value={0}>Trạng thái: Tất cả</option>
                    <option value={1}>Trạng thái: Đang xử lý</option>
                    <option value={2}>Trạng thái: Đang giao hàng</option>
                    <option value={3}>Trạng thái: Đã giao hàng</option>
                    <option value={4}>Trạng thái: Đã hủy đơn hàng</option>
                </select>
            </div>
        </div>
    )
}

export default AdminBillControl

import React, { useEffect, useState } from 'react'

function AdminCouponControl(props) {

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
                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Tìm kiếm theo nhân viên nhập hàng, tên, mail, điện thoại người cung cấp" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-info ml-2" >Tìm kiếm</button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <select className="form-control" required="required" value={props.sort} onChange={(e) => props.changeSort(e.target.value)} >
                    <option value="date-desc">Ngày nhận : Giảm dần</option>
                    <option value="date-asc">Ngày nhận : Tăng dần</option>
                </select>
            </div>
        </div>
    )
}

export default AdminCouponControl

import React, { useEffect, useState } from 'react'

function AdminCustomControl(props) {
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
                        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Tìm kiếm theo tên, tài khoản, số điện thoại" />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-info ml-2">Tìm kiếm</button>
                        </span>
                    </div>
                </form>

            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <select value={props.sort} onChange={(e) => props.changeSort(e.target.value)} className="form-control" required="required">
                    <option value="name-asc">Sắp xếp theo tên : A-Z</option>
                    <option value="name-desc">Sắp xếp theo tên : Z-A</option>
                    <option value="user-asc">Sắp xếp theo tài khoản : A-Z</option>
                    <option value="user-desc">Sắp xếp theo tài khoản : Z-A</option>
                    <option value="gender-asc">Sắp xếp theo giới tính : Nam-Nữ</option>
                    <option value="gender-desc">Sắp xếp theo giới tính : Nữ-Nam</option>
                    <option value="dateborn-asc">Sắp xếp theo ngày sinh : Tăng dần</option>
                    <option value="dateborn-desc">Sắp xếp theo ngày sinh : Giảm dần</option>
                    <option value="status-asc">Sắp xếp theo trạng thái : Ẩn-Kích hoạt</option>
                    <option value="status-desc">Sắp xếp theo trạng thái : Kích hoạt-Ẩn</option>
                </select>
            </div>
        </div>
    )
}

export default AdminCustomControl

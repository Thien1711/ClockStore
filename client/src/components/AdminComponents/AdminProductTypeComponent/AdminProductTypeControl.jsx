import React, { useEffect, useState } from 'react'

function AdminProductTypeControl(props) {

    const [search, setSearch] = useState(props.search);

    useEffect(() => {
        setSearch(props.search);
    }, [props.search])

    const onSubmit = (e) => {
        e.preventDefault();
        props.changeSearch(search)
    }

    return (
        <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <button type="button" className="btn btn-primary" onClick={props.actionAdd}>Thêm loại sản phẩm <i className="fa fa-plus-circle" aria-hidden="true" /></button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={onSubmit} className="form-horizontal">
                    <div className="input-group">
                        <input type="text" className="form-control" id="exampleInputAmount" placeholder="Tìm kiếm theo tên" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-info ml-2" >Tìm kiếm</button>
                        </span>
                    </div>
                </form>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <select id="input" className="form-control" required="required" value={props.sort} onChange={(e) => props.changeSort(e.target.value)}>
                    <option value="name-asc">Sắp xếp theo tên : A-Z</option>
                    <option value="name-desc">Sắp xếp theo tên : Z-A</option>
                    <option value="id-asc">Sắp xếp theo Id : Tăng dần</option>
                    <option value="id-desc">Sắp xếp theo Id : Giảm dần</option>
                </select>
            </div>

        </div>
    )
}

export default AdminProductTypeControl

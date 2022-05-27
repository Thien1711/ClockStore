import React from 'react'
import AdminProductSearch from './AdminProductSearch'
import AdminProductSort from './AdminProductSort'

function AdminProductControl(props) {
    // console.log(props.sort)
    return (
        <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <button onClick={() => props.setActionValue("add")} type="button" className="btn btn-primary">Thêm sản phẩm <i className="fa fa-plus-circle" aria-hidden="true" /></button>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <AdminProductSearch changeSearch={props.changeSearch}/>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <AdminProductSort sort={props.sort} changeSort={props.changeSort}/>
            </div>
        </div>
    )
}

export default AdminProductControl

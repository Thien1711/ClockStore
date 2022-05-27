import React from 'react'

function AdminCustomFormInfoAction() {
    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa khách hàng</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Tên</td>
                        <td>
                            <input type="email" className="form-control" required="required" />
                        </td>
                    </tr>
                    <tr>
                        <td>Tên</td>
                        <td>
                            <input type="email" className="form-control" required="required" />

                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button type="button" className="btn btn-primary mr-2">Sửa</button>
                <button type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminCustomFormInfoAction

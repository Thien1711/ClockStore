import React, { useEffect, useState } from 'react'

function AdminStaffFormUpdatePermission(props) {
    const { listQ, formValue } = props;

    const [quyenId, setQuyenId] = useState(formValue.quyenId)
    const [user, setUser] = useState(formValue.user)

    const [elmListQuyen, setElmListQuyen] = useState(null);

    useEffect(() => {
        setUser(formValue.user);
        setQuyenId(formValue.quyenId);

        var result = null;
        if(listQ && listQ.length > 0) {
            result = listQ.map((quyen, index) => {
                return (<option key={index} value={`${quyen.id}`}>{quyen.id} - {quyen.name}</option>)
            })
        }

        setElmListQuyen(result);
    }, [listQ, formValue])

    const submitUpdatePermission = () => {
        var data = {
            user,
            quyenId : parseInt(quyenId)
        }

        props.submitActionForm(data, "update-permission")
    }
    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa quyền nhân viên {user}</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Quyền</td>
                        <td>
                            {/* <input type="text" className="form-control" required="required" /> */}
                            <select value={quyenId} onChange={(e) => setQuyenId(e.target.value)} className="form-control" required="required">
                                {/* <option value="" /> */}
                                {elmListQuyen}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={submitUpdatePermission} type="button" className="btn btn-primary mr-2">Sửa</button>
                <button onClick={() => props.setActionValue("")} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminStaffFormUpdatePermission

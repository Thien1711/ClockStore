import React, { useEffect, useState } from 'react'

function AdmimCouponFormAction(props) {

    const { itemEdit } = props;

    const [status, setStatus] = useState(itemEdit.status)

    useEffect(() => {
        setStatus(itemEdit.status)
    }, [itemEdit])

    const handleSubmit = () => {
        // console.log(status);
        var data = {
            id : itemEdit.id,
            status
        }

        props.submitUpdateCouponStatus(data, itemEdit.id);
    }

    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">Sửa trạng thái phiếu nhập có Id = {itemEdit.id}</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Trạn thái</td>
                        <td>
                            <select className="form-control" required="required" value={status} onChange={(e) => setStatus(e.target.value)}>
                                {/* <option value={0}>Trạng thái: Null</option> */}
                                <option value={1}>Trạng thái: Đã hoàn thành</option>
                                <option value={2}>Trạng thái: Đã hủy</option>
                            </select>
                        </td>
                        <td className='note-validate'>
                            {/* {noteName} */}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={handleSubmit} type="button" className="btn btn-primary mr-2">Sửa</button>
                <button onClick={() => props.setItemEdit('')} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdmimCouponFormAction

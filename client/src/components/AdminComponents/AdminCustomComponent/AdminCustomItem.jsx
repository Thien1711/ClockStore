import React from 'react'

function AdminCustomItem(props) {
    const { custom, index } = props;

    const showBtnStatus = () => {
        if(custom.status === 1) {
            return (
                <button onClick={() => props.submitChangeStatus(custom.user)} type="button" className="btn btn-success">Kích hoạt</button>
            )
        }
        return (
            <button onClick={() => props.submitChangeStatus(custom.user)} type="button" className="btn btn-danger">Ẩn</button>
        )
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{custom.user}</td>
            <td>{custom.name}</td>
            <td>{custom.phone}</td>
            <td>{custom.mail}</td>
            <td>{custom.address}</td>
            <td>{custom.gender}</td>
            <td>{custom.dateborn.split("T")[0]}</td>
            <td>
                {/* <button type="button" className="btn btn-info">Sửa</button> */}
                {showBtnStatus()}
                {/* <button type="button" className="btn btn-warning ml-1">Sửa pass</button> */}
            </td>

        </tr>
    )
}

export default AdminCustomItem

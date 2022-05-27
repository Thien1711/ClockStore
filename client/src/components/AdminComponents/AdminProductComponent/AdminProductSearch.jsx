import React, { useState } from 'react'

function AdminProductSearch(props) {

    const [search, setSearch] = useState('');

    const changeSearch = (e) => {
        e.preventDefault();
        // console.log(search);
        props.changeSearch(search);
    }

    return (
        <form onSubmit={changeSearch} className="input-group">
            <input type="text" className="form-control" id="exampleInputAmount" placeholder="Tìm theo tên, Id sản phẩm" onChange={(e) => setSearch(e.target.value)} />
            <span className="input-group-btn">
                <button type="submit" className="btn btn-info ml-2">Tìm kiếm</button>
            </span>
        </form>
    )
}

export default AdminProductSearch

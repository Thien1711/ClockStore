import React from 'react'

function AdminProductSort(props) {
    const {sort} = props;

    const changeSort = (sortValue) => {
        props.changeSort(sortValue);
    }

    return (
        <select id="input" className="form-control" required="required" value={sort} onChange={(e) => changeSort(e.target.value)}>
            <option value="name-asc">Sắp xếp theo tên : A-Z</option>
            <option value="name-desc">Sắp xếp theo tên : Z-A</option>
            <option value="price-asc">Sắp xếp theo giá : Tăng dần</option>
            <option value="price-desc">Sắp xếp theo giá : Giảm dần</option>
            <option value="id-asc">Sắp xếp theo Id : Tăng dần</option>
            <option value="id-desc">Sắp xếp theo Id : Giảm dần</option>
            <option value="status-asc">Sắp xếp theo trạng thái : Ẩn-Kích hoạt</option>
            <option value="status-desc">Sắp xếp theo trạng thái : Kích hoạt-Ẩn</option>
        </select>
    )
}

export default AdminProductSort

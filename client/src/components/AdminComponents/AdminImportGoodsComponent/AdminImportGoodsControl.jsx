import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';


function AdminImportGoodsControl(props) {

    const [title, setTitle] = useState('Tất cả')
    const [search, setSearch] = useState(props.search);
    const [typeSearch, setTypeSearch] = useState(props.typeSearch);

    useEffect(() => {
        setSearch(props.search);
    }, [props.search])

    useEffect(() => {
        setTypeSearch(props.typeSearch);
    }, [props.typeSearch])

    const onSubmitChangeSearch = (e) => {
        e.preventDefault();
        props.changeSearch(search, typeSearch);
    }

    const handleSelect = (e) => {
        // console.log(e);
        // setTitle(e)
        switch (e) {
            case "id":
                setTitle("Tìm theo Id sản phẩm");
                setTypeSearch("id");
                break;
            case "lsp":
                setTitle("Tìm theo loại sản phẩm");
                setTypeSearch("lsp");
                break;
            case "th":
                setTitle("Tìm theo thương hiệu");
                setTypeSearch("th");
                break;
            case "kd":
                setTitle("Tìm theo kiểu dây");
                setTypeSearch("kd");
                break;
            case "km":
                setTitle("Tìm theo kiểu máy");
                setTypeSearch("km");
                break;
            case "name":
                setTitle("Tìm theo tên sản phẩm");
                setTypeSearch("name");
                break;

            default:
                setTitle("Tất cả");
                setTypeSearch("");
                break;
        }
    }

    return (
        <div className="row">
            <form onSubmit={onSubmitChangeSearch} className="input-group mb-3 ml-4">
                <DropdownButton
                    title={`${title}`}
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                >
                    <Dropdown.Item eventKey="">Tất cả</Dropdown.Item>
                    <Dropdown.Item eventKey="id">Tìm theo Id sản phẩm</Dropdown.Item>
                    <Dropdown.Item eventKey="name">Tìm theo tên sản phẩm</Dropdown.Item>
                    <Dropdown.Item eventKey="lsp">Tìm theo loại sản phẩm</Dropdown.Item>
                    <Dropdown.Item eventKey="th">Tìm theo thương hiệu</Dropdown.Item>
                    <Dropdown.Item eventKey="kd">Tìm theo kiểu dây</Dropdown.Item>
                    <Dropdown.Item eventKey="km">Tìm theo kiểu máy</Dropdown.Item>
                </DropdownButton>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control ml-1" placeholder="Tìm kiếm" />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-info ml-2" >Tìm kiếm</button>
                </span>
            </form>
        </div>
    )
}

export default AdminImportGoodsControl

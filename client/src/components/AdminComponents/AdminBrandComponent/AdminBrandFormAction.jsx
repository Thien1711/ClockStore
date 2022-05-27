import React, { useEffect, useState } from 'react'

function AdminBrandFormAction(props) {

    const { formValue } = props;

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('Thêm thương hiệu')

    const [noteName, setNoteName] = useState('');

    useEffect(() => {
        setId(formValue.id);
        setName(formValue.name);
        setNoteName('');
        if(formValue.id) {
            setTitle('Sửa thương hiệu có Id = ' + formValue.id);
        }
        else {
            setTitle('Thêm thương hiệu');
        }
        
    }, [formValue])

    const showBtnSubmit = () => {
        // console.log("showBtnSubmit");
        if(formValue.id) {
            return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Sửa</button>;
        }
        else {
            return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Thêm</button>;
        }
    }

    const actionSubmit = () => {
        setNoteName('');
        if(!name) {
            setNoteName('Tên thương hiệu là bắt buộc!');
            return;
        }
        if(name.length < 3) {
            setNoteName('Tên thương hiệu tối thiểu 3 kí tự!');
            return;
        }

        if(name.length > 200) {
            setNoteName('Tên thương hiệu nhiều nhất là 200 kí tự!');
            return;
        }

        var data = {
            id : id,
            name : name
        }
        if(!id) {
            data.id = 1;
            props.submitActionForm(data, 'add');
        }
        else {
            props.submitActionForm(data, 'update');
        }
        
    }

    return (
        <div className="row mt-3 ml-3 mr-3">
            <div>
                <h3 className="text-center mt-2">{title}</h3>
                <hr />
            </div>
            <table className="table table-hover ">
                <tbody>
                    <tr>
                        <td>Tên thương hiệu</td>
                        <td>
                            <input type="text" className="form-control" required="required" value={name} onChange={(e) => setName(e.target.value)}/>
                        </td>
                        <td className='note-validate'>
                            {noteName}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                {/* <button type="button" className="btn btn-primary mr-2">Thêm</button> */}
                {showBtnSubmit()}
                <button onClick={() => props.setActionValue('')} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminBrandFormAction

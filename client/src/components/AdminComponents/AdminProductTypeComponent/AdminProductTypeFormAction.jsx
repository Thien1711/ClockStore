import React, { useEffect, useState } from 'react'

function AdminProductTypeFormAction(props) {

    const { formValue } = props;

    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('Thêm loại sản phẩm');

    const [noteName, setNoteName] = useState('');
    const [noteDescription, setNoteDescription] = useState('');

    useEffect(() => {
        setId(formValue.id);
        setName(formValue.name);
        setDescription(formValue.description);

        setNoteName('');
        setNoteDescription('');

        if(formValue.id) {
            setTitle("Sửa loại sản phẩm có Id = " + formValue.id);
        }
        else {
            setTitle("Thêm loại sản phẩm");
        }
    }, [formValue])

    const actionSubmit = () => {
        setNoteName('');
        setNoteDescription('');
        var temp = true;

        if(!name) {
            setNoteName('Tên loại sản phẩm là bắt buộc!');
            temp = false;
        }
        else {
            if(name.length < 3) {
                setNoteName('Tên loại sản phẩm tối thiểu 3 kí tự!');
                temp = false;
            }
    
            if(name.length > 200) {
                setNoteName('Tên loại sản phẩm nhiều nhất là 200 kí tự!');
                temp = false;
            }
        }

        if(!description) {
            setNoteDescription('Mô tả là bắt buộc!');
            temp = false;
        }

        if(!temp){
            return;
        }

        var data = {
            id : id,
            name : name,
            description : description
        }
        if(!id) {
            data.id = 1;
            props.submitActionForm(data, "add");
        }
        else {
            props.submitActionForm(data, "update");
        }
        // console.log(data);
    }

    const showBtnSubmit = () => {
        // console.log("showBtnSubmit");
        if(formValue.id) {
            return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Sửa</button>
        }
        return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Thêm</button>;
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
                        <td>Tên loại sản phẩm: </td>
                        <td>
                            <input type="text" className="form-control" required="required" value={name} onChange={(e) => setName(e.target.value)}/>
                        </td>
                        <td className='note-validate'>
                            {noteName}
                        </td>
                    </tr>
                    <tr>
                        <td>Mô tả: </td>
                        <td>
                            <input type="text" className="form-control" required="required" value={description} onChange={(e) => setDescription(e.target.value)}/>

                        </td>
                        <td className='note-validate'>
                            {noteDescription}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                {showBtnSubmit()}
                <button type="button" className="btn btn-danger mr-2" onClick={() => props.setActionValue('')}>Hủy</button>
            </div>
        </div>
    )
}

export default AdminProductTypeFormAction

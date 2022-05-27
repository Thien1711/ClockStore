import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actGetAllBrandAdmin } from '../../../redux/actions/AdminBrandAction';
import { actGetAllMachineAdmin } from '../../../redux/actions/AdminMachineAction';
import { actGetAllProductTypeAdmin } from '../../../redux/actions/AdminProductTypeAction';
import { actGetAllWireAdmin } from '../../../redux/actions/AdminWireAction';

const defaultImgSrc = '/img/null.png';

const initialFieldValues = {
    lspId: '',
    brandId: '',
    wireId: '',
    machineId: '',
    name: '',
    price: 0,
    description: '',
    img : '',
    imgSrc: defaultImgSrc,
    imgFile: null
}

function AdminProductFormActionAdd(props) {

    const AdminWireReducer = useSelector(state => state.AdminWireReducer)
    const AdminProductTypeReducer = useSelector(state => state.AdminProductTypeReducer);
    const AdminBrandReducer = useSelector(state => state.AdminBrandReducer);
    const AdminMachineReducer = useSelector(state => state.AdminMachineReducer);

    const [values, setValues] = useState(initialFieldValues);
    const [noteLSPId, setNoteLSPId] = useState('');
    const [noteBrandId, setNoteBrandId] = useState('');
    const [noteWireId, setNoteWireId] = useState('');
    const [noteMachineId, setNoteMachineId] = useState('');
    const [noteName, setNoteName] = useState('');
    const [noteDescription, setNoteDescription] = useState('');
    const [noteImg, setNoteImg] = useState('');

    const [elmListWire, setElmListWire] = useState(null);
    const [elmListProductType, setElmListProductType] = useState(null);
    const [elmListBrand, setElmListBrand] = useState(null);
    const [elmListMachine, setElmListMachine] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actGetAllWireAdmin());
        dispatch(actGetAllProductTypeAdmin());
        dispatch(actGetAllBrandAdmin());
        dispatch(actGetAllMachineAdmin());
    }, [dispatch])

    useEffect(() => {
        var result = null;
        setElmListWire(null);
        setElmListProductType(null);
        setElmListBrand(null);
        setElmListMachine(null);
        // setElmListNCC(null);

        if (AdminWireReducer.dataValue && AdminWireReducer.dataValue.length > 0) {
            // console.log(AdminWireReducer.dataValue);
            result = AdminWireReducer.dataValue.map((item, index) => {
                return <option key={index} value={`${item.id}`}>{item.id} - {item.name}</option>
            })
            setElmListWire(result);
        }

        if (AdminProductTypeReducer.dataValue && AdminProductTypeReducer.dataValue.length > 0) {
            // console.log(AdminProductTypeReducer.dataValue);
            result = AdminProductTypeReducer.dataValue.map((item, index) => {
                return <option key={index} value={`${item.id}`}>{item.id} - {item.name}</option>
            })
            setElmListProductType(result);
        }

        if (AdminBrandReducer.dataValue && AdminBrandReducer.dataValue.length > 0) {
            // console.log(AdminBrandReducer.dataValue);
            result = AdminBrandReducer.dataValue.map((item, index) => {
                return <option key={index} value={`${item.id}`}>{item.id} - {item.name}</option>
            })
            setElmListBrand(result);
        }

        if (AdminMachineReducer.dataValue && AdminMachineReducer.dataValue.length > 0) {
            // console.log(AdminMachineReducer.dataValue);
            result = AdminMachineReducer.dataValue.map((item, index) => {
                return <option key={index} value={`${item.id}`}>{item.id} - {item.name}</option>
            })
            setElmListMachine(result);
        }
    }, [AdminWireReducer.dataValue, AdminProductTypeReducer.dataValue, AdminBrandReducer.dataValue, AdminMachineReducer.dataValue])

    

    const handleInputChange = (e) => {
        // console.log(values);
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const showPreview = (e) => {
        if(e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];

            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imgFile : imageFile,
                    img : imageFile.name,
                    imgSrc : x.target.result
                })
            };
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imgFile : null,
                img : '',
                imgSrc : defaultImgSrc
            })
        }
        console.log(values);
    }

    const validate = () => {
        setNoteLSPId('');
        setNoteBrandId('');
        setNoteWireId('');
        setNoteMachineId('');
        setNoteName('');
        setNoteDescription('');
        setNoteImg('');

        let temp = true;
        if(!values.lspId) {
            setNoteLSPId("Loại sản phẩm là bắt buộc!");
            temp = false;
        } 

        if(!values.brandId) {
            setNoteBrandId("Thương hiệu là bắt buộc!");
            temp = false;
        } 

        if(!values.wireId) {
            setNoteWireId("Kiểu dây là bắt buộc!");
            temp = false;
        } 

        if(!values.machineId) {
            setNoteMachineId("Kiểu máy là bắt buộc!");
            temp = false;
        } 

        if(!values.name) {
            setNoteName("Tên sản phẩm là bắt buộc!");
            temp = false;
        }
        else {
            if(values.name.length < 3 || values.name.length > 200) {
                setNoteName('Tên sản phẩm từ 3 đến 200 kí tự!');
                temp = false;
            }
        }

        if(!values.description) {
            setNoteDescription("Mô tả là bắt buộc!");
            temp = false;
        } 

        if(!values.imgSrc) {
            setNoteImg("Hình ảnh là bắt buộc!");
            temp = false;
        } 

        return temp;
    }

    const handleFormSubmit = () => {
        // console.log(values);
        if(validate()) {
            const formData = new FormData();
            formData.append('lspId', parseInt(values.lspId));
            formData.append('brandId', parseInt(values.brandId));
            formData.append('wireId', parseInt(values.wireId));
            formData.append('machineId', parseInt(values.machineId));
            formData.append('name', values.name);
            formData.append('price', parseInt(values.price));
            formData.append('description', values.description);
            formData.append('img', values.img);
            formData.append('imgFile', values.imgFile);
            // console.log(formData);
            props.submitActionAddForm(formData);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <div className="row">
                <h3 className="text-center mt-2">Thêm Sản Phẩm</h3>
                <hr />
            </div>
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>Mã loại sản phẩm</td>
                        <td>
                            <select name="lspId" value={values.lspId} onChange={handleInputChange} className="form-control" required="required">
                                <option value="">Null</option>
                                {elmListProductType}
                            </select>
                        </td>
                        <td className="note-validate">{noteLSPId}</td>
                    </tr>
                    <tr>
                        <td>Mã thương hiệu</td>
                        <td>
                            <select name="brandId" value={values.brandId} onChange={handleInputChange} className="form-control" required="required">
                                <option value="">Null</option>
                                {elmListBrand}
                            </select>
                            {/* <input type="text" name="brandId" value={values.brandId} onChange={handleInputChange} className="form-control" required="required" /> */}
                        </td>
                        <td className="note-validate">{noteBrandId}</td>
                    </tr>
                    <tr>
                        <td>Mã dây</td>
                        <td>
                            <select name="wireId" value={values.wireId} onChange={handleInputChange} className="form-control" required="required">
                                <option value="">Null</option>
                                {elmListWire}
                            </select>
                        </td>
                        <td className="note-validate">{noteWireId}</td>
                    </tr>
                    <tr>
                        <td>Mã máy</td>
                        <td>
                            <select name="machineId" value={values.machineId} onChange={handleInputChange} className="form-control" required="required">
                                <option value="">Null</option>
                                {elmListMachine}
                            </select>
                            {/* <input type="text" name="machineId" value={values.machineId} onChange={handleInputChange} className="form-control" required="required" /> */}
                        </td>
                        <td className="note-validate">{noteMachineId}</td>
                    </tr>
                    <tr>
                        <td>Tên</td>
                        <td>
                            <input type="text" name="name" value={values.name} onChange={handleInputChange} className="form-control" required="required" />

                        </td>
                        <td className="note-validate">{noteName}</td>
                    </tr>
                    <tr>
                        <td>Giá</td>
                        <td>
                            <input name="price" value={values.price} onChange={handleInputChange} type="number" className="form-control" required="required" />

                        </td>
                        <td className="note-validate"></td>
                    </tr>
                    <tr>
                        <td>Mô tả</td>
                        <td>
                            <textarea type="text" name="description" value={values.description} onChange={handleInputChange} className="form-control" required="required" />

                        </td>
                        <td className="note-validate">{noteDescription}</td>
                    </tr>
                    <tr>
                        <td>Hình ảnh</td>
                        <td>
                            <input onChange={showPreview} type="file" accept="image/*" name="imgFile" className="form-control-file" required="required" />
                        </td>
                        <td className="note-validate">{noteImg}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <img src={`${values.imgSrc}`} />
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <button onClick={handleFormSubmit} type="button" className="btn btn-primary mr-2">Thêm</button>
                <button onClick={() => props.setActionValue('')} type="button" className="btn btn-danger mr-2">Hủy</button>
            </div>
        </div>
    )
}

export default AdminProductFormActionAdd

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { actChooseProduct } from '../../../redux/actions/AdminImportGoodsAction';
import AdminImportGoodItem from './AdminImportGoodItem'

function AdminImportGoodChoose(props) {

    const {itemChoose, dataAction} = props;

    const [totalAmount, setTotalAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');

    const [noteName, setNoteName] = useState('');
    const [notePhone, setNotePhone] = useState('');
    const [noteMail, setNoteMail] = useState('');
    const [noteAddress, setNoteAddress] = useState('');

    const [elmItems, setElmItems] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(itemChoose) {
            dispatch(actChooseProduct(itemChoose));
        }
    }, [dispatch, itemChoose])

    useEffect(() => {
        let result = null, amount = 0, price = 0;
        if(dataAction.listSP && dataAction.listSP.length > 0) {
            
            result = dataAction.listSP.map((item, index) => {
                amount += item.amount;
                price += item.price * item.amount;
                return <AdminImportGoodItem changeDataAction={props.changeDataAction} key={index} item={item} deleteItemAction={props.deleteItemAction}/>
            })
        }
        setElmItems(result);
        setTotalAmount(amount);
        setTotalPrice(price);
    }, [dataAction, props.changeDataAction, props.deleteItemAction])

    useEffect(() => {
        if(props.actionResetForm) {
            setAddress('');
            setPhone('');
            setMail('');
            setName('');
            props.setActionResetForm(false);
        }
    }, [props.actionResetForm])

    const submitLapPhieuNhap = () => {
        let temp = true;
        let format = /^[a-zA-Z][\w]{1,}/g;

        setNoteName('');
        setNotePhone('');
        setNoteMail('');
        setNoteAddress('');

        if(!name) {
            temp = false;
            setNoteName('Họ tên là bắt buộc!');
        }
        else {
            if(name.length < 4 || name.length > 100) {
                temp = false;
                setNoteName('Họ tên từ 4 đến 100 kí tự!');
            }
        }

        if(!phone) {
            temp = false;
            setNotePhone('Số điện thoại là bắt buộc!');
        }
        else {
            if(phone.length !== 10) {
                temp = false;
                setNotePhone('Số điện thoại phải có 10 kí tự!');
            }
            else {
                format = /^(09|03|07|08|05)+([0-9]{8})/;
                if(!format.test(phone)) {
                    temp = false;
                    setNotePhone('Số điện thoại bắt đầu từ 03, 05, 07, 08, 09 và là chữ số');
                }
            }
        }

        if(!mail) {
            temp = false;
            setNoteMail('Thư điện tử là bắt buộc!');
        }
        else {
            format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!format.test(mail)){
                setNoteMail("Thư điện tử không hợp lệ!");
                temp = false;
            }
        }

        if(!address) {
            temp = false;
            setNoteAddress('Địa chỉ là bắt buộc!');
        } 

        if(!temp) {
            return;
        }

        let data = {
            user : props.user,
            phone,
            nameNCC : name,
            mail,
            address
        }
        props.submitCreatePhieuNhap(data);
    }

    const submitHuy = () => {
        setNoteName('');
        setNotePhone('');
        setNoteMail('');
        setNoteAddress('');

        props.submitBtnHuy();
    }

    return (
        <div>
            <div className="row mb-2 text-center" style={{ fontSize: '150%', fontWeight: 'bold' }}>
                Thông tin phiếu nhập
            </div>
            <div className="row">
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr>
                            <td>Nhân viên</td>
                            <td>
                                <input value={props.user} type="text" className="form-control" required="required" disabled/>
                            </td>
                        </tr>
                        <tr>
                            <td>Tên người cung cấp</td>
                            <td>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className='note-validate'>{noteName}</td>
                        </tr>
                        <tr>
                            <td>Số điện thoại người cung cấp</td>
                            <td>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className='note-validate'>{notePhone}</td>
                        </tr>
                        <tr>
                            <td>Email người cung cấp</td>
                            <td>
                                <input value={mail} onChange={(e) => setMail(e.target.value)}  type="text" className="form-control" required="required" />
                            </td>
                            <td className='note-validate'>{noteMail}</td>
                        </tr>
                        <tr>
                            <td>Địa chỉ người cung cấp</td>
                            <td>
                                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" required="required" />
                            </td>
                            <td className='note-validate'>{noteAddress}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row mb-2 text-center" style={{ fontSize: '150%', fontWeight: 'bold' }}>
                Sản phẩm đã chọn
            </div>
            <div className="row table-import-goods-action">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tên</th>
                            <th>Hình ảnh</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Tổng tiền</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elmItems}
                        {/* <AdminImportGoodItem /> */}
                    </tbody>
                </table>

            </div>
            <div className="row mt-2">
                <div className="col-lg-4 offset-lg-4">
                    <div className="proceed-checkout">
                        <ul>
                            <li className="subtotal">Tổng sản phẩm <span>{totalAmount}</span></li>
                            <li className="cart-total">Thành tiền <span>{totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center mt-3 mb-3">
                
                <button onClick={submitLapPhieuNhap} type="button" className="btn btn-primary">Lập phiếu nhập</button>
                <button onClick={submitHuy} type="button" className="btn btn-danger ml-3">Hủy</button>
                
            </div>
        </div>
    )
}

export default AdminImportGoodChoose

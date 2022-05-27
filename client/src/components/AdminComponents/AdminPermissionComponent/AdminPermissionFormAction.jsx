import React, { useEffect, useState } from 'react'

function AdminPermissionFormAction(props) {

    const { formValue } = props;

    const [title, setTitle] = useState('Thêm quyền')
    const [id, setId] = useState(null);
    const [name, setName] = useState('');

    const [NhanVien, setNhanVien] = useState('');
    const [NhapHang, setNhapHang] = useState('');
    const [SanPham, setSanPham] = useState('');
    const [DonHang, setDonHang] = useState('');
    const [KhachHang, setKhachHang] = useState('');
    const [PhieuNhap, setPhieuNhap] = useState('');
    const [TaiKhoan, setTaiKhoan] = useState('');
    const [Quyen, setQuyen] = useState('');
    const [LoaiSanPham, setLoaiSanPham] = useState('');
    const [ThuongHieu, setThuongHieu] = useState('');
    const [KieuMay, setKieuMay] = useState('');
    const [KieuDay, setKieuDay] = useState('');
    const [ThongKe, setThongKe] = useState('');

    const [noteName, setNoteName] = useState('');
    const [noteDetails, setNoteDetails] = useState('');

    useEffect(() => {
        setId(formValue.id);
        setName(formValue.name);

        setNoteName('');
        setNoteDetails('');

        console.log(formValue.details);

        if(formValue.details === "") {
            setTaiKhoan('');
            setKhachHang('');
            setNhanVien('');
            setThuongHieu('');
            setSanPham('');
            setLoaiSanPham('');
            setKieuDay('');
            setKieuMay('');
            setQuyen('');
            setDonHang('');
            setNhapHang('');
            setPhieuNhap('');
            setThongKe('');
        }
        else {
            if(formValue.details.search("xemTaiKhoan") >= 0) {
                setTaiKhoan("xemTaiKhoan");
            }
            else if(formValue.details.search("qlTaiKhoan") >= 0) {
                setTaiKhoan("qlTaiKhoan");
            }
            else {
                setTaiKhoan("");
            }

            if(formValue.details.search("xemKhachHang") >= 0) {
                setKhachHang("xemKhachHang");
            }
            else if(formValue.details.search("qlKhachHang") >= 0) {
                setKhachHang("qlKhachHang");
            }
            else {
                setKhachHang("");
            }

            if(formValue.details.search("xemNhanVien") >= 0) {
                setNhanVien("xemNhanVien");
            }
            else if(formValue.details.search("qlNhanVien") >= 0) {
                setNhanVien("qlNhanVien");
            }
            else {
                setNhanVien("");
            }

            if(formValue.details.search("xemThuongHieu") >= 0) {
                setThuongHieu("xemThuongHieu");
            }
            else if(formValue.details.search("qlThuongHieu") >= 0) {
                setThuongHieu("qlThuongHieu");
            }
            else {
                setThuongHieu("");
            }

            if(formValue.details.search("xemSanPham") >= 0) {
                setSanPham("xemSanPham");
            }
            else if(formValue.details.search("qlSanPham") >= 0) {
                setSanPham("qlSanPham");
            }
            else {
                setSanPham("");
            }

            if(formValue.details.search("xemLoaiSanPham") >= 0) {
                setLoaiSanPham("xemLoaiSanPham");
            }
            else if(formValue.details.search("qlLoaiSanPham") >= 0) {
                setLoaiSanPham("qlLoaiSanPham");
            }
            else {
                setLoaiSanPham("");
            }

            if(formValue.details.search("xemKieuDay") >= 0) {
                setKieuDay("xemKieuDay");
            }
            else if(formValue.details.search("qlKieuDay") >= 0) {
                setKieuDay("qlKieuDay");
            }
            else {
                setKieuDay("");
            }

            if(formValue.details.search("xemKieuMay") >= 0) {
                setKieuMay("xemKieuMay");
            }
            else if(formValue.details.search("qlKieuMay") >= 0) {
                setKieuMay("qlKieuMay");
            }
            else {
                setKieuMay("");
            }

            if(formValue.details.search("xemQuyen") >= 0) {
                setQuyen("xemQuyen");
            }
            else if(formValue.details.search("qlQuyen") >= 0) {
                setQuyen("qlQuyen");
            }
            else {
                setQuyen("");
            }

            if(formValue.details.search("xemDonHang") >= 0) {
                setDonHang("xemDonHang");
            }
            else if(formValue.details.search("qlDonHang") >= 0) {
                setDonHang("qlDonHang");
            }
            else {
                setDonHang("");
            }

            if(formValue.details.search("xemNhapHang") >= 0) {
                setNhapHang("xemNhapHang");
            }
            else if(formValue.details.search("qlNhapHang") >= 0) {
                setNhapHang("qlNhapHang");
            }
            else {
                setNhapHang("");
            }

            if(formValue.details.search("xemPhieuNhap") >= 0) {
                setPhieuNhap("xemPhieuNhap");
            }
            else if(formValue.details.search("qlPhieuNhap") >= 0) {
                setPhieuNhap("qlPhieuNhap");
            }
            else {
                setPhieuNhap("");
            }

            if(formValue.details.search("xemThongKe") >= 0) {
                setThongKe("xemThongKe");
            }
            else if(formValue.details.search("qlThongKe") >= 0) {
                setThongKe("qlThongKe");
            }
            else {
                setThongKe("");
            }
        }

        if (formValue.id) {
            setTitle('Sửa quyền có Id = ' + formValue.id);
        }
        else {
            setTitle('Thêm quyền');
        }

    }, [formValue])

    const showBtnSubmit = () => {
        // console.log("showBtnSubmit");
        if (formValue.id) {
            return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Sửa</button>;
        }
        else {
            return <button type="button" onClick={actionSubmit} className="btn btn-primary mr-2">Thêm</button>;
        }
    }

    const actionSubmit = () => {
        setNoteName('');
        setNoteDetails('');

        var temp = true;

        if (!name) {
            setNoteName('Tên quyền là bắt buộc!');
            temp = false;
        }
        else {
            if (name.length < 3) {
                setNoteName('Tên quyền tối thiểu 3 kí tự!');
                temp = false;
            }

            if (name.length > 200) {
                setNoteName('Tên quyền nhiều nhất là 200 kí tự!');
                temp = false;
            }
        }

        var details = "";

        if(TaiKhoan !== "") {
            details += TaiKhoan + "-";
        }
        if(KhachHang !== "") {
            details += KhachHang + "-";
        }
        if(NhanVien !== "") {
            details += NhanVien + "-";
        }
        if(ThuongHieu !== "") {
            details += ThuongHieu + "-";
        }
        if(SanPham !== "") {
            details += SanPham + "-";
        }
        if(LoaiSanPham !== "") {
            details += LoaiSanPham + "-";
        }
        if(KieuDay !== "") {
            details += KieuDay + "-";
        }
        if(KieuMay !== "") {
            details += KieuMay + "-";
        }
        if(Quyen !== "") {
            details += Quyen + "-";
        }
        if(DonHang !== "") {
            details += DonHang + "-";
        }
        if(NhapHang !== "") {
            details += NhapHang + "-";
        }
        if(PhieuNhap !== "") {
            details += PhieuNhap + "-";
        }
        if(ThongKe !== "") {
            details += ThongKe + "-";
        }

        details = details.slice(0, details.length-1)

        if (!details) {
            setNoteDetails('Phải có ít nhất 1 quyền được chọn!');
            temp = false;
        }

        if (!temp) {
            return;
        }

        var data = {
            id: id,
            name: name,
            details: details
        }
        // console.log("data: ", data);
        // return;

        if (!id) {
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
                        <td>Tên quyền</td>
                        <td>
                            <input type="text" className="form-control" required="required" value={name} onChange={(e) => setName(e.target.value)} />
                        </td>
                        <td className='note-validate'>
                            {noteName}
                        </td>
                    </tr>
                    <tr>
                        <td>Chi tiết quyền:</td>
                        <td></td>
                        <td className='note-validate'>{noteDetails}</td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý tài khoản</span></td>
                        <td>
                            <select value={TaiKhoan} onChange={(e) => setTaiKhoan(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemTaiKhoan">Chỉ xem</option>
                                <option value="qlTaiKhoan">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý khách hàng</span></td>
                        <td>
                            <select value={KhachHang} onChange={(e) => setKhachHang(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemKhachHang">Chỉ xem</option>
                                <option value="qlKhachHang">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý nhân viên</span></td>
                        <td>
                            <select value={NhanVien} onChange={(e) => setNhanVien(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemNhanVien">Chỉ xem</option>
                                <option value="qlNhanVien">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý thương hiệu</span></td>
                        <td>
                            <select value={ThuongHieu} onChange={(e) => setThuongHieu(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemThuongHieu">Chỉ xem</option>
                                <option value="qlThuongHieu">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý sản phẩm</span></td>
                        <td>
                            <select value={SanPham} onChange={(e) => setSanPham(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemSanPham">Chỉ xem</option>
                                <option value="qlSanPham">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý loại sản phẩm</span></td>
                        <td>
                            <select value={LoaiSanPham} onChange={(e) => setLoaiSanPham(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemLoaiSanPham">Chỉ xem</option>
                                <option value="qlLoaiSanPham">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý kiểu máy</span></td>
                        <td>
                            <select value={KieuMay} onChange={(e) => setKieuMay(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemKieuMay">Chỉ xem</option>
                                <option value="qlKieuMay">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý kiểu dây</span></td>
                        <td>
                            <select value={KieuDay} onChange={(e) => setKieuDay(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemKieuDay">Chỉ xem</option>
                                <option value="qlKieuDay">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý quyền</span></td>
                        <td>
                            <select value={Quyen} onChange={(e) => setQuyen(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemQuyen">Chỉ xem</option>
                                <option value="qlQuyen">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý đơn hàng</span></td>
                        <td>
                            <select value={DonHang} onChange={(e) => setDonHang(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemDonHang">Chỉ xem</option>
                                <option value="qlDonHang">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền nhập hàng</span></td>
                        <td>
                            <select value={NhapHang} onChange={(e) => setNhapHang(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemNhapHang">Chỉ xem</option>
                                <option value="qlNhapHang">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền quản lý phiếu nhập</span></td>
                        <td>
                            <select value={PhieuNhap} onChange={(e) => setPhieuNhap(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemPhieuNhap">Chỉ xem</option>
                                <option value="qlPhieuNhap">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><span className="ml-4">Quyền thống kê</span></td>
                        <td>
                            <select value={ThongKe} onChange={(e) => setThongKe(e.target.value)} className="form-control" required="required">
                                <option value="">Không có quyền</option>
                                <option value="xemThongKe">Chỉ xem</option>
                                <option value="qlThongKe">Xem và quản lý</option>
                            </select>
                        </td>
                    </tr>
                    
                    {/* <tr>
                        <td>Chi tiết quyền</td>
                        <td>
                            <input type="text" className="form-control" required="required" value={details} onChange={(e) => setDetails(e.target.value)}/>
                        </td>
                        <td className='note-validate'>
                            {noteDetails}
                        </td>
                    </tr> */}
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

export default AdminPermissionFormAction

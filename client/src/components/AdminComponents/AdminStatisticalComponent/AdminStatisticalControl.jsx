import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function AdminStatisticalControl(props) {

    const [yearBegin, setYearBegin] = useState("");
    const [yearEnd, setYearEnd] = useState("");

    const [monthBegin, setMonthBegin] = useState("");
    const [monthEnd, setMonthEnd] = useState("");
    const [txtYear, setTxtYear] = useState("");

    const [elmControl, setElmControl] = useState(null)

    const submitLocDoanhThuYear = () => {
        var begin = parseInt(yearBegin)
        if (!begin) {
            toast.error("Năm bắt đầu lọc là bắt buộc và là chữ số.");
            return;
        }

        var end = parseInt(yearEnd);
        if (!end) {
            toast.error("Năm kết thúc lọc là bắt buộc và là chữ số.");
            return;
        }

        var data = {
            begin: begin,
            end: end
        }

        props.submitLoc(data);
    }

    const submitDoanhThuMonth = () => {
        var year = parseInt(txtYear);

        if (!year) {
            toast.error("Năm là bắt buộc và là chữ số.");
            return;
        }

        var begin = parseInt(monthBegin)
        if (!begin) {
            toast.error("Tháng bắt đầu lọc là bắt buộc và là chữ số.");
            return;
        }

        var end = parseInt(monthEnd);
        if (!end) {
            toast.error("Tháng kết thúc lọc là bắt buộc và là chữ số.");
            return;
        }

        var data = {
            year: year,
            begin: begin,
            end: end
        }

        props.submitLoc(data);
    }

    useEffect(() => {
        switch (props.selectOption) {
            case "doanhthu-year":
            case "bill-year":
            case "product-year":
                setTxtYear("");
                setMonthBegin("");
                setMonthEnd("");
                setElmControl(<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div className="input-group">
                        <input value={yearBegin} onChange={(e) => setYearBegin(e.target.value)} type="text" className="form-control" placeholder='Năm băt đầu' />
                        <input value={yearEnd} onChange={(e) => setYearEnd(e.target.value)} type="text" className="form-control ml-3" placeholder='Năm kết thúc' />
                        <button onClick={submitLocDoanhThuYear} type="button" className="btn btn-primary ml-1">Lọc</button>
                    </div>
                </div>)
                break;
            case "doanhthu-month":
            case "bill-month":
            case "product-month":
                setYearBegin("");
                setYearEnd("");
                setElmControl(<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div className="input-group">
                        <input value={txtYear} onChange={(e) => setTxtYear(e.target.value)} type="text" className="form-control" placeholder='Năm cần lọc' />
                        <input value={monthBegin} onChange={(e) => setMonthBegin(e.target.value)} type="text" className="form-control ml-3" placeholder='Tháng băt đầu' />
                        <input value={monthEnd} onChange={(e) => setMonthEnd(e.target.value)} type="text" className="form-control ml-3" placeholder='Tháng kết thúc' />
                        <button onClick={submitDoanhThuMonth} type="button" className="btn btn-primary ml-3">Lọc</button>
                    </div>
                </div>)
                break;
            default:
                setElmControl(null)
                break;
        }
    }, [monthBegin, monthEnd, props.selectOption, txtYear, yearBegin, yearEnd])

    return (
        <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <select value={props.selectOption} onChange={(e) => props.setSelectOption(e.target.value)} className="form-control" required="required" >
                    <option value="doanhthu-year">Thống kê doanh thu theo năm</option>
                    <option value="doanhthu-month">Thống kê doanh thu theo tháng</option>
                    <option value="bill-year">Thống kê đơn hàng theo năm</option>
                    <option value="bill-month">Thống kê đơn hàng theo tháng</option>
                    <option value="product-year">Thống kê sản phẩm bán ra theo năm</option>
                    <option value="product-month">Thống kê sản phẩm bán ra theo tháng</option>
                </select>
            </div>

            {elmControl}


        </div>
    )
}

export default AdminStatisticalControl

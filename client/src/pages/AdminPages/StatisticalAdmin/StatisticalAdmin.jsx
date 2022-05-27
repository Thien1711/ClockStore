import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AdminStatisticalControl from "../../../components/AdminComponents/AdminStatisticalComponent/AdminStatisticalControl";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useEffect } from "react";
import { actBillMonthAdmin, actBillYearAdmin, actDoanhThuMonthAdmin, actDoanhThuYearAdmin, actProductMonthAdmin, actProductYearAdmin } from "../../../redux/actions/AdminStatisticalAction";


function StatisticalAdmin() {

    const AdminStatisticalReducer = useSelector(state => state.AdminStatisticalReducer);

    const [title, setTitle] = useState("Thống kê");
    const [elmContentPie, setElmContentPie] = useState(null)
    const [elmContentBar, setElmContentBar] = useState(null)
    const [elmContentLine, setElmContentLine] = useState(null)

    // const [yearData, setYearData] = useState()
    const [selectOption, setSelectOption] = useState('doanhthu-year')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actDoanhThuYearAdmin({ begin: (new Date().getFullYear())-12, end: new Date().getFullYear() }));
    }, [dispatch])

    useEffect(() => {
        // switch (selectOption) {
        //     case 'doanhthu-year':
        //         if (AdminStatisticalReducer.labels) {
        //             setElmContentPie(<Chart
        //                 type="pie"
        //                 data={AdminStatisticalReducer}
        //             />);
        //             setElmContentBar(<Chart
        //                 type="bar"
        //                 data={AdminStatisticalReducer}
        //             />);
        //             setElmContentLine(<Chart
        //                 type="line"
        //                 data={AdminStatisticalReducer}
        //             />);
        //         }
        //         else {
        //             setElmContentPie(null);
        //             setElmContentBar(null);
        //             setElmContentLine(null);
        //         }
        //         break;
        //     default:
        //         break;
        // }
        if (AdminStatisticalReducer.labels) {
            setElmContentPie(<Chart
                type="pie"
                data={AdminStatisticalReducer}
            />);
            setElmContentBar(<Chart
                type="bar"
                data={AdminStatisticalReducer}
            />);
            setElmContentLine(<Chart
                type="line"
                data={AdminStatisticalReducer}
            />);
        }

    }, [AdminStatisticalReducer])

    const submitLoc = (data) => {
        // console.log(selectOption)
        switch (selectOption) {
            case 'doanhthu-year':
                dispatch(actDoanhThuYearAdmin(data))
                break;
            case 'doanhthu-month':
                dispatch(actDoanhThuMonthAdmin(data))
                break;
            case 'bill-year':
                dispatch(actBillYearAdmin(data))
                break;
            case 'bill-month':
                dispatch(actBillMonthAdmin(data))
                break;
            case 'product-year':
                dispatch(actProductYearAdmin(data))
                break;
            case 'product-month':
                dispatch(actProductMonthAdmin(data))
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div>
                <h3 className="text-center mt-2">{title}</h3>
                <hr />
            </div>

            <AdminStatisticalControl submitLoc={submitLoc} selectOption={selectOption} setSelectOption={setSelectOption} />
            <div className="chart">
                {elmContentBar}

                <div className="row mt-5">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {elmContentLine}
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {/* <Chart
                            type="pie"
                            data={data}
                            options={{
                                title: {
                                    display: true,
                                    text: "Largest",
                                    fontSize: 25
                                },
                                legend: {
                                    display: true,
                                    position: "right"
                                }
                            }}
                        /> */}
                        {elmContentPie}
                    </div>
                </div>



            </div>
        </div>
    );
}

export default StatisticalAdmin;

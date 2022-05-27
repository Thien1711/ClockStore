import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Category from "../../../components/ShopComponents/ShopPageComponent/Category";
import ProductItem from "../../../components/ShopComponents/ShopPageComponent/ProductItem";
import ResultSearch from "../../../components/ShopComponents/ShopPageComponent/ResultSearch";
import ShopPaging from "../../../components/ShopComponents/ShopPageComponent/ShopPaging";
import Sort from "../../../components/ShopComponents/ShopPageComponent/Sort";
import { actGetProductShopPage } from "../../../redux/actions/ShopPageAction";

import './Shop.css'

function Shop(props) {

  const HeaderProductTypeReducer = useSelector(state => state.HeaderProductTypeReducer);
  const ShopPageReducer = useSelector(state => state.ShopPageReducer);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const [pageIndex, setPageIndex] = useState(1);
  const [lspId, setLspId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [machineId, setMachineId] = useState('');
  const [wireId, setWireId] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const [elmsProductList, setElmsProductList] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const utf8_from_str = (s) => {
    var temp = decodeURIComponent(s);
    temp = temp.split("+");
    temp = temp.join(" ");
    return temp;
  }

  useEffect(() => {
    setSearch('');
    setSort('name-asc');
    setPageIndex(1);
    setLspId('');
    setBranchId('');
    setMachineId('');
    setWireId('');
    setPriceFrom('');
    setPriceTo('');

    // console.log("location:", location);
    let IDLSP = parseInt(location.pathname.replace("/shop/", ""));
    if (IDLSP) {
      setLspId(IDLSP);
      setSearch('');
      if (HeaderProductTypeReducer.length > 0) {
        let temp = false;
        for (let index = 0; index < HeaderProductTypeReducer.length; index++) {
          if (HeaderProductTypeReducer[index].id === IDLSP) {
            temp = true;
            break;
          }
        }
        if (!temp) {
          navigate('/notfound');
        }
      }
    }
    else {
      // console.log(utf8_from_str(location.pathname.replace("/shop/", "")));
      setLspId('');
      setSearch(utf8_from_str(location.pathname.replace("/shop/", "")));
    }

    var { search } = location;

    if (search !== "") {
      var dauHoi = search.split('?');
      var dauVa = dauHoi[dauHoi.length - 1].split('&');
      var dauBang, value;
      for (let i = 0; i < dauVa.length; ++i) {
        dauBang = dauVa[i].split('=');
        switch (dauBang[0]) {
          case "sort":
            setSort(dauBang[1]);
            break;
          case "pageIndex":
            value = parseInt(dauBang[1]);
            if (value) {
              setPageIndex(value);
            }
            break;
          case "branchId":
            value = parseInt(dauBang[1]);
            if (value) {
              setBranchId(value);
            }
            break;
          case "machineId":
            value = parseInt(dauBang[1]);
            if (value) {
              setMachineId(value);
            }
            break;
          case "wireId":
            value = parseInt(dauBang[1]);
            if (value) {
              setWireId(value);
            }
            break;
          case "price":
            value = dauBang[1].split("-");
            let from, to;
            if (value.length >= 2) {
              from = parseInt(value[0]);
              to = parseInt(value[1]);

              if (from) {
                setPriceFrom(from);
              }

              if (to) {
                setPriceTo(to);
              }
            }
            else {
              value = parseInt(dauBang[1]);
              if (value) {
                setPriceFrom(value);
              }
              else {
                setPriceFrom(1);
              }
            }
            break;
          // case "search":
          //   setSearch(utf8_from_str(dauBang[1]));
          //   break;
          default:
            break;
        }
      }
    }
  }, [location, HeaderProductTypeReducer, navigate])

  useEffect(() => {
    var data = {
      lspId: ((lspId === '') ? -1 : lspId),
      branchId: ((branchId === '') ? -1 : branchId),
      machineId: ((machineId === '') ? -1 : machineId),
      wireId: ((wireId === '') ? -1 : wireId),
      priceFrom: ((priceFrom === '') ? -1 : priceFrom),
      priceTo: ((priceTo === '') ? -1 : priceTo),
      search: search,
      sort: sort,
      pageIndex: pageIndex
    }
    dispatch(actGetProductShopPage(data));
    console.log("dataSearch:", data)

  }, [lspId, branchId, wireId, machineId, search, sort, pageIndex, priceFrom, priceTo, dispatch])

  useEffect(() => {
    console.log(ShopPageReducer.products);
    var result = null;
    if (ShopPageReducer.products.listSP && ShopPageReducer.products.listSP.length > 0) {
      result = ShopPageReducer.products.listSP.map((item, index) => {
        return <ProductItem key={index} product={item} />
      })
    }
    setElmsProductList(result);
  }, [ShopPageReducer.products])

  // const changeSort = (value) => {
  //   navigate(value);
  // }

  return (
    <div>
      <div className="breacrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <Link to='/home'><i className="fa fa-home" /> Trang chủ</Link>
                <span>Cửa hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="product-shop spad">
        <div className="container">
          <div className="row">

            <Category products={ShopPageReducer.products}/>

            <div className="col-lg-9 order-1 order-lg-2">
              <div className="product-show-option">
                <div className="row">

                  <ResultSearch products={ShopPageReducer.products} />

                </div>

                <Sort products={ShopPageReducer.products}/>

              </div>
              <div className="product-list">
                <div className="row">
                  {elmsProductList}
                </div>
              </div>

              <ShopPaging products={ShopPageReducer.products} />

            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Shop;

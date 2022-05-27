import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../../components/ShopComponents/Footer/Footer'
import Header from '../../components/ShopComponents/Header/Header'
import './ShopLayout.css'

function ShopLayout() {
    return (
        <div>
            {/* <div id="preloder">
                <div className="loader" />
            </div> */}

            <Header />

            {/* <Shop /> */}
            <Outlet />

            <Footer />
        </div>
    )
}

export default ShopLayout

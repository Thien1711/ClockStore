import React from 'react'
import { Outlet } from 'react-router'
import AdminMenu from '../../components/AdminComponents/AdminMenu/AdminMenu'
import './AdminLayout.css'

function AdminLayout() {
    return (
        <div className='layout-admin'>
            <AdminMenu />

            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout

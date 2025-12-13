import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='w-[75%] m-auto bg-white border-l border-r border-slate-100 shadow-xl'>
      <Outlet />
    </div>
  )
}

export default AdminLayout
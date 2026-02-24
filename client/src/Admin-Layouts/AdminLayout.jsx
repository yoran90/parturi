import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='md:w-[85%] lg:w-[85%] xl:w-[75%] 2xl:w-[60%] m-auto bg-white border-l border-r border-slate-100 shadow-xl'>
      <Outlet />
    </div>
  )
}

export default AdminLayout
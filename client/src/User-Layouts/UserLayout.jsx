import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='md:w-[70%] m-auto bg-white border-l border-r border-slate-200 shadow-2xl'>
      <Outlet />
    </div>
  )
}

export default UserLayout
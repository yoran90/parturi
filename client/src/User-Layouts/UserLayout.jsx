import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='md:w-[80%] m-auto bg-white border-l border-r border-slate-100 shadow-xl'>
      <Outlet />
    </div>
  )
}

export default UserLayout
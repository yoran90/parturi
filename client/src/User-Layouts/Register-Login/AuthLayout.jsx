import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='md:w-[70%] m-auto border-l border-r border-slate-50 shadow-xl'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
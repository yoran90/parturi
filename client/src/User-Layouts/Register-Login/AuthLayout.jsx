import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='md:w-[85%] lg:w-[85%] xl:w-[75%] 2xl:w-[70%] m-auto min-h-screen border-l border-r border-slate-50 shadow-xl'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {




  return (
    <div className='md:w-[85%] lg:w-[85%] xl:w-[75%] 2xl:w-[70%] m-auto min-h-screen bg-white text-black border-l border-r border-slate-200 shadow-2xl'>
      <Outlet />
    </div>
  )
}

export default UserLayout
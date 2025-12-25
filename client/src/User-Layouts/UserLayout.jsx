import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add('dark');
    }
  }, []);



  return (
    <div className='md:w-[78%] m-auto min-h-screen bg-white text-black dark:bg-black dark:text-white border-l border-r border-slate-200 shadow-2xl'>
      <Outlet />
    </div>
  )
}

export default UserLayout
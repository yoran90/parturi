import React from 'react'
import { HiMenu } from "react-icons/hi";

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className='shadow bg-white py-3.5 pr-3 md:pl-2 flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">
          <HiMenu size={25} />
        </button>
        <p className='text-red-600 text-sm font-semibold'>Welcome to admin page</p>
      </div>
      <button className='bg-red-500 text-white py-1 px-4 rounded-full text-sm'>Logout</button>
    </div>
  )
}

export default Header
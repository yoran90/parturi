import React from 'react'
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../store/admin-auth';
import { TbLogout } from "react-icons/tb";
import { FaUser } from 'react-icons/fa';

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {

  const { admin } = useSelector((state) => state.adminAuth);
  console.log(admin);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
  try {
    dispatch(adminLogout())
    navigate('/login');
  } catch (err) {
    console.error("Logout failed", err);
  }
}


  return (
    <div className='shadow bg-white border-b py-4.5 border-slate-300 pr-3 md:pl-2 flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">
          <HiMenu size={25} />
        </button>
        <p className='text-red-600 text-sm font-semibold'>Welcome to admin page</p>
      </div>
      <div className='flex gap-2.5 items-center justify-center'>
        <Link to={'/admin/myaccount'} className='flex items-center gap-1 text-sm cursor-pointer'>
          <FaUser />
          <p>{admin?.firstName}</p>
        </Link>
        <button onClick={handleLogout} className='bg-red-500 text-white py-1 px-4 rounded-full text-sm cursor-pointer flex items-center gap-1'>
          Logout
          <TbLogout />
        </button>
      </div>
    </div>
  )
}

export default Header
import React, { useEffect, useRef, useState } from 'react'
import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../store/admin-auth';
import { TbLogout } from "react-icons/tb";
import { FaUser } from 'react-icons/fa';

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {

  const { admin } = useSelector((state) => state.adminAuth);
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => {
    setOpenModel(!openModel);
  }

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenModel(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  

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
    <div ref={menuRef} className='shadow sticky top-0 bg-white border-b py-3 border-slate-300 pr-3 md:pl-2 flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 rounded hover:bg-gray-100">
          <HiMenu size={25} />
        </button>
        <p className='text-red-600 text-sm font-semibold md:block hidden'>Welcome to admin page</p>
      </div>
      <div className='flex mr-4 relative'>
        <button onClick={handleOpenModel} className='flex items-center gap-1 text-sm cursor-pointer border-2 border-slate-400 p-2 rounded-full'>
          <FaUser size={20} className='text-slate-500' />
        </button> 
        <div className={`${openModel ? "block" : "hidden"} absolute top-13.5 w-[300px] right-0 bg-white border border-slate-100 py-5 px-8 flex flex-col gap-4 rounded shadow-lg z-10`}>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between mb-4'>
              <Link to={'/admin/myaccount'} onClick={handleOpenModel} className='flex gap-1 items-center'>
                {
                  admin?.profileImage?.url ? (
                    <img className='w-6 h-6 border rounded-full' src={admin?.profileImage} alt="" />
                  ) : (
                    admin?.gender === 'men' ? (
                      <img className='w-6 h-6 rounded-full border ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                    ) : (
                      <img className='w-6 h-6  rounded-full border' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                    )
                  )
                }
                <h2>My Account</h2>
              </Link>
              <div className='bg-green-500 py-1 px-2 rounded text-white text-xs'>{admin?.role}</div>
            </div>
            <h3 className='text-slate-600'>👤 {admin?.firstName} {admin?.lastName}</h3>
            <p className='text-sm text-slate-400'>📧 {admin?.email}</p>
          </div>
          <hr className='text-slate-300' />
          <button onClick={handleLogout} className='bg-red-500 text-white py-1 px-4 rounded-full text-sm cursor-pointer flex items-center justify-center gap-1'>
            Logout
            <TbLogout />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
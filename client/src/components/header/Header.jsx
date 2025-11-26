import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuMenu } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import useHeaderLogo from '../../hooks/useHeaderLogo';
import { TbLogout } from "react-icons/tb";
import { FaUserLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
import { userLogout } from '../../store/user-auth';
import { toast } from 'react-toastify';










const Header = () => {


  const { isAuthenticated, user, loading } = useSelector((state) => state.userAuth);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);


  const { headerLogo } = useHeaderLogo();
 

  const [showTheHeader, setShowTheHeader] = useState(false)
  const clickTheMenuShowHeader = () => {
    setShowTheHeader(!showTheHeader)
  }
 

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/kirjaudu');
    toast.success("Logged out successfully!");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="loader"></div>
        <style>{`
          .loader {
            border: 4px solid #ddd;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }



  return (
    <>
      <div ref={menuRef} className='md:flex sticky top-0 hidden items-center justify-between bg-black border-t-2 border-slate-800 z-50'>
        <div className='bg-black p-2'> 
          <img src={headerLogo?.url} alt="Header Logo" className='w-10 h-10 rounded-full border border-slate-500 ml-4' />
        </div>
        <div className='flex justify-end'>
          <Link to={`/`}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Etusivu</button>
          </Link>
          <Link to={'/meistä'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Meistä</button>
          </Link>
          <Link to={'/palvelut'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Palvelut</button>
          </Link>
          <Link to={'/galleria'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Galleria</button>
          </Link>
          <Link to={'/tuotet'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Tuote</button>
          </Link>
          <Link to={'/yhteystiedot'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Yhteystiedot</button>
          </Link>
          {
            user ? (
              <div ref={menuRef} className='ml-4 mr-2 relative z-50'>
                <button className='cursor-pointer' onClick={handleOpenUserMenu}>
                  {
                    user?.profileImage?.url ? (
                      <img className='w-8.5 h-8.5 border border-slate-100 rounded-full' src={user?.profileImage?.url} alt="" />
                    ) : (
                      user?.gender === 'men' ? (
                        <img className='w-8.5 h-8.5 rounded-full border border-slate-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-8.5 h-8.5  rounded-full border border-slate-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                </button>
                <div className={`${openUserMenu ? 'block' : 'hidden'} absolute w-[300px] top-10 right-0 mt-2 bg-white rounded shadow-lg border border-slate-300`}>
                  {
                    openUserMenu && (
                      <div className='py-2 px-2'>
                        <Link to={`/profile`} className='flex flex-col items-center justify-center py-4'>
                          {
                            user?.profileImage?.url ? (
                              <img className='w-10 h-10 border border-slate-400 rounded-full' src={user?.profileImage?.url} alt="" />
                            ) : (
                              user?.gender === 'men' ? (
                                <img className='w-10 h-10 rounded-full border border-slate-400 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                              ) : (
                                <img className='w-10 h-10  rounded-full border border-slate-400' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                              )
                            )
                          }
                          <h4 className='text-sm text-slate-700 mt-1'>{user?.firstName} </h4>
                        </Link>
                        <div className='flex flex-col gap-1.5'>
                          <p className='text-slate-500 text-sm'>👤 {user?.firstName} {user?.lastName}</p>
                          <p className='text-sm text-slate-500'>📧 {user?.email}</p>
                        </div>
                        <hr className='text-slate-400 mt-2 mb-2' />
                        <button onClick={handleLogout} className='bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 py-1 w-full text-white tex-sm mt-2 px-2 cursor-pointer rounded'>
                          Lougout
                          <TbLogout className='text-md' />
                        </button>
                      </div>
                    )
                  }
                  
                </div>
              </div>
            ) : (
              <>
               <div className='flex items-center ml-4 gap-1.5'>
                <Link to={'/kirjaudu'}>
                  <button  className='text-black bg-white/90 hover:bg-white flex items-center gap-1 border border-slate-300 justify-center cursor-pointer text-xs px-3 py-1.5 rounded-full'>
                    {/* <FaUser /> */}
                    kirjautu
                  </button>
                </Link>
                <Link to={'/register'}>
                  <button className='flex items-center gap-1 border border-slate-300 hover:bg-slate-900 text-white justify-center cursor-pointer text-xs px-3 py-1.5 rounded-full'>
                    {/* <FaUserLock  /> */}
                    rekisteröidy
                  </button>
                </Link>
              </div>
              </>
            )
          }
          
        </div>
      </div>
      {/* for mobile screen */}
      <div className='md:hidden sticky top-0 z-50 flex items-center justify-between bg-black border-t-2 border-slate-800'>
        <div className='bg-black p-2'> 
          <img src={headerLogo?.url} alt="Header Logo" className='w-10 h-10 rounded-full border border-slate-500 ml-4' />
        </div>
        <div className='text-white pr-4.5'>
          {
            showTheHeader && <CgClose onClick={clickTheMenuShowHeader} className='text-white' size={25} /> 
          }
          {
            !showTheHeader && <LuMenu onClick={clickTheMenuShowHeader} className='text-white' size={25} />
          }
        </div>
        <div className={`${showTheHeader ? 'absolute flex flex-col bg-black z-50 top-14 right-0 w-full pl-3.5 py-6' : 'hidden'}`}>
          <Link to={'/'}>
            <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Etusivu</button>
          </Link>
          <Link to={'/meistä'}>
            <button className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Meistä</button>
          </Link>
          <Link to={'/palvelut'}>
            <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Palvelut</button>
          </Link>
          <Link to={'/galaria'}>
            <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Galleria</button>
          </Link>
          <Link to={'/tuotet'}>
            <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Tuote</button>
          </Link>
          <Link to={'/yhteystiedot'}>
            <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-sm p-2 hover:bg-slate-800'>Yhteystiedot</button>
          </Link>
          {
            user ? (
              <div className='ml-4 mr-2 mt-2'>
                <Link to={'/profile'} className='cursor-pointer flex flex-col items-center gap-2'>
                  {
                    user?.profileImage?.url ? (
                      <img className='w-8.5 h-8.5 border border-slate-100 rounded-full' src={user?.profileImage?.url} alt="" />
                    ) : (
                      user?.gender === 'men' ? (
                        <img className='w-8.5 h-8.5 rounded-full border border-slate-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-8.5 h-8.5  rounded-full border border-slate-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                  <p className='text-white'>{user?.firstName} {user?.lastName}</p>
                </Link>
              </div>
            ) : (
              <>
               <div className='flex flex-col'>
                  <Link to={'/kirjaudu'}>
                    <button  className='text-blue-400 flex items-center gap-1 -mr-1 justify-center cursor-pointer text-sm p-2 hover:text-blue-300'>
                      {/* <FaUser /> */}
                      kirjautu
                    </button>
                  </Link>
                  <Link to={'/register'}>
                    <button className='flex items-center gap-1 justify-center cursor-pointer p-2 text-red-400 text-sm hover:text-red-800'>
                      {/* <FaUserLock  /> */}
                      rekisteröidy
                    </button>
                  </Link>
                </div>
              </>
            )
          }
          
        </div>
      </div>
    </>
  )
}

export default Header
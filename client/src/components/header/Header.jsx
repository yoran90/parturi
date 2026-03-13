import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LuMenu } from "react-icons/lu";
import { FcAbout } from "react-icons/fc";
import useHeaderLogo from '../../hooks/useHeaderLogo';
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
import { getNotifications, markNotificationAsRead, userLogout } from '../../store/user-auth';
import { toast } from 'react-toastify';
import { IoLogoInstagram, IoMdNotifications } from "react-icons/io";
import { CgPlayListRemove } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { FaFacebookF, FaHome, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { IoIosImages } from "react-icons/io";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdReviews } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import useInformation from '../../hooks/useInformation';







const Header = () => {
  
  const { user, userNotifications, loading } = useSelector((state) => state.userAuth);
  const { getInformation } = useInformation();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState(null);

  

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = () => {
    setOpenUserMenu(!openUserMenu);
  };

  useEffect(() => {
  if (user) {
    dispatch(getNotifications());
  }
}, [user]);


  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id)).then(() => {
      dispatch(getNotifications());
    })
  }

 const handleNotificationClick = (notification) => {
  let targetId = null;

  if (notification.type === "like") {
    targetId = notification.reviewId?._id;
  }

  if (notification.type === "comment") {
    targetId = notification.commentId; // already string
  }

  if (notification.type === "reply") {

    targetId = notification.commentId;
  }

  navigate(`/opinion?scrollTo=${targetId}`);
};


  const unreadCount = userNotifications?.notifications?.filter(n => !n.isRead).length || 0;

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
    // Clear localStorage immediately to avoid stale token on refresh
    localStorage.removeItem("userToken");
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
      <div ref={menuRef} className='md:flex sticky top-0 p-2 hidden items-center justify-between bg-white dark:bg-black dark:text-white text-black border-t-2 border-b-2  border-slate-800 z-50'>
        <div className='bg-white dark:bg-black'>
          {headerLogo && headerLogo.url && (
            <Link to={'/'}>
              <img src={headerLogo?.url} alt="Header Logo" className='w-12 h-12 rounded-full border border-slate-500 ml-4' />
            </Link>
          )}
          
        </div>
        <div className='flex justify-end px-4.5'>
          <NavLink to={`/`} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Etusivu
          </NavLink>
          <NavLink to={'/meista'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Meistä
          </NavLink>
          <NavLink to={'/palvelut'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Palvelut
          </NavLink>
          <NavLink to={'/galleria'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
           Galleria
          </NavLink>
          <NavLink to={'/tuotet'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Tuote
          </NavLink>
          <NavLink to={'/opinion'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Mielipide
          </NavLink>
          <NavLink to={'/yhteystiedot'} className={({ isActive}) => `${isActive ? 'border-b-2 border-blue-500' : ''} text-black dark:text-white cursor-pointer text-[13px] font-medium p-2 hover:border-slate-400 hover:border-b-2`}>
            Yhteystiedot
          </NavLink>
          <div className='flex relative items-center  justify-center'>
            {
              user && (
                <div className='relative mr-4 ml-1'>
                  {
                    unreadCount > 0 && (
                      <span className='absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center text-center font-semibold justify-center text-[11px]'>{unreadCount}</span>
                    )
                  }
                  <button type='button' className='cursor-pointer' onClick={() => toggleNotifications()}><IoMdNotifications size={23} /></button>
                </div>
              )
            }
            
          </div>
          <div className={`absolute right-20 mt-13 rounded-b w-96 h-[93vh] overflow-y-scroll scrollbarStyle bg-white border border-slate-200 overflow-hidden text-slate-800 shadow-lg z-50 ${showNotifications ? 'block' : 'hidden'}`}>
              {userNotifications?.notifications?.length === 0 ? (
                <p className="p-4 text-sm text-red-500 text-center">Ei ilmoituksia 🔔</p>
              ) : (
                userNotifications?.notifications?.map(n => (
                  <div onClick={() => handleNotificationClick(n)} key={n._id} className={`p-2 border-b cursor-pointer ${n.isRead ? 'bg-gray-100' : 'bg-white'}`}>
                    <div className='flex items-center mb-1'>
                      <div>
                        {n.sender?.profileImage?.url ? (
                          <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src={n.sender.profileImage.url} alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                        ) : (
                          n.sender?.gender === 'men' ? (
                            <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                          ) : (
                            <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                          )
                        )}
                      </div>
                      <div className='flex flex-col '>
                        <div className="text-sm flex items-center gap-1">{`${n.sender?.firstName} ${n.sender.lastName}`} <p className='text-red-600'>{`${n.type}`}</p> your review</div>
                        <small className='text-[11px] text-slate-700'>{new Date(n.createdAt).toLocaleString()}</small>
                      </div>
                    </div>
                    <p className='text-xs line-clamp-1 ml-11.25 mb-1'>{n?.reviewId?.reviewText}</p>
                    {!n.isRead && (
                      <div className='flex items-end justify-end'>
                        <button className="text-xs text-blue-500 flex items-center gap-0.5" onClick={() => handleMarkAsRead(n._id)}>
                          Merkitse luetuksi
                          <CgPlayListRemove size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          {
            user ? (
              <div ref={menuRef} className=' mr-2 relative z-50'>
                <button className='cursor-pointer' onClick={handleOpenUserMenu}>
                  {
                    user?.profileImage?.url ? (
                      <img className='w-7.5 h-7.5 border border-slate-100 rounded-full' src={user?.profileImage?.url} alt="" />
                    ) : (
                      user?.gender === 'men' ? (
                        <img className='w-7.5 h-7.5 rounded-full border border-slate-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-7.5 h-7.5  rounded-full border border-slate-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                  
                </button>
                <div className={`${openUserMenu ? 'block' : 'hidden'} absolute w-75 top-10 right-0 mt-2 bg-white rounded shadow-lg border border-slate-300`}>
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
               <div className='flex items-center ml-4 gap-1.5 mb-1'>
                <Link to={'/kirjaudu'}>
                  <button  className='text-black bg-white/90 hover:bg-white flex items-center gap-1 border border-slate-300 justify-center cursor-pointer text-xs px-3 py-[5px] rounded-full'>
                    {/* <FaUser /> */}
                    Kirjaudu
                  </button>
                </Link>
                <Link to={'/register'}>
                  <button className='flex items-center gap-1 border border-slate-300 hover:bg-slate-900 text-white justify-center cursor-pointer text-xs px-3 py-[5.5px] rounded-full'>
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
        <Link to={'/'} className='bg-black p-2'> 
          <img src={headerLogo?.url} alt="Header Logo" className='w-10 h-10 rounded-full border border-slate-500 ml-4' />
        </Link>
        <div className='flex relative items-center justify-center'>
          <div className='flex items-center ml-2 mr-3 mt-2 justify-center'>
            {
              user && (
                <div className='relative'>
                  {
                    unreadCount > 0 && (
                      <span className='absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-4.5 h-4.5 flex items-center text-center font-semibold justify-center text-[11px]'>{unreadCount}</span>
                    )
                  }
                  <button type='button' className='cursor-pointer text-white' onClick={() => toggleNotifications()}><IoMdNotifications size={23} /></button>
                </div>
              )
            }
            
          </div>
          <div className='text-white pr-4.5'>
            {/* {
              showTheHeader && <CgClose onClick={clickTheMenuShowHeader} className='text-white' size={25} /> 
            } */}
            {
              !showTheHeader && <LuMenu onClick={clickTheMenuShowHeader} className='text-white' size={25} />
            }
          </div>
        
        </div>
        <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 ${showNotifications ? 'block' : 'hidden'}`}>
          <div className="w-full max-h-screen bg-white overflow-y-auto shadow-lg scrollbarStyle">
            <div className='flex p-4 border-b border-slate-500 justify-between'>
              <h3 className="text-md font-semibold text-slate-600">🔔 Ilmoitukset</h3>
              <button className="text-xs text-red-600 cursor-pointer" onClick={() => toggleNotifications()}>Sulje</button>
            </div>
            {userNotifications?.notifications?.length === 0 ? (
              <p className="p-4 text-sm text-red-500 text-center">Ei ilmoituksia 🔔</p>
            ) : (
              userNotifications?.notifications?.map(n => (
                <div onClick={() => {
                    handleMarkAsRead(n._id); 
                    handleNotificationClick(n); 
                    toggleNotifications();    
                  }} key={n._id} className={`p-4 border-b ${n.isRead ? 'bg-gray-100' : 'bg-white'}`}>
                                  <div className='flex items-center mb-1'>
                      <div>
                        {n.sender?.profileImage?.url ? (
                          <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src={n.sender.profileImage.url} alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                        ) : (
                          n.sender?.gender === 'men' ? (
                            <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                          ) : (
                            <img className='w-9 h-9 rounded-full border border-slate-300 inline-block mr-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt={`${n.sender.firstName} ${n.sender.lastName}`} />
                          )
                        )}
                      </div>
                      <div className='flex flex-col '>
                        <div className="text-sm flex items-center gap-1">{`${n.sender?.firstName} ${n.sender.lastName}`} <p className='text-red-600'>{`${n.type}`}</p> your review</div>
                        <small className='text-[11px] text-slate-700'>{new Date(n.createdAt).toLocaleString()}</small>
                      </div>
                    </div>
                    <p className='text-xs line-clamp-1 ml-11.25 mb-1'>{n?.reviewId?.reviewText}</p>
                    {!n.isRead && (
                      <div className='flex items-end justify-end'>
                        <button className="text-xs text-blue-500 flex items-center gap-0.5" onClick={() => handleMarkAsRead(n._id)}>
                          Merkitse luetuksi
                          <CgPlayListRemove size={18} />
                        </button>
                      </div>
                    )}
                </div>
              ))
            )}

          </div>
        </div>
        <div
          className={`
            bg-black/95 fixed top-0 left-0 bottom-0 z-50 flex flex-col w-full border-r border-slate-700
            transform transition-transform duration-300 ease-in-out
            ${showTheHeader 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full opacity-0 pointer-events-none'}
          `}
        >
          <div className=' relative w-full'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtyb9KiIO6XRBm-kdpfP3m9EcIJGN1k9DEw&s" alt='razor' className='w-full h-48' />
            <button>
              <IoClose onClick={clickTheMenuShowHeader} className='text-white absolute top-4 right-4 cursor-pointer' size={22} />
            </button>
          </div>
          <div className='flex flex-col gap-1.5 ml-4 mt-2'>
            <NavLink to={'/'} className={'flex items-center gap-2.5'}>
              <FaHome className='text-white' size={17} />
              <button onClick={clickTheMenuShowHeader} className='text-white mt-0.5 cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Etusivu</button>
            </NavLink>
            <NavLink to={'/meista'} className={'flex items-center gap-2.5'}>
              <FcAbout className='text-white' size={18} />
              <button className='text-white cursor-pointer text-sm p-2 mt-0.5 hover:bg-slate-800'>Meistä</button>
            </NavLink>
            <NavLink to={'/palvelut'} className={'flex items-center gap-2.5'}>
              <IoIosPricetags  className='text-white' size={17} />
              <button onClick={clickTheMenuShowHeader} className='text-white mt-0.5 cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Palvelut</button>
            </NavLink>
            <NavLink to={'/galleria'} className={'flex items-center gap-2.5'}>
              <IoIosImages className='text-white' size={17} />
              <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Galleria</button>
            </NavLink>
            <NavLink to={'/tuotet'} className={'flex items-center gap-2.5'}>
              <BiSolidShoppingBags className='text-white' size={17} />
              <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Tuote</button>
            </NavLink>
            <NavLink to={'/opinion'} className={'flex items-center gap-2.5'}>
              <MdReviews  className='text-white' size={17} />
              <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Mielipide</button>
            </NavLink>
            <NavLink to={'/yhteystiedot'} className={'flex items-center gap-2.5'}>
              <MdContactPhone   className='text-white' size={16} />
              <button onClick={clickTheMenuShowHeader} className='text-white cursor-pointer text-[13px] font-medium p-2 hover:bg-slate-800'>Yhteystiedot</button>
            </NavLink>
            <hr className='text-slate-800 mt-4 mb-4 mr-2' />
            {
              user ? (
                <div className='mt-2'>
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
                  <button onClick={handleLogout} className='flex items-center justify-center gap-2 py-1 w-full text-red-400 tex-sm mt-2 px-2 cursor-pointer rounded'>
                    Lougout
                    <TbLogout className='text-md' />
                  </button>
                </div>
              ) : (
                <>
                <div className='flex flex-col'>
                    <Link to={'/kirjaudu'}>
                      <button  className='text-blue-400 flex items-center gap-2.5 py-2 justify-center cursor-pointer text-sm  hover:text-blue-300'>
                        <AiOutlineLogin  size={18} />
                        Kirjaudu
                      </button>
                    </Link>
                    <Link to={'/register'}>
                      <button className='flex items-center gap-2.5 justify-center cursor-pointer py-2 text-red-400 text-sm hover:text-red-800'>
                        <FaUserPlus  size={18} />
                        rekisteröidy
                      </button>
                    </Link>
                  </div>
                </>
              )
            }
            
          </div>
          <hr className='text-slate-700 mt-8 mr-4 ml-4' />

          <div className='flex items-center gap-4 absolute bottom-12  justify-center w-full'>
          {
            getInformation?.socialMedia?.map((sm, index) => (
              <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 text-white border rounded-full p-1' size={22}  />}
                {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 border text-white rounded-full p-1'  size={22} />}
                {sm.platform === "tiktok" && <FaTiktok className='bg-white text-black border border-slate-50 rounded-full p-1'  size={22} />}
                {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 border rounded-full p-1'  size={22} />}
                {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 border rounded-full p-1'  size={22} />}
                {sm.platform === "youtube" && <FaYoutube className='bg-red-600 border rounded-full p-1'  size={22} />}
              </a>
            ))
          }
        </div>
          <div className='absolute bottom-2 w-full text-center text-slate-400 text-xs px-2'>
            <p className='flex items-center gap-1.5 justify-center text-center'>
              Razor Parturi <GiRazor /> Tyylisi meidän käsiimme
            </p>
          </div>
          
  
        </div>
        
      </div>
    </>
  )
}

export default Header
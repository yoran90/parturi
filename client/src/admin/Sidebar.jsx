import React from 'react'

import { MdLibraryAdd } from "react-icons/md";
import { FaPhotoVideo, FaUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImDisplay } from "react-icons/im";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";
import { MdOutlineImageSearch } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { CgDisplayFullwidth } from "react-icons/cg";
import { MdAddToHomeScreen } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { AiFillFileAdd } from "react-icons/ai";
import { RiApps2AddFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { MdReviews } from "react-icons/md";
import { FcFeedback } from "react-icons/fc";





const adminSidebarMenuItems = [
  {
    id: 'myaccount',
    label: (<div className='flex flex-col'>My Account </div>),
    path: '/admin/myaccount',
    icons: <FaUser size={16} />
  },
  {
    id: 'allusers',
    label: (<div className='flex flex-col'>All Users </div>),
    path: '/admin/allusers',
    icons: <FaUsers  size={18} />,
    role: ["super-admin"]
  },
  {
    id: 'allreviews',
    label: (<div className='flex flex-col'>All Reviews </div>),
    path: '/admin/allreviews',
    icons: <MdReviews   size={18} />,
  },
  {
    id: 'addreviews',
    label: (<div className='flex flex-col'>Add Shop Reviews </div>),
    path: '/admin/addreviews',
    icons: <RiApps2AddFill    size={18} />,
  },
  {
    id: 'information',
    label: (<div className='flex flex-col'>Information </div>),
    path: '/admin/addinformation',
    icons: <MdLibraryAdd size={18} />
  },
  {
    id: 'imagevideo',
    label: (<div className='flex flex-col'>Video & Images </div>),
    path: '/admin/imagevideo',
    icons: <FaPhotoVideo size={18} />
  },
  {
    id: 'imagevideoDisplay',
    label: (<div className='flex flex-col'>Video & Images Display </div>),
    path: '/admin/imagevideoDisplay',
    icons: <ImDisplay size={18} />
  },
  {
    id: 'addprice',
    label: (<div className='flex flex-col'>Add Price </div>),
    path: '/admin/addprice',
    icons: <FaMoneyCheckDollar size={18}  />
  },
  {
    id: 'addgalleri',
    label: (<div className='flex flex-col'>Add Galleri Image </div>),
    path: '/admin/galleri',
    icons: <FcGallery size={18}   />
  },
  {
    id: 'displaygalleri',
    label: (<div className='flex flex-col'>Display Gallary Image </div>),
    path: '/admin/displayGalleri',
    icons: <MdOutlineImageSearch size={18} />
  },
  {
    id: 'addproduct',
    label: (<div className='flex flex-col'>Add Product </div>),
    path: '/admin/addProduct',
    icons: <AiFillProduct size={18} />
  },
  {
    id: 'displayproduct',
    label: (<div className='flex flex-col'>Display Product </div>),
    path: '/admin/displayProduct',
    icons: <CgDisplayFullwidth size={18} />
  },
  {
    id: 'addheaderlogo',
    label: (<div className='flex flex-col'>Header Logo </div>),
    path: '/admin/addheaderlogo',
    icons: <MdAddToHomeScreen size={18} />
  },
  {
    id: 'addaboutus',
    label: (<div className='flex flex-col'>Add About Us </div>),
    path: '/admin/addaboutus',
    icons: <FcAbout size={18} />
  },
  {
    id: 'titleforPages',
    label: (<div className='flex flex-col'>Add (Title & Des) For Pages </div>),
    path: '/admin/titleforPages',
    icons: <AiFillFileAdd className='text-gray-500'  size={20} />
  },
  {
    id: 'displayFeedback',
    label: (<div className='flex flex-col'>Display Feedback </div>),
    path: '/admin/displayFeedback',
    icons: <FcFeedback className='text-gray-500'  size={20} />
  }
]

const Sidebar = ({ isOpen, setIsOpen }) => {

  const { admin } = useSelector(state => state.adminAuth);

  const navigate = useNavigate();
  const loacation = useLocation();

  return (
    <>
      {isOpen && (
        <div
          data-testid="sidebar-overlay"  //! <- use it for testing only
          className="fixed inset-0 bg-black/80 bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
          className={`bg-white shadow h-screen border-r border-slate-200 transform overflow-y-scroll scrollbarStyle scrollbarStyle transition-transform duration-300 fixed top-0 left-0 z-50 w-[80%] 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:static md:block md:w-[32%]`}
      >
        <div className='pt-6 bg-white sticky top-0'>
          <div className='md:flex px-4 flex md:px-0 justify-between gap-1.5 font-semibold text-red-600 items-center md:justify-center '>
            <div className='flex items-center gap-2'>
              <GrUserAdmin size={20} />
              <Link to={'/admin'}>Admin Pannel</Link>
            </div>
            <div className='md:hidden flex'>
              <button className='text-xs' onClick={() => setIsOpen(false)}>❌</button>
            </div>
          </div>
          <hr className='text-slate-300 mb-4 mt-4' />
        </div>
        {
          adminSidebarMenuItems.filter(item => !item.role || item.role.includes(admin?.role)) .map((menuItem) => {
            const isActive = loacation.pathname === menuItem.path;
            return (
              <div key={menuItem.id} onClick={() => {navigate(menuItem.path), setIsOpen(false)}} className={`${isActive ? 'bg-slate-100' : ''} flex items-center justify-between py-3.5 px-5 hover:bg-slate-100 cursor-pointer`}>
                <div className='flex items-center text-[14px] gap-4 text-gray-900'>
                  {menuItem.icons}
                  <span>{menuItem.label}</span> 
                </div>
              </div>
            )
          })
        }
        
      </div>
    </>
  )
}

export default Sidebar
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
import { RiPagesLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { useSelector } from 'react-redux';





const adminSidebarMenuItems = [
  {
    id: 'myaccount',
    label: (<div className='flex flex-col'>My Account <small className='text-[10px] flex items-center gap-0.5 text-red-600'><MdLibraryAdd /> Here you can handle your account</small></div>),
    path: '/admin/myaccount',
    icons: <FaUser size={20} />
  },
  {
    id: 'allusers',
    label: (<div className='flex flex-col'>All Users <small className='text-[10px] flex items-center gap-0.5 text-red-600'><MdLibraryAdd /> Here you can handle all users</small></div>),
    path: '/admin/allusers',
    icons: <FaUsers  size={20} />,
    role: ["super-admin"]
  },
  {
    id: 'information',
    label: (<div className='flex flex-col'>Information <small className='text-[10px] flex items-center gap-0.5 text-red-600'><MdLibraryAdd /> Address,phone, opening hours</small></div>),
    path: '/admin/addinformation',
    icons: <MdLibraryAdd size={20} />
  },
  {
    id: 'imagevideo',
    label: (<div className='flex flex-col'>Video & Images <small className='text-[10px] flex items-center gap-0.5 text-red-600'><MdLibraryAdd /> Add for home videos and images</small></div>),
    path: '/admin/imagevideo',
    icons: <FaPhotoVideo size={20} />
  },
  {
    id: 'imagevideoDisplay',
    label: (<div className='flex flex-col'>Video & Images Display <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here show all videos and images</small></div>),
    path: '/admin/imagevideoDisplay',
    icons: <ImDisplay size={20} />
  },
  {
    id: 'addprice',
    label: (<div className='flex flex-col'>Add Price <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can add prices</small></div>),
    path: '/admin/addprice',
    icons: <FaMoneyCheckDollar size={20}  />
  },
  {
    id: 'addgalleri',
    label: (<div className='flex flex-col'>Add Galleri Image <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can add galleri image</small></div>),
    path: '/admin/galleri',
    icons: <FcGallery size={20}   />
  },
  {
    id: 'displaygalleri',
    label: (<div className='flex flex-col'>Display Gallary Image <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can see all galleray image</small></div>),
    path: '/admin/displayGalleri',
    icons: <MdOutlineImageSearch size={20} />
  },
  {
    id: 'addproduct',
    label: (<div className='flex flex-col'>Add Product <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can add product</small></div>),
    path: '/admin/addProduct',
    icons: <AiFillProduct size={20} />
  },
  {
    id: 'displayproduct',
    label: (<div className='flex flex-col'>Display Product <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can see all product</small></div>),
    path: '/admin/displayProduct',
    icons: <CgDisplayFullwidth size={20} />
  },
  {
    id: 'addheaderlogo',
    label: (<div className='flex flex-col'>Header Logo <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can handle header logo</small></div>),
    path: '/admin/addheaderlogo',
    icons: <MdAddToHomeScreen size={20} />
  },
  {
    id: 'addaboutus',
    label: (<div className='flex flex-col'>Add About Us <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can handle about us</small></div>),
    path: '/admin/addaboutus',
    icons: <FcAbout size={20} />
  },
  {
    id: 'titleforPages',
    label: (<div className='flex flex-col'>Add Title & Description For Pages <small className='text-[10px] flex items-center gap-0.5 text-red-600'>Here you can handle about us</small></div>),
    path: '/admin/titleforPages',
    icons: <AiFillFileAdd className='text-gray-500'  size={20} />
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
          className="fixed inset-0 bg-black/80 bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
          className={`bg-white shadow h-screen border-r border-slate-200 transform overflow-y-scroll scrollbarStyle scrollbarStyle transition-transform duration-300 fixed top-0 left-0 z-50 w-[90%] 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:static md:block md:w-[28%]`}
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
              <div key={menuItem.id} onClick={() => {navigate(menuItem.path), setIsOpen(false)}} className={`${isActive ? 'bg-slate-100' : ''} flex items-center justify-between py-3 px-5 hover:bg-slate-100 cursor-pointer`}>
                <div className='flex items-center text-[14px] gap-3 text-gray-900'>
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
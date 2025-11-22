import React, { useState } from 'react'
import headerLogo from '../../assets/header-logo-2.avif'
import { Link } from 'react-router-dom'
import { LuMenu } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import useHeaderLogo from '../../hooks/useHeaderLogo';











const Header = () => {


  const { headerLogo } = useHeaderLogo();
 

  const [showTheHeader, setShowTheHeader] = useState(false)
  const clickTheMenuShowHeader = () => {
    setShowTheHeader(!showTheHeader)
  }
 




  return (
    <>
      <div className='md:flex sticky top-0 hidden items-center justify-between bg-black border-t-2 border-slate-800'>
        <div className='bg-black p-2'> 
          <img src={headerLogo?.url} alt="Header Logo" className='w-10 h-10 rounded-full border border-slate-500 ml-4' />
        </div>
        <div className='pr-10'>
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
        </div>
      </div>
    </>
  )
}

export default Header
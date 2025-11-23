import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { enUser, fiUser } from '../languages/loginTranslations'
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Flag from 'react-world-flags';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Kirjaudu = () => {

  //const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const translate = language === "fi" ? fiUser : enUser;

  const dispatch = useDispatch();
  const navigate = useNavigate();



  /* useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "user") {
        navigate("/");
      } else {
        navigate("/unauth-page");
      }
    }
  }, [isAuthenticated, user, navigate]); */

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  }


  return (
     <div className='w-full flex flex-col justify-center h-screen bg-slate-800'>
      <div className='md:w-[45%] w-[95%] m-auto'>
        <div className='md:flex md:justify-between'>
          <div className='flex flex-col gap-1 mb-8'>
            <h2 className='text-white'>🌍 {translate.welcomeuser}</h2>
            <p className='text-white text-sm'>⚙️ {translate.subtitleuser}</p>
          </div>
          <div className='text-white absolute right-4 top-4' onClick={() => setSelectLanguage(!selectLanguage)}>
            <h3 className='flex items-center text-sm gap-2.5 cursor-pointer'>{translate.selectLanguageuser}
              {
                selectLanguage ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowUp />
                )
              }
            </h3>

            {
              selectLanguage && (
                <div className='flex flex-col text-start w-[120px] text-sm justify-start gap-4 mt-2 text-black bg-white shadow rounded py-4 px-2'>
                  <button className='text-left flex gap-2 items-center cursor-pointer hover:text-red-600'
                    onClick={() => {
                      setLanguage("en");
                      setSelectLanguage(false);
                    }}
                  >
                    <Flag code="US" width={30} height={30} />
                    English
                  </button>

                  <button
                    className='text-left flex gap-2 items-center cursor-pointer hover:text-red-600'
                    onClick={() => {
                      setLanguage("fi");
                      setSelectLanguage(false);
                    }}
                  >
                    <Flag code="FI" width={30} height={30} />
                    Suomi
                  </button>
                  
                </div>
              )
            }
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className='text-white flex flex-col gap-4.5'>
          <div className='flex flex-col gap-1.5'>
            <label> 📧 {translate.emailuser} <span className='text-red-600 font-semibold'>*</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Sähköpostiosoitteesi' className='border border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label> 🔑 {translate.passworduser} <span className='text-red-600 font-semibold'>*</span></label>
            <div className='flex justify-between border border-slate-200 rounded py-2 px-4'>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******************' className='border-none w-full focus:outline-none bg-transparent text-sm' />
              {
                showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} className='cursor-pointer' />

                ) : (

                  <FaEye onClick={() => setShowPassword(true)} className='cursor-pointer' />
                )
              }
            </div>
          </div>
          <div className='flex justify-end mt-6'>
            <button type='submit' className='bg-red-700 text-white py-2 px-4 rounded text-sm cursor-pointer'>{translate.loginuser}</button>
          </div>
        </form>
        <hr className='text-slate-400 mt-4' />
        <div className='flex items-center justify-between'>
          <p className='text-white text-sm mt-6'>{translate.donthaveaccountuser} <Link to="/register" className='text-blue-400 cursor-pointer ml-2'>{translate.registeruser}</Link></p>
          <Link to={'/'} className='text-blue-400 flex items-center gap-1 mt-4 text-sm cursor-pointer'>
            <p>🔙</p>
            {translate.back}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Kirjaudu
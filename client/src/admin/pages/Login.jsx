import React, { useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { en, fi } from '../../languages/loginTranslations.js'
import { checkAuth, login } from '../../store/admin-auth/index.js';
import Flag from 'react-world-flags'


const Login = () => {

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const translate = language === "fi" ? fi : en;

  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/unauth-page");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    dispatch(login({ email, password }))
    .unwrap()
    .then((res) => {
      if (res?.user?.role === "admin") { 
        toast.success("Logged in successfully!");
        navigate("/admin");
      }
    })
    .catch((err) => {
      toast.error("Login failed try again!");
    });
  }




  return (
    <div className='w-full flex flex-col justify-center h-screen bg-slate-800'>
      <div className='md:w-[45%] w-[95%] m-auto'>
        <div className='md:flex md:justify-between'>
          <div className='flex flex-col gap-1 mb-8'>
            <h2 className='text-white'>🌍 {translate.welcome}</h2>
            <p className='text-white text-sm'>⚙️ {translate.subtitle}</p>
          </div>
          <div className='text-white absolute right-4 top-4' onClick={() => setSelectLanguage(!selectLanguage)}>
            <h3 className='flex items-center text-sm gap-2.5 cursor-pointer'>{translate.selectLanguage}
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
            <label> 📧 {translate.email} <span className='text-red-600 font-semibold'>*</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Sähköpostiosoitteesi' className='border border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label> 🔑 {translate.password} <span className='text-red-600 font-semibold'>*</span></label>
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
            <button type='submit' className='bg-red-700 text-white py-2 px-4 rounded text-sm cursor-pointer'>{translate.login}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
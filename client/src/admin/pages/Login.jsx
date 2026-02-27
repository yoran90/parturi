import React, { useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { en, fi } from '../../languages/loginTranslations.js'
import { adminLogin } from '../../store/admin-auth/index.js';
import Flag from 'react-world-flags'
import axios from 'axios';
import Loading from '../../loading/Loading';

const Login = () => {

  const { isAuthenticated, admin, loading } = useSelector((state) => state.adminAuth);


  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [laodingForVerifyEmail, setLoadingForVerifyEmail] = useState(false);



  const translate = language === "fi" ? fi : en;

  const dispatch = useDispatch();
  const navigate = useNavigate();




  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (admin?.role === 'admin' || admin?.role === 'super-admin') {
        navigate('/admin');
      } else {
        navigate('/unauth-page');
      }
    }
  }, [isAuthenticated, admin, loading, navigate]);

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

    dispatch(adminLogin({ email, password }))
    .unwrap()
    .then((res) => {
      if (res?.admin?.role === "admin") { 
        toast.success("Logged in successfully!");
        navigate("/admin");
      }
    })
    .catch((error) => {
      console.log("Login error:", error);
      toast.error(error || "Invalid email or password");
    });
  }

  /* if admin send verfication email again */
  const resentVerificationEmail = async (email) => {
    if (!email) {
      toast.error("Please enter your email to resend verification email!");
      return;
    }

    try {
      setLoadingForVerifyEmail(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin-send-verification-email`, {
        email
      }, { withCredentials: true });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to resend verification email!");
    } finally {
      setLoadingForVerifyEmail(false);
    }

  }




  return (
    <div className='w-full flex flex-col justify-center pb-20 h-screen bg-black relative'>
      
      <div className='text-white flex flex-col items-end mt-4 mr-4 absolute top-0 right-0' onClick={() => setSelectLanguage(!selectLanguage)}>
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
            <div className='flex flex-col text-start w-30 text-sm justify-start gap-4 mt-2 text-black bg-white shadow rounded py-4 px-2'>
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
      <div className='flex items-center justify-center text-center mb-12'>
        <img src="https://img3.stockfresh.com/files/d/drizzd/m/89/7244629_stock-photo-the-word-admin-and-gear-wheel---3d-rendering.jpg" className='w-16 h-16 rounded-full' alt="" />
      </div>
      <div className='flex w-full'>
        <div className='w-[50%] md:flex hidden'>
          <img className='w-full h-full' src="https://t4.ftcdn.net/jpg/08/59/29/37/360_F_859293783_6JjNA4siccDdVxLwgcErQT206n6VA3zR.jpg" alt="" />
        </div>
        <div className='md:w-[50%] w-full p-4'>
          <div className='md:flex md:justify-between'>
            <div className='flex flex-col gap-1 mb-8'>
              <h2 className='text-white'>🌍 {translate.welcome}</h2>
              <p className='text-white text-sm'>⚙️ {translate.subtitle}</p>
            </div>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className='text-white flex flex-col gap-4.5'>
            <div className='flex flex-col gap-1.5'>
              <label> 📧 {translate.email} <span className='text-red-600 font-semibold'>*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Sähköpostiosoitteesi' className='border border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
              <div className='flex justify-end text-sm text-blue-400 hover:text-blue-500 '>
                <button onClick={() => resentVerificationEmail(email)} type='button' className='cursor-pointer'>
                  {
                    laodingForVerifyEmail ? (
                      <div className='flex items-center gap-1.5'>
                        <p>
                          {translate.resendVerifyAgain}
                        </p>
                        <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='blue' />
                      </div>
                    )  :(
                      <div>
                        {translate.resendVerificationEmail}
                      </div>
                    )
                  }
                </button>             
              </div>
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
              {/* forget password */}
              <div className='flex justify-end'>
                <Link to="/admin-forgot-password" className='text-blue-400 hover:text-blue-500 text-sm cursor-pointer'>{translate.forgotPasswordAdmin}</Link>
              </div>
            </div>
            <div className='flex justify-end mt-6'>
              <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white w-full py-2 px-4 rounded text-sm cursor-pointer'>{translate.login}</button>
            </div>
          </form>
        </div>
      </div>      
    </div>
  )
}

export default Login
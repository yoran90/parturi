
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { enUser, fiUser, svUser, ruUser, etUser, elUser, frUser, itUser, esUser, kuUser, arUser, trUser, faUser } from '../../languages/loginTranslations'
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp, IoIosCheckmark } from 'react-icons/io';
import Flag from 'react-world-flags';
import { FaEye, FaEyeSlash, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import Loading from '../../loading/Loading';
import { googleLogin, userLogin, userLogout } from '../../store/user-auth';
import axios from 'axios';
import GoogleLoginButton from '../google-login/GoogleLoginButton';
import useInformation from '../../hooks/useInformation';
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaEarthAsia } from "react-icons/fa6";



const Kirjaudu = () => {

  const { isAuthenticated, user} = useSelector((state) => state.userAuth);
  const { getInformation } = useInformation();

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingForButton, setLoadingForButton] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(false);


  const translateLanguages = {
    fi: fiUser,
    en: enUser,
    sv: svUser,
    ru: ruUser,
    et: etUser,
    el: elUser,
    fr: frUser,
    it: itUser,
    es: esUser,
    ku: kuUser,
    ar: arUser,
    tr: trUser,
    fa: faUser

  }

  const translate = translateLanguages[language];

  const dispatch = useDispatch();
  const navigate = useNavigate();



  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "user") {
        navigate("/");
      } else if (user?.role === "admin" || user?.role === "super-admin") {
        toast.error("You are not allowed to login here! Please login from admin panel.");
        setTimeout(() => {
          navigate("/login");
          dispatch(userLogout());
        }, 100); // small delay ensures toast displays
      } else {
        toast.error("Unauthorized access!");
        setTimeout(() => {
          navigate("/unauth-page");
        }, 100);
      }
    }
  }, [isAuthenticated, user, navigate, dispatch]);


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

    
    try {
     setLoadingForButton(true);
      const result =  await dispatch(userLogin({ email, password, rememberMe })).unwrap();
      if (result?.user?.role === "user") {
        toast.success("Logged in successfully!");
        navigate("/"); 
      } else if (result?.user?.role === "admin" || result?.user?.role === "super-admin") {
        navigate("/login");
      } else {
        navigate("/unauth-page");
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error || "Invalid email or password");

    } finally {
      setLoadingForButton(false);
    }
  }

  /* this for if user want send verfication email again for login */
  const resentVerificationEmail = async (email) => {
    if (!email) {
      toast.error("Please enter your email to resend verification email!");
      return;
    }
    try {
      setLoadingVerification(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/send-verification-email`, {
        email
      }, { withCredentials: true });
      toast.success(response.data.message);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to resend verification email!");
    } finally {
      setLoadingVerification(false);
    }
  };

  /* login with google */
  const handleGoogleLogin = (response) => {
    dispatch(googleLogin({ credential: response.credential }));
  };


  return (
     <div className='w-full flex flex-col justify-center h-screen bg-black relative'>
      <div className='text-white justify-end flex flex-col items-end mt-4 mr-6 z-50 absolute top-0 right-0' onClick={() => setSelectLanguage(!selectLanguage)}>
        <div className='flex items-center text-sm gap-2.5 cursor-pointer'>
          <FaEarthAsia />
          <p>{translate.selectLanguageuser}</p>
          {
            selectLanguage ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowUp />
            )
          }
        </div>

        {
          selectLanguage && (
            <div className='flex flex-col text-start w-36 text-sm justify-start gap-4 mt-2 text-black bg-white shadow rounded py-4 px-2'>
              <button
                className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("fi");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="FI" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Suomi
                </div>
                <div>
                  {
                    language === "fi" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("en");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="US" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  English
                </div>
                <div>

                  {
                    language === "en" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("sv");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="SE" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Svenska
                </div>
                <div>

                  {
                    language === "sv" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("ru");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="RU" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Русский
                </div>
                <div>

                  {
                    language === "ru" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("et");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="EE" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Eesti
                </div>
                <div>

                  {
                    language === "et" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("el");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="GR" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Ελληνικά
                </div>
                <div>

                  {
                    language === "el" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("fr");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="FR" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Français
                </div>
                <div>

                  {
                    language === "fr" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("it");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="IT" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Italian
                </div>
                <div>

                  {
                    language === "it" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("es");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="ES" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Español
                </div>
                <div>

                  {
                    language === "es" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("tr");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="TR" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  Türkçe
                </div>
                <div>

                  {
                    language === "tr" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("ar");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="SA" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  العربية
                </div>
                <div>

                  {
                    language === "ar" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("fr");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  <Flag code="IR" className='border w-5 h-5 object-cover border-slate-400 rounded-full' />
                  فارسی
                </div>
                <div>

                  {
                    language === "fa" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
              <button className='text-left flex justify-between gap-2 items-center cursor-pointer hover:text-red-600'
                onClick={() => {
                  setLanguage("ku");
                  setSelectLanguage(false);
                }}
              >
                <div className='flex items-center gap-1.5'>
                  
                  <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfiQzqNW7VNJ-9RidWzpO_zPYyZJuaLrHPw&s' className='border w-5 h-5 object-cover border-slate-400 rounded-full'  />

                  کوردی
                </div>
                <div>

                  {
                    language === "ku" && (
                      <IoIosCheckmark size={25} />
                    )
                  }
                </div>
              </button>
              
            </div>
          )
        }
      </div>
      <div className='flex w-full m-auto items-center justify-center'>
        <div className='md:flex hidden w-[50%] h-[65vh]'>
          <img src="https://images.squarespace-cdn.com/content/v1/63ad9e8468b17f7101bd1993/69de0902-c4ff-4304-96e7-4c71580bd841/JohnnysHeroShot_1.png?format=1000w" alt="" />
        </div>
        <div className='md:w-[50%] w-full md:px-8 px-4'>
          <div className='md:flex md:justify-between'>
            <div className='flex flex-col gap-1 mb-8'>
              <h2 className='text-white'>🌍 {translate.welcomeuser}</h2>
              <p className='text-white text-sm'>⚙️ {translate.subtitleuser}</p>
            </div>
            
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className='text-white flex flex-col gap-1'>
            <div className='flex flex-col gap-1.5'>
              <label> 📧 {translate.emailuser} <span className='text-red-600 font-semibold'>*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Sähköpostiosoitteesi' className='border border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
              <div className='flex justify-end mt-0.5'>
                <button type='button' className='text-blue-400 text-sm cursor-pointer' onClick={() => resentVerificationEmail(email)}>
                  {
                    loadingVerification ? (
                      <div className='flex items-center gap-1.5'>
                          <p>{translate.resendVerifyAgain}</p>
                          <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='white' borderTopColor='black' />
                        </div>
                    ) : (
                      <div>
                        {translate.resendVerificationEmail}?
                      </div>
                    )
                  }
                </button>
              </div>
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
            <div className='flex items-center justify-between w-full mt-1'>
              <div className='flex items-center gap-1.5'>
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                <small className='text-white'>{translate.rememberMeTranslation}</small>
              </div>
              <div>
                <Link to="/forgot-password" className='text-blue-400 text-sm cursor-pointer'>{translate.forgotPassword}</Link>
              </div>
              
            </div>
            <div className='flex flex-col mt-6'>
              <button type='submit' className='bg-red-700 text-white py-2 w-full px-4 rounded border cursor-pointer'>
                {
                  loadingForButton ? (
                    <div className='flex items-center justify-center gap-2'>
                      {translate.loginuser}
                      <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : (
                    <>
                      {translate.loginuser}
                    </>
                  )
                }
              </button>
            </div>
          </form>
          <div className='w-full'>
            <GoogleLoginButton onSuccess={handleGoogleLogin} className='w-full' />
          </div>
          <hr className='text-slate-400 mt-8' />
          <div className='flex items-center justify-between'>
            <p className='text-white text-sm mt-6'>{translate.donthaveaccountuser} <Link to="/register" className='text-blue-400 cursor-pointer ml-2'>{translate.registeruser}</Link></p>
            <Link to={'/'} className='text-blue-400 flex items-center gap-1 mt-6 text-sm cursor-pointer'>
              <p>🔙</p>
              {translate.back}
            </Link>
          </div>
        </div>
      </div>

      {/* sosial medi */}
      <div className='flex items-center justify-center text-white py-2 px-4 absolute bottom-14 left-46 right-50'>
        <div className='flex items-center gap-4'>
          {
            getInformation?.socialMedia?.map((sm, index) => (
              <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 border rounded-full p-1'  size={25} />}
                {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 border rounded-full p-1'  size={25} />}
                {sm.platform === "tiktok" && <FaTiktok className='bg-black border rounded-full p-1'  size={25} />}
                {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 border rounded-full p-1'  size={25} />}
                {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 border rounded-full p-1'  size={25} />}
                {sm.platform === "youtube" && <FaYoutube className='bg-red-600 border rounded-full p-1'  size={25} />}
              </a>
            ))
          }
          
        </div>
      </div>

    </div>
  )
}

export default Kirjaudu

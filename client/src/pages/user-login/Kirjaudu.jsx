
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { enUser, fiUser } from '../../languages/loginTranslations'
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Flag from 'react-world-flags';
import { FaEye, FaEyeSlash, FaSnapchat, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import Loading from '../../loading/Loading';
import { googleLogin, userLogin, userLogout } from '../../store/user-auth';
import axios from 'axios';
import GoogleLoginButton from '../google-login/GoogleLoginButton';
import useInformation from '../../hooks/useInformation';
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaSnapchatGhost } from "react-icons/fa";


const Kirjaudu = () => {

  const { isAuthenticated, user} = useSelector((state) => state.userAuth);
  const { getInformation } = useInformation();

  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingForButton, setLoadingForButton] = useState(false);
  const [loadingVerification, setLoadingVerification] = useState(false);



  const translate = language === "fi" ? fiUser : enUser;

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
      const result =  await dispatch(userLogin({ email, password })).unwrap();
      if (result?.user?.role === "user") {
        toast.success("Logged in successfully!");
        navigate("/"); 
      } else if (result?.user?.role === "admin" || result?.user?.role === "super-admin") {
        navigate("/login");
      } else {
        navigate("/unauth-page");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);

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
      const response = await axios.post(`http://localhost:8001/api/user/send-verification-email`, {
        email
      });
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
      <div className='text-white justify-end flex flex-col items-end mt-4 mr-6 absolute top-0 right-0' onClick={() => setSelectLanguage(!selectLanguage)}>
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
            <div className='flex justify-end mt-1'>
              <Link to="/forgot-password" className='text-blue-400 text-sm cursor-pointer'>{translate.forgotPassword}</Link>
            </div>
            <div className='flex flex-col mt-6'>
              <button type='submit' className='bg-red-700 text-white py-2 w-full px-4 rounded border cursor-pointer'>
                {
                  loadingForButton ? (
                    <div className='flex items-center gap-2'>
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
            <GoogleLoginButton onSuccess={handleGoogleLogin} />
          </div>
          <hr className='text-slate-400 mt-8' />
          <div className='flex items-center justify-between'>
            <p className='text-white text-sm mt-6'>{translate.donthaveaccountuser} <Link to="/register" className='text-blue-400 cursor-pointer ml-2'>{translate.registeruser}</Link></p>
            <Link to={'/'} className='text-blue-400 flex items-center gap-1 mt-4 text-sm cursor-pointer'>
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

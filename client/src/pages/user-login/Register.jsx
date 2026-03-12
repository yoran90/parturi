import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { enUser, fiUser, svUser, ruUser, etUser, elUser, frUser, itUser, esUser, kuUser, arUser, trUser, faUser } from '../../languages/loginTranslations'
import { toast } from 'react-toastify';
import { IoIosArrowDown, IoIosArrowUp, IoIosCheckmark } from 'react-icons/io';
import Flag from 'react-world-flags';
import { FaEarthAsia } from "react-icons/fa6";
import { userRegister } from '../../store/user-auth';
import Loading from '../../loading/Loading';
import useInformation from '../../hooks/useInformation';
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaEye, FaEyeSlash, FaSnapchat, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';

const Register = () => {

  const { isAuthenticated } = useSelector((state) => state.userAuth);
  const { getInformation } = useInformation();

  const [showPassword, setShowPassword] = useState(false);
  const [selectLanguage, setSelectLanguage] = useState(false);
  const [language, setLanguage] = useState("fi");

  const [loadingForButton, setLoadingForButton] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("none");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



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
      navigate("/kirjaudu");
    }
  }, [isAuthenticated, navigate]);


  /* register submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    if (gender === "none") {
      toast.error("Please select gender");
      return;
    }

    try {
      setLoadingForButton(true);
      await dispatch(userRegister({ firstName, lastName, gender, email, password })).unwrap();
      
      toast.success("Registration successful! Please check your email to verify your account! without verification you can't login.");
      navigate("/kirjaudu");
  
    } catch (error) {
      toast.error(error);
    } finally {
      setLoadingForButton(false);
    }
  }



  return (
     <div className='w-full flex flex-col justify-center bg-black relative'>
      <div className='text-white flex flex-col items-end justify-end mt-4 mr-6 absolute top-0 right-0' onClick={() => setSelectLanguage(!selectLanguage)}>
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
      <div className='flex md:w-full items-center justify-center min-h-screen pb-24 md:pb-12 md:mt-0 mt-8'>
        <div className='md:w-[50%] w-full md:p-8 p-4'>
          <div className='md:flex md:justify-between'>
            <div className='flex flex-col gap-1 mb-8'>
              <h2 className='text-white'>🌍 {translate.welcomeRegister}</h2>
              <p className='text-white text-sm'>{translate.headerRegister}</p>
              <p className='text-white text-sm mt-2'>{translate.titleRegister}</p>
            </div>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className='text-white flex flex-col gap-4.5'>
            <div className='flex w-full gap-2'>
              <div className='flex flex-col gap-1.5 w-full'>
                <label> 📧 {translate.firstname} <span className='text-red-600 font-semibold'>*</span></label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={translate.firstname} className='border bg-transparent w-full border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
              </div>
              <div className='flex flex-col gap-1.5 w-full'>
                <label> 📧 {translate.lastname} <span className='text-red-600 font-semibold'>*</span></label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={translate.lastname} className='border w-full border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
              </div>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label>{translate.selectGender}</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className='border bg-transparent py-2 rounded px-4'>
                <option value="men" className='bg-black hover:bg-black'>{translate.men}</option>
                <option value="women" className='bg-black hover:bg-black'>{translate.women}</option>
                <option value="none" className='bg-black hover:bg-black'>{translate.notChoosenGender}</option>
              </select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label> 📧 {translate.emailuser} <span className='text-red-600 font-semibold'>*</span></label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={translate.emailuser} className='border border-slate-200 text-slate-400 text-sm rounded px-4 py-2' />
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
              <button type='submit' className='bg-red-700 text-white py-2 px-4 rounded w-full text-sm cursor-pointer'>
                {
                  loadingForButton ? (
                    <div className='flex items-center justify-center gap-2'>
                      <p>{translate.registeruser}</p>
                      <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : (
                    <div>
                      {translate.registeruser}
                    </div>
                  )
                }

              </button>
            </div>
          </form>
          <hr className='text-slate-400 mt-4' />
          <div className='flex items-center justify-between'>
            <p className='text-white text-sm mt-6'>{translate.haveaccountuser} <Link to="/kirjaudu" className='text-blue-400 cursor-pointer ml-2'>{translate.loginuser}</Link></p>
            <Link to={'/'} className='text-blue-400 flex items-center gap-1 mt-6 text-sm cursor-pointer'>
              <p>🔙</p>
              {translate.back}
            </Link>
          </div>
        </div>
        {/* image */}
        <div className='w-[50%] h-[80vh] md:flex hidden'>
          <img src="https://img.freepik.com/premium-photo/black-white-close-up-man-getting-his-beard-trimmed-with-electric-razor-by-barber_36682-80886.jpg" alt="" />
        </div>
      </div>


      {/* sosial medi */}
      <div className='flex items-center justify-center text-white py-2 px-4 absolute md:bottom-6 bottom-8 left-46 right-50'>
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

export default Register
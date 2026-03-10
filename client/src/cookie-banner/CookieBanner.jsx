import React, { useEffect, useState } from 'react'
import { fiCookieBanner, enCookieBanner, svCookieBanner, ruCookieBanner, etCookieBanner, arCookieBanner, trCookieBanner, faCookieBanner, kuSoraniCookieBanner } from '../languages/cookieBanner';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaEarthAsia } from "react-icons/fa6";
import { GiRazor } from "react-icons/gi";
import Flag from 'react-world-flags';
import { FaCheck } from "react-icons/fa6";


const CookieBanner = () => {

  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(false);
  const [language, setLanguage] = useState("fiCookieBanner");

  const translations = {
    fiCookieBanner: fiCookieBanner,
    enCookieBanner: enCookieBanner,
    svCookieBanner: svCookieBanner,
    ruCookieBanner: ruCookieBanner,
    etCookieBanner: etCookieBanner,
    arCookieBanner: arCookieBanner,
    trCookieBanner: trCookieBanner,
    faCookieBanner: faCookieBanner,
    kuSoraniCookieBanner: kuSoraniCookieBanner
  }

  const translateLanguage = translations[language];


  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setShow(false);
  };

  const handleAcceptNecesary = () => {
    localStorage.setItem('cookieConsent', 'necessary');
    setShow(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', 'reject');
    setShow(false);
  }

  if (!show) return null



  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-100 flex flex-col items-center justify-center'>
      <div className='bg-white shadow md:w-full w-[98%] m-auto max-w-2xl p-4 rounded'>
        <div className='flex gap-4  justify-between'>
          <div className='flex items-center gap-0.5'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtyb9KiIO6XRBm-kdpfP3m9EcIJGN1k9DEw&s" alt="razor" className='w-12 h-12 mr-2 rounded border border-amber-500' />
            <div className='flex flex-col gap-0'>
               <div className='flex items-center gap-0.5'> 
                <p>Razor parturi</p>
                <GiRazor size={20} className='mb-4' />
              </div>
              <div className='-mt-2'>
                <a href="https://www.razorr.fi" target='_blank' className='text-blue-500 text-sm'>www.razorr.fi</a>
              </div>
            </div>
          </div>
          <div className='flex flex-col relative text-slate-700 items-center gap-0.5 cursor-pointer'>
           <div className='flex items-center gap-0.5' onClick={() => setSelectedLanguage(!selectedLanguage)}>
             <FaEarthAsia className='mr-1' />
              <p className='text-sm text-slate-600 font-semibold'>{translateLanguage.chooseLnguage}</p>
              <div className='mb-2'>
                {selectedLanguage ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )
                }
              </div>
            </div>
            {selectedLanguage && (
                <div className='flex flex-col items-start absolute top-8 right-0 z-50 px-2 gap-4 bg-white shadow py-3 w-32 border border-slate-300 text-start  justify-items-start rounded'>
                  <button onClick={() => {setLanguage('fiCookieBanner'); setSelectedLanguage(false)}} className='flex gap-2 text-sm'>
                    <Flag code="FI" width={22} height={22} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    Suomi
                    <div className='w-6'>

                      {language === 'fiCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('enCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="US" width={22} height={22} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    English
                    <div className='w-6'>
                      {language === 'enCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('svCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="SE" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    Svenska
                    <div className='w-6'>
                      {language === 'svCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('ruCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="RU" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    Русский
                    <div className='w-6'>
                      {language === 'ruCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('etCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="EE" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    Eesti
                    <div className='w-6'>
                      {language === 'etCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('arCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="SA" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                     عربي
                    <div className='w-6'>
                      {language === 'arCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('trCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="TR" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    Türkçe
                    <div className='w-6'>
                      {language === 'trCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('faCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <Flag code="IR" width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    فارسی
                    <div className='w-6'>
                      {language === 'faCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                  <button onClick={() => {setLanguage('kuSoraniCookieBanner'); setSelectedLanguage(false)}} className='flex justify-between w-full gap-2 text-sm'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfiQzqNW7VNJ-9RidWzpO_zPYyZJuaLrHPw&s' width={20} height={20} className='w-4 h-4 rounded-full overflow-hidden border border-slate-500 object-cover'  />
                    کوردی
                    <div className='w-6'>
                      {language === 'kuSoraniCookieBanner' && (
                          <div><FaCheck /></div>
                        )
                      }
                    </div>
                  </button>
                </div>
              )

            }
          </div>
        </div>
        {/* text */}
        <div className='mt-12 flex flex-col gap-2.5'>
          <div>
            <h3 className='text-lg text-slate-700'>{translateLanguage.textHeader}</h3>
          </div>
          <div className='flex flex-col gap-3.5'>
            <p className='text-sm text-slate-800'>{translateLanguage.textBodyOne}</p>
            <p className='text-sm text-slate-800'>{translateLanguage.textBodyTwo}</p>
            <p className='text-sm text-slate-800'>{translateLanguage.textBodyThree}</p>
          </div>
        </div>
        {/* button */}
        <div className='mt-12 md:flex items-center justify-between gap-1.5'>
          <div className='w-full md:w-fit md:mb-0 mb-1.5'>
            <button onClick={handleRejectAll} className='py-2 px-4 border border-red-700 w-full md:w-fit cursor-pointer rounded text-sm bg-red-500 hover:bg-red-600 text-white flex items-center text-center justify-center'>{translateLanguage.rejectAll}</button>
          </div>
          <div className='md:flex gap-1.5 w-full md:w-fit'>
            <button onClick={handleAcceptNecesary} className='py-2 px-4 border border-slate-300 w-full md:w-fit md:mb-0 mb-1.5 rounded text-sm cursor-pointer hover:bg-slate-100 flex items-center text-center justify-center'>{translateLanguage.onlyNecessary}</button>
            <button onClick={handleAcceptAll} className='py-2 px-4 border border-blue-700 w-full md:w-fit cursor-pointer rounded text-sm bg-blue-500 hover:bg-blue-600 text-white flex items-center text-center justify-center'>{translateLanguage.acceptAll}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
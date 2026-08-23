import React from 'react';
import { FaFacebookF, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import useInformation from '../../hooks/useInformation';
import useTitleForPage from '../../hooks/useTitleForPage';
import useHeaderLogo from '../../hooks/useHeaderLogo';
import { FaLink } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { IoIosPricetags, IoLogoInstagram } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { GiRazor } from "react-icons/gi";
import { SiGitconnected } from "react-icons/si";
import AnalogClock from '../analogClock/AnalogClock';
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    return currentYear
  }

  const { getInformation } = useInformation();
  const { getTitleForPage } = useTitleForPage();
  const { headerLogo } = useHeaderLogo();
  

  return (
    <div className='bg-black text-white md:p-12 py-12 px-4 relative'>
      <footer>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-8" style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr" }}>
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <img src={headerLogo?.url} alt="Site Logo" className='w-6 h-6 rounded-full border border-slate-300' />
              <p>{getTitleForPage?.titleForPage?.footerTitle}</p>
            <GiRazor size={20} className='razorSidebar' />
            </h3>
            <div className='text-sm text-slate-200' dangerouslySetInnerHTML={{ __html: getTitleForPage?.titleForPage?.footerDescription}} />
          </div>
          
          
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <FaLink  />
              Linkki
            </h3>
            <div className='flex flex-col'>
              <Link to='/meista' className='text-sm text-slate-200 flex items-center gap-3'><FcAbout /> Meistä</Link>
              <Link to='/palvelut' className='text-sm text-slate-200 flex items-center gap-3'><IoIosPricetags /> Palvelut</Link>
              <Link to='/tuotet' className='text-sm text-slate-200 flex items-center gap-3'><AiFillProduct /> Tuotteet</Link>
              <Link to='/yhteystiedot' className='text-sm text-slate-200 flex items-center gap-3'><SiGitconnected />Yhteystiedot</Link>
            </div>
          </div>
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <MdOutlineContactSupport />
              Contact
            </h3>
            <div>
              <div className='flex gap-1.5 items-center'>
                📞 
                <a className='text-sm' href={`tel:${getInformation?.phone}`}>{getInformation?.phone}</a>
              </div>
              <div className='flex gap-1.5 items-center text-sm'>
                📧
                <p>{getInformation?.email}</p>
              </div>
            </div>
          </div>
          <div className='flex md:flex-col md:justify-center justify-between gap-5.5'>
            <div className='flex flex-col gap-5.5'>
              <h3 className='text-md flex items-center gap-2'>
                <MdOutlineOnlinePrediction size={18} />
                Follow Us
              </h3>
              <div className='flex items-center gap-5.5'>
                {
                  getInformation?.socialMedia?.map((sm, index) => (
                    <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                      {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 border rounded-full p-1'  size={22} />}
                      {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 border rounded-full p-1'  size={22} />}
                      {sm.platform === "tiktok" && <FaTiktok className='bg-black border rounded-full p-1'  size={22} />}
                      {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 border rounded-full p-1'  size={22} />}
                      {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 border rounded-full p-1'  size={22} />}
                      {sm.platform === "youtube" && <FaYoutube className='bg-red-600 border rounded-full p-1'  size={22} />}
                    </a>
                  ))
                }
              </div>
            </div>
            <div className='md:ml-3 mr-4 md:mr-0'>
              <AnalogClock />
            </div>
          </div>
          
        </div>

        <div className='mt-6 relative md:hidden'>
          <a href="https://www.google.com/maps/dir//Razor+Parturi+Barber+Shop,+Vuotie+45,+00980+Helsinki/@60.2079337,25.1413876,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x46920f7a6f6b2c71:0x19d593a1f4cdb95b!2m2!1d25.1445851!2d60.2077421?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" target='_blank' rel="noopener noreferrer">
            <img src="https://www.shutterstock.com/shutterstock/videos/1097683367/thumb/1.jpg?ip=x480" alt="" />
            <FaMapMarkerAlt className='text-red-500 text-xs absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
          </a>
        </div>


        <hr className='mt-6 text-slate-500' />
        <div className='md:flex hidden items-center justify-center mt-8 text-xs gap-0.5'>
          <div>
            Copyright All Rights Reserved  © {getYears()} 
          </div>
          <div>
            <img src={headerLogo?.url} alt="Site Logo" className='w-5 h-5 mr-2 ml-2 rounded-full border border-slate-300' />
          </div>
          <div className='flex items-center gap-1.5'>
            <div dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.footerFooter}} />
            <GiRazor className='razorSidebar' size={12} />
            <p>www.razorr.fi</p>
          </div>
        </div>
        {/* for mobile */}
         <div className='md:hidden flex flex-col gap-0.5 items-center text-center justify-center mt-8 text-xs'>
          <div>
            Copyright All Rights Reserved  © {getYears()} 
          </div>
          <div className='mt-1 mb-1'>
            <img src={headerLogo?.url} alt="Site Logo" className='w-5 h-5 rounded-full border border-slate-300' />
          </div>
          <div className='flex gap-1.5 items-center'>
            <div dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.footerFooter}} />
            <GiRazor className='razorSidebar' size={12} />
            <p>www.razorr.fi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

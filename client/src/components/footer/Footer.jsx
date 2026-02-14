import React from 'react';
import { CgInstagram } from 'react-icons/cg';
import { FaFacebook, FaSnapchat, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import useInformation from '../../hooks/useInformation';
import useTitleForPage from '../../hooks/useTitleForPage';
import useHeaderLogo from '../../hooks/useHeaderLogo';
import { FaLink } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { IoIosPricetags } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";

import { SiGitconnected } from "react-icons/si";
import AnalogClock from '../analogClock/AnalogClock';

const Footer = () => {

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    return currentYear
  }

  const { getInformation } = useInformation();
  const { getTitleForPage } = useTitleForPage();
  const { headerLogo } = useHeaderLogo();
  

  return (
    <div className='bg-black text-white md:p-12 py-12 px-4'>
      <footer>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-8" style={{ gridTemplateColumns: "2.5fr 1fr 1fr 1fr" }}>
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <img src={headerLogo?.url} alt="Site Logo" className='w-6 h-6 rounded-full border border-slate-300' />
              <p>{getTitleForPage?.titleForPage?.footerTitle}</p>
            </h3>
            <div className='text-sm text-slate-200' dangerouslySetInnerHTML={{ __html: getTitleForPage?.titleForPage?.footerDescription}} />
          </div>
          
          
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <FaLink  />
              Linkki
            </h3>
            <div className='flex flex-col'>
              <Link to='/meistä' className='text-sm text-slate-200 flex items-center gap-3'><FcAbout /> Meistä</Link>
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
                    <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" aria-label={sm.platform} className='cursor-pointer'>
                      {sm.platform === "facebook" && <FaFacebook size={16} />}
                      {sm.platform === "instagram" && <CgInstagram size={16} />}
                      {sm.platform === "tiktok" && <FaTiktok size={16} />}
                      {sm.platform === "snapchat" && <FaSnapchat size={16} />}
                      {sm.platform === "twitter" && <FaTwitter size={16} />}
                      {sm.platform === "youtube" && <FaYoutube size={16} />}
                    </a>
                  ))
                }
              </div>
            </div>
            <AnalogClock />
          </div>
          
        </div>
        <hr className='mt-6 text-slate-500' />
        <div className='md:flex hidden items-center justify-center mt-8 text-xs gap-1'>
          <div>
            Copyright © {getYears()} 
          </div>
          <div>
            <img src={headerLogo?.url} alt="Site Logo" className='w-5 h-5 mr-2 ml-2 rounded-full border border-slate-300' />
          </div>
          <div dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.footerFooter}} />
        </div>
        {/* for mobile */}
         <div className='md:hidden flex gap-2.5 items-center text-center justify-center mt-8 text-xs'>
          <div>
            Copyright © {getYears()} 
          </div>
          <div className='mt-1 mb-1'>
            <img src={headerLogo?.url} alt="Site Logo" className='w-5 h-5 rounded-full border border-slate-300' />
          </div>
          <div dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.footerFooter}} />
        </div>
      </footer>
    </div>
  )
}

export default Footer;

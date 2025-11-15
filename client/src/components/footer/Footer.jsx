import React from 'react';
import { CgInstagram } from 'react-icons/cg';
import { FaFacebook, FaSnapchat, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { GiBeard } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { IoMdClock } from 'react-icons/io';
import useInformation from '../../hooks/useInformation';

const Footer = () => {

  const getYears = () => {
    const currentYear = new Date().getFullYear()
    return currentYear
  }

  const { getInformation, informationLoading, error } = useInformation();
  

  return (
    <div className='bg-black text-white md:p-12 py-12 px-4'>
      <footer>
        <div className="md:grid md:grid-cols-4 flex flex-col gap-8" style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr 0.5fr" }}>
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <GiBeard />
              Parturi
            </h3>
            <p className='text-sm text-slate-200'>Olemme pätevöityneitä ammattilaisia, joilla on alan koulutus ja virallinen osaaminen. Meille hiustenhoito ei ole vain työtä – se on ammatti, jota teemme ylpeydellä ja tarkkuudella.</p>
          </div>
          <div className='flex flex-col md:items-center gap-2.5'>
            <IoMdClock size={30} />
            <h3 className='text-sm font-bold text-slate-300'>AUKIOLOAJAT</h3>
            <div className='text-xs' dangerouslySetInnerHTML={{ __html: getInformation?.openingHours }} />
          </div>
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <FaHandsHelping />
              Help
            </h3>
            <div>
              <p className='text-sm text-slate-300'>Privacy Policy</p>
              <p className='text-sm text-slate-300'>Terms & Conditions</p>
              <p className='text-sm text-slate-300'>Partners</p>
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
          <div className='flex flex-col gap-5.5'>
            <h3 className='text-md flex items-center gap-2'>
              <MdOutlineOnlinePrediction size={18} />
              Follow Us
            </h3>
            <div className='flex items-center gap-5.5'>
              {
                getInformation?.socialMedia?.map((sm, index) => (
                  <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
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
          
        </div>
        <hr className='mt-6 text-slate-500' />
        <div className='md:flex hidden items-center justify-center mt-8 text-xs gap-1'>
          <div>
            Copyright © {getYears()} 
          </div>
          <div>
            <GiBeard /> 
          </div>
          <div>
            Parturi — Ammattitaitoa ja tyyliä joka leikkauksessa.
          </div>
        </div>
        {/* for mobile */}
         <div className='md:hidden flex flex-col items-center justify-center mt-8 text-xs gap-1'>
          <div>
            Copyright © {getYears()} 
          </div>
          <div>
            <GiBeard /> 
          </div>
          <div>
            Parturi — Ammattitaitoa ja tyyliä joka leikkauksessa.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;

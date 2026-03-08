import React from 'react';
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebook, FaMapMarkerAlt, FaSnapchat, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import { CgInstagram } from 'react-icons/cg';
import useInformation from '../../hooks/useInformation';
import { TbCurrentLocation } from "react-icons/tb";

const Information = () => {

 
  const { getInformation } = useInformation();

  if (!getInformation) return null
  

  return (
    <>
      <div className='bg-black text-white hidden md:flex items-center justify-between  py-2 px-4'>
        <div className='text-xs flex gap-2'>
          <GiRazor size={25} className='razor' />
          <div className='flex flex-col items-center justify-center' dangerouslySetInnerHTML={{ __html: getInformation?.openingHours }} />
        </div>
        <div className='flex items-center gap-4'>
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
        <div className='text-xs flex items-center gap-5.5'>
          <a className='flex flex-col gap-0.5'
            href={getInformation?.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-red-600' />
              {getInformation?.address}
            </div>
            <div className='flex items-center gap-2'>
              <TbCurrentLocation />
              {getInformation?.located}
            </div>
          </a>

          <div className='flex items-center gap-2'>
            <MdPhoneInTalk className='text-red-600' />
            <a href={`tel:${getInformation?.phone}`}>{getInformation?.phone}</a>
          </div>
        </div>
      </div>
      {/* for mobile screen */}
      <div className='bg-white dark:bg-black dark:text-white flex flex-col gap-2 md:hidden items-center text-black py-3'>
        <div className='text-xs flex gap-3 w-full justify-center'>
          <GiRazor size={20} className='razor' />
          <div className='flex flex-col items-center justify-center' dangerouslySetInnerHTML={{ __html: getInformation?.openingHours }} />
        </div>
        <div className='flex items-center gap-5.5 mb-2 mt-2'>
          {
            getInformation?.socialMedia?.map((sm, index) => (
              <a key={index} href={sm.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
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
        <div className='flex justify-between text-xs w-full px-2'>
          <div>
           <a className='flex flex-col gap-0.5'
              href={getInformation?.addressUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className='flex items-center gap-2'>
                <FaMapMarkerAlt className='text-red-600' />
                {getInformation?.address}
              </div>
              <div className='flex items-center gap-2'>
                <TbCurrentLocation />
                {getInformation?.located}
              </div>
          </a>
          </div>
          <div className='flex items-center gap-2'>
            <MdPhoneInTalk className='text-red-600' />
            <a href={`tel:${getInformation?.phone}`}>{getInformation?.phone}</a>
          </div>
        </div>
      </div>
      <hr className='text-slate-800' />
    </>
  )
}

export default Information
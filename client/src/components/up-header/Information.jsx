import React from 'react';
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebookF, FaMapMarkerAlt, FaSnapchat, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import useInformation from '../../hooks/useInformation';
import { TbCurrentLocation } from "react-icons/tb";
import { IoLogoInstagram } from 'react-icons/io';

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
                {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 border rounded-full p-1' size={22}  />}
                {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 border rounded-full p-1'  size={22} />}
                {sm.platform === "tiktok" && <FaTiktok className='bg-black border rounded-full p-1'  size={22} />}
                {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 border rounded-full p-1'  size={22} />}
                {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 border rounded-full p-1'  size={22} />}
                {sm.platform === "youtube" && <FaYoutube className='bg-red-600 border rounded-full p-1'  size={22} />}
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
      <div className='bg-white text-slate-800 flex flex-col gap-2 md:hidden items-center py-3'>
        <div className='text-xs flex gap-3 w-full justify-center mr-4'>
          <GiRazor size={20} className='razor' />
          <div className='flex flex-col items-center justify-center' dangerouslySetInnerHTML={{ __html: getInformation?.openingHours }} />
          <GiRazor size={20} className='razorRight' />

        </div>
        <div className='flex items-center gap-5.5 mb-2 mt-2'>
          {
            getInformation?.socialMedia?.map((sm, index) => (
              <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 text-white border rounded-full p-1'  size={22} />}
                {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 text-white border rounded-full p-1'  size={22} />}
                {sm.platform === "tiktok" && <FaTiktok className='bg-black text-white border rounded-full p-1'  size={22} />}
                {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 text-white border rounded-full p-1'  size={22} />}
                {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 text-white border rounded-full p-1'  size={22} />}
                {sm.platform === "youtube" && <FaYoutube className='bg-red-600 text-white border rounded-full p-1'  size={22} />}
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
      <hr className='text-slate-200' />
    </>
  )
}

export default Information
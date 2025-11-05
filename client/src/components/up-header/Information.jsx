import React from 'react'
import { MdPhoneInTalk } from "react-icons/md";
import { FaFacebook, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";
import { CgInstagram } from 'react-icons/cg';

const Information = () => {
  return (
    <>
      <div className='bg-black hidden md:flex items-center justify-between text-white/90 py-2 px-4'>
        <div className='text-xs flex items-center gap-1 text-red-500'>
          <IoMdClock className='text-white' />
          <p>Olemme Avoinna 7️⃣ 🕖PÄIVÄÄ VIIKOSSA</p>
        </div>
        <div className='flex items-center gap-5.5'>
          <div className='cursor-pointer'>
            <FaFacebook size={16} />
          </div>
          <div className='cursor-pointer'>
            <CgInstagram size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaTiktok size={16} />
          </div>
        </div>
        <div className='text-xs flex items-center gap-5.5'>
          <a
            href="https://www.google.com/maps/place/Maas%C3%A4lv%C3%A4ntie+6,+00710+Helsinki/@60.2366177,25.0066272,17z/data=!3m1!4b1!4m6!3m5!1s0x469208f7c6a193af:0xd672c6251afd836!8m2!3d60.2366151!4d25.0092021!16s%2Fg%2F11dzpwynv9?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-red-600' />
              Massälväntie 6, 00710 Helsinki
            </div>
          </a>

          <div className='flex items-center gap-2'>
            <MdPhoneInTalk className='text-red-600' />
            <a href='tel:+358 50 123456' className='text-white'>+358 50 123456</a>
          </div>
        </div>
      </div>
      {/* for mobile screen */}
      <div className='bg-black flex flex-col gap-2 md:hidden items-center text-white/90 py-3'>
        <div className='text-xs flex items-center gap-1 text-red-500'>
          <IoMdClock className='text-white' />
          <p>Olemme Avoinna 7️⃣ 🕖PÄIVÄÄ VIIKOSSA</p>
        </div>
        <div className='flex items-center gap-5.5 mb-2 mt-2'>
          <div className='cursor-pointer'>
            <FaFacebook size={16} />
          </div>
          <div className='cursor-pointer'>
            <CgInstagram size={16} />
          </div>
          <div className='cursor-pointer'>
            <FaTiktok size={16} />
          </div>
        </div>
        <div className='text-xs flex items-center justify-between gap-14'>
          <div>
            <a
              href="https://www.google.com/maps/place/Maas%C3%A4lv%C3%A4ntie+6,+00710+Helsinki/@60.2366177,25.0066272,17z/data=!3m1!4b1!4m6!3m5!1s0x469208f7c6a193af:0xd672c6251afd836!8m2!3d60.2366151!4d25.0092021!16s%2Fg%2F11dzpwynv9?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              >
              <div className='flex items-center gap-2'>
                <FaMapMarkerAlt className='text-red-600' />
                <p>
                  Massälväntie 6, 00710 Helsinki
                </p>
              </div>
            </a>

          </div>
          <div className='flex items-center gap-2'>
            <MdPhoneInTalk className='text-red-600' />
            <a href='tel:+358 50 123456' className='text-white'>+358 50 123456</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Information
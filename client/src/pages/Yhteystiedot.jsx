import React from 'react'
import { FaFacebook, FaMapMarkerAlt, FaTiktok } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import Footer from '../components/footer/Footer';
import { CgInstagram } from 'react-icons/cg';


const Yhteystiedot = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center text-center gap-2.5 mt-6'>
        <h1>Yhteystiedot & Otetaan yhteyttä</h1>
        <div className='md:flex items-center justify-between gap-16 mt-8'>
          <div className='flex flex-col items-center justify-center md:mb-0 mb-8'>
            <FaMapMarkerAlt size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>OSOITE</h3>
            <p className='text-slate-500 text-sm'>Maasäläntie 6, 00710 Helsinki</p>
          </div>
          <div className='flex flex-col items-center justify-center md:mb-0 mb-8'>
            <FaPhone size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>PUHELIN</h3>
            <a className='text-slate-500 text-sm' href='tel:+358 50 123456'>+358 50 123456</a>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <MdAttachEmail size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>SAHKOPOSTI</h3>
            <a className='text-slate-500 text-sm' href='mailto:Ow6Xl@example.com'>Ow6Xl@example.com</a>
          </div>
        </div>
      </div>
      {/* contact form */}
      <div className='md:flex w-full gap-8 mt-16 md:px-12 px-4 mb-12'>
        {/* form */}
        <div className='md:w-[50%]'>
          <h3>Ota yhteyttä meihin</h3>
          <p>Saatavilla 24 tuntia vuorokaudessa!</p>
          <form className='mt-6 flex flex-col gap-4 bg-white shadow border border-slate-100 rounded p-6'>
            <div className='flex items-center justify-center gap-5.5'>
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
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">👤 Nimi*</label>
              <input type="text" placeholder='Syötä nimesi' className='border border-slate-200 rounded p-1.5' />
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">📧 Sähköposti*</label>
              <input type="text" placeholder='Syötä nimesi' className='border border-slate-200 rounded p-1.5' />
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">💬 Viesti*</label>
              <textarea name="" id="" cols="30" rows="10" placeholder='Syöte' className='border border-slate-200 rounded resize-none p-1.5'></textarea>
            </div>
            <div className='float-right flex justify-end'>
              <button className='bg-blue-600 text-white py-1 px-3 rounded'>lähetä</button>
            </div>
          </form>
        </div>
        {/* map */}
        <div className='md:w-[50%] md:mt-0 mt-8'>
          <div className='flex flex-col gap-1 mb-6'>
            <h3>Olemme Täällä</h3>
            <p>Maasälväntie 6, 00710 Helsinki</p>
          </div>
          <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.6228598341863!2d25.0092021!3d60.23661509999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469208f7c6a193af%3A0xd672c6251afd836!2sMaas%C3%A4lv%C3%A4ntie%206%2C%2000710%20Helsinki!5e0!3m2!1sfi!2sfi!4v1762367113123!5m2!1sfi!2sfi" 
              width="100%" 
              height="500px" 
              style={{ border: '0' }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Yhteystiedot
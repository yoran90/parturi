import React from 'react'
import { IoClose } from "react-icons/io5";



const PriceApp = ({ onClose }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center'>
      <div className='md:w-full bg-[#c7a371] w-[98%] max-w-xl relative py-12 px-4 rounded'>
        <div>
          <button onClick={onClose} className='text-xs absolute top-1 right-1 cursor-pointer text-white'>
            <IoClose size={25} />
          </button>
        </div>
        <div className='flex items-center gap-0.5 font-semibold text-xl text-center justify-center'>
          <h2 className='text-white'>HINNASTO</h2>
          <h2 className='text-slate-600'>MME</h2>
        </div>
        <hr className='mt-4 text-slate-200 mb-4' />
        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <div className='flex flex-col'>
            <h2>HIUSTENLEIKKAUS </h2>
            <h2>ELÄKELÄISILLE</h2>
          </div>
          <h2>15 €</h2>
        </div>
        <hr className='mt-2 text-slate-200 mb-3' />
        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <h2>HIUSTENLEIKKAUS </h2>  
          <h2>15 €</h2>
        </div>
        <hr className='mt-4 text-slate-200 mb-4' />

        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <div className='flex flex-col'>
            <h2>LASTEN (10V ASTI) </h2>  
            <h2>HIUSTENLEIKKAUS </h2>
          </div>
          <h2>15 €</h2>
        </div>
        <hr className='mt-2 text-slate-200 mb-3' />

        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <h2>SKIN FADE</h2>  
          <h2>25 €</h2>
        </div>
        <hr className='mt-4 text-slate-200 mb-4' />

        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <h2>KONEAJO </h2>  
          <h2>15 €</h2>
        </div>
        <hr className='mt-2 text-slate-200 mb-3' />

        <div className='flex items-center justify-between gap-0.5 font-semibold text-md text-white'>
          <h2>PARANAJO </h2>  
          <h2>15 €</h2>
        </div>
        <hr className='mt-4 text-slate-200 mb-6' />

        <div className='flex items-center justify-center gap-0.5 font-semibold text-md text-white'>
          <h2>ILMAN AJANVARAUSTA </h2>  
        </div>



      </div>

    </div>
  )
}

export default PriceApp
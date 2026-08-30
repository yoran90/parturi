import React from 'react'

const Hours = ({ onClose }) => {
  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 bg-black/70 flex justify-center items-center z-50'>
      <div className='bg-white shadow xl:w-[50%] md:w-[60%] w-[95%] relative py-12 px-4 rounded'>
        <button onClick={onClose} className='text-xs absolute top-3 right-3 cursor-pointer'>❌</button>
      <div className='flex flex-col gap-1 items-center justify-center text-xl'>
        <h1>✂️ RAZOR PARTURI ✂️</h1>
        <h1>🔥 Avoinna joka päivä 🔥 </h1>
        <h1>Tervetuloa</h1>
      </div>
      <div>
        <h1 className='mt-6 text-xl'>🕐 AUKIOLOAJAT</h1>
      </div>

      <div className='flex flex-col items-center justify-between gap-2.5 mt-6 text-xl'>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Maanantai:</h1>
          <h1 className='w-[50%]'>9:00–20:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Tiistai:</h1>
          <h1 className='w-[50%]'>9:00–20:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Keskiviikko:</h1>
          <h1 className='w-[50%]'>9:00–20:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Torstai:</h1>
          <h1 className='w-[50%]'>9:00–20:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Perjantai:</h1>
          <h1 className='w-[50%]'>9:00–20:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Lauantai:</h1>
          <h1 className='w-[50%]'>9:00–19:00</h1>
        </div>
        <div className='flex items-center gap-3.5 w-full'>
          <h1 className='w-[50%]'>📅 Sunnuntai:</h1>
          <h1 className='w-[50%]'>10:00–18:00</h1>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Hours
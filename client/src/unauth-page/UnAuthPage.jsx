import React from 'react'

const UnAuthPage = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='flex flex-col gap-1 justify-center items-center bg-white shadow border border-slate-100 text-red-600 h-fit py-20 px-6 rounded w-[90%]'>
        <h1 className='md:text-3xl mb-4'>You don't have access to view this page ⛔</h1>
        <p className='text-sm md:text-center'>The page may have been moved or deleted.</p>
        <p className='text-sm md:text-center'>There could be an issue with the link you followed</p>
        <p className='text-sm md:text-center'>There might be a temporary problem with our server.</p>
        <p className='text-sm md:text-center'>But don’t worry! We're on it and working hard to get everything back to normal.</p>
      </div>
    </div>
  )
}

export default UnAuthPage
import React from 'react'
import { BiRefresh } from 'react-icons/bi'
import { IoAlertCircle } from 'react-icons/io5'

const ErrorMessage = ({ message , onRetry}) => {
  return (
    <div className="bg-red-500 backdrop-blur-xl w-full border border-white/30 rounded-2xl text-white py-1.5 px-4 flex flex-col">

      <div className="flex items-center space-x-4 mb-6 mt-6">
        <div className='p-3 bg-red-500/30 rounded-full'>
          <IoAlertCircle className='w-6 h-6 text-red-100' />
        </div>
        <h3>Something went wrong</h3>
      </div>

      <p>{message}</p>

      <button onClick={onRetry} className="flex items-center gap-2 bg-red-500/30 backdrop-blur-xl border border-red-100 text-white py-1.5 mt-6 mb-6 px-4 w-fit h-fit rounded-full cursor-pointer hover:bg-red-500/20 transition-all duration-300">
        <BiRefresh className='w-6 h-6 text-white/90 hover:text-white transition-all duration-300' />
        <span className='ml-2'>Try again</span>
      </button>

    </div>
  )
}

export default ErrorMessage
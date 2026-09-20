import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-12 w-full">
      <div className="relative w-full">
        <div className="w-20 h-20 border-4 border-white/30 rounded-full animate-spin border-t-white/80 shadow-lg"></div>

        <div className="absolute inset-4 w-12 h-12 border-3 border-blue-200/30 rounded-full animate-spin border-t-blue/80 animate-delay-150"></div>

        <div className='absolute inset-6 w-8 h-8 flex items-center justify-center'>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pluse"></div>
        </div>
      </div>

    </div>
  )
}

export default LoadingSpinner
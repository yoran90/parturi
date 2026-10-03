import React from 'react'

const TemperatureToggle = ({ unit, toggleUnit }) => {
  return (
    <div className="flex items-center text-center  bg-white/30 backdrop:blur-xl border  border-white/60 text-white overflow-hidden rounded-full cursor-pointer hover:bg-white/25 transition-all duration-300">
      <div className="flex items-center justify-center w-32">
        <button onClick={toggleUnit} className={`${unit === 'C' ? 'bg-white/80 text-black' : 'text-white/50'} py-1.5 px-4 w-full`}>
          °C
        </button>
        <button onClick={toggleUnit} className={`${unit === 'F' ? 'bg-white/80 text-black' : 'text-white/50'} py-1.5 px-4 w-full`}>
          °F
        </button>
      </div>
    </div>
  )
}

export default TemperatureToggle
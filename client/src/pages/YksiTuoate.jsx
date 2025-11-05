import React from 'react'
import { Link } from 'react-router-dom'


const YksiTuoate = ({ id, image, title, price, description }) => {





  return (
    <Link to={`/tuote/${id}`} className='bg-white shadow overflow-hidden rounded-md w-full cursor-pointer'>
      <img src={image} alt={title} />
      <div className='px-1'>
        <div className='flex items-center justify-between'>
          <h2 className='py-2 text-slate-500 font-semibold text-sm'>{title}</h2>
          <p className='text-red-600 font-semibold text-sm'>{price}€</p>
        </div>
        <p className='text-sm text-slate-600 line-clamp-2 mb-4 w-full'>{description}</p>
      </div>
    </Link>
  )
}

export default YksiTuoate
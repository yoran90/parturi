import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'


const YksiTuoate = ({ id, images, title, price, discount, description }) => {

  const [shortTextForDescription, setShortTextForDescription] = React.useState('');
  const [shortTitle, setShortTitle] = React.useState('');

  const truncateWord = (text, limit = 100) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const truncateTitle = (text, limit = 15) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  useEffect(() => {
    setShortTitle(truncateTitle(title));
    setShortTextForDescription(truncateWord(description));
  }, [description, title]);

  return (
    <Link to={`/tuote/${id}`} className='bg-white shadow border border-slate-300 overflow-hidden rounded-md w-full cursor-pointer'>
      {
        images && images.length > 0 && (
          <img src={`http://localhost:8001/${images[0].replaceAll('\\', '/')}`} alt={title} className='w-full h-[150px] border-slate-300' />
        )
      }
      <hr className='mt-2 text-slate-200' />
      <div className='px-1 mt-2'>
        <div className='flex items-center justify-between'>
          <h2 className='py-2 text-slate-500 font-semibold text-xs line-clamp-2'>{shortTitle}</h2>
          {
              discount > 0 ? (
                <div className='flex items-center justify-center gap-2 relative'>
                  <p className=' text-slate-500 line-through'>{price}€</p>
                  <p className='font-semibold text-lg text-red-600'>{(price - (price * discount) / 100).toFixed(2)}€</p>
                  <small className='absolute -top-6 right-0 text-xs bg-red-500 text-white py-1 px-2'>{discount}%</small>
                </div>
              ) : (
                <div>
                  <p className='font-semibold text-lg text-red-600'>{price}€</p>
                </div>
              )
            }
        </div>
        <div className='text-sm py-2 px-1' dangerouslySetInnerHTML={{ __html: shortTextForDescription }} />
        
      </div>
    </Link>
  )
}

export default YksiTuoate
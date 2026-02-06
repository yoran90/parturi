import React from 'react'
import axios from 'axios'
import { LuArrowUpRight } from "react-icons/lu";


const GoogleReviews = () => {


  const [googlereview, setGoogleReview] = React.useState([]);
  const [googleRating, setGoogleRating] = React.useState(0);


  React.useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/google-reviews/get-google-reviews`);
        setGoogleReview(response.data.reviews);
        setGoogleRating(response.data.rating);
      } catch (error) {
       console.log(error);
      }
    };
    fetchGoogleReviews();
  }, []);


  

  return (
      <div>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Google Arvostelut</p>
          <p className='text-sm'>Customer Reviews ⭐ {googleRating}</p>
        </div>
        <hr className='text-slate-300 mt-3 mb-3' />
        {googlereview.length === 0 && <p>No reviews available yet.</p>}
        {googlereview.map((review, index) => (
          <div key={index} style={{ padding: "10px 0" }} className='border border-slate-200'>
            <div className='flex justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <img src={review.profile_photo_url} alt="" className='w-8 h-8 rounded-full' />
                <div className='flex flex-col'>
                  <p className='text-sm'>{review.author_name}</p>
                  <span className='text-xs'>{review.relative_time_description}</span>
                </div>
              </div>
              <p className='text-sm'>{review.rating}⭐</p>
            </div>
            <div className='ml-1'>
              <p className='text-sm'>{review.text}</p>
            </div>
          </div>
        ))}
        <div className='mt-4 flex justify-end mb-6'>
          <a className='text-sm text-blue-600 hover:underline flex gap-0.5'
            href={`https://www.google.com/maps/place/Razor+Parturi+Barber+Shop/@60.2099199,25.1423213,20z/data=!4m6!3m5!1s0x46920f7a6f6b2c71:0x19d593a1f4cdb95b!8m2!3d60.2077421!4d25.1445851!16s%2Fg%2F11vy_c9z9d?entry=ttu&g_ep=EgoyMDI2MDIwMy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D`}
            target="_blank"
            rel="noopener noreferrer"
            >
            Näytä kaikki arvostelut Googlessa
            <LuArrowUpRight />
            
          </a>
        </div>
    </div>
  )
}

export default GoogleReviews
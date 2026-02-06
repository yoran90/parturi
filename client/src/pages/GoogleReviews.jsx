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
        <div className='md:grid md:grid-cols-3 flex flex-col gap-1.5'>
          {googlereview.length === 0 && <p>No reviews available yet.</p>}
          {googlereview.slice(0, 3).map((review, index) => (
            <div key={index} className='bg-white shadow px-4 py-7 border border-slate-200 rounded-xl'>
              <div className='flex justify-between mb-6'>
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
                <p className='text-sm line-clamp-5'>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4 flex justify-center'>
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
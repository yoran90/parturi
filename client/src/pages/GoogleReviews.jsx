import React from 'react'
import axios from 'axios'
import { LuArrowUpRight } from "react-icons/lu";


const GoogleReviews = () => {


  const [googlereview, setGoogleReview] = React.useState([]);
  const [googleRating, setGoogleRating] = React.useState(0);


  React.useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/google-reviews/get-google-reviews');
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
            <div key={index} className='bg-white shadow px-4 py-7 border border-slate-100 rounded-xl'>
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
            href={`https://www.google.com/maps/place/?q=place_id:${import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            >
            View all reviews on Google
            <LuArrowUpRight />
            
          </a>
        </div>
    </div>
  )
}

export default GoogleReviews
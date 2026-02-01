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
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Google Arvostelut</p>
          <p className='text-sm'>Customer Reviews ⭐ {googleRating}</p>
        </div>
        <hr className='text-slate-300 mt-3 mb-3' />
        {googlereview.length === 0 && <p>No reviews available yet.</p>}
        {googlereview.map((review, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
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
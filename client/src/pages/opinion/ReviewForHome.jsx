import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoStar, GoStarFill } from 'react-icons/go';

const ReviewForHome = () => {
  const [getReviews, setGetReviews] = useState([]);

  useEffect(() => {
    const fetchReviwes = async () => {
      const response = await axios.get("http://localhost:8001/api/reviwes/getReviews?limit=3");
      setGetReviews(response.data || []);
    }
    fetchReviwes();
  }, []);


  console.log(getReviews);
  

  return (
    <div>
      <div className='flex flex-col w-[95%] items-center justify-center m-auto mb-12'>
        <div className='grid md:grid-cols-3 lg:grid-cols-3 grid-cols-1 gap-4 m-auto'>
          {getReviews.map((review) => (
            <div key={review._id} className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 py-4 px-2 rounded-2xl'>
              <div className='flex items-center gap-2.5 mb-6'>
                {
                  review?.profileImage ? (
                    <img className='w-10 h-10 border border-slate-500 rounded-full' src={review?.profileImage} alt="" />
                  ) : (
                    review?.gender === 'men' ? (
                      <img className='w-10 h-10 border border-slate-500 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                    ) : (
                      <img className='w-10 h-10 border border-slate-500 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                    )
                  )
                }
                <div className='flex flex-col'>
                  <h3 className='text-sm font-semibold text-slate-500'>{review.firstName} {review.lastName}</h3>
                  <small className='text-[11px] text-slate-400'>{new Date(review?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</small>
                </div>
              </div>
              <div className='text-sm flex flex-col items-center mb-4'>
                <div className='flex gap-0.5'>
                  {
                    [...Array(5)].map((_, index) => {
                      return (
                        index < review.rating ? 
                          <div key={index}>
                            <GoStarFill className='text-yellow-500' size={20} /> 
                          </div>
                        : 
                          <div key={index}>
                            <GoStar size={20}  className='text-slate-500' />
                          </div>
                      )
                    })
                  }
                
                </div>
                <span className='text-slate-600'>{review?.rating} / 5</span>
              </div>
              <div>
                <p className='text-sm text-slate-600 line-clamp-4 px-2'>{review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewForHome;

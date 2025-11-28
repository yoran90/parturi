import React, { useEffect, useRef, useState } from 'react'
import useReviews from '../../hooks/useReviews';
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import ReviewText from './ReviewText';
import LikeComments from './LikeComments';

const Reviews = ({ text }) => {

  const { getReviews } = useReviews();
  console.log(getReviews);
  
 
  

  return (
    <div>
      {/* reviews */}
      {
        getReviews?.length === 0 && (
          <div className='text-center text-slate-500 text-sm mt-12'>No Reviews yet</div>
        )
      }
      {
        getReviews?.map((item, index) => {
          return (
            <div key={index} className='border-t border-b border-slate-300 pt-5 pb-5'>
              <div className='flex justify-between gap-2'>
                <div className='flex gap-2'>
                  {
                    item?.profileImage ? (
                      <img className='w-8.5 h-8.5 border border-slate-100 rounded-full' src={item?.profileImage} alt="" />
                    ) : (
                      item?.gender === 'men' ? (
                        <img className='w-8.5 h-8.5 rounded-full border border-slate-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-8.5 h-8.5  rounded-full border border-slate-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                  <div className='flex flex-col'>
                    <p className='text-slate-600 text-sm'>{item?.firstNmae} {item?.lastName}</p>
                    <small className="text-xs text-slate-500">
                      {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </small>
                  </div>
                </div>
                <div className='text-sm flex flex-col items-center'>
                  <div className='flex gap-0.5'>
                    {
                      [...Array(5)].map((_, index) => {
                        return (
                          index < item.rating ? 
                            <div key={index}>
                              <GoStarFill className='text-yellow-500' size={16} /> 
                            </div>
                          : 
                            <div key={index}>
                              <GoStar size={16}  className='text-slate-500' />
                            </div>
                        )
                      })
                    }
                  
                  </div>
                  <span className='text-slate-600'>{item?.rating} / 5</span>
                </div>
              </div>
              <div className='relative  gap-2 text-justify'>
                <div className={`text-[13px] text-slate-700 mt-4`}>
                 <ReviewText text={item?.reviewText} />          
                </div>
                <div className='justify-end flex'>
            
               
                  </div>
              </div>
              {item?.image && (
                <img className='w-full h-72 object-cover rounded mt-2' src={item?.image?.url} alt="" />
              )
              }
              <LikeComments />
            </div>
          )
        })
      }
      {/* end reviews */}
    </div>
  )
}

export default Reviews

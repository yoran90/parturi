import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const DisplayFeedBack = () => {


  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedBack/getAllFeedbacks`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        
        setFeedbacks(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className='px-1 py-2'>
      <div className='flex flex-col gap-0.5 items-center justify-center'>
        <h3 className='text-sm text-slate-700'>User FeedBacks</h3>
        <p className='text-sm text-slate-700'>Here are the user feedBacks you have received</p>
      </div>
      <div className='flex flex-col gap-1.5 mt-3 h-[85vh] overflow-y-scroll scrollbarStyle pr-2'>
        {feedbacks?.map((feedback, index) => (
          <div key={index} className='flex flex-col gap-0.5 border p-2 rounded border-slate-300 shadow'>
            <div className=' flex flex-col gap-1 mb-2'>
              <p className='text-sm text-slate-700'>👤 {feedback?.firstName} {feedback?.lastName}</p>
              <p className='text-sm text-slate-700'>📧 {feedback?.email}</p>
            </div>
            <p className='text-sm text-slate-700'>{feedback?.message}</p>
          </div>
        ))

        }
      </div>
    </div>
  )
}

export default DisplayFeedBack
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import { MdOutlinePlaylistRemove } from "react-icons/md";

const DisplayFeedBack = () => {


  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingForButtondelete, setLoadingForButtondelete] = useState(false);
  const [laodingforDeleteingAllFeedBack, setLoadingForDeleteingAllFeedBack] = useState(false);

  const emojisDraw = [
    '😡', '😕', '😐', '🙂', '😍'
  ]

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedBack/getAllFeedbacks`,
          {
            withCredentials: true,
          }
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchFeedback();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      setLoadingForButtondelete((prev) => ({...prev, [id]: true}));
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/feedBack/deleteSingleFeedback/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      setFeedbacks(feedbacks.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForButtondelete((prev) => ({...prev, [id]: false}));
    }
  }
  
  const deleteAllFeedBack = async () => {
    try {
      setLoadingForDeleteingAllFeedBack(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/feedBack/deleteAllFeedbacks`, { withCredentials: true });
      toast.success(response.data.message);
      setFeedbacks([]);
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingForDeleteingAllFeedBack(false);
    }
  }

  return (
    <div className='px-1 py-2'>
      <div className='flex flex-col gap-0.5 items-center justify-center'>
        <h3 className='text-sm text-slate-700'>User FeedBacks</h3>
        <p className='text-sm text-slate-700'>Here are the user feedBacks you have received</p>
      </div>
      {feedbacks?.length === 0 && (
        <div className='flex items-center justify-center mt-62 pb-62'>
          <p className='text-sm text-red-700'>No FeedBacks</p>
        </div>
      )

      }
      {feedbacks?.length > 0 && (
          <div className='flex items-end justify-end'>
            <button type='button' onClick={() => deleteAllFeedBack()} className='flex items-center gap-0.5 bg-red-700 hover:bg-red-600 cursor-pointer text-white py-1 px-2 text-sm mt-4 rounded mr-4'>
              {laodingforDeleteingAllFeedBack ? (
                <div className='flex items-center gap-1'>
                  <p>Deleting All Feedback</p>
                  <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                </div>
                ) : (
                  <div className='flex items-center gap-0.5'>
                    Delete All Feedback
                    <MdOutlinePlaylistRemove size={20} />
                  </div>
                )

              }
            </button>
          </div>
        )
      }
      <div className={`flex flex-col gap-1.5 mt-3 ${feedbacks?.length > 0 && 'h-[81vh] overflow-y-scroll scrollbarStyle pr-2'} `}>
        {feedbacks?.map((feedback, index) => (
          <div key={index} className='flex flex-col gap-0.5 border p-2 rounded border-slate-300 shadow'>
            <div className='flex justify-between'>
              <div className=' flex flex-col gap-1 mb-2'>
                <div className='text-sm text-slate-700 flex items-center gap-1'>
                  👤 {!feedback?.firstName && !feedback?.lastName
                        ? <p className='text-red-600'>No Added Name</p>
                        : `${feedback?.firstName} ${feedback?.lastName}`
                      }
                </div>
                <div className='text-sm text-slate-700 flex items-center gap-1'>📧 {!feedback?.email ? <p className='text-red-600'>No Added Email</p> : `${feedback?.email}`}</div>
              </div>
              <div className='gap-0.5 hidden md:flex'>
                <p className='text-sm'>User FeedBack</p>
                <p className='text-sm text-slate-700'>
                  ({emojisDraw[feedback?.rating]})
                </p>

              </div>
              <div>
                <button type='button' onClick={() => deleteFeedback(feedback._id)} className='flex items-center gap-0.5 cursor-pointer text-sm bg-red-600 hover:bg-red-700 py-1 px-2 rounded text-white'>
                  {loadingForButtondelete[feedback._id] ? (
                      <div className='flex items-center gap-1'>
                        <p>Deleting</p>
                        <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                      </div>
                    ) : (
                      <div className='flex items-center gap-0.5'>
                        Delete
                        <BsTrash className='text-white' />
                      </div>
                    )
                  }
                </button>
              </div>
            </div>
            <div className='gap-0.5 flex md:hidden mt-2 mb-2 items-center justify-center'>
                <p className='text-sm'>User FeedBack</p>
                <p className='text-sm text-slate-700'>
                  ({emojisDraw[feedback?.rating]})
                </p>
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
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  useDeleteReviewById, useReviewById } from '../../hooks/useReviews';
import { GoStar, GoStarFill } from 'react-icons/go';
import { BsGenderMale } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loading from '../../loading/Loading';







const SingleReview = () => {

  const {id } = useParams();
  const navigate = useNavigate();


  const { getReview } = useReviewById(id);
  const { deleteReview, deleteReviewHnadler, loadingForButton } = useDeleteReviewById(id);

  const handleDelete = async () => {
    await deleteReviewHnadler();
    navigate('/admin/allReviews');
    toast.success("Review deleted successfully!");
  }
  

  return (
    <div className='p-4'>
      <div className='flex flex-col gap-3.5'>
        <div className='flex justify-between gap-2.5'>
          <div className='md:flex gap-4.5'>
            <div>
            {
              getReview?.profileImage ? (
                <img className='w-52 h-52 border border-slate-500 rounded' src={getReview?.profileImage} alt="" />
              ) : (
                getReview?.gender === 'men' ? (
                  <img className='w-52 h-52 border border-slate-500 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                ) : (
                  <img className='w-52 h-52 border border-slate-500 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                )
              )
            }
          </div>
          <div className='flex flex-col gap-0.5 text-slate-700'>
            <div className='flex items-center gap-3.5'>
              <p>👤 Full Name:</p>
              <p className='text-lg'>{getReview?.firstName} {getReview?.lastName}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p>📧 Email:</p>
              <p className='text-sm'>{getReview?.email}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p className='flex items-center gap-2'><BsGenderMale /> Gender:</p>
              <p className='text-sm'>{getReview?.gender}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p className='flex items-center gap-2'>📅 Date:</p>
              <p className='text-sm'>{new Date(getReview?.createdAt).toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p>💬 Comments</p>
              <p className='text-lg text-red-600'>{getReview?.comments.length}</p>
            </div>
            <div className='flex items-center gap-3.5'>
              <p>🩷 Likes</p>
              <p className='text-lg text-red-600'>{getReview?.likes.count}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <div>
                <p className='text-lg text-slate-600 mr-4'>Review:</p>
              </div>
              <div>
              <div className='flex gap-1.5 mt-4'>
                {
                  [...Array(5)].map((_, index) => {
                    return (
                      index < getReview?.rating ? 
                      (
                        <div key={index}>
                          <GoStarFill className='text-yellow-500' size={16} /> 
                        </div>
                      )
                      : 
                      (
                        <div key={index}>
                          <GoStar size={16}  className='text-slate-500' />
                        </div>
                      )
                    );
                  })
                }
              </div>
              <p>{getReview?.rating} / 5</p>
              </div>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 flex items-center gap-1 text-white py-1.5 cursor-pointer px-4 text-sm rounded'>
              <BsTrash3Fill />
              {
                loadingForButton ? (
                  <div className='flex items-center gap-1'>
                    <p>Removing</p>
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : (
                  <div>
                    Remove
                  </div>
                )
               } 
            </button>
          </div>
        </div>
        <div>
          <p className='text-lg text-slate-600'>Review Text:</p>
        </div>
        <div className='mb-4'>
          {
            getReview?.mediaReview?.type === 'image' ? (
              <img className='w-full h-62 object-fill border border-slate-500 rounded' src={getReview?.mediaReview?.url} alt="" />
            ) : (
              <video src={getReview?.mediaReview?.url} className='w-full h-62 border border-slate-500 rounded' controls></video>
            )
          }
        </div>
        <div className='flex flex-col gap-1.5 md:h-[30vh] md:overflow-y-scroll scrollbarStyle'>
          <p>{getReview?.reviewText}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleReview
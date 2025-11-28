import React from 'react'
import { IoMdHeart } from "react-icons/io";
import { FaRegCommentDots } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LikeComments = () => {

  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  return (
    <div className='mt-4'>
      <hr className='text-slate-300 mb-3' />
      <div className='flex items-center gap-[30%]'>
        <div className='flex items-center gap-1 cursor-pointer'>
          <IoMdHeart className='text-red-600' />
          <span className='text-xs text-slate-600'>12 Likes</span>
        </div>
        <div onClick={() => {
          if (!user) {
            toast.error("Sinun tulee kirjautua sisään, jotta voit commentoida");
            navigate('/kirjaudu');
            return
          }
        }} className='flex gap-1 cursor-pointer'>
          <FaRegCommentDots className='text-slate-500' />
          <span className='text-xs text-slate-600'>12 Comments</span>
        </div>
      </div>
      <hr className='text-slate-300 mb-3 mt-3' />
      <div>
          {
            user && (
              <div className='flex items-center gap-1 cursor-pointer'>
                {
                  user?.profileImage?.url ? (
                    <img className='w-7 h-7 border border-slate-500 rounded-full' src={user?.profileImage?.url} alt="" />
                  ) : (
                    user?.gender === 'men' ? (
                      <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                    ) : (
                      <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                    )
                  )
                }
                <input type="text" className='border border-slate-400 py-1 w-full rounded-full text-sm px-3 outline-none' placeholder='Kirjoittaa kommentti...'/>
              </div>
            )
          }

        </div>
    </div>
  )
}

export default LikeComments
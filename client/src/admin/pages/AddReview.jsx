import React from 'react'
import { FaPhotoVideo } from "react-icons/fa";



const AddReview = () => {
  return (
    <div className=' bg-white shadow border border-slate-300 rounded m-4 py-6 px-4'>
      <div className='flex flex-col items-center justify-center'>
        <h3>Add Review</h3>
        <p className='text-sm'>Here you can add title description multiply images or video</p>
      </div>
      <form className='mt-8 md:px8 px-2 flex flex-col gap-4'>
        <div className='flex flex-col gap-1.5 text-sm'>
          <label htmlFor="">Title </label>
          <input type="text" className='border border-slate-400 rounded text-sm py-1.5 px-3' placeholder='Enter title...' />
        </div>
        <div className='flex flex-col gap-1.5 text-sm'>
          <label htmlFor="">Description </label>
          <textarea name="" id="" cols="30" rows="10" className='border border-slate-400 rounded text-sm py-1.5 resize-none px-3' placeholder='Enter description...'></textarea>
        </div>
        <div className='flex flex-col gap-1.5 text-sm'>
          <p htmlFor="">Image & Video </p>
          <label htmlFor="imageVideoReview" className='cursor-pointer border border-dashed text-slate-500 hover:bg-slate-100 flex flex-col items-center justify-center rounded text-sm h-52 py-1.5 px-3'>
            <FaPhotoVideo size={40} />
            <p>Upload Image & Video</p>
          </label>
          <input type="file" id='imageVideoReview' hidden multiple accept='image/*, video/*' />
        </div>
        <div className='flex items-end justify-end mt-8 mb-8'>
          <button type='submit' className='bg-red-600 hover:bg-red-500 text-white text-sm py-2 px-4 rounded cursor-pointer'>Save Change</button>
        </div>

      </form>
    </div>
  )
}

export default AddReview
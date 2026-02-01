import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import StartRating from './StartRating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import { ImVideoCamera } from "react-icons/im";
import { FaPhotoVideo } from "react-icons/fa";

const OpinionForm = ({ closeModel, isOpen }) => {
  const { user } = useSelector((state) => state.userAuth);

  const [loadingForButton, setLoadingForButton] = useState(false);
  const [loadingForImage, setLoadingForImage] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(null); 
  const [mediaReview, setMediaReview] = useState(null); 

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPreview(null);
      setMediaReview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!reviewText || reviewText.length < 5) {
      toast.error('Review text must be at least 5 characters long.');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    try {
      setLoadingForButton(true);

      const formData = new FormData();
      formData.append('reviewText', reviewText);
      formData.append('rating', rating);
      if (mediaReview) formData.append('mediaReview', mediaReview);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/addReview`, formData, { withCredentials: true });
      toast.success('Review added successfully.');
      closeModel();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    } finally {
      setLoadingForButton(false);
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='flex flex-col bg-white w-full max-w-2xl md:px-12 px-4 py-14 h-[92vh] md:h-auto rounded-lg relative overflow-y-scroll screollStyle'>
        <button onClick={closeModel} className='absolute top-4 right-4 text-sm cursor-pointer'>❌</button>

        {/* User info */}
        <div className='flex items-center gap-2'>
          {user?.profileImage?.url ? (
            <img className='w-12 h-12 border border-slate-500 rounded-full' src={user.profileImage.url} alt="" />
          ) : (
            <img
              className='w-12 h-12 rounded-full border border-slate-500'
              src={user?.gender === 'men'
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s"}
              alt=""
            />
          )}
          <div className='flex flex-col'>
            <p className='text-sm font-semibold text-slate-700'>{user?.firstName} {user?.lastName}</p>
            <small>Julkaistaan tästä parturi kotisivus palveluissa</small>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='w-full mt-4'>
          {/* Review Text */}
          <div className='flex flex-col gap-1.5 my-4'>
            <label className='text-sm font-semibold text-gray-500'>Arvostelu</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              cols="30"
              rows="10"
              className='border border-slate-400 rounded resize-none w-full text-sm p-2'
              placeholder='Kerro mista kokemuksistasi tässä paikassa...'
            ></textarea>
          </div>

          {/* Media Upload */}
          <div className='flex flex-col gap-1.5 my-4'>
            <p className='text-sm font-semibold text-gray-500'>Lisää kuva/video</p>
            <label htmlFor="image" className='border border-dashed h-62 rounded flex items-center justify-center text-center cursor-pointer hover:bg-slate-100'>
              {preview ? (
                preview.type === "image" ? (
                  <img className="w-full h-full object-cover" src={preview.src} alt="" />
                ) : (
                  <video className="w-full h-full object-cover" src={preview.src} controls />
                )
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  {loadingForImage ? (
                    <Loading width={55} height={55} border="4px" topBorder="4px" borderColor="red" borderTopColor="white" />
                  ) : (
                    <>
                      <div className='flex items-center justify-center gap-2.5'>
                        <FaPhotoVideo className="text-slate-500 text-3xl" />
                        <ImVideoCamera className="text-slate-500 text-3xl" />
                      </div>
                      <p className="text-sm text-slate-500">Valitse kuva tai video</p>
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                data-testid="image-input"
                type="file"
                id="image"
                accept="image/*,video/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const isImage = file.type.startsWith("image");
                  setPreview({ type: isImage ? "image" : "video", src: URL.createObjectURL(file) });
                  setMediaReview(file);
                }}
              />
            </label>
          </div>

          {/* Rating */}
          <div className='flex flex-col gap-1.5'>
            <p className='text-sm font-semibold text-gray-500'>Kuinka monta tähteä antaisit?</p>
            <StartRating rating={rating} setRating={setRating} />
          </div>

          {/* Buttons */}
          <div className='flex items-end justify-end mt-8 gap-3.5'>
            <button type='button' onClick={closeModel} className='bg-black text-white px-4 py-2 rounded text-sm cursor-pointer'>Peru</button>
            <button type='submit' className='bg-red-600 text-white py-2 px-4 text-sm rounded hover:bg-red-500 cursor-pointer'>
              {loadingForButton ? (
                <div className='flex items-center gap-1.5'>
                  <p>Ladataan</p>
                  <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                </div>
              ) : "Julkaise"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpinionForm;

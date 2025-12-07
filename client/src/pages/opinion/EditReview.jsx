import React, { useEffect } from 'react'
import { GoStar, GoStarFill } from 'react-icons/go';
import StarRating from './StartRating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';




const EditReview = ({ closeModel, item, fetchReviwes }) => {


  const [reviewText, setReviewText] = React.useState('');
  const [mediaReview, setMediaReview] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [loading, setLoading] = React.useState(false);


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      if (reviewText) {
        formData.append('reviewText', reviewText);
      }
      if (mediaReview) {
        formData.append('mediaReview', mediaReview);
      }
      if (rating) {
        formData.append('rating', rating);
      }
      const response = await axios.put(`http://localhost:8001/api/reviwes/updateReview/${item._id}`, formData, { withCredentials: true });
      toast.success('Review updated successfully.');
      await fetchReviwes();
      closeModel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setReviewText(item?.reviewText || '');
    setMediaReview(item?.image?.url || null);
    setRating(item?.rating || 0);
  }, [item]);

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center z-50 bg-black/60'>
      <div className='bg-white md:w-full w-[96%] m-auto max-w-2xl py-10 md:px-6 px-3 relative rounded-md h-[90vh] md:overflow-hidden overflow-y-scroll scrollbarStyle'>
        <div className='top-3 right-3 absolute text-sm cursor-pointer'>
          <button className='cursor-pointer' onClick={closeModel}>❌</button>
        </div>
        {/* edit review */}
        <div>
          <h3 className='text-lg font-semibold text-slate-600'>Edit Your Review </h3>
          <p>Here you can update your 💬 text and 🎦 image</p>
        </div>
        <hr className='text-slate-300 mt-4' />
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} cols="30" rows="8" className='border border-slate-300 p-4 rounded resize-none'></textarea>
          <label htmlFor="image">
            {mediaReview ? (
              mediaReview.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(mediaReview)}
                  alt=""
                  className="w-full h-[250px] rounded cursor-pointer border border-slate-300"
                />
              ) : (
                <video
                  className="w-full h-[250px] rounded cursor-pointer border border-slate-300"
                  src={URL.createObjectURL(mediaReview)}
                  controls
                >
                  <source src={URL.createObjectURL(mediaReview)} type={mediaReview.type} />
                </video>
              )
            ) : (
              item?.mediaReview?.type === "image" ? (
                <img
                  src={item.mediaReview.url}
                  alt=""
                  className="w-full h-[250px] rounded cursor-pointer border border-slate-300"
                />
              ) : (
                <video
                  src={item.mediaReview.url}
                  controls
                  className="w-full h-[250px] rounded cursor-pointer border border-slate-300 pointer-events-none"
                >
                  <source src={item.mediaReview.url} type="video/mp4" />
                </video>
              )
            )}

            <input
              type="file"
              id="image"
              hidden
              accept="image/*, video/*"
              onChange={(e) => setMediaReview(e.target.files[0])}
            />
          </label>

          <div className='flex gap-0.5'>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className='flex items-end justify-end mt-4'>
            <button type='submit' className='bg-red-600 hover-bg-red-500 px-3 py-2 rounded cursor-pointer text-sm text-white'>
              {
                loading ? (
                  <div className='flex items-center gap-1.5'>
                    <p>Saving</p>
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : (
                  'Save Change'
                )
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditReview
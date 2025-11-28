import React from 'react'
import { FaCamera } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import StartRating from './StartRating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';

const OpinionForm = ({ closeModel }) => {

  const { user } = useSelector((state) => state.userAuth);

  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [loadingForImage, setLoadingForImage] = React.useState(false);
  const [reviewText, setReviewText] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [image, setImage] = React.useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (reviewText.length === 0) {
      toast.error('Please enter a review text.');
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

      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post("http://localhost:8001/api/reviwes/addReview", formData, { withCredentials: true });
      toast.success('Review added successfully.');
      closeModel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForButton(false);
    }
    
  };


  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='flex flex-col bg-white w-full max-w-2xl px-12 py-14 rounded-lg relative'>
        <button onClick={closeModel} className='absolute top-4 right-4 text-sm cursor-pointer'>❌</button>
      <div>
        <div className='flex items-center gap-2'>
            {
              user?.profileImage?.url ? (
                <img className='w-12 h-12 border border-slate-500 rounded-full' src={user?.profileImage?.url} alt="" />
              ) : (
                user?.gender === 'men' ? (
                  <img className='w-12 h-12 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                ) : (
                  <img className='w-12 h-12  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                )
              )
            }
            <div className='flex flex-col'>
              <p className='text-sm font-semibold text-slate-700'>{user?.firstName} {user?.lastName}</p>
              <small>Julkaistaan tästä parturi kotisivus palveluissa</small>
            </div>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className='w-full'>
          <div>
            <div className='flex flex-col gap-1.5 my-4'>
              <label className='text-sm font-semibold text-gray-500'>Arvostelu</label>
              <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} cols="30" rows="10" className='border border-slate-400 rounded resize-none w-full text-sm p-2' placeholder='Kerro mista kokemuksistasi tässä paikassa...'></textarea>
            </div>
            <div className='flex flex-col gap-1.5 my-4'>
              <p className='text-sm font-semibold text-gray-500'>Lisää kuva</p>
              <label htmlFor="image" className='border border-dashed h-62 rounded items-center justify-center text-center flex'>
                {
                  image ? (
                    <img className='w-full h-full object-fill' src={URL.createObjectURL(image)} alt="" />
                  ) : (
                    <div className='flex flex-col items-center justify-center text-center gap-1'>
                      {
                        loadingForImage ? (
                          <div className='flex items-center gap-1.5'>
                            <Loading width={55} height={55} border='4px' topBorder='4px' borderColor='red' borderTopColor='white' />
                          </div>
                        ) : (
                          <div className='flex flex-col items-center gap-1.5'>
                            <FaCamera className='text-slate-500 text-2xl'/>
                            <p className='text-sm text-slate-500'>Valitse kuva</p>
                          </div>
                        )
                      }
                    </div>
                  )
                }
                
                <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden />
              </label>
            </div>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm font-semibold text-gray-500'>Kuinka monta tähteä antaisit?</p>
              <StartRating rating={rating} setRating={setRating} />
            </div>

            <div className='flex items-end justify-end mt-8 gap-3.5'>
              <button type='button' onClick={closeModel} className='bg-black text-white px-4 py-2 rounded cursor-pointer text-sm'>Peru</button>
              <button type='submit' className='bg-red-600 text-white py-2 px-4  text-sm cursor-pointer hover:bg-red-500 rounded'>
                {
                  loadingForButton ? (
                    <div className='flex items-center gap-1.5'>
                      <p>Ladataan</p>
                      <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : (
                    <div>
                      Julkaise
                    </div>
                  )
                }
              </button>
            </div>


          </div>
        </form>
      </div>
    </div>
  )
}

export default OpinionForm
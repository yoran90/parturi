import axios from 'axios';
import React, { useEffect } from 'react'
import { FaPhotoVideo } from "react-icons/fa";
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import useShop from '../../hooks/useShop';
import { BsTrash3Fill } from "react-icons/bs";



const AddReview = () => {



  const {getShope, setShope, fetchShopMedia} = useShop();


  

  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [media, setMedia] = React.useState([]);
  const [existingMedia, setExistingMedia] = React.useState([]);
 

  const handleMediaChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setMedia((prev) => {
      const existing = prev?.map(file => file.name);
      const filtered = newFiles.filter(file => !existing.includes(file.name));
      return [...prev, ...filtered];
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      if (title) {
        formDataToSend.append('title', title);
      }
      if (description) {
        formDataToSend.append('description', description);
      }

      formDataToSend.append("existingMedia", JSON.stringify(existingMedia));

      if (media.length > 0) {
        for (let i = 0; i < media.length; i++) {
          formDataToSend.append('shopMedia', media[i]);
        }
      }
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shopMedia/createShopeMedia`, formDataToSend, { withCredentials: true });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!getShope) return;

    setTitle(getShope.title || "");
    setDescription(getShope.description || "");
    setExistingMedia(getShope.media || []);

  }, [getShope]);

  const handleRemoveMedia = (index) => {
    setExistingMedia((prev) => prev.filter((_, i) => i !== index));
  }; 
 

  return (
    <div className='mt-4 md:px-1.5 px-2'>
      <div className='bg-white w-full shadow border border-slate-300 rounded py-6 px-2 md:h-[90vh] md:overflow-y-scroll scrollbarStyle'>
        <div className='flex flex-col items-center justify-center'>
          <h3>Add Shop For Review</h3>
          <p className='text-sm'>Here you can add title description multiply images or video for beside review</p>
        </div>
        <form onSubmit={handleSubmit} className='mt-8 md:px8 px-2 flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5 text-sm'>
            <label htmlFor="">Title </label>
            <input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} className='border border-slate-400 rounded text-sm py-1.5 px-3' placeholder='Enter title...' />
          </div>
          <div className='flex flex-col gap-1.5 text-sm'>
            <label htmlFor="">Description </label>
            <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="10" className='border border-slate-400 rounded text-sm py-1.5 resize-none px-3' placeholder='Enter description...'></textarea>
          </div>
          <div className='flex flex-col gap-1.5 text-sm'>
            <p htmlFor="">Image & Video </p>
            <label htmlFor="imageVideoReview" className='cursor-pointer border border-dashed text-slate-500 hover:bg-slate-100 flex flex-col items-center justify-center rounded text-sm h-52 py-1.5 px-3'>
              <FaPhotoVideo size={40} />
              <p>Upload Image & Video</p>
            </label>
            <input type="file" data-testid="media-input" id='imageVideoReview'  hidden multiple accept='image/*, video/*' onChange={handleMediaChange} />
          </div>
          <div className='grid md:grid-cols-5 grid-cols-2 gap-2.5'>
            {media.length > 0 &&
              Array.from(media).map((media, index) => {
                const isImage = media.type.startsWith("image");
                return isImage ? (
                  <img key={index}
                  src={URL.createObjectURL(media)}
                  alt={`preview-${index}`}
                  className="w-32 h-32 object-cover mr-2"
                  />
                ) : (
                  <video
                  key={index}
                  src={URL.createObjectURL(media)}
                  controls
                    className="w-32 h-32 mr-2"
                    />
                  );
              })}
          </div>
          <div>
            <h4 className='text-sm font-semibold'>Existing Media:</h4>
            <div className='grid md:grid-cols-4 grid-cols-3 gap-2.5 mt-2'>
              {existingMedia?.map((item, index) => (
                <div key={item._id} className="relative md:w-36 w-31 h-32 border rounded overflow-hidden">
                  
                  {item.type === "image" ? (
                    <img src={item.src} className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.src} controls className="w-full h-full" />
                  )}

                  <button 
                    type="button" 
                    onClick={() => handleRemoveMedia(index)} 
                    className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white p-1"
                    >
                    <BsTrash3Fill />
                  </button>

                </div>
              ))}
            </div>  
          </div>
          <div className='flex items-end justify-end mt-8 mb-8'>
            <button type='submit' data-testid="submit-button" className='bg-red-600 hover:bg-red-500 text-white text-sm py-2 px-4 rounded cursor-pointer'>
              {
                loading ? (
                  <div className='flex items-center gap-1.5'>
                    Saving
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : 'Save Changes'
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddReview
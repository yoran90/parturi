import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsTrash3Fill } from "react-icons/bs";
import { toast } from 'react-toastify';

const ImagevideoDisplay = () => {

  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchMedia = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:8001/api/media/list");
          setMedia(response.data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchMedia();
    }, []);

    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:8001/api/media/delete/${id}`);
        if (response.data.success) {
          toast.success("Media deleted successfully.");
          setMedia(media.filter(item => item._id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    }


    if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan odota...</p>
        <style>{`
          .loader {
            border: 4px solid #ddd;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }


  return (
    <div className='m-4'>
      <div className='flex flex-col mt-2 items-center justify-center text-center'>
        <h3>All Media Main Images And Videos</h3>
        <p className='text-sm text-slate-700'>Here you can esaly see all images and videos and ofcourse delete it.</p>
      </div>
      <div className='md:grid md:grid-cols-4 flex flex-col grid-cols-1 md:gap-4 gap-6 mt-6'>
        {
          media?.map((item ) => (
            <div key={item._id} className='relative'>
              <div onClick={() => setSelectedMedia(item)} className=' md:w-[190px] h-[150px] border border-slate-400 flex items-center justify-center rounded shadow overflow-hidden'>
                {item.type === 'image' ? (
                  <img src={item.src} alt={item.alt} className='w-full h-full' />
                ) : (
                  <video src={item.src} alt={item.alt} className='w-full h-full' controls></video>
                ) }
              </div>
              <button onClick={(e) => handleDelete(item._id)} className='absolute -top-4 -right-3 bg-red-500 p-2 rounded-full text-xs cursor-pointer text-white hover:bg-red-600'>
                <BsTrash3Fill />
              </button>
            </div>
          ))
        }
      </div>
      {
        media.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-12'>
            <h3 className='text-lg text-red-600'>No media found.</h3>
          </div>
        )
      }
      {/* open model */}
      {selectedMedia && (
      <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
        <button 
            className='absolute top-2 right-2 text-white p-4 cursor-pointer'
            onClick={() => setSelectedMedia(null)}
          >
            ❌
            
          </button>
        <div className='relative'>
          {selectedMedia?.type === 'image' ? (
            <img src={selectedMedia.src} alt={selectedMedia.alt} className='max-w-full max-h-screen' />
          ) : (
            <video src={selectedMedia.src} alt={selectedMedia.alt} className='max-w-full max-h-screen' controls autoPlay />
          )}
        </div>
      </div>
      )}
    </div>
  )
}

export default ImagevideoDisplay
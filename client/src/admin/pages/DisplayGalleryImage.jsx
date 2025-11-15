import React from 'react'
import useGallery from '../../hooks/useGallery';
import axios from 'axios';
import { toast } from 'react-toastify';

const DisplayGalleryImage = () => {

  const { galleryImages, setGalleryImages, loading } = useGallery();

  const handleDeleteGalleryImage = async (galleryId, imagePath) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/media/deleteGalleryImage`, {
        data: { galleryId, imagePath }
      });

      if (response.data.success) {
        setGalleryImages(galleryImages.filter(image => image.path !== imagePath));
        toast.success('Gallery image deleted successfully');
      }

    } catch (error) {
      console.log(error);
      toast.error('Failed to delete image');
    }
  };

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
     <div className='mt-2 h-[95vh] overflow-y-scroll pb-12'>
      <div className='flex flex-col items-center justify-center md:px-0 px-4 text-center'>
        <h3>Gallery Images</h3>
        <p className='text-slate-600 text-sm'>Here you can see all gallery images and you can delete them</p>
      </div>

      {galleryImages.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-6'>
          <h4 className='text-red-600'>No Gallery Images Found</h4>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 md:p-4 p-2 mt-4'>
          {galleryImages.map((image, index) => (
            <div key={index} className='border border-slate-300 rounded p-2 flex flex-col gap-2'>
              <img
                src={`http://localhost:8001/${image.path.replace(/\\/g, "/")}`}
                alt=''
                className='w-full h-40 object-cover rounded'
              />
              <button
                className='bg-red-600 text-white hover:bg-red-700 px-2 py-1 text-sm rounded cursor-pointer'
                onClick={() => handleDeleteGalleryImage(image.galleryId, image.path)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DisplayGalleryImage


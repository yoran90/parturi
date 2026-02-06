import axios from 'axios';
import React, { useEffect } from 'react'

const GallaryLimit = () => {
  const [galleryImages, setGalleryImages] = React.useState([]);

   /* galleria */
   useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/media/galleryImages?limit=4`);
        setGalleryImages(response.data.data);
      } catch (error) {
        console.log(error);
      } 
    }
    fetchGalleryImages();
  }, []);

  const allImages = galleryImages?.flatMap(gallery => gallery.images) || [];
  const limitedImages = allImages.slice(0, 4);

  return (
    <div className='w-[98%] m-auto'>
      {
        <div className='grid md:grid-cols-4 grid-cols-2 gap-1.5'>
          {
            limitedImages.length > 0 && limitedImages?.map((image, index) => (
              <img key={index} src={image.url} className='md:w-75 w-full h-65 cursor-pointer border border-slate-500 rounded-md' alt={`gallery-${index}`} />   
            ))
          }
        </div> 
      }
    </div>
  )
}

export default GallaryLimit
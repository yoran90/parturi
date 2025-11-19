import axios from 'axios';
import React, { useEffect } from 'react'

const GallaryLimit = () => {
  const [galleryImages, setGalleryImages] = React.useState([]);

   /* galleria */
   useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/media/galleryImages?limit=4');
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
    <div className='w-[95%] m-auto'>
      {
        <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
          {
            limitedImages.length > 0 && limitedImages?.map((image, index) => (
              <img key={index} src={image.url} className='md:w-[300px] w-full h-[260px] cursor-pointer border border-slate-500 rounded-md' alt="" />   
            ))
          }
        </div> 
      }
    </div>
  )
}

export default GallaryLimit
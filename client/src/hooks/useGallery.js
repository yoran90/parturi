import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


export default function useGallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8001/api/media/galleryImages');
        const allImages = response.data.data.flatMap(gallery =>
          gallery.images.map(img => ({
            galleryId: gallery._id,
            path: img
          }))
        );
        setGalleryImages(allImages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryImages();
  }, []);

  return { galleryImages, setGalleryImages, loading };
}
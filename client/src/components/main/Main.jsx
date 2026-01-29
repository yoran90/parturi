import React, { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import Loading from '../../loading/Loading';

const Main = () => {


  const [media, setMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/media/list");
        
        setMedia(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMedia();
  }, []);


  const prevMedia = () => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
      setFadeClass("opacity-100");
    }, 500);  
  };

  
  const nextMedia = () => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
      setFadeClass("opacity-100");
    }, 500);  
  };

  
  useEffect(() => {
    if (media.length === 0) return;
    const interval = setInterval(nextMedia, 5000); 
    return () => clearInterval(interval);  
  }, [media.length]);


  const  currentMedia = media[currentIndex];

  if (!currentMedia) {
    return (
      <div className='relative w-full md:h-[500px] lg:h-[600px] h-[500px] overflow-hidden flex items-center justify-center'>
        <Loading width={60} height={60} border='6px' topBorder='6px' borderColor='red' borderTopColor='white' />
      </div>
    );
  }

  if (media.length === 0) return <Loading width={60} height={60} border='6px' topBorder='6px' borderColor='red' borderTopColor='white' />


  return (
    <div className='relative w-full md:h-[85vh] h-[60vh] overflow-hidden'>
      {/* Render image or video with smooth fade transition */}
      <div className={`transition-opacity flex justify-center items-center duration-1000 ease-in-out w-full md:h-full h-[45vh]`} key={currentIndex}>
        {
          currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.src} 
              alt={currentMedia.alt} 
              className={`w-full h-full transition-opacity duration-500 ${fadeClass}`} 
            />
          ) : (
            <video
              data-testid="intro-video"
              src={currentMedia.src}
              alt={currentMedia.alt}
              className={`w-full h-full object-cover transition-opacity duration-500 ${fadeClass}`}
              controls
              autoPlay
              loop
              muted
              playsInline
            />

          )
        }
      </div>
      
      {/* Left and Right Arrow Buttons */}
      <div className="absolute left-0 right-0 md:top-1/2 md:-translate-y-1/1 top-50  flex justify-between px-4 md:px-8" style={{ zoom: '0.8'}}>
        <button onClick={prevMedia} className='bg-red-500 text-white cursor-pointer p-2 rounded-full shadow-lg hover:bg-red-600 transition duration-200'>
          <IoIosArrowBack size={20} />
        </button>
        <button onClick={nextMedia} className='bg-red-500 text-white p-2 cursor-pointer rounded-full shadow-lg hover:bg-red-600 transition duration-200'>
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
}

export default Main;

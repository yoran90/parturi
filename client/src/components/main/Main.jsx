import React, { useEffect, useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import videoOne from '../../videos/videoOne.mp4';
import videoTwo from '../../videos/videoTwo.mp4';
import videoThree from '../../videos/videoThree.mp4';

const Main = () => {
  // List of images and videos
  const media = [
    {
      type: "image",
      src: "https://t4.ftcdn.net/jpg/06/53/08/43/360_F_653084321_MKD2Htfu2da6YfwMG5ucJ8NrJFfTYiDa.jpg",
      alt: "Image 1",
    },
    {
      type: "image",
      src: "https://t4.ftcdn.net/jpg/02/62/72/33/360_F_262723391_doimfQxblXCW7HZFQk3OdnQVV33hlS0F.jpg",
      alt: "Image 2",
    },
    {
      type: "image",
      src: "https://www.shutterstock.com/image-photo/haircut-concept-man-visiting-hairstylist-600nw-2273064557.jpg",
      alt: "Image 3",
    },
    {
      type: 'video',
      src: videoOne,
      alt: "Video 1",
    },
    {
      type: 'video',
      src: videoTwo,
      alt: "Video 2",
    },
    {
      type: 'video',
      src: videoThree,
      alt: "Video 3",
    }
  ];

  // State for managing the current media index and fade effect
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  // Function for showing the previous media
  const prevMedia = () => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
      setFadeClass("opacity-100");
    }, 500);  // Fade transition time
  };

  // Function for showing the next media
  const nextMedia = () => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
      setFadeClass("opacity-100");
    }, 500);  // Fade transition time
  };

  // Auto-change the media every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextMedia, 5000); 
    return () => clearInterval(interval);  
  }, []);

  return (
    <div className='relative w-full md:h-[500px] lg:h-[600px] h-[400px] overflow-hidden'>
      {/* Render image or video with smooth fade transition */}
      <div className="transition-opacity duration-1000 ease-in-out" key={currentIndex}>
        {
          media[currentIndex].type === 'image' ? (
            <img 
              src={media[currentIndex].src} 
              alt={media[currentIndex].alt} 
              className={`w-full h-full object-cover transition-opacity duration-500 ${fadeClass}`} 
            />
          ) : (
            <video 
              src={media[currentIndex].src} 
              alt={media[currentIndex].alt} 
              className={`w-full h-full object-cover transition-opacity duration-500 ${fadeClass}`} 
              controls 
              autoPlay 
            />
          )
        }
      </div>
      
      {/* Left and Right Arrow Buttons */}
      <div className="absolute md:top-50 lg:top-70 top-1/4 left-0 right-0 flex justify-between px-4 md:px-8" style={{ zoom: '0.9'}}>
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

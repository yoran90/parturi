import React, { useEffect } from 'react'
import { IoIosArrowUp } from "react-icons/io";



const BackToTop = () => {

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };

  }, []);
  

  return (
    <>
      {
        isVisible && (
          <button onClick={() => scrollToTop()} className='fixed bottom-5 right-5 flex cursor-pointer w-8 h-8 border-2 text-center justify-center items-center border-green-600 rounded-full'>
            <IoIosArrowUp className='text-green-500' />
          </button>
        )
      }
    </>
  )
}

export default BackToTop
import React, { useEffect } from 'react'
import { IoIosArrowUp } from "react-icons/io";



const BackToTop = () => {

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 1200) {
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
          <button onClick={scrollToTop} className='fixed bottom-16 right-5 flex cursor-pointer w-10 h-10 border-2 text-center justify-center items-center border-[#c59d5f] rounded-full hover:bg-[#c59d5f] group transition-all duration-300
             hover:bg-green-600"'>
            <IoIosArrowUp className='text-[#c59d5f] group-hover:text-white' size={22} />
          </button>
        )
      }
    </>
  )
}

export default BackToTop
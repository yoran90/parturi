import React from 'react'
import Header from '../components/header/Header'
import Information from '../components/up-header/information'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import { MdArrowOutward } from "react-icons/md";
import GallaryLimit from './GallaryLimit'
import { Link } from 'react-router-dom'
import useAboutUs from '../hooks/useAboutUs'

const Meistä = () => {

  const { getAboutUs } = useAboutUs();

  console.log(getAboutUs);
  

  return (
    <div>
      <Information />
      <Header />
      <div>
        <div className='relative'>
          
          <img src={getAboutUs?.image} alt="" className='w-full h-[60vh]' />
          <div className='absolute w-full text-white flex flex-col items-center justify-center text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {
              getAboutUs && getAboutUs.imageTitles?.map((title, index) => (
                <p key={index} className='md:text-3xl text-xl'>{title}</p>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col w-[95%] m-auto gap-8 items-center text-center justify-center mt-12 mb-12'>
          <div>
            <h3 className='text-xl text-gray-500 mb-4 font-semibold'></h3>
            <p className='text-slate-600 md:w-[80%] m-auto'>
            </p>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold text-slate-500'>Työmme ⬇️</h3>
            <GallaryLimit />
            <Link to={'/galaria'} className='text-blue-500 flex items-center justify-center gap-1 hover:text-blue-700'>
              Kasto Galleria
              <MdArrowOutward />
            </Link>
          </div>

        </div>
      </div>
      {/* map */}
      <Map />
      {/* footer */}
      <Footer />
    </div>
  )
}

export default Meistä
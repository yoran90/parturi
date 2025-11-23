import React from 'react'
import Header from '../components/header/Header'
import Information from '../components/up-header/Information'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import { MdArrowOutward } from "react-icons/md";
import GallaryLimit from './GallaryLimit'
import { Link } from 'react-router-dom'
import useAboutUs from '../hooks/useAboutUs'
import HolyDay from '../components/holy-day/HolyDay'

const Meistä = () => {

  const { getAboutUs } = useAboutUs();
  

  return (
    <div>
      <Information />
      <HolyDay /> 
      <Header />
      <div>
        <div className='relative'>
          <img src={getAboutUs?.image} alt="" className='w-full h-[60vh]' />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className='absolute w-full text-white flex flex-col items-center justify-center text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col'>
              {
                getAboutUs && getAboutUs.imageTitles?.map((title, index) => (
                  <p key={index} className='md:text-3xl text-xl'>{title}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='flex flex-col w-[95%] m-auto gap-10 items-center text-center justify-center mt-12 mb-12'>
          {
            getAboutUs && getAboutUs?.sections?.map((section, index) => (
              <div key={index}>
                <h3 className='text-xl w-full text-gray-500 mb-4 font-semibold'>{section.title}</h3>
                <div className='text-slate-600 md:w-full md:px-16 m-auto' dangerouslySetInnerHTML={{__html: section?.description}} />
              </div>
            ))
          }
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
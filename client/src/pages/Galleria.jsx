import React from 'react'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import Information from '../components/up-header/Information'
import Header from '../components/header/Header'
import useGallery from '../hooks/useGallery'
import { useState } from 'react'
import useTitleForPage from '../hooks/useTitleForPage'
import HolyDay from '../components/holy-day/HolyDay'
import HeaderText from '../components/header-text/HeaderText'

const Galleria = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  const { galleryImages, loading } = useGallery();
  
  const { getTitleForPage } = useTitleForPage();

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan galleria...</p>
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
    <div>
      <Information />
      <HeaderText />
      <HolyDay />
      <Header />
      <div className='flex flex-col gap-3.5 items-center justify-center mt-6'>
        <h3 className='text-lg '> {getTitleForPage?.titleForPage?.galleriTitle}</h3>
        <div className='text-sm md:w-[98%] text-center' dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.galleriDescription}} />
      </div>
      {
        galleryImages.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-6'>
            <h4 className='text-red-600'>Galleriakuvia ei löytynyt</h4>
          </div>
        )
      }
      {/* image gallery */}
      <div className='grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 grid-cols-2 gap-1.5 m-2 mt-8 mb-8'>
        {
          galleryImages?.map((image, index) => (
            <img key={index} src={image?.url} onClick={() => setSelectedImage(image)} className='w-75 h-64 cursor-pointer border border-slate-300 shadow-lg rounded-md' alt={`Gallery image ${index + 1}`} />
          ))
        }
        {
          selectedImage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setSelectedImage(null)}>
              <button className='flex absolute z-100 top-2.5 right-2.5 cursor-pointer' onClick={() => setSelectedImage(false)}>❌</button>
              <img className="max-w-full w-[90%] max-h-full md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] h-[55%] rounded-xl border-3 border-red-600" src={selectedImage?.url} alt="" />
            </div>
          )
        }
      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default Galleria
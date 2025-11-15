import React from 'react'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import Information from '../components/up-header/information'
import Header from '../components/header/Header'
import useGallery from '../hooks/useGallery'

const Galleria = () => {

  const [selectedImage, setSelectedImage] = React.useState(null);

  const { galleryImages, loading } = useGallery();

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
      <Header />
      <div className='flex flex-col gap-3.5 items-center justify-center mt-6'>
        <h3 className='text-lg text-slate-600'> 📸 Galleria</h3>
        <p className='text-slate-600 text-sm md:w-[70%] text-center'>
          Tervetuloa tutustumaan Luon Parturin tyyliin! Täältä näet esimerkkejä hiustenleikkauksista, parranmuotoiluista ja tunnelmasta liikkeessämme. Jokainen tyyli tehdään ammattitaidolla ja asiakkaan persoonallisuutta kunnioittaen.
        </p>
      </div>
      {
        galleryImages.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-6'>
            <h4 className='text-red-600'>No Gallery Images Found</h4>
          </div>
        )
      }
      {/* image gallery */}
      <div className='md:grid md:grid-cols-4 flex flex-col gap-2.5 w-[95%] m-auto mt-8 mb-12'>
        {
          galleryImages?.map((image, index) => (
            <img key={index} src={`http://localhost:8001/${image.path.replace(/\\/g, "/")}`} onClick={() => setSelectedImage(image)} className='md:w-[300px] w-full h-[300px] cursor-pointer border-3 border-slate-600 rounded-md' alt="" />
          ))
        }
        {
          selectedImage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setSelectedImage(null)}>
              <button className='flex absolute z-100 top-2.5 right-2.5 cursor-pointer' onClick={() => setSelectedImage(false)}>❌</button>
              <img className="max-w-full max-h-full w-[90%] h-[90%]" src={`http://localhost:8001/${selectedImage.path.replace(/\\/g, "/")}`} alt="" />
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
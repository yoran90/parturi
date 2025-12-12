import React, { useEffect } from 'react'
import Header from '../../components/header/Header'
import Information from '../../components/up-header/Information'
import HolyDay from '../../components/holy-day/HolyDay'
import { useSelector } from 'react-redux'
import useInformation from '../../hooks/useInformation'
import Footer from '../../components/footer/Footer'
import OpinionForm from './OpinionForm'
import Reviews from './Reviews'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useShop from '../../hooks/useShop'




const OpinionUser = () => {

  
  const {getShope, setShope, fetchShopMedia} = useShop();
 


  const { getInformation } = useInformation();
  const { user } = useSelector((state) => state.userAuth);

  const [selectedImage, setSelectedImage] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("reviews");
  const [openOpinionForm, setOpenOpinionForm] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (getShope && getShope.media.length > 0) {
      setSelectedImage(0);
    }
    
  }, [getShope]);

  function hasVisibleText(html) {
    if (!html) return false;

    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent.trim().length > 0;
  }




  

  return (
    <div>
      <Information />
      <HolyDay />
      <Header />
      <div className='md:flex w-full px-2 mt-4 gap-3'>
        {/* right side baber */}
        <div className='w-full mb-12'>
          {
           getShope ? (
              <>
                <div className='flex flex-col pl-2 mb-4'>
                  <h3 className='text-md font-semibold text-gray-500 mb-4'>{getShope?.title}</h3>
                  <p className='text-sm text-slate-800 text-justify'>{getShope?.description}</p>
                </div>
                <div className='flex flex-col w-full gap-1.5'>
                  <div className='flex gap-1 cursor-pointer mt-4 pb-3 overflow-x-scroll scrollbarStylex flex-nowrap w-full'>

                    {
                      getShope?.media.map((media, index) => {
                        return (
                          <div key={index} onClick={() => setSelectedImage(index)} className='flex-none'>
                            {
                              media.type === 'image' ? (
                                <div>
                                <img key={index} src={media.src} alt="" className='w-32 h-22 border border-slate-300 rounded' />
                                </div>
                              ) : (
                                <video key={index} src={media.src}  className='w-32 h-22 border border-slate-300 rounded'></video>
                              )
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className='w-full h-[60vh]'>
                    {
                      getShope?.media[selectedImage]?.type === 'image' ? (
                        <img src={getShope?.media[selectedImage]?.src} alt="" className='w-full h-full rounded' />
                      ) : (
                        <video src={getShope?.media[selectedImage]?.src} controls autoPlay className='w-full h-full rounded border border-slate-200'></video>
                      )
                    }
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2></h2>
                </div>
              </>
            )
          }
          <hr className='text-slate-200 mt-2' />
          <div className="w-full h-[200px] mt-2 border border-slate-300 rounded">
            {/* Embed Google Maps using iframe */}
            <iframe 
              src={getInformation?.addressUrlForMap} 
              width="100%" 
              height="100%" 
              style={{ border: '0' }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* information */}
          <div className='mt-4 flex flex-col gap-1'>
            <div className='flex items-center gap-2.5'>
              <h3 className='text-sm font-semibold text-slate-700'>Katu osoite:</h3>
              <h3 className='text-sm'>{getInformation?.address}</h3>
            </div>
            <div className='flex items-center gap-2.5'>
              <h3 className='text-slate-700 font-semibold text-sm'>Puhelinnumero:</h3>
              <h3 className='text-sm'>{getInformation?.phone}</h3>
            </div>
            <div className='flex mt-4 gap-2.5'>
              <h3 className='text-slate-700 font-semibold text-sm'>Avoina:</h3>
              {
                hasVisibleText(getInformation?.holyday) ? (
                  <div>
                    <div className='text-sm' dangerouslySetInnerHTML={{__html: getInformation?.holyday}} />
                  </div>
                ) : (
                  <div>
                    <div className='text-sm text-black' dangerouslySetInnerHTML={{__html: getInformation?.openingHours}} />
                  </div>
                )
              }
              
            </div>
          </div>
        </div>
        {/* left side form */}
        <div className='w-full'>
          <div>
            <h3 className='text-lg font-semibold text-gray-500 mb-4'>Arvostelut</h3>
          </div>
          {/* <p className='text-sm text-slate-800'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, qui? Iusto sint saepe harum neque quos optio, voluptas quas voluptates unde commodi cum nam laboriosam expedita provident quasi nulla natus.
          </p> */}
          <div className='flex items-center justify-evenly border border-slate-300 rounded mt-4 overflow-hidden'>
            <button onClick={() => {
              if (!user) {
                toast.error("Sinun tulee kirjautua sisään, jotta voit lisätä arvosteluja.")
                navigate("/kirjaudu")
                return
              }
              setActiveTab("form")
              setOpenOpinionForm(true)
            }} 
            className={`${activeTab === "form" ? "bg-black text-white"  : "" } text-sm py-2 font-semibold  cursor-pointer w-full text-slate-600`}>Kirjoita arvostelu</button>
            <button onClick={() => {
              setActiveTab("reviews")
              setOpenOpinionForm(false)
            }} className={`${activeTab === "reviews" ? "bg-red-800 text-white"  : "" } text-sm py-2 w-full font-semibold cursor-pointer text-slate-600`}>Arvostelut</button>
          </div>
          {
            activeTab === "reviews" ? (
              <div className='mt-4'>
                <div className='mb-4'>
                  <p className='text-slate-700 text-sm'>Arvostelut tästä paikasta</p>
                </div>
                <div className='w-full md:h-[1150px] md:overflow-y-scroll pr-3 scrollbarStyle'>
                  <Reviews />
                </div>
              </div>
            ) : (
              null
            )
          }
          {
            openOpinionForm && user && (
              <div>
                <OpinionForm closeModel={() => { setOpenOpinionForm(false); setActiveTab("reviews") }}  />
              </div>
            )
          }
        
        </div>
      </div>
      
      {/* footer */}
      <Footer />
    </div>
  )
}

export default OpinionUser
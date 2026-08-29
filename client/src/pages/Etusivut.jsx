import React from 'react'
import Main from '../components/main/Main'
import { FaFacebook, FaFacebookF, FaMapMarkerAlt, FaShareAlt, FaSnapchat, FaSnapchatGhost, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdPhoneInTalk } from 'react-icons/md';
import { IoLogoInstagram, IoMdClock } from "react-icons/io";
import { MdLocalPolice } from "react-icons/md";
import { GiBeard } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Map from '../components/map/Map';
import Footer from '../components/footer/Footer';
import Information from '../components/up-header/Information';
import Header from '../components/header/Header';
import { CgInstagram } from 'react-icons/cg';
import useInformation from '../hooks/useInformation';
import GallaryLimit from './GallaryLimit';
import ProductLimit from './ProductLimit';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import HolyDay from '../components/holy-day/HolyDay';
import { GoArrowUpRight } from "react-icons/go";
import useTitleForPage from '../hooks/useTitleForPage';
import ReviewForHome from './opinion/ReviewForHome';

import GoolgleReviews from './GoogleReviews';
import HeaderText from '../components/header-text/HeaderText';






const Etusivut = () => {

  const { getInformation, loading } = useInformation();
  const { getTitleForPage } = useTitleForPage();

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan odota...</p>
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
      <Main />
      <div>
        <div className='bg-white text-black shadow border border-slate-200 md:mt-6 w-[98%] md:py-0 py-8 mx-auto md:rounded-xl -mt-20'>
          <div className='md:flex items-center md:justify-between md:px-16 pt-4'>
            <div className='min-h-25'>
              <a className='flex md:mb-0 mb-6 gap-1 flex-col items-center justify-center' href={getInformation?.addressUrl} target="_blank" rel="noopener noreferrer">
                <div className='flex md:flex-col items-center md:gap-0 gap-3'>
                  <FaMapMarkerAlt size={20} />
                  <h3 className='text-sm font-bold mt-2 md:border-b mb-2'>OSOITE</h3>
                </div>
                {getInformation?.address ? (
                    <div className='flex flex-col items-center justify-center text-center'>
                      <p className='text-xs font-semibold'>{getInformation?.address}</p>
                      <p className='text-xs font-semibold'>{getInformation?.located}</p>
                    </div>
                  ) : (
                    <div>
                      <p className='text-xs font-semibold'>Ei vielä osoitetta</p>
                    </div>
                  )

                }
              </a>
            </div>
            <div className='min-h-25 md:mb-0 mb-3 md:mt-0 mt-10'> 
              <div className='flex flex-col items-center justify-center md:border-b  mb-3 gap-2'>
                <div className='flex md:flex-col items-center md:gap-2 gap-3'>
                  <FaShareAlt size={20} />
                  <h3>Seuraa Meitä</h3>
                </div>
              </div>
              <div className='flex items-center justify-center gap-3.5'>
                {getInformation?.socialMedia ? (
                    <div className='flex items-center gap-4'>
                      {
                        getInformation?.socialMedia?.map((sm, index) => (
                          <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                            {sm.platform === "facebook" && <FaFacebookF className='bg-blue-600 text-white border border-amber-600 rounded-full p-1'  size={22} />}
                            {sm.platform === "instagram" && <IoLogoInstagram className='bg-pink-900 border border-amber-600 text-white rounded-full p-1'  size={22} />}
                            {sm.platform === "tiktok" && <FaTiktok className='bg-black border border-amber-600 text-white rounded-full p-1'  size={22} />}
                            {sm.platform === "snapchat" && <FaSnapchatGhost  className='bg-yellow-400 text-white border border-black rounded-full p-1'  size={22} />}
                            {sm.platform === "twitter" && <FaTwitter className='bg-blue-400 border border-black text-white rounded-full p-1'  size={22} />}
                            {sm.platform === "youtube" && <FaYoutube className='bg-red-600 border border-black text-white rounded-full p-1'  size={22} />}
                          </a>
                        ))
                      }
                    </div>
                  ) : (
                    <div>
                      <p className='text-xs font-semibold'>Ei vielä sosiaalialueita</p>
                    </div>

                  )
                }
                
              </div>
            </div>
            <div className="flex flex-col items-center justify-start min-h-25">
              <div className='flex md:flex-col items-center md:gap-0 gap-3'>
                <MdPhoneInTalk size={24} />
                <h3 className="text-sm font-bold mt-2 md:border-b mb-3">PUHELIN</h3>
              </div>
              {getInformation?.phone ? (
                  <div>
                    <a href={`tel:${getInformation?.phone}`} className="text-xs font-semibold">
                      {getInformation?.phone}
                    </a>
                  </div>
                ) : (
                  <div>
                    <p className='text-xs font-semibold text-slate-500'>Ei vielä puhelinnumeroa</p>
                  </div>
                )

              }
            </div>
          </div>
        </div>
        <div className='md:flex gap-2.5 w-[98%] h-auto m-auto mt-12  mb-12'>
        {/* text side */}
          <div className='flex flex-col items-center bg-white shadow border overflow-hidden border-slate-200 md:rounded-2xl mb-2 rounded-2xl'>
            <h3 className='text-sm font-semibold mb-2 mt-6'>TERVETULOA</h3>
            <div className='px-4 py-4 w-full'>
              <p className='text-sm mb-4 text-[#000000]'>
                Tervetuloa Razor parturiin, jossa hiukset saavat ansaitsemansa huomion ja asiakkaat palvellaan sydämellä. Meiltä saat yksilöllistä palvelua, ammattitaitoa ja rennon tunnelman – juuri sellaisen parturikokemuksen kuin sinulle sopii.
                </p>
              <p className='text-sm text-[#000000]'>
                Olitpa tulossa pieneen siistimiseen tai isompaan tyylimuutokseen, autamme löytämään juuri sinulle sopivan ilmeen. Käytämme laadukkaita tuotteita ja pidämme huolta, että jokainen käynti on mukava hetki arjen keskellä. Astut sisään, rentoudut – ja lähdet pois raikkaana, hyvällä mielellä ja tyylikkäänä.
              </p>
            </div>
          </div>
          {/* image side */}
          <div >
            <img className='rounded-2xl w-full h-full' src="https://parmishairandbeauty.nl/wp-content/uploads/2024/02/MAN-HAIRCUT_PARMIS-BEAUTY_DELFT-scaled-1.jpg" alt="" />
          </div>
        </div>
      </div>
      {/* parturipalvelut */}
      <div className='mt-8 mb-12' >
        <div>
          <h3 className=' font-semibold text-center mb-4'>Razor parturipalvelut</h3>
          <p className='text-sm  text-center mb-4'>Razor parturiin saavat ansaitsemansa huomion ja asiakkaat palvellaan sydaremellä.</p>
          <div className='md:flex gap-2.5 w-[98%] m-auto' style={{zoom: '0.8'}}>
            <div className='md:w-[50%]'>
              <img className='rounded-2xl' src="https://www.bonhomme.com/wp-content/uploads/2023/07/Trouver-le-meilleur-barbier-de-Paris-quels-criteres-selectionner.png" alt="" />
            </div>
            
            <div className='md:w-[50%] grid grid-cols-1 gap-4.5 md:mt-0 mt-6'>
              <div className='bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center rounded-2xl'>
                <img src="https://static.thenounproject.com/png/8170822-200.png" alt="" className='w-38 h-38' />
                <div className='flex flex-col gap-2 items-center justify-center pb-5 px-5'>
                  <h3 className='text-black/90 text-2xl font-semibold'>Hiustenleikkaus</h3>
                  <p className='text-lg text-center text-black/90'>Moderni ja huolellinen hiustenleikkaus juuri sinun tyyliisi.</p>
                </div>
              </div>
              <div className='bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center rounded-2xl'>
                <img src="https://static.vecteezy.com/system/resources/previews/049/296/405/non_2x/barber-icon-set-straight-razor-blade-graphic-signs-isolated-on-white-background-barber-symbols-illustration-vector.jpg" alt="" className='w-38 h-38' />
                <div className='flex flex-col gap-2 items-center justify-center pb-5 px-5'>
                  <h3 className='text-black/90 text-2xl font-semibold'>Parranajo</h3>
                  <p className='text-lg text-center text-black/90'>Tarkka ja viimeistelty parranajo ammattitaidolla.</p>
                </div>
              </div>
              <div className='bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center rounded-2xl'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_A2qbjjp-90S4a8LPRMZcv6kNve601b8IgwyDy1dDP4qhgWJjhbCmXU1&s=10" alt="" className='w-32 h-32' />
                <div className='flex flex-col gap-2 items-center justify-center pb-5 px-5'>
                  <h3 className='text-black/90 text-2xl font-semibold'>Parran siistiminen</h3>
                  <p className='text-lg text-center text-black/90'>Muotoilu, rajaukset ja viimeistely täydelliseen lopputulokseen.</p>
                </div>
              </div>
              <div className='bg-white border border-slate-200 shadow-md flex flex-col items-center justify-center rounded-2xl'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/046/273/178/small/cherubic-charm-black-icon-of-toddler-face-little-love-toddler-face-in-black-vector.jpg" alt="" className='w-20 h-20 mb-4 mt-4' />
                <div className='flex flex-col gap-2 items-center justify-center pb-5 px-5'>
                  <h3 className='text-black/90 text-2xl font-semibold'>Lasten hiustenleikkaus</h3>
                  <p className='text-lg text-center text-black/90'>Rento ja ystävällinen leikkaus myös pienemmille asiakkaille.</p>
                </div>
              </div>
              
            </div>
           
          </div>
        </div>
      </div>
      {/* why choose us */}
      <div className='flex flex-col w-[98%] items-center justify-center m-auto'>
        <h3 className='text-lg font-semibold mb-4'>💈 Miksi Valita Meidät 💈</h3>
        <p className='text-sm  text-center mb-6 md:w-[95%]'>Razor Parturissa yhdistyvät ammattitaito, intohimo ja aito välittäminen.
          Olemme licensed ja kokeneita alan ammattilaisia, jotka seuraavat trendejä ja kehittävät osaamistaan jatkuvasti.
          Asiakkaamme luottavat meihin, koska jokainen leikkaus, parran muotoilu ja viimeistely tehdään huolella ja yksilöllisesti.
          Kun istut tuoliimme, voit rentoutua – olet hyvissä ja luotettavissa käsissä.
        </p>
        <div className='flex flex-col md:flex-row gap-1.5 m-auto'>
          <div className='flex flex-col items-center justify-center bg-white text-black shadow border border-slate-200 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <MdLocalPolice size={30} className='text-orange-500 h-12' />
              <h3 className='text-md font-semibold '>Ammattilainen</h3>
            </div>
            <p className='text-sm  text-center items-center'>Olemme pätevöityneitä ammattilaisia, joilla on alan koulutus ja virallinen osaaminen. Meille hiustenhoito ei ole vain työtä – se on ammatti, jota teemme ylpeydellä ja tarkkuudella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white text-black shadow border border-slate-200 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <GiBeard size={32} className='h-12' />
              <h3 className='text-md font-semibold '>Mestari / huippuosaaja</h3>
            </div>
            <p className='text-sm  text-center items-center'>Työmme perustuu mestarin varmuuteen ja tarkkaan silmään. Vuodet kokemusta ja jatkuva kouluttautuminen takaavat, että jokainen leikkaus ja tyyli tehdään huippuosaamisella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white text-black shadow border border-slate-200 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <VscWorkspaceTrusted size={26} className='text-green-700 h-12' />
              <h3 className='text-md font-semibold '>Luotettu / asiakkaiden suosima</h3>
            </div>
            <p className='text-sm text-center items-center'>Asiakkaamme palaavat luoksemme kerta toisensa jälkeen, sillä olemme luotettu valinta hiustenleikkauksessa ja tyylinmuutoksissa. Luottamus ansaitaan – me teemme sen joka käynnillä.</p>
          </div>
        </div>
      </div>

      {/* google reviews */}
      <div className='flex flex-col w-[98%] items-center justify-center m-auto'>
        {/* <h3 className='text-lg font-semibold mb-4'>🌟 Google Arvostelut 🌟</h3> */}
        <GoolgleReviews />
      </div>

      {/* products */}
      <div className='flex flex-col gap-2 mt-12 mb-12'>
        <div className='flex flex-col gap-2 text-center mb-6'>
          <h3 className="text-center font-semibold">{getTitleForPage?.titleForPage?.productTitle}</h3>
          <div className='text-sm  w-[95%] m-auto line-clamp-3' dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.productDescription}} />
        </div>
        <ProductLimit />
        <div className='flex items-center justify-center mt-4'>
          <Link to={'/tuotet'}>
            <button className='bg-red-500 hover:bg-red-600 text-white py-1.5 cursor-pointer px-4 rounded-full text-xs group'>
              Katso kaikki tuotteet
              <FaArrowRightLong  size={12} className='inline-block ml-2 group-hover:translate-x-1 transition-all' />
            </button>
          </Link>
        </div>
      </div>

     

      {/* gallery image */}
      <div className='mb-12'>
        <div className='flex flex-col gap-2 text-center mb-6'>
          <h3 className="text-center font-semibold">{getTitleForPage?.titleForPage?.galleriTitle}</h3>
          <div className='text-sm w-[95%] m-auto line-clamp-3' dangerouslySetInnerHTML={{__html: getTitleForPage?.titleForPage?.galleriDescription}} />
        </div>
        <GallaryLimit />
        <div className='flex text-center items-center justify-center mt-4'>
          <Link to={'/galleria'}>
            <button className='bg-red-500 hover:bg-red-600 text-white py-1.5 cursor-pointer px-4 rounded-full text-xs group'>
              Katso kaikki kuvat
              <FaArrowRightLong  size={12} className='inline-block ml-2 group-hover:translate-x-1 transition-all' />
            </button>
          </Link>
        </div>
      </div>

      {/* reviews */}
      <div className='md:mb-16 mb-8'>
        <div className='text-center mb-8 font-semibold flex flex-col gap-2'>
          <h3 >Arvostelut</h3>
          <div className='text-lg'>
            ⭐⭐⭐⭐⭐
          </div>
        </div>
        <ReviewForHome />
        <Link to={'/opinion'} className='flex items-center justify-center -mt-6'>
          <button className='text-blue-500 hover:text-blue-600 py-1.5 cursor-pointer px-4 rounded-full text-xs group'>
            Katso kaikki arvostelut
            <GoArrowUpRight   size={12} className='inline-block ml-2 ' />
          </button>
        </Link>
      </div>

      {/* map */}
      <Map />
      {/* footer */}
      <Footer />
      
    </div>
  )
}

export default Etusivut
import React, { useEffect, useState } from 'react';
import Information from '../components/up-header/information';
import Header from '../components/header/Header';
import Map from '../components/map/Map';
import Footer from '../components/footer/Footer';
import axios from 'axios';

const PalvelutHinta = () => {
  const [prices, setPrices] = useState([]);
  const [media, setMedia] = useState("");
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/media/list");
        const video = response.data.data.filter(item => item.type === 'video');
        const firstVideo = video[0];
        setMedia(firstVideo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMedia();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8001/api/price/getprices");
        setPrices(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan hinta...</p>
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
      <div className='flex flex-col gap-5.5 mb-12'>
        <div className='flex flex-col items-center text-center gap-2.5 mt-6'>
          <h1 className='text-lg text-slate-500 font-semibold'>💈 Hinnasto ja palvelut</h1>
          <p className='text-sm md:w-[70%] w-[95%] m-auto text-slate-600'>
            Luon Parturissa yhdistyvät ammattitaito, rento tunnelma ja yksilöllinen palvelu. Meiltä löydät hiustenleikkaukset,
            parranmuotoilut ja hoidot kaikenikäisille. Käytämme laadukkaita tuotteita ja teemme jokaisesta käynnistä miellyttävän kokemuksen.
          </p>
        </div>

        <div className='flex md:flex-row flex-col w-full md:px-8 px-2 mt-6 gap-6 justify-center items-center'>
          {/* Render Prices */}
          <div className="flex flex-col items-start gap-5.5 justify-between md:w-[50%] md:px-4 text-slate-700">
            {prices.map((price, index) => (
              <div key={index} className="flex flex-col gap-3 w-full">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-1">
                  {price.title}
                </h3>
                <div className="flex flex-col space-y-1">
                  <div dangerouslySetInnerHTML={{ __html: price.service }} />
                </div>
              </div>
            ))}
          </div>
          {/* video */}
          <div className='md:w-[50%] md:block hidden w-full h-full'>
            {media && (
              <video
                src={media.src}
                autoPlay
                loop
                muted
                controls
                className="w-full h-full rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <Map />
      <Footer />
    </div>
  );
};

export default PalvelutHinta;

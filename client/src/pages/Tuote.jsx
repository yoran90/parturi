import React from 'react'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import YksiTuoate from './YksiTuoate'
import Information from '../components/up-header/information'
import Header from '../components/header/Header'
import { useEffect } from 'react'
import axios from 'axios'

const Tuote = () => {

  const [products, setProdects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response  = await axios.get("http://localhost:8001/api/products/getAllProducts");
        setProdects(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan tuotteita...</p>
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
      <div className='flex flex-col items-center gap-2 text-center mt-6'>
        <h3 className='text-md font-semibold text-slate-600'>🧴 Tuotteet</h3>
        <p className='text-slate-600 text-sm mt-2 md:w-[90%] w-[98%]'>
          Luon Parturissa käytämme ja myymme laadukkaita hiusten- ja parranhoitotuotteita, jotka tukevat täydellisesti tyyliäsi myös kotona.
          Valikoimastamme löydät muun muassa hiusvahoja, parranöljyjä, hoitosuihkeita ja muotoilutuotteita, joita käytämme myös palveluissamme.
          Tuotteitamme ei voi tilata verkosta, mutta voit ostaa ne helposti suoraan liikkeestämme käyntisi yhteydessä.
          Autamme mielellämme valitsemaan juuri sinun hiuksillesi ja parrallesi sopivat tuotteet!
        </p>
        <p className='text-md text-slate-600'>
          📍 Tule käymään ja löydä uudet suosikkituotteesi!
        </p>
      </div>
      {/* product */}
      <div className='w-full mt-12 mb-12'>
        <div className='grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2 gap-1.5 m-2'>
          {
            products.map((product) => {
              return (
                <YksiTuoate key={product._id} id={product._id} images={product.images} title={product.title} price={product.price} discount={product.discount} description={product.description} />
              )
            })
          }
        </div>
      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default Tuote

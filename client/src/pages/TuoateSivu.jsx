import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import Information from '../components/up-header/information'
import Header from '../components/header/Header'
import axios from 'axios'
import ProductLimit from './ProductLimit'
import useTitleForPage from '../hooks/useTitleForPage'


const TuoateSivu = () => {

  
  const { id } = useParams()

  const [product, setProduct] = useState(null);
  const [selectImages, setSelectImages] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchProductByid = async (productId) => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8001/api/products/getProduct/${productId}`)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchProductByid(id) 
    }
  }, [id]);

  useEffect(() => {
    if (product?.images.length > 0) {
      setSelectImages(product?.images[0])
    }
  }, [product]);


  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan tuotte...</p>
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
      <div className='md:flex w-full mt-12 p-4 gap-3.5 mb-12'>
        <div className='md:w-[50%] h-[80vh] '>
          <img src={ selectImages ? selectImages.url : product?.images[0]?.url } alt={product?.title} className='w-full h-[60vh] border border-slate-300 rounded object-fill' />
          {
            product?.images.length > 1 && (
              <div className='flex gap-1 cursor-pointer mt-4 pb-3 overflow-x-scroll scrollbarStylex'>
                {
                  product?.images.map((image, index) => (
                    <img key={index} onClick={() => setSelectImages(image)} src={image.url} alt={product?.title} className='w-[24.5%] h-[15vh] border border-slate-300 rounded object-fill' />
                  ))
                }
              </div>
            )
          }
        </div>
        <div className='md:w-[50%] md:mt-0 mt-8'>
          <h1 className='font-semibold text-sm text-slate-600'>{product?.title}</h1>
          <div className='flex items-center justify-between mb-8 mt-4'>
            {
              product?.discount > 0 ? (
                <div className='flex flex-col  gap-2.5'>
                  <div className='flex gap-2.5'>
                    <p className='text-lg text-slate-400 line-through'>{product?.price}€</p>
                    <p className='font-semibold text-lg text-red-600'>{(product.price - (product.price * product.discount) / 100).toFixed(2)}€</p>
                  </div>
                  <p className='bg-red-500 text-white py-1 px-4 rounded text-sm'>{product?.discount}% alennus</p>
                </div>
              ) : (
                <div>
                  <p className='font-semibold text-lg text-red-600'>{product?.price}€</p>
                </div>
              )
            }
          </div>
          <div className='text-sm h-[68vh] overflow-y-scroll scrollbarStyle pr-2'>
            <div dangerouslySetInnerHTML={{__html: product?.description}} />
          </div>
        </div>
      </div>
      {/* Tutustu myös */}
      <div className='flex flex-col items-center mt-12 mb-12'>
        <h3 className='text-xl text-slate-500 font-semibold mb-8'>Tutustu myös </h3>
        <ProductLimit />
      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default TuoateSivu
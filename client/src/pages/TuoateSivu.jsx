import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'


const TuoateSivu = () => {

  const products = [
    {
      "id": 1,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },
    
    {
      "id": 2,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },
    {
      "id": 3,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },
    {
      "id": 4,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },
    {
      "id": 5,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },
    {
      "id": 6,
      "image": "https://images.stockcake.com/public/d/7/0/d70e932b-5787-4f20-a7cf-cf70acb98f69_large/vintage-barber-shop-stockcake.jpg",
      "title": "Hiusvaho",
      "price": 100,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae itaque sed hic dolorum provident, voluptatum saepe corrupti porro eius fugit quaerat doloribus asperiores quos rem odit fugiat pariatur alias mollitia!",
    },

  ]

  const { id } = useParams()

  const [product, setProduct] = React.useState(null)

  useEffect(() => {
    
    const foundProduct = products.find((product) => product.id === parseInt(id));
    setProduct(foundProduct)
   
  }, [id]);

  return (
    <div>
      <div className='md:flex w-full mt-12 p-4 gap-3.5 mb-12'>
        <div className='md:w-[50%] h-[60vh]'>
          <img src={product?.image} alt={product?.title} className='w-full h-full object-fill rounded-2xl' />
        </div>
        <div className='md:w-[50%]'>
          <div className='flex items-center justify-between mb-8 mt-4'>
            <h1 className='font-semibold text-lg text-slate-600'>{product?.title}</h1>
            <p className='font-semibold text-lg text-red-600'>{product?.price}€</p>
          </div>
          <p className='text-slate-500'>{product?.description}</p>
        </div>
      </div>
      {/* Tutustu myös */}
      <Map />
      <Footer />
    </div>
  )
}

export default TuoateSivu
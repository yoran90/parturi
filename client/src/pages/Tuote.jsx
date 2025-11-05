import React from 'react'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import YksiTuoate from './YksiTuoate'

const Tuote = () => {

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

  
  return (
    <div>
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
        <div className='md:grid grid-cols-3 lg:grid-cols-4 flex flex-col gap-3.5 m-2'>
          {
            products.map((product, index) => {
              return (
                <YksiTuoate key={index} id={product.id} image={product.image} title={product.title} price={product.price} description={product.description} />
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
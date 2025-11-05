import React from 'react'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'

const Galleria = () => {

  const images = [
    "https://cdn.prod.website-files.com/5cb569e54ca2fddd5451cbb2/5f333020363a6837d853b24a_5edf29d63e90394c0131a273_Slider-116_05-p-800.jpeg",
    "https://cdn.guardian.ng/wp-content/uploads/2024/05/Groomed-beards.-Photo-credit-PinterestRalphAngel.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0GUmYrbiVrv2ZYuckaKOIyiZeo55jJmVg2bbKbLLl_-s5ipcljtgdMv7puALEr1G8Lg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_zNvPrpqdSBMHa-V6Xbg7gnvXhmJ5842IGQ&s",
    "https://i.redd.it/fcxjwl23wgf51.jpg",
      
    "https://cdn.prod.website-files.com/5cb569e54ca2fddd5451cbb2/5f333020363a6837d853b24a_5edf29d63e90394c0131a273_Slider-116_05-p-800.jpeg",
    "https://cdn.guardian.ng/wp-content/uploads/2024/05/Groomed-beards.-Photo-credit-PinterestRalphAngel.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr0GUmYrbiVrv2ZYuckaKOIyiZeo55jJmVg2bbKbLLl_-s5ipcljtgdMv7puALEr1G8Lg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_zNvPrpqdSBMHa-V6Xbg7gnvXhmJ5842IGQ&s",
    "https://i.redd.it/fcxjwl23wgf51.jpg"
  ]

  const [selectedImage, setSelectedImage] = React.useState(null);

  return (
    <div>
      <div className='flex flex-col gap-3.5 items-center justify-center mt-6'>
        <h3 className='text-lg text-slate-600'> 📸 Galleria</h3>
        <p className='text-slate-600 text-sm md:w-[70%] text-center'>
          Tervetuloa tutustumaan Luon Parturin tyyliin! Täältä näet esimerkkejä hiustenleikkauksista, parranmuotoiluista ja tunnelmasta liikkeessämme. Jokainen tyyli tehdään ammattitaidolla ja asiakkaan persoonallisuutta kunnioittaen.
        </p>
      </div>
      {/* image gallery */}
      <div className='md:grid md:grid-cols-4 flex flex-col gap-2.5 w-[95%] m-auto mt-8 mb-12'>
        {
          images.map((image, index) => (
            <img key={index} onClick={() => setSelectedImage(image)} className='md:w-[300px] w-full h-[300px] cursor-pointer border-3 border-slate-600 rounded-md' src={image} alt="" />
          ))
        }
        {
          selectedImage && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setSelectedImage(null)}>
              <button className='flex absolute z-100 top-2.5 right-2.5 cursor-pointer' onClick={() => setSelectedImage(false)}>❌</button>
              <img className="max-w-full max-h-full w-[90%] h-[90%]" src={selectedImage} alt="" />
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
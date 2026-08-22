import React from 'react'
import { CgCloseO } from "react-icons/cg";

const GiftApp = ({ close}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/80'>
      <div className='md:w-full bg-white border border-slate-300 shadow-2xl pb-6 w-[98%] max-w-xl relative rounded overflow-hidden'>
        <div className='flex flex-col items-center justify-center w-full relative'>
        <button onClick={close} className='absolute top-1 right-1 cursor-pointer'>
          <CgCloseO className='text-2xl text-white' />
        </button>
          <div className='flex h-52 w-full'>
            <div className='flex flex-col items-center justify-center w-full'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMtyb9KiIO6XRBm-kdpfP3m9EcIJGN1k9DEw&s" className='h-full w-full'  />
              <div className='flex gap-5 text-white bg-black w-full justify-center py-2'>
                <div className='flex'>
                  <h1>20</h1>
                  <small>€</small>
                  <div className='w-4 h-4 ml-1 items-center justify-center flex mt-1 bg-white rounded-full'></div>
                </div>
                <div className='flex'>
                  <h1>30</h1>
                  <small>€</small>
                  <div className='w-4 h-4 ml-1 items-center justify-center flex mt-1 bg-white rounded-full'></div>
                </div>
                <div className='flex'>
                  <h1>40</h1>
                  <small>€</small>
                  <div className='w-4 h-4 ml-1 items-center justify-center flex mt-1 bg-white rounded-full'></div>
                </div>
              </div>
             
            </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGsdMwD1uDkBr4Tpbm2-EPhrpihOERrfWRVwilBR-iD57nd4lkewHuK2MC&s=10" className='h-full w-32 object-right giftImage' />
          </div>          
        </div>

        {/* text */}
        <div className='flex flex-col  w-full mt-4 px-4 gap-5 text-slate-600 text-sm leading.5'>
          <h1 className='text-2xl font-semibold text-slate-600 mb-2'>Lahjakortti</h1>
          <p>🎁 Anna lahjaksi uusi tyyli ja hyvä fiilis! ✂️💈</p>
          <p>Haluatko ilahduttaa ystävää, puolisoa, perheenjäsentä tai vaikka työkaveria? Meiltä saat lahjakortin parturipalveluihin, joka sopii täydellisesti lahjaksi jokaiseen tilanteeseen.</p>
          <p>Lahjakortin voit ostaa helposti suoraan meidän liikkeestämme. Tule käymään paikan päällä, niin autamme mielellämme sopivan lahjakortin kanssa.</p>
          <p>✨ Lahjakortti on helppo ja mieluinen lahja – anna läheisellesi mahdollisuus nauttia hyvästä palvelusta ja uudesta tyylistä!</p>
          <p>📍 Lahjakortit saatavilla meidän liikkeestämme.</p>
          <p>Tervetuloa hakemaan omasi! ❤️</p>
        </div>
      </div>
    </div>
  )
}

export default GiftApp
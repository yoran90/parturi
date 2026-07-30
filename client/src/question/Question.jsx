import React, { useState } from 'react'
import { GiRazor } from "react-icons/gi";

const Question = ({ onClose }) => {

  const [notavisible, setNotavisible] = useState(false);

  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 bg-black/70 flex justify-center items-center z-50'>
      <div className='bg-white shadow xl:w-[60%] md:w-[80%] w-[95%] relative py-6 px-4 rounded'>
         <div className="flex flex-col gap-3">
          <button onClick={onClose} className="text-xs absolute top-3 right-3 cursor-pointer">❌</button>
          <p className="flex gap-1 text-red-600"> Razor <GiRazor className='razorSidebar' /> Parturi</p>

          <h2 className='text-slate-700 mt-2'>Kuinka voimme auttaa?</h2>

          <p className="text-sm text-slate-700">
            Kysy mitä tahansa miesten partureista. Voimme auttaa sinua löytämään
            sopivan parturin, vertailemaan palveluita, tarkistamaan hinnat tai
            vastaamaan hiustenleikkauksiin ja parranhoitoon liittyviin kysymyksiin.
          </p>

          <div className="flex flex-col w-full gap-2.5">
            <div className='flex flex-col gap-1 w-full text-sm'>
              <p className='text-slate-700'>📧 Sähköpostiosoitteesi</p>
              <input className='border p-2 rounded outline-none text-sm' type="email" placeholder='Esim. "R2Y5B@example.com"' />
            </div>
            <div className='flex flex-col gap-1 w-full text-sm'>
              <p className='text-slate-700 '>❓ Kysymys</p>
              <textarea className='border p-2 rounded outline-none text-sm'
                rows={4}
                placeholder='Esim. "Etsin parturia, joka tekee hyviä fade-leikkauksia."'
              />
            </div>
          </div>

          <button onClick={() => setNotavisible(true)} className="bg-red-700 py-2 px-3 text-white rounded hover:bg-red-600 cursor-pointer text-sm">Lähetä kysymys</button>

          <div className="suggestions">
            <p className='text-slate-700 mt-4 mb-2'>Suosittuja kysymyksiä</p>
            <div className='text-slate-700 text-sm flex flex-col gap-1.5 items-start'>
              <button>💈 Etsi parturi läheltäni</button>
              <button>✂️ Haluan fade-leikkauksen</button>
              <button>🧔 Missä saa hyvän parran siistimisen?</button>
              <button>⭐ Näytä parhaat parturit</button>
              <button>💲 Mitä hiustenleikkaus maksaa?</button>
              <button>📍 Mitkä parturit ovat auki nyt?</button>
            </div>
          </div>
        </div>

        {
          notavisible && (
            <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center z-50'>
              <div className='bg-white shadow md:w-full w-[98%] max-w-xl relative py-6 px-4 rounded'>
                <div className="flex flex-col gap-2.5"></div>
                  <h2 className='text-slate-700'>Pahoittelemme</h2>
                  <p className="text-sm text-slate-700">
                    Pahoittelemme! Tämä ominaisuus ei ole vielä käytettävissä. Työskentelemme sen parissa ja se tulee saataville pian.
                  </p>
                  <button onClick={onClose} className='bg-red-700 mt-6 py-1.5 px-3 rounded  hover:bg-red-600 text-white cursor-pointer'>Ok</button>
              </div>  
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Question
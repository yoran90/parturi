import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { GiRazor } from "react-icons/gi";
import { ImUserPlus } from "react-icons/im";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


const FeedBack = ({ onClose }) => {

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [optional, setOptional] = useState('');

  const toggleOptional = () => {
    setOptional(prevOptional => !prevOptional);
  };

  const emojis = ['😡', '😕', '😐', '🙂', '😍'];


  const handleSubmit = () => {

    

  }


  return (
    <div className='fixed bottom-1 left-1 right-1 z-50'>
      <div className='bg-white shadow-xl w-full max-w-lg border border-slate-300 rounded py-10 px-3 relative' style={{ boxShadow: "4px 4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(255, 255, 255, 0.15)" }}>
        <div className='absolute top-2 right-2'>
          <button className='text-xs cursor-pointer' onClick={onClose}><GiRazor size={20} className='text-red-600' /></button>
        </div>
        <div className='flex flex-col items-center justify-center gap-2 text-center mt-2'>
          <h3 className='text-sm text-slate-700'>👋 Miten onnistuimme? Arvioi palvelumme ja jaa kokemuksesi.</h3>
          <p className='text-xs text-slate-700'>Palautteesi auttaa meitä parantamaan palveluamme ja tarjoamaan sinulle parhaan mahdollisen parturikokemuksen. Valitse sopiva emoji ja halutessasi kirjoita viesti meille.</p>
        </div>
        
        <div className='flex gap-4 items-center justify-center mt-5 text-xl '>
          {emojis.map((emoji, index) => (
              <button key={index} onClick={() => setSelectedEmoji(index)} className={`  ${selectedEmoji === index ? 'border-2 border-amber-600 text-white' : ''} border border-amber-500 rounded-full w-9 h-9   cursor-pointer`}>{emoji}</button>
            )
          )}
        </div>
        <div className={`mt-4 text-sm text-red-600 ${selectedEmoji !== null ? 'block rounded-md p-2' : 'hidden'}`}>
          {selectedEmoji !== null && (
            <div className='md:flex items-center text-center justify-center gap-2'>
              <p>Oletko varma, että haluat palauttaa palveluamme?</p>
              <p className='text-xl'>{emojis[selectedEmoji]}</p>
            </div>
          )

          }
        </div>

        <div className='flex flex-col gap-1 mt-6'>
          <p className='text-slate-600 text-xs'>Mitä ominaisuuksia voimme parantaa lisäämällä ?</p>
          <textarea cols="30" rows="8" className='border border-slate-300 resize-none w-full rounded text-xs p-2 outline-blue-800' placeholder='Haluaisimme kuulla ehdotuksesi ...'></textarea>
        </div>

        <div className='mt-6 mb-6'>
          <div className='flex items-center gap-1 mb-4 transition-all duration-300 cursor-pointer' onClick={toggleOptional}>
            <ImUserPlus className='text-slate-500' />
            <p className='text-slate-700 text-sm'>Valinnainen</p>
            <IoIosArrowDown className={`text-slate-500 ${optional ? "rotate-180" : ""} mb-2 text-slate-600 transition-transform duration-300`}/>
          </div>
          {/* {optional name and email */}
          
          <div className={`overflow-hidden transition-all duration-300 text-slate-600 flex flex-col gap-5.5 ${
              optional ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
            <div className='flex w-full gap-2'>
              <div className='flex flex-col gap-1 text-sm w-full'>
                <label htmlFor="">👤 Etunimi</label>
                <input type="text" className='border border-slate-300 rounded outline-none py-1 px-2' placeholder='Etunimesi ...' />
              </div>
              <div className='flex flex-col gap-1 text-sm w-full'>
                <label htmlFor="">🆔 sukunimi</label>
                <input type="text" className='border border-slate-300 rounded outline-none py-1 px-2' placeholder='Sukunimesi ...' />
              </div>
            </div>
            <div className='flex flex-col gap-1 text-sm w-full'>
              <label htmlFor="">📧 Sähköpostiosoitteesi</label>
              <input type="text" className='border border-slate-300 rounded outline-none py-1 px-2' placeholder='Sähköpostiosoitteesi ...' />
            </div>
          </div>
          
        </div>

        <div className='flex justify-between gap-2 mt-5 mb-5'>
          <div >
            <button type='button' onClick={onClose} className='bg-amber-600 flex items-center justify-center text-xs py-2 px-4 rounded text-white cursor-pointer'>Sivuuttaa</button>
          </div>
          <div className='flex items-center gap-2'>
            <button type='button' onClick={onClose} className='bg-black/80 hover:bg-black/90 text-white py-2 px-4 text-xs rounded cursor-pointer'>Peruuta</button>
            <button type='button' onClick={handleSubmit} disabled={!selectedEmoji} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-xs rounded cursor-pointer'>Lähetä palauta</button>
          </div>
        </div>


        <div className='flex gap-1 items-center justify-center mt-8 text-sm -mb-8'>
          <small>Powered by</small>
          <img src="https://columbus.fi/wp-content/uploads/2024/02/Razor.png" alt="razor" className='w-4 h-4 rounded-full' />
          <a href="https://www.razorr.fi" className='text-blue-500 text-xs flex items-center gap-0.5'>Razor <GiRazor /> parturi</a>
        </div>
      </div>

    </div>
  )
}

export default FeedBack
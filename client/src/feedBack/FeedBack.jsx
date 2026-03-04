import React, { useState } from 'react'
import { toast } from 'react-toastify';

const FeedBack = ({ onClose }) => {

  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = ['😡', '😕', '😐', '🙂', '😍'];
  

  const handleSubmit = () => {
    if (!selectedEmoji) {
      toast.error('Valitse emoji', { autoClose: 10000 });
      return;
    }
    toast.error('Työskentelemme asian parissa. Et voi lähettää palautetta nyt, pahoittelemme.', { autoClose: 10000 });
    console.log('hi');
    

  }


  return (
    <div className='fixed bottom-1 left-1 right-1 z-50'>
      <div className='bg-white shadow-xl w-full max-w-lg border border-slate-200 rounded py-10 px-3 relative'>
        <div className='absolute top-2 right-2'>
          <button className='text-xs cursor-pointer' onClick={onClose}>❌</button>
        </div>
        <div className='flex flex-col items-center justify-center gap-2 text-center mt-2'>
          <h3 className='text-sm text-slate-700'>👋 Miten onnistuimme? Arvioi palvelumme ja jaa kokemuksesi.</h3>
          <p className='text-xs text-slate-700'>Palautteesi auttaa meitä parantamaan palveluamme ja tarjoamaan sinulle parhaan mahdollisen parturikokemuksen. Valitse sopiva emoji ja halutessasi kirjoita viesti meille.</p>
        </div>
        
        <div className='flex gap-3 items-center justify-center mt-5 text-xl'>
          {emojis.map((emoji, index) => (
              <button key={index} onClick={() => setSelectedEmoji(index)} className={`  ${selectedEmoji === index ? 'bg-amber-300 text-white' : ''} border border-amber-500 rounded-full p-1 cursor-pointer`}>{emoji}</button>
            )
          )}
        </div>

        <div className='flex flex-col gap-1 mt-6'>
          <p className='text-slate-600 text-xs'>Mitä ominaisuuksia voimme parantaa lisäämällä ?</p>
          <textarea cols="30" rows="8" className='border border-slate-300 resize-none w-full rounded text-xs p-2 outline-blue-800' placeholder='haluaisimme kuulla ehdotuksesi'></textarea>
        </div>

        <div className='flex items-end justify-end gap-2 mt-5'>
          <button type='button' onClick={onClose} className='bg-black/80 hover:bg-black/90 text-white py-2 px-4 text-xs rounded cursor-pointer'>Peruuta</button>
          <button type='button' onClick={handleSubmit} disabled={!selectedEmoji} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 text-xs rounded cursor-pointer'>Lähetä palauta</button>
        </div>

        <div className='flex gap-1 items-center justify-center mt-8 text-sm'>
          <small>Powered by</small>
          <img src="https://columbus.fi/wp-content/uploads/2024/02/Razor.png" alt="razor" className='w-4 h-4 rounded-full' />
          <a href="https://www.razorr.fi" className='text-blue-500 text-xs'>www.razorr.fi</a>
        </div>
      </div>

    </div>
  )
}

export default FeedBack
import React from 'react'
import { GiRazor } from 'react-icons/gi'

const QuestionSuccessMessage = ({ onClose, closeMessage }) => {
  return (
     <div className='fixed  flex items-center justify-center z-50'>
      <div className='bg-white shadow-xl w-[95%] max-w-lg border border-slate-300 rounded py-6 px-3 relative '> 
        <div className='w-full flex items-center justify-between'>
          
          <GiRazor size={20} className='text-red-600' />
          <button onClick={closeMessage} className='text-xs cursor-pointer' >❌</button>
          
        </div>
        <div className='flex items-center justify-center mb-6'>
          <img src="https://cdn-icons-png.flaticon.com/512/11433/11433360.png" alt="feedBack" className='w-32 h-32 rounded-full' />
        </div>
        <div className='flex flex-col gap-3 text-center text-green-600'>
          <p className='text-md mb-2'>Kiitos viestistäsi!</p>

          <p className='text-sm'>
            Kiitos, että otit meihin yhteyttä. Olemme vastaanottaneet viestisi ja
            käsittelemme sen mahdollisimman pian.
          </p>

          <p className='text-sm'>
            Luemme kaikki yhteydenotot huolellisesti ja pyrimme vastaamaan niihin
            mahdollisimman nopeasti.
          </p>

          <p className='text-sm'>
            Mikäli viestisi vaatii lisätietoja, otamme sinuun yhteyttä antamiesi
            yhteystietojen kautta.
          </p>

          <p className='text-sm'>
            Jos kysymyksesi koskee ajanvarausta, palveluitamme tai muuta
            asiointia, autamme mielellämme.
          </p>

          <p className='text-sm'>
            Arvostamme yhteydenottoasi ja teemme parhaamme, jotta saat tarvitsemasi
            avun mahdollisimman sujuvasti.
          </p>

          <p className='text-sm'>
            Kiitos vielä kerran yhteydenotostasi. Mukavaa päivänjatkoa, ja
            tervetuloa asioimaan parturiimme!
          </p>
        </div>

        <div className='mt-6 flex gap-2.5 items-center justify-center'>
          <button type='button' onClick={() => {onClose(); closeMessage();}}  className='bg-green-600 text-white py-2 text-sm px-6 rounded'>Sulje</button>
          <button type='button' onClick={() => {onClose(); closeMessage();}}  className='bg-red-600 text-white py-2 text-sm px-6 rounded'>Ok</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionSuccessMessage
import React from 'react'
import { GiRazor } from "react-icons/gi";

const FeedBackSuccesMessage = ({ onCloseSuccesMessage, onClose }) => {
  return (
    <div className='fixed bottom-1 left-1 right-1 z-50'>
      <div className='bg-white shadow-xl w-full max-w-lg border border-slate-300 rounded py-6 px-3 relative h-full max-h-[98vh] md:overflow-hidden overflow-y-scroll scrollbarStyle'> 
        <div className='absolute top-2 right-2'>
          <button className='text-xs cursor-pointer' onClick={onCloseSuccesMessage}><GiRazor size={20} className='text-red-600' /></button>
        </div>
        <div className='flex items-center justify-center mb-6'>
          <img src="https://thumbs.dreamstime.com/b/d-smiley-face-positive-thumbs-up-gesture-cheerful-d-yellow-emoji-face-thumbs-up-representing-positive-feedback-379138408.jpg" alt="feedBack" className='w-32 h-32 rounded-full' />
        </div>
        <div className='flex flex-col gap-3 text-center text-green-600'>
          <p className='text-md mb-2'>✅ Kiitos palautteestasi!</p>
          <p className='text-sm'>
            Kiitos, että käytit hetken ajastasi palautteen antamiseen. Arvostamme suuresti mielipidettäsi, sillä palautteesi auttaa meitä kehittämään parturimme palvelua sekä parantamaan asiakaskokemusta.
          </p>
          <p className='text-sm'>
            Luemme kaikki palautteet huolellisesti ja käytämme niitä toimintamme kehittämiseen. Jokainen palaute on meille tärkeä ja auttaa meitä tarjoamaan entistä parempaa palvelua asiakkaillemme.
          </p>
          <p className='text-sm'>
            Jos jätit yhteystietosi, saatamme olla sinuun yhteydessä palautteeseesi liittyen.
          </p>
          <p className='text-sm'>
            Arvostamme myös ehdotuksia ja ideoita uusista palveluista tai parannuksista – jokainen vinkki auttaa meitä tekemään kokemuksestasi vieläkin paremman.
          </p>
          <p className='text-sm'>
            Tavoitteemme on luoda viihtyisä ja ystävällinen ympäristö, jossa jokainen asiakas tuntee olonsa tervetulleeksi. Palaute auttaa meitä varmistamaan, että tämä tavoite toteutuu jokaisella käynnilläsi.
          </p>
          <p className='text-sm'>
            Kiitos vielä kerran ja tervetuloa uudelleen! Odotamme innolla seuraavaa käyntiäsi ja mahdollisuutta palvella sinua entistä paremmin.
          </p>
        </div>

        <div className='mt-6 flex gap-2.5 items-center justify-center'>
          <button type='button' onClick={() => { onCloseSuccesMessage(); onClose(); }} className='bg-green-600 text-white py-2 text-sm px-6 rounded'>Sulje</button>
          <a href="/" className='bg-red-600 text-white py-2 text-sm px-6 rounded'>Takaisin kotisivulle</a>
        </div>
      </div>
    </div>
  )
}

export default FeedBackSuccesMessage
import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { GiRazor } from "react-icons/gi";

const InfoFeedBack = ({ setOpenFeedBack, onCloseInfo }) => {
  return (
    <div className='fixed bottom-1 left-1 right-1 z-50'>
      <div className='bg-white shadow-xl w-full max-w-lg border border-slate-300 rounded py-10 px-3 relative md:overflow-hidden overflow-y-scroll scrollbarStyle'>
        <div className='flex justify-between mt-2'>
          <button onClick={() => {setOpenFeedBack(true); onCloseInfo()}} className='left-4 absolute top-4'><IoArrowBackOutline className='text-slate-600 cursor-pointer' size={20} /></button>
          <button onClick={onCloseInfo} className='right-2 absolute top-2'><GiRazor className='text-red-700 cursor-pointer' size={18}  /></button>
        </div>
        <div className='flex flex-col text-center gap-1 mt-4'>
          <h4 className='text-sm text-slate-700'>Palautteesi on meille erittäin tärkeää.</h4>
          <p className='text-slate-700 text-xs'>Palautteesi auttaa meitä kehittämään sekä työntekijöidemme osaamista että asiakaspalvelua.</p>
        </div>
        <div className='text-xs flex flex-col gap-3.5 mt-6'>
          <p>Haluamme tarjota asiakkaillemme mahdollisimman laadukasta palvelua ja miellyttävän kokemuksen parturissamme. Tämän palautelomakkeen avulla voit kertoa mielipiteesi käynnistäsi sekä kokemuksestasi palvelustamme ja työntekijöidemme työstä.</p>
          <p>Voit kertoa esimerkiksi, olitko tyytyväinen hiustenleikkaukseen tai muuhun saamaasi palveluun, vastasiko lopputulos odotuksiasi, ja millainen palvelukokemus sinulla oli asioidessasi parturissamme. Voit myös mainita, jos jokin asia oli erityisen hyvää, kuten palvelun ystävällisyys, työn laatu tai yleinen tunnelma liikkeessämme.</p>
          <p>Arvostamme myös rehellisiä kehitysehdotuksia. Jos mielestäsi jokin asia voisi olla parempi, kerro siitä rohkeasti. Palautteesi auttaa meitä kehittämään työtämme, parantamaan asiakaskokemusta ja tarjoamaan entistä parempaa palvelua kaikille asiakkaillemme.</p>
          <p>Voit halutessasi kirjoittaa myös ehdotuksia tai ideoita siitä, miten voisimme kehittää palveluitamme tulevaisuudessa. Jokainen palaute luetaan huolellisesti ja otetaan huomioon toimintaamme kehittäessä.</p>
          <p>Kaikki palaute käsitellään luottamuksellisesti. Halutessasi voit jättää myös yhteystietosi, jotta voimme tarvittaessa olla sinuun yhteydessä palautteeseesi liittyen. Yhteystietojen jättäminen on täysin vapaaehtoista.</p>
          <p>Kiitos paljon palautteestasi ja siitä, että autat meitä kehittymään ja tarjoamaan entistä parempaa palvelua.</p>
        </div>

      </div>
    </div>
  )
}

export default InfoFeedBack
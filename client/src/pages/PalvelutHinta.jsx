import React from 'react'
import Main from '../components/main/Main'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'

const PalvelutHinta = () => {
  return (
    <div>
      <div className='flex flex-col gap-5.5 mb-6'>
        <div className='flex flex-col items-center text-center gap-2.5 mt-6'>
            <h1 className='text-lg text-slate-500 font-semibold'>💈 Hinnasto ja palvelut</h1>
            <p className='text-sm md:w-[70%] w-[95%] m-auto text-slate-600'>
            Luon Parturissa yhdistyvät ammattitaito, rento tunnelma ja yksilöllinen palvelu. Meiltä löydät hiustenleikkaukset, parranmuotoilut ja hoidot kaikenikäisille. Käytämme laadukkaita tuotteita ja teemme jokaisesta käynnistä miellyttävän kokemuksen.
          </p>
        </div>
        {/* price */}
        <div className="flex flex-wrap items-start justify-between w-[90%] m-auto mt-12 mb-12 gap-6 md:gap-8 text-slate-700">
          {/* Hiustenleikkaukset */}
          <div className="flex flex-col gap-3 md:w-[30%] w-full">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-1">✂️ Hiustenleikkaukset</h3>
            <div className="space-y-1">
              <p>Parturileikkaus – 33 €</p>
              <p>Hiustenleikkaus ja parranmuotoilu – 55 €</p>
              <p>Koneajo – 18 €</p>
              <p>Lasten hiustenleikkaus – 28 €</p>
              <p>Fade hiustenleikkaus – 38 €</p>
            </div>
          </div>

          {/* Partapalvelut */}
          <div className="flex flex-col gap-3 md:w-[30%] w-full">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-1">🧔 Partapalvelut</h3>
            <div className="space-y-1">
              <p>Parran muotoilu ja hiukset koneella – 45 €</p>
              <p>Parran muotoilu – 33 €</p>
              <p>Parranajo – 20 €</p>
              <p>Parranajo veitsellä – 30 €</p>
            </div>
          </div>

          {/* Värjäykset */}
          <div className="flex flex-col gap-3 md:w-[30%] w-full">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-1">🎨 Värjäykset</h3>
            <div className="space-y-1">
              <p>Parta värjäys – 45 €</p>
              <p>Hiusten värjäys – 55 €</p>
            </div>
          </div>
        </div>

      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default PalvelutHinta
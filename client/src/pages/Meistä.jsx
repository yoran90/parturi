import React from 'react'
import Header from '../components/header/Header'
import Information from '../components/up-header/information'
import Map from '../components/map/Map'
import Footer from '../components/footer/Footer'
import { MdArrowOutward } from "react-icons/md";
import GallaryLimit from './GallaryLimit'
import { Link } from 'react-router-dom'

const Meistä = () => {



  return (
    <div>
      <Information />
      <Header />
      <div>
        <div className='relative'>
          <img src="https://opentextbc.ca/accessibilitytoolkit/wp-content/uploads/sites/335/2021/01/pexels-nick-demou-1319459-scaled-1.jpg" alt="" />
          <div className='absolute w-full text-white flex flex-col items-center justify-center text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h3 className='md:text-3xl text-lg'>Ammattilaiset Tarkkuutta. Tyyliä. Itsevarmuutta.</h3>
            <h2 className='md:text-2xl'>Teemme sinusta tyylikkään</h2>
          </div>
        </div>
        <div className='flex flex-col w-[95%] m-auto gap-8 items-center text-center justify-center mt-12 mb-12'>
          <div>
            <h3 className='text-xl text-gray-500 mb-4 font-semibold'>Meistä</h3>
            <p className='text-slate-600 md:w-[80%] m-auto'>
              Tervetuloa parturiin! Parturi on ammattilainen hiustenleikkaus joka on omistettu ainoastaan miehille. Me uskomme, että hiustenleikkaus ei ole vain nopea käynti tuolissa, vaan tärkeä osa miehen omaa tyyliä ja arjen hyvinvointia. Siksi tarjoamme palvelun, joka yhdistää perinteisen parturikulttuurin ja modernin miesten grooming-tyylin parhaat puolet.Meidän tiimimme koostuu kokeneista, taitavista partureista, jotka ymmärtävät miesten hiusten rakenteen, tyylin ja toiveet. Jokainen leikkaus tehdään huolellisesti, jokainen parta muotoillaan tarkasti – lopputuloksena tyyli, joka sopii juuri sinulle.
            </p>
          </div>
          <div>
            <h3 className='text-xl text-gray-500 mb-4 font-semibold'>Filosofiamme</h3>
            <p className='text-slate-600 md:w-[80%] m-auto'>
              Parturointi on paljon enemmän kuin pelkkä hiustenleikkaus – se on kokemus. Siksi tarjoamme ympäristön, jossa yhdistyvät: rento ja maskuliininen tunnelma ammattitaitoinen palvelu laadukkaat työvälineet ja tuotteet yksilöllinen, asiakkaan tarpeisiin räätälöity työ Olitpa sitten klassisen herrasmiesleikkauksen tai modernin haalistusfaden ystävä, me teemme tyylin, joka tukee persoonaasi ja elämäntyyliäsi.
            </p>
          </div>

          <div>
            <h3 className='text-xl text-gray-500 mb-4 font-semibold'>Missiomme</h3>
            <p className='text-slate-600 md:w-[80%] m-auto'>
              Missiomme on selkeä:Tarjota jokaiselle miehelle laadukas, mukava ja itsevarmuutta vahvistava parturikokemus.Haluamme olla se paikka, johon palaat aina – hiustenleikkaukseen, parran muotoiluun tai vain hetken rauhoittumiseen arjen keskellä.            
            </p>
          </div>

          <div>
            <h3 className='text-xl text-gray-500 mb-4 font-semibold'>Mikä tekee meistä erilaisia</h3>
            <div className='flex flex-col gap-1 mt-7'>
              <h4 className='text-lg font-semibold text-red-500'>✔ Miesten Parturi</h4>
              <p className='text-slate-700'>Palvelu ja ympäristö, joka on suunniteltu vain miehille.</p>
            </div>
            <div className='flex flex-col gap-1 mt-7'>
              <h4 className='text-lg font-semibold text-red-500'>✔ Taitavat Ammattilaiset</h4>
              <p className='text-slate-700'>Parturit, jotka hallitsevat sekä perinteiset että modernit tekniikat.</p>
            </div>
            <div className='flex flex-col gap-1 mt-7'>
              <h4 className='text-lg font-semibold text-red-500'>✔ Laatua Jokaisessa Yksityiskohdassa</h4>
              <p className='text-slate-700'>Tarkkuutta, siisteyttä ja viimeisteltyä työnjälkeä.</p>
            </div>
            <div className='flex flex-col gap-1 mt-7'>
              <h4 className='text-lg font-semibold text-red-500'>✔ Aito, Rentoinen Ilmapiiri</h4>
              <p className='text-slate-700'>Paikka jossa jokainen asiakas tuntee olonsa tervetulleeksi.</p>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold text-red-500'>Lupauksemme sinulle</h3>
            <p className='md:w-[80%] m-auto text-slate-700'>
              Kun astut sisään, saat enemmän kuin hiustenleikkauksen.Saat hetken itsellesi – paikan, jossa tyyli, palvelu ja mukavuus kohtaavat.
            </p>
            <p className='text-red-600 font-semibold mt-6'>Lupaamme sinulle:</p>
            <span>✔ ammattitaitoista palvelua</span>
            <span>✔ huolellisen työnjäljen</span>
            <span>✔ juuri sinulle sopivan tyylin</span>
            <span>✔ viihtyisän ja rennon ympäristön</span>
          </div>

          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold text-slate-500'>Työmme ⬇️</h3>
            <GallaryLimit />
            <Link to={'/galaria'} className='text-blue-500 flex items-center justify-center gap-1 hover:text-blue-700'>
              Kasto Galleria
              <MdArrowOutward />
            </Link>
          </div>

        </div>
      </div>
      {/* map */}
      <Map />
      {/* footer */}
      <Footer />
    </div>
  )
}

export default Meistä
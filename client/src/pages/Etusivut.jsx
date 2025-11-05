import React, { useState } from 'react'
import Main from '../components/main/Main'
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdPhoneInTalk } from 'react-icons/md';
import { IoMdClock } from "react-icons/io";
import { MdLocalPolice } from "react-icons/md";
import { GiBeard } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import Map from '../components/map/Map';
import Footer from '../components/footer/Footer';



const Etusivut = () => {

 

  return (
    <div>
      <Main />
      <div>
        <div className='bg-white shadow border border-slate-100 md:mt-6 md:w-[90%] md:m-auto p-4 md:rounded-full -mt-20'>
          <div className='md:flex items-center md:justify-between md:px-16'>
            <div>
              <a className='flex md:mb-0 mb-6 flex-col items-center justify-center' href="https://www.google.com/maps/place/Maas%C3%A4lv%C3%A4ntie+6,+00710+Helsinki/@60.2366177,25.0066272,17z/data=!3m1!4b1!4m6!3m5!1s0x469208f7c6a193af:0xd672c6251afd836!8m2!3d60.2366151!4d25.0092021!16s%2Fg%2F11dzpwynv9?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt size={25} />
                <h3 className='text-sm font-bold text-slate-600 mt-2 border-b mb-2'>OSOITE</h3>
                <p className='text-xs font-semibold text-slate-500'>Maasäläntie 6, 00710 Helsinki</p>
              </a>
            </div>
            <div className='flex flex-col items-center justify-center md:mb-0 mb-6'>
              <MdPhoneInTalk size={30} />
              <h3 className='text-sm font-bold text-slate-600 mt-2 border-b mb-2'>PUHELIN</h3>
              <a href='tel:+358 50 123456' className='text-xs font-semibold text-slate-500'>+358 50 123456</a>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <IoMdClock size={30} />
              <h3 className='text-sm font-bold text-slate-600 mt-2 border-b mb-2'>AUKIOLOAJAT</h3>
              <p className='text-xs font-semibold text-slate-500'>7️⃣ 🕖 PÄIVÄÄ VIIKOSSA</p>
              <p className='text-xs font-semibold text-slate-500'>Ma - Pe  (10 - 19)</p>
              <p className='text-xs font-semibold text-slate-500'>La - Su  (10 - 18)</p>
            </div>
          </div>
        </div>
        <div className='md:flex gap-2.5 md:w-[95%] h-full m-auto mt-12 bg-white shadow border border-slate-100 p-8 md:rounded-2xl mb-12'>
        {/* text side */}
          <div className='flex flex-col items-center'>
            <h3 className='text-sm font-semibold text-slate-600 mb-12 mt-6'>TERVETULOA</h3>
            <p className='text-sm text-slate-500 text-center font-semibold'>
              Tervetuloa Parturiin – paikkaan, jossa hiukset saavat ansaitsemansa huomion ja asiakkaat palvellaan sydämellä. Meiltä saat yksilöllistä palvelua, ammattitaitoa ja rennon tunnelman – juuri sellaisen parturikokemuksen kuin sinulle sopii.
              </p>
            <p className='text-slate-600 text-sm '>
              Olitpa tulossa pieneen siistimiseen tai isompaan tyylimuutokseen, autamme löytämään juuri sinulle sopivan ilmeen. Käytämme laadukkaita tuotteita ja pidämme huolta, että jokainen käynti on mukava hetki arjen keskellä. Astut sisään, rentoudut – ja lähdet pois raikkaana, hyvällä mielellä ja tyylikkäänä.
            </p>
          </div>
          {/* image side */}
          <div className='mt-4'>
            <img className='rounded-md' src="https://plus.unsplash.com/premium_photo-1661645788141-8196a45fb483?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFyYmVyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000" alt="" />
          </div>
        </div>
      </div>
      {/* why choose us */}
      <div className='flex flex-col items-center justify-center md:w-[95%] m-auto mb-12'>
        <h3 className='text-lg font-semibold mb-4 text-slate-600'>💈Miksi Valita Meidät</h3>
        <p className='text-sm text-slate-600 text-center mb-6 md:w-[70%]'>Luon Parturissa yhdistyvät ammattitaito, intohimo ja aito välittäminen.
          Olemme licensed ja kokeneita alan ammattilaisia, jotka seuraavat trendejä ja kehittävät osaamistaan jatkuvasti.
          Asiakkaamme luottavat meihin, koska jokainen leikkaus, parran muotoilu ja viimeistely tehdään huolella ja yksilöllisesti.
          Kun istut tuoliimme, voit rentoutua – olet hyvissä ja luotettavissa käsissä.
        </p>
        <div className='flex flex-col md:flex-row gap-4 md:w-[95%] m-auto'>
          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <MdLocalPolice size={30} className='text-orange-500 h-12' />
              <h3 className='text-md font-semibold text-slate-600'>Ammattilainen</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Olemme pätevöityneitä ammattilaisia, joilla on alan koulutus ja virallinen osaaminen. Meille hiustenhoito ei ole vain työtä – se on ammatti, jota teemme ylpeydellä ja tarkkuudella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <GiBeard size={32} className='h-12' />
              <h3 className='text-md font-semibold text-slate-600'>Mestari / huippuosaaja</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Työmme perustuu mestarin varmuuteen ja tarkkaan silmään. Vuodet kokemusta ja jatkuva kouluttautuminen takaavat, että jokainen leikkaus ja tyyli tehdään huippuosaamisella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              <VscWorkspaceTrusted size={26} className='text-green-700 h-12' />
              <h3 className='text-md font-semibold text-slate-600'>Luotettu / asiakkaiden suosima</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Asiakkaamme palaavat luoksemme kerta toisensa jälkeen, sillä olemme luotettu valinta hiustenleikkauksessa ja tyylinmuutoksissa. Luottamus ansaitaan – me teemme sen joka käynnillä.</p>
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

export default Etusivut
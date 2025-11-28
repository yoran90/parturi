import React from 'react'
import useReviews from '../../hooks/useReviews';

const ReviewForHome = () => {

  const { getReview } = useReviews();

  return (
    <div>
      <div className='flex flex-col w-[95%] items-center justify-center m-auto mb-12'>
        <div className='flex flex-col md:flex-row gap-4 m-auto'>
          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              
              <h3 className='text-md font-semibold text-slate-600'>Ammattilainen</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Olemme pätevöityneitä ammattilaisia, joilla on alan koulutus ja virallinen osaaminen. Meille hiustenhoito ei ole vain työtä – se on ammatti, jota teemme ylpeydellä ja tarkkuudella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              
              <h3 className='text-md font-semibold text-slate-600'>Mestari / huippuosaaja</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Työmme perustuu mestarin varmuuteen ja tarkkaan silmään. Vuodet kokemusta ja jatkuva kouluttautuminen takaavat, että jokainen leikkaus ja tyyli tehdään huippuosaamisella.</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-white shadow border border-slate-100 p-8 rounded-2xl'>
            <div className='flex flex-col gap-1.5 text-center items-center justify-center mb-6'>
              
              <h3 className='text-md font-semibold text-slate-600'>Luotettu / asiakkaiden suosima</h3>
            </div>
            <p className='text-sm text-slate-600 text-center items-center'>Asiakkaamme palaavat luoksemme kerta toisensa jälkeen, sillä olemme luotettu valinta hiustenleikkauksessa ja tyylinmuutoksissa. Luottamus ansaitaan – me teemme sen joka käynnillä.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewForHome
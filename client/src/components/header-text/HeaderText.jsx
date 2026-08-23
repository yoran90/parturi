import React from 'react'
import useInformation from '../../hooks/useInformation'


const HeaderText = () => {

  const { getInformation } = useInformation();


  return (
     <>
      {getInformation && <div className='bg-white border font-semibold text-slate-700 text-[18px] border-slate-50 p-3  text-center' dangerouslySetInnerHTML={{ __html: getInformation?.headerText }} />}
     </>
  )
}

export default HeaderText
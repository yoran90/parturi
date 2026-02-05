import React from 'react'
import useInformation from '../../hooks/useInformation'


const HeaderText = () => {

  const { getInformation } = useInformation();
  console.log(getInformation, 'getInformation');


  return (
     <>
      {getInformation && <div className='bg-black border border-slate-600 p-3 text-white text-center' dangerouslySetInnerHTML={{ __html: getInformation?.headerText }} />}
     </>
  )
}

export default HeaderText
import React from 'react'

const SuccessMessage = ({ close }) => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center'>
      <div className='bg-white shadow md:w-full w-[95%] max-w-2xl md:px-6 px-1 md:py-14 py-10 rounded'>
        <div className='flex flex-col items-center justify-center'>
          <img src="https://img.icons8.com/ios11/512/40C057/ok.png" alt="" className='w-[120px] h-[120px]' />
          <h3 className='text-green-600'>Viesti on lähetetty onnistuneesti.</h3>
          <p className='flex text-green-600 items-center justify-center text-center'>
            Viesti on lähetetty onnistuneesti. Viestin vastaanottajalle on lähetetty sahkoposti.
            vastaamme sinulle mahdollisimman pian
          </p>
          <p>
            <span className='text-green-600'>Kiitos viestistä!</span>
          </p>
          <button onClick={close} className='bg-green-600 mt-6 text-white w-[100px] py-1.5 px-3 rounded cursor-pointer'>Ok</button>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage

import React from 'react'

const ConfirmDelete = ({ closeModel, headerTitle, headerDescription, warningMessage, cacelButton, confirmButton, onConfirm }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/60 flex flex-col items-center justify-center z-50'>
      <div className='bg-white shadow w-full max-w-2xl relative p-4 rounded'>
        <div>
          <button onClick={closeModel} className='text-xs absolute top-3 right-3 cursor-pointer'>❌</button>
        </div>
        <div className='mt-4'>
          <div className='flex flex-col gap-2.5'>
            <h3 className='text-red-600'>{headerTitle}</h3>
            <div>
              <h5 className='text-sm text-red-600'>{headerDescription}</h5>
              <p className='text-sm text-red-600'>⛔ {warningMessage}</p>
            </div>
          </div>
          <div className='flex gap-4.5 justify-end mt-12'>
            <button onClick={closeModel} className='bg-black/80 py-1 px-3 text-white rounded  hover:bg-black cursor-pointer'>{cacelButton}</button>
            <button onClick={onConfirm} className='bg-red-500 py-1 px-3 rounded  hover:bg-red-600 text-white cursor-pointer'>{confirmButton}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
import React from 'react'
import Loading from '../../loading/Loading'

const ConfirmDelete = ({ closeModel, headerTitle, headerDescription, warningMessage, cacelButton, confirmButton, onConfirm, loading }) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex flex-col items-center justify-center z-50'>
      <div className='bg-white shadow md:w-full w-[98%] max-w-xl relative py-6 px-4 rounded'>
        <div>
          <button onClick={closeModel} className='text-xs absolute top-3 right-3 cursor-pointer'>❌</button>
        </div>
        <div className='mt-4'>
          <div className='flex flex-col gap-2.5'>
            <h3 className='text-red-600'>{headerTitle}</h3>
            <div className='flex flex-col gap-1.5'>
              <h5 className='text-sm text-red-600'>{headerDescription}</h5>
              <p className='text-sm text-red-600'>⛔ {warningMessage}</p>
            </div>
          </div>
          <div className='flex gap-2 justify-end mt-6'>
            <button onClick={closeModel} className='bg-black/80 py-1 px-3 text-white rounded  hover:bg-black cursor-pointer'>{cacelButton}</button>
            <button onClick={onConfirm}  aria-label="confirm-delete" className='bg-red-500 py-1 px-3 rounded  hover:bg-red-600 text-white cursor-pointer'>
              {
                loading ? (
                  <div className='flex items-center gap-1.5' data-testid='loading-spinner'>
                    {confirmButton}
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : 
                  confirmButton
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
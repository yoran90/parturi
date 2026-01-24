import React from 'react';

const JobSuccessMessage = ({ closeSuccessMessage }) => {
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white shadow md:w-full w-[95%] max-w-2xl md:px-6 px-3 md:py-14 py-10 rounded'>
        <div className='flex flex-col items-center justify-center text-center'>
          <img 
            src="https://img.icons8.com/ios11/512/40C057/ok.png" 
            alt="Success" 
            className='w-[120px] h-[120px] mb-4' 
          />
          <h3 className='text-green-600 text-lg font-semibold mb-2'>
            Hakemuksesi on lähetetty onnistuneesti!
          </h3>
          <p className='text-green-600 mb-2'>
            Työhakemuksesi on vastaanotettu. Saatamme olla sinuun yhteydessä mahdollisimman pian.
          </p>
          <p className='text-green-600 mb-4'>
            Kiitos kiinnostuksestasi ja hakemuksestasi!
          </p>
          <button 
            onClick={closeSuccessMessage} 
            className='bg-green-600 mt-4 text-white w-[120px] py-2 px-3 rounded hover:bg-green-700 transition-colors'
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSuccessMessage;

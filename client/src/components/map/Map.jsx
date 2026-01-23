import axios from 'axios';
import React, { useEffect } from 'react';
import useInformation from '../../hooks/useInformation';

const Map = () => {

  const { getInformation } = useInformation();

  return (
  <div className="w-full h-[500px] md:h-[600px]">
    {getInformation?.addressUrlForMap && (
      <iframe
        data-testid="google-map"
        title="Google Map"
        src={getInformation.addressUrlForMap}
        width="100%"
        height="100%"
        style={{ border: '0' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    )}
  </div>
);

    

  /* return (
    <div className="w-full h-[500px] md:h-[600px]">

      <iframe 
        title="Google Map"
        src={getInformation?.addressUrlForMap} 
        width="100%" 
        height="100%" 
        style={{ border: '0' }}
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  ); */
};

export default Map;
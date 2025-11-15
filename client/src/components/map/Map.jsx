import axios from 'axios';
import React, { useEffect } from 'react';

const Map = () => {

  const [getInformation, setGetInformation] = React.useState(null);

  useEffect(() => {
      const fetchInfo = async () => {
        try {
          const response = await axios.get("http://localhost:8001/api/information/getInformation")
          setGetInformation(response.data)
        } catch (error) {
          console.log(error);
          
        } 
      }
      fetchInfo()
    }, []);

  return (
    <div className="w-full h-[500px] md:h-[600px]">
      {/* Embed Google Maps using iframe */}
      <iframe 
        src={getInformation?.addressUrlForMap} 
        width="100%" 
        height="100%" 
        style={{ border: '0' }}
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
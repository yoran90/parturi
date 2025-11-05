import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      {/* Embed Google Maps using iframe */}
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.6228598341863!2d25.0092021!3d60.23661509999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469208f7c6a193af%3A0xd672c6251afd836!2sMaas%C3%A4lv%C3%A4ntie%206%2C%2000710%20Helsinki!5e0!3m2!1sfi!2sfi!4v1762367113123!5m2!1sfi!2sfi" 
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
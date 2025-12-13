import React, { useEffect } from 'react'


const GoogleLoginButton = ({ onSuccess }) => {

  useEffect(() => {
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: onSuccess,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleLoginDiv"),
        {  theme: "outline",
          size: "large",
          text: "continue_with",
          width: "100%" } 
      );
    }
  }, []);


  return (
    <div  className='mt-6 rounded w-full bg-white cursor-pointer'>
      <div id='googleLoginDiv' className='w-full'></div>
    </div>
  )
}

export default GoogleLoginButton
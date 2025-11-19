import axios from "axios";
import React, { useEffect, useState } from "react";


export default function useHeaderLogo() {

  const [headerLogo, setHeaderLogo] = useState(null);

  //! get header logo
  useEffect(() => {
    const fetchHeaderLogo = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/header-logo/getLogo');
        setHeaderLogo(response.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    fetchHeaderLogo();
  }, []);

  return { headerLogo, setHeaderLogo };
  
}
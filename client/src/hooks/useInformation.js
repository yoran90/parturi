import axios from "axios";
import { useEffect, useState } from "react";



export default function useInformation() {

  const [getInformation, setGetInformation] = useState(null);
  const [informationLoading, setInformationLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8001/api/information/getInformation")
        setGetInformation(response.data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchInfo()
  }, []);

  

  return { getInformation, informationLoading, error };

}
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";



export default function useTitleForPage() {

  const [getTitleForPage, setGetTitleForPage] = useState(null);

  useEffect(() => {
    const fetchTitleForPage = async () => {
      const response = await axios.get("http://localhost:8001/api/titleForPages/getT-Dforpage");      
      setGetTitleForPage(response.data);
    }
    fetchTitleForPage();
  }, []);

  return { getTitleForPage, setGetTitleForPage };
}

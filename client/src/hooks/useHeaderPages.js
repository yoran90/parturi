import axios from "axios";
import { useState, useEffect } from "react";

export default function useHeaderPages() {
  const [getHeaderPages, setGetHeaderPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchheaderPages = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8001/api/headerPages/getHeaderPages");
        setGetHeaderPages(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching header pages:", err);
        setError(err.message);
        setGetHeaderPages([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchheaderPages();
  }, []);

  return { getHeaderPages, setGetHeaderPages, loading, error };
}
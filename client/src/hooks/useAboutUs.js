import axios from "axios";
import { useEffect, useState } from "react";

export default function useAboutUs() {
  const [getAboutUs, setGetAboutUs] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/about-us/aboutUs");
        setGetAboutUs(res.data);
      } catch (err) {
        setGetAboutUs(null); 
      }
    };
    fetchAboutUs();
  }, []);

  return { getAboutUs, setGetAboutUs };
}

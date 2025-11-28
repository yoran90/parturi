import axios from "axios";
import { useEffect, useState } from "react";

export default function useReviews() {

  const [getReviews, setGetReviews] = useState(null);

  useEffect(() => {
    const fetchReviwes = async () => {
      const response = await axios.get("http://localhost:8001/api/reviwes/getReviews");
      setGetReviews(response.data);
    }
    fetchReviwes();
  }, []);

  return { getReviews, setGetReviews };
}
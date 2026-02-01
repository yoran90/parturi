import axios from "axios";
import { useEffect, useState } from "react";


export default function useShop() {

  const [getShope, setGetShope] = useState(null);

  const fetchShopMedia = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shopMedia/getShopMedia`);
    setGetShope(response.data);
  }

  useEffect(() => {
    fetchShopMedia();
  }, []);

  return { getShope, setGetShope, fetchShopMedia };
}
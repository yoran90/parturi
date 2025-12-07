import axios from "axios";
import { useEffect, useState } from "react";


export default function useShop() {

  const [getShope, setGetShope] = useState(null);

  const fetchShopMedia = async () => {
    const response = await axios.get("http://localhost:8001/api/shopMedia/getShopMedia");
    setGetShope(response.data);
  }

  useEffect(() => {
    fetchShopMedia();
  }, []);

  return { getShope, setGetShope, fetchShopMedia };
}
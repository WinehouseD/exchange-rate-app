import axios from "axios";
import { toast } from "react-toastify";

export const fetchExchangeRateForDate = async (date) => {
    try {
      const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
      const dataUrl = `${import.meta.env.VITE_HISTORICALRATES_API_URL}?date=${date}`
      const url = proxyUrl + encodeURIComponent(dataUrl);
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.error(e);
      toast.info(`Failed to fetch exchange rates for last 10 days.`);
    }
  };
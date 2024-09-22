import axios from "axios";
import { toast } from "react-toastify";

export const fetchExchangeRateForDate = async (date) => {
    try {
      const proxyUrl = 'https://apiproxypryvat.azurewebsites.net/api/proxy?url=';
      const dataUrl = `${import.meta.env.VITE_HISTORICALRATES_API_URL}?date=${date}`
      const url = proxyUrl + encodeURIComponent(dataUrl);
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.error(e);
      toast.info(`Failed to fetch exchange rates for last 10 days.`);
    }
  };

  export const fetchLatestExchangeRate = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_EXCHANGERATES_API_URL}/latest`, {
        params: {
          access_key: import.meta.env.VITE_EXCHANGERATES_API_KEY,
          symbols: 'USD,EUR,GBP,PLN,JPY,CNY,CAD,UAH'
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
      toast.info(`Failed to fetch latest exchange rates.`);
    }
  };
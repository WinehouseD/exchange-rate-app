import { fetchLatestExchangeRate } from '../services/api';
import exchangeToRate from '../utils/exchangeToRate';
import { useEffect, useState } from 'react';

export const useExchangeRates = () => {
    const [convertRates, setConvertRates] = useState([]);

    useEffect(() => {
        const getRates = async () => {
            const data = await fetchLatestExchangeRate();
            const allRates = Object.keys(data.rates).map(currency => {
                const rate = exchangeToRate(data.rates['USD'], data.rates[currency]);
                if(currency === 'UAH'){
                    const uahRate = data.rates['UAH'];
                    const rate = exchangeToRate(uahRate, data.rates[currency]);
                }
                return {
                    currency,
                    rate,
                };
            });
            setConvertRates(allRates);
        };
        getRates();
    }, []);

    return convertRates
}
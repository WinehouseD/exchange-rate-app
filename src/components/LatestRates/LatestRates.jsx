import React, { useEffect, useState } from 'react';
import { fetchLatestExchangeRate } from '../../services/api';
import exchangeToRate from '../../utils/exchangeToRate';

const LatestRates = () => {
    const [rates, setRates] = useState([]);

    useEffect(() => {
        const getRates = async () => {
                const data = await fetchLatestExchangeRate();
                const uahRate = data.rates.UAH;
                const allRates = Object.keys(data.rates)
                    .filter(currency => currency !== 'UAH')
                    .map(currency => {
                        const rate = exchangeToRate(uahRate, data.rates[currency] );
                        return {
                            currency,
                            rate
                        };
                    });
                setRates(allRates);
        };

        getRates();
    }, []);

    return (
        <div className='rates'>
            <h2>Latest Exchange Rates to UAH</h2>
            <ul>
                {rates.map(({ currency, rate }) => (
                    <li key={currency}>
                        {currency}: {rate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LatestRates;
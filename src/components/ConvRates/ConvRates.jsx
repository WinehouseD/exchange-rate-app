import React, { useState, useMemo } from 'react';
import { useExchangeRates } from '../../hooks/useExchangeRates';

function ConvRates () {
    const convertRates = useExchangeRates();
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const convertedAmount = useMemo(() => {
        if (convertRates.length > 0) {
            const fromRate = convertRates.find(rate => rate.currency === fromCurrency)?.rate || 1;
            const toRate = convertRates.find(rate => rate.currency === toCurrency)?.rate || 1;
            return (amount * toRate / fromRate).toFixed(2);
        }
        return 0;
    }, [amount, fromCurrency, toCurrency, convertRates]);

    const toggleCurrency = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
            >
                {convertRates.map(rate => (
                    <option key={rate.currency} value={rate.currency}>
                        {rate.currency}
                    </option>
                ))}
            </select>
            <button onClick={toggleCurrency}>click</button>
            <input
                type="number"
                value={convertedAmount}
                readOnly
            />
            <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
            >
                {convertRates.map(rate => (
                    <option key={rate.currency} value={rate.currency}>
                        {rate.currency}
                    </option>
                ))}
            </select>
        </>
    );
};

export default ConvRates;
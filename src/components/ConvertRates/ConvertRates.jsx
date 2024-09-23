import React, { useState, useMemo } from 'react';
import { useExchangeRates } from '../../hooks/useExchangeRates';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SwapIcon from '../../assets/swap.svg';
import styles from './ConvertRates.module.css';
import exchangeToRate from '../../utils/exchangeToRate';

function ConvertRates() {
    const convertRates = useExchangeRates();
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');

    const convertedAmount = useMemo(() => {
        if (convertRates.length > 0) {
            const fromRate = convertRates.find(rate => rate.currency === fromCurrency)?.rate || 1;
            const toRate = convertRates.find(rate => rate.currency === toCurrency)?.rate || 1;
            return (amount * fromRate / toRate).toFixed(2);
        }
        return 0;
    }, [amount, fromCurrency, toCurrency, convertRates]);

    const toggleCurrency = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.column}>
                    <Autocomplete
                        disablePortal
                        options={convertRates.map(rate => rate.currency)}
                        value={fromCurrency}
                        onChange={(event, newValue) => setFromCurrency(newValue)}
                        renderInput={(params) => <TextField {...params} label="From Currency" variant="outlined" />}
                        className={styles.convRate}
                    />
                    <TextField
                        type="number"
                        label="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        variant="outlined"
                        className={styles.convRate}
                    />
                </div>
                    <img
                        src={SwapIcon}
                        alt="Swap Currencies"
                        onClick={toggleCurrency}
                        className={styles.swapIcon}
                        loading="lazy"
                    />
                <div className={styles.column}>
                    <Autocomplete
                        disablePortal
                        options={convertRates.map(rate => rate.currency)}
                        value={toCurrency}
                        onChange={(event, newValue) => setToCurrency(newValue)}
                        renderInput={(params) => <TextField {...params} label="To Currency" variant="outlined" />}
                        className={styles.convRate}
                    />
                    <TextField
                        type="number"
                        label="Converted Amount"
                        value={convertedAmount}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                        variant="outlined"
                        className={styles.convRate}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConvertRates;

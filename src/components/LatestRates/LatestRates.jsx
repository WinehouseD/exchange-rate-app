import React, { useEffect, useState } from 'react';
import styles from './LatestRates.module.css'
import { fetchLatestExchangeRate } from '../../services/api';
import exchangeToRate from '../../utils/exchangeToRate';
import { Box, Card, CardContent, Typography } from '@mui/material';

function LatestRates() {
    const [rates, setRates] = useState([]);

    useEffect(() => {
        const getRates = async () => {
            const data = await fetchLatestExchangeRate();
            const uahRate = data.rates.UAH;
            const allRates = Object.keys(data.rates)
                .filter(currency => currency !== 'UAH')
                .map(currency => {
                    const rate = exchangeToRate(uahRate, data.rates[currency]);
                    return {
                        currency,
                        rate: rate.toFixed(2)
                    };
                });
            setRates(allRates);
        };

        getRates();
    }, []);

    return (
        <Box className={styles.scrollContainer}>
            <Box className={styles.scrollContent}>
                {rates.concat(rates).map(({ currency, rate }, index) => (
                    <Card className={styles.rateCard} key={`${currency}-${index}`}>
                        <CardContent>
                            <Typography variant="h6" component="div" className={styles.typography}>
                                {currency}/UAH
                            </Typography>
                            <Typography variant="body2" className={styles.typography}>
                                {rate}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}

export default LatestRates;
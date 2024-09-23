import React, { useEffect, useState } from 'react';
import styles from './HistoricalRates.module.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getDateNDaysBefore } from '../../utils/getDatesBefore';
import { getChartData, options } from '../../utils/getChartData';
import { fetchExchangeRateForDate } from '../../services/api';

function HistoricalRates () {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const promises = Array.from({ length: 15 }, (_, i) => {
        const date = getDateNDaysBefore(15 - i);
        return fetchExchangeRateForDate(date);
      });

      const results = await Promise.all(promises);
      setExchangeRates(results);
    };

    fetchExchangeRates();
  }, []);

  const data = getChartData(exchangeRates);

  return (
    <div>
      <Line className={styles.line} data={data} options={options} />
    </div>
  );
};

export default HistoricalRates;
import React, { useEffect, useState } from 'react';
import './HistoricalRates.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getDateNDaysBefore } from '../../utils/getDatesBefore';
import getChartData from '../../utils/getChartData';
import { fetchExchangeRateForDate } from '../../services/api';

function HistoricalRates () {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const promises = Array.from({ length: 10 }, (_, i) => {
        const date = getDateNDaysBefore(10 - i);
        return fetchExchangeRateForDate(date);
      });

      const results = await Promise.all(promises);
      setExchangeRates(results);
    };

    fetchExchangeRates();
  }, []);

  const data = getChartData(exchangeRates);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Exchange Rates for the Last 10 Days to UAH',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#fff', 
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Exchange Rate',
        },
      },
    },
  };

  return (
    <div className='container'>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoricalRates;
import { extractAllRates } from "./exchangeRate";

const getChartData = (exchangeRates) => {
  const dates = exchangeRates.map(rate => rate.date);
  const { usdRates, eurRates, plnRates, gbpRates } = extractAllRates(exchangeRates);

  return {
    labels: dates,
    datasets: [
      {
        label: 'GBP',
        data: gbpRates,
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderWidth: 2,
        pointStyle: 'triangle',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'EUR',
        data: eurRates,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderWidth: 2,
        pointStyle: 'rect',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'USD',
        data: usdRates,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderWidth: 2,
        pointStyle: 'circle',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'PLN',
        data: plnRates,
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderWidth: 2,
        pointStyle: 'triangle',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Exchange Rates for the Last 15 Days to UAH',
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

export { getChartData, options };
import { extractAllRates } from "./exchangeRate";

const getChartData = (exchangeRates) => {
  const dates = exchangeRates.map(rate => rate.date);
  const { usdRates, eurRates, plnRates } = extractAllRates(exchangeRates);

  return {
    labels: dates,
    datasets: [
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
        label: 'PLN',
        data: plnRates,
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderWidth: 2,
        pointStyle: 'triangle',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };
};

export default getChartData;
const extractRates = (exchangeRates, currency) => {
    return exchangeRates.map(rate => {
      const rateData = rate.exchangeRate.find(r => r.currency === currency);
      return rateData ? rateData.saleRate : null;
    });
  };
  
  export const extractAllRates = (exchangeRates) => {
    const usdRates = extractRates(exchangeRates, 'USD');
    const eurRates = extractRates(exchangeRates, 'EUR');
    const plnRates = extractRates(exchangeRates, 'PLN');
    const gbpRates = extractRates(exchangeRates, 'GBP');
    return { usdRates, eurRates, plnRates, gbpRates };
  };
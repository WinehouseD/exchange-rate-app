import { extractAllRates } from '../utils/exchangeRate';

describe('extractAllRates', () => {
  const exchangeRates = [
    {
      exchangeRate: [
        { currency: 'USD', saleRate: 1.1 },
        { currency: 'EUR', saleRate: 0.9 },
      ],
    },
    {
      exchangeRate: [
        { currency: 'USD', saleRate: 1.2 },
        { currency: 'PLN', saleRate: 4.5 },
      ],
    },
    {
      exchangeRate: [
        { currency: 'EUR', saleRate: 0.85 },
        { currency: 'PLN', saleRate: 4.4 },
      ],
    },
  ];

  test('extracts all rates correctly', () => {
    const result = extractAllRates(exchangeRates);
    expect(result).toEqual({
      usdRates: [1.1, 1.2, null],
      eurRates: [0.9, null, 0.85],
      plnRates: [null, 4.5, 4.4],
      gbpRates: [null, null, null],
    });
  });

  test('handles empty exchangeRates array', () => {
    const result = extractAllRates([]);
    expect(result).toEqual({
      usdRates: [],
      eurRates: [],
      plnRates: [],
      gbpRates: [],
    });
  });
});
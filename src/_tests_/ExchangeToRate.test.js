import exchangeToRate from '../utils/exchangeToRate';

describe('exchangeToRate', () => {
  test('calculates exchange rate correctly for positive values', () => {
    expect(exchangeToRate(2, 1)).toBe(2);
    expect(exchangeToRate(10, 2)).toBe(5);
    expect(exchangeToRate(100, 25)).toBe(4);
  });

  test('calculates exchange rate correctly for fractional values', () => {
    expect(exchangeToRate(1.5, 0.5)).toBe(3);
    expect(exchangeToRate(2.5, 1.25)).toBe(2);
    expect(exchangeToRate(0.75, 0.25)).toBe(3);
  });

  test('returns Infinity for division by zero', () => {
    expect(exchangeToRate(1, 0)).toBe(Infinity);
    expect(exchangeToRate(100, 0)).toBe(Infinity);
  });

  test('returns 0 for zero numerator', () => {
    expect(exchangeToRate(0, 1)).toBe(0);
    expect(exchangeToRate(0, 100)).toBe(0);
  });

  test('handles negative values correctly', () => {
    expect(exchangeToRate(-2, 1)).toBe(-2);
    expect(exchangeToRate(2, -1)).toBe(-2);
    expect(exchangeToRate(-2, -1)).toBe(2);
  });

  test('handles mixed positive and negative values correctly', () => {
    expect(exchangeToRate(-2, 0.5)).toBe(-4);
    expect(exchangeToRate(2, -0.5)).toBe(-4);
    expect(exchangeToRate(-2, -0.5)).toBe(4);
  });
});
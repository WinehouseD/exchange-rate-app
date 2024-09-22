import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { ToastContainer } from 'react-toastify';
import LatestRates from '../components/LatestRates/LatestRates';
import HistoricalRates from '../components/HistoricalRates/HistoricalRates';
import ConvertRates from '../components/ConvertRates/ConvertRates';

jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => null),
}));

jest.mock('../components/LatestRates/LatestRates', () => jest.fn(() => null));
jest.mock('../components/HistoricalRates/HistoricalRates', () => jest.fn(() => null));
jest.mock('../components/ConvertRates/ConvertRates', () => jest.fn(() => null));

describe('App', () => {
  test('renders correctly with all components', () => {
    render(<App />);
    expect(ToastContainer).toHaveBeenCalled();
    expect(LatestRates).toHaveBeenCalled();
    expect(ConvertRates).toHaveBeenCalled();
    expect(HistoricalRates).toHaveBeenCalled();
  });
});
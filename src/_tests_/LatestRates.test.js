import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestRates from '../components/LatestRates/LatestRates';
import { fetchLatestExchangeRate } from '../services/api.js';

jest.mock('../services/api.js', () => ({
    fetchLatestExchangeRate: jest.fn(),
  }));

const mockData = {
    rates: {
        UAH: 1,
        USD: 0.036,
        EUR: 0.03,
    },
};

describe('LatestRates', () => {
    beforeEach(() => {
      fetchLatestExchangeRate.mockReset();
    });
  
    test('renders exchange rates correctly', async () => {
      fetchLatestExchangeRate.mockResolvedValue(mockData);

      render(<LatestRates />);

      await waitFor(() => {
        expect(screen.getByText('USD: 27.78')).toBeInTheDocument();
        expect(screen.getByText('EUR: 33.33')).toBeInTheDocument();
      });
    });
  
    test('handles empty rates', async () => {
      fetchLatestExchangeRate.mockResolvedValue({ rates: { UAH: 1 } });

      render(<LatestRates />);

      await waitFor(() => {
        expect(screen.queryByText(/:/)).not.toBeInTheDocument();
      });
    });
    
    test('renders specific currency rate correctly', async () => {
      fetchLatestExchangeRate.mockResolvedValue(mockData);

      render(<LatestRates />);

      await waitFor(() => {
        expect(screen.getByText('USD: 27.78')).toBeInTheDocument();
      });
    });
  
    test('renders multiple currency rates correctly', async () => {
      fetchLatestExchangeRate.mockResolvedValue(mockData);

      render(<LatestRates />);

      await waitFor(() => {
        expect(screen.getByText('USD: 27.78')).toBeInTheDocument();
        expect(screen.getByText('EUR: 33.33')).toBeInTheDocument();
      });
    });
  });
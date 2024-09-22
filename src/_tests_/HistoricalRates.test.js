import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import HistoricalRates from '../components/HistoricalRates/HistoricalRates';
import { fetchExchangeRateForDate } from '../services/api.js';
import { getChartData } from '../utils/getChartData';

jest.mock('react-chartjs-2', () => ({
  Line: () => <div role="img" aria-label="chart" />,
}));

jest.mock('../services/api.js', () => ({
  fetchExchangeRateForDate: jest.fn(),
}));

jest.mock('../utils/getChartData', () => ({
  getChartData: jest.fn(),
  options: {},
}));

const mockData = [
  { date: '2023-01-01', rates: { USD: 1.1, EUR: 0.9 } },
  { date: '2023-01-02', rates: { USD: 1.2, EUR: 0.8 } },
];

describe('HistoricalRates', () => {
  beforeEach(() => {
    fetchExchangeRateForDate.mockReset();
    getChartData.mockReset();
  });

  test('fetches exchange rates correctly', async () => {
    fetchExchangeRateForDate.mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1]);

    const chartData = { labels: ['2023-01-01', '2023-01-02'], datasets: [] };
    getChartData.mockReturnValue(chartData);

    render(<HistoricalRates />);

    await waitFor(() => {
      expect(fetchExchangeRateForDate).toHaveBeenCalledTimes(10);
      expect(getChartData).toHaveBeenCalledWith([
        mockData[0], mockData[1], mockData[0], mockData[1], mockData[0],
        mockData[1], mockData[0], mockData[1], mockData[0], mockData[1]
      ]);
      expect(screen.getByRole('img', { name: 'chart' })).toBeInTheDocument();
    });
  });

  test('renders chart with correct data', async () => {
    fetchExchangeRateForDate.mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1])
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce(mockData[1]);

    const chartData = { labels: ['2023-01-01', '2023-01-02'], datasets: [] };
    getChartData.mockReturnValue(chartData);

    render(<HistoricalRates />);

    await waitFor(() => {
      expect(getChartData).toHaveBeenCalledWith([
        mockData[0], mockData[1], mockData[0], mockData[1], mockData[0],
        mockData[1], mockData[0], mockData[1], mockData[0], mockData[1]
      ]);
      expect(screen.getByRole('img', { name: 'chart' })).toBeInTheDocument();
    });
  });

  test('handles empty response correctly', async () => {
    fetchExchangeRateForDate.mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce({});

    const chartData = { labels: [], datasets: [] };
    getChartData.mockReturnValue(chartData);

    render(<HistoricalRates />);

    await waitFor(() => {
      expect(fetchExchangeRateForDate).toHaveBeenCalledTimes(10);
      expect(getChartData).toHaveBeenCalledWith([
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
      ]);
      expect(screen.getByRole('img', { name: 'chart' })).toBeInTheDocument();
    });
  });

  test('handles partial data correctly', async () => {
    fetchExchangeRateForDate.mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce({})
                            .mockResolvedValueOnce(mockData[0])
                            .mockResolvedValueOnce({});

    const chartData = { labels: ['2023-01-01'], datasets: [] };
    getChartData.mockReturnValue(chartData);

    render(<HistoricalRates />);

    await waitFor(() => {
      expect(fetchExchangeRateForDate).toHaveBeenCalledTimes(10);
      expect(getChartData).toHaveBeenCalledWith([
        mockData[0], {}, mockData[0], {}, mockData[0],
        {}, mockData[0], {}, mockData[0], {}
      ]);
      expect(screen.getByRole('img', { name: 'chart' })).toBeInTheDocument();
    });
  });
});
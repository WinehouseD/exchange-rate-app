import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConvertRates from '../components/ConvertRates/ConvertRates';

jest.mock('../hooks/useExchangeRates', () => ({
  useExchangeRates  : () => [ 
    { currency: 'USD', rate: 1 },
    { currency: 'EUR', rate: 0.85 },
    { currency: 'PLN', rate: 0.75 },]
}));

describe('ConvertRates', () => {

  test('renders correctly with initial values', () => {
    render(<ConvertRates />);

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
    expect(screen.getByDisplayValue('EUR')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0.85')).toBeInTheDocument();
  });

  test('converts amount correctly when input changes', () => {
    render(<ConvertRates />);

    const amountInput = screen.getByDisplayValue('1');
    fireEvent.change(amountInput, { target: { value: '2' } });

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1.70')).toBeInTheDocument();
  });
});
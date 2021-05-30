import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header to browser', () => {
  render(<App />);
  const title = screen.getByText(/TRENDIE\$/i);
  expect(title).toBeInTheDocument();
});

test('renders top five to browser', () => {
  render(<App />);
  const top5Chart = screen.getByText(/TOP\s5/i);
  expect(top5Chart).toBeInTheDocument();
});

test('renders DOW chart to browser', () => {
  render(<App />);
  const dowChart = screen.getByText(/DOW\sJONES/i);
  expect(dowChart).toBeInTheDocument();
});

test('renders header to browser', () => {
  render(<App />);
  const faangChart = screen.getByText(/FAANG/i);
  expect(faangChart).toBeInTheDocument();
});

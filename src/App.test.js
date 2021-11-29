import { render, screen } from '@testing-library/react';
import App from './App';

test('heading', () => {
  render(<App />);
  const element = screen.getByText(/nasa photos/i);
  expect(element).toBeInTheDocument();
});


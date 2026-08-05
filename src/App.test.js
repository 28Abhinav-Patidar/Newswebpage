import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Daily News brand link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Daily News/i);
  expect(linkElement).toBeInTheDocument();
});


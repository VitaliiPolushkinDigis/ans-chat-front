import { screen } from '@testing-library/react';
import App from './App';
import LoginPage from './pages/LoginPage/LoginPage';
import { render } from './test-utils';

test('renders learn react link', () => {
  const { getByText, getByPlaceholderText, debug } = render(<LoginPage />);
  const linkElement = getByPlaceholderText(/Your email/i);
  console.log('d', debug());

  expect(linkElement).toBeInTheDocument();
});

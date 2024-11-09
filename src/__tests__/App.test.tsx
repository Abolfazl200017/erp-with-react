import { render } from '@testing-library/react';
import App from '../App';
import AppProviders from '../contexts/AppProvider';
import { BrowserRouter } from 'react-router-dom';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>,
  );
  expect(true).toBeTruthy();
});

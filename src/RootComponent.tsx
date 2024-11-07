import React, { StrictMode } from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const isDevelopment = process.env.NODE_ENV === 'development';

const RootComponent: React.FC = () => (
  isDevelopment ? (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ) : (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
);

export default RootComponent;

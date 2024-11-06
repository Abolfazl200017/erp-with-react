import SnackbarProvider from 'components/Snackbar/SnackbarProvider';

//redux
import { Provider } from 'react-redux';
import { store } from '../redux/store';

//mui & mui theme
import { createTheme, PaletteColor, PaletteColorOptions, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

declare module '@mui/material/styles' {
  interface Palette {
    darkBG: PaletteColor;
  }
  interface PaletteOptions {
    darkBG?: PaletteColorOptions;
    darkCardBG?: PaletteColorOptions;
  }
}

const theme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    darkBG: {
      main: "#0f1214",
      contrastText: "#90caf9"
    },
    darkCardBG: {
      main: "#11171d",
      contrastText: "#90caf9"
    }
  },
  typography: {
    fontFamily: ['Shabnam'].join(','),
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          {/* Wrap other providers here if needed */}
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  </Provider>
);

export default AppProviders;

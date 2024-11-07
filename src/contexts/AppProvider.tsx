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
import { faIR } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Palette {
    darkBG: PaletteColor;
    darkCardBG: PaletteColor;
  }
  interface PaletteOptions {
    darkBG?: PaletteColorOptions;
    darkCardBG?: PaletteColorOptions;
  }
}

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      mode: 'dark',
      darkBG: {
        main: '#0f1214',
        contrastText: '#90caf9',
      },
      darkCardBG: {
        main: '#1e1e1e',
        contrastText: '#90caf9',
      },
      grey: {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      },
    },
    typography: {
      fontFamily: ['Shabnam'].join(','),
    },
  },
  faIR,
);

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

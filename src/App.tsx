import './App.css';

//mui & mui theme
import CssBaseline from '@mui/material/CssBaseline';
import AppProviders from './contexts/AppProvider';

import { RouterConfig } from 'navigation/RouterConfig';
import { Box } from '@mui/material';


function App() {
  return (
    <>
      <Box sx={{ backgroundColor: 'darkBG.main', color: 'white', }} >
        <AppProviders>
          <CssBaseline />
          <RouterConfig />
        </AppProviders>
      </Box>
    </>
  );
}

export default App;

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
import GlobalState from './context/GlobalState';
import AppRouter from './AppRouter';
import theme from './theme';

const App = () => (
  <GlobalState>
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={esLocale}
      >
        <AppRouter />
      </LocalizationProvider>
    </ThemeProvider>
  </GlobalState>
);

export default App;

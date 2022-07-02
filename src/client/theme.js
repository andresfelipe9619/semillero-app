import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe0000',
    },
    secondary: {
      main: '#f49586',
    },
  },
  typography: {
    fontSize: 14,
    htmlFontSize: 14,
    useNextVariants: true,
    h1: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    h2: {
      fontWeight: 500,
      fontSize: '1.6rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.35rem',
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.3rem',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.3rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.2rem',
    },
  },
  // overrides: {
  //   MuiButton: {
  //     root: {
  //       borderRadius: '30%',
  //     },
  //   },
  // },
});

export default theme;

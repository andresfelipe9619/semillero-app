import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Alert from './components/alert/Alert';
import Home from './components/home/Home';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 8),
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function AppRouter() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="none" className={classes.root}>
        <Alert />
        <Home />
      </Container>
    </>
  );
}

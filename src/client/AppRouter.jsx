import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Alert from './components/alert/Alert';
import Home from './components/home/Home';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 8),
    height: '100vh',
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

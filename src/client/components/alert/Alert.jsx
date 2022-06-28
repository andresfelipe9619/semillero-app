import React, { forwardRef } from 'react';
import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { withStyles } from '@mui/styles';
import { useAlert } from '../../context/Alert';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.35rem',
  },
});

const AlertContent = forwardRef(function AlertContent(
  { variant, message, ...props },
  ref
) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      severity={variant}
      {...props}
    >
      {message}
    </MuiAlert>
  );
});

const SnackbarContentWrapper = withStyles(styles1)(AlertContent);

export default function Alert() {
  const [
    { open, message, variant, position, duration },
    { closeAlert: handleClose },
  ] = useAlert();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: position || 'right',
      }}
      open={open}
      autoHideDuration={duration || 6000}
      ClickAwayListenerProps={{
        mouseEvent: false,
        touchEvent: false,
        onClickAway: () => {},
      }}
      onClose={handleClose}
      style={{
        top: '85px',
      }}
    >
      <SnackbarContentWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}

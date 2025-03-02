import { useSnackbar } from 'notistack';
import { Alert } from '@mui/material';
import React from 'react';

const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = (message, variant, onExited) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 6000,
      onExited: onExited || undefined, // Only adds `onExited` if provided
      content: (key) => (
        <Alert
          onClose={() => closeSnackbar(key)}
          severity={variant}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ),
    });
  };

  const showSuccessSnackbar = (message, onExited) => {
    showSnackbar(message, 'success', onExited);
  };

  const showErrorSnackbar = (message, onExited) => {
    showSnackbar(message, 'error', onExited);
  };

  const showWarningSnackbar = (message, onExited) => {
    showSnackbar(message, 'warning', onExited);
  };

  const showInfoSnackbar = (message, onExited) => {
    showSnackbar(message, 'info', onExited);
  };

  return {
    showSuccessSnackbar,
    showErrorSnackbar,
    showWarningSnackbar,
    showInfoSnackbar,
  };
};

export default useCustomSnackbar;

import { useSnackbar } from 'notistack';
import { Alert } from '@mui/material';
import React from 'react';

const useCustomSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 6000,
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

  const showSuccessSnackbar = (message) => {
    showSnackbar(message, 'success');
  };

  const showErrorSnackbar = (message) => {
    showSnackbar(message, 'error');
  };

  const showWarningSnackbar = (message) => {
    showSnackbar(message, 'warning');
  };

  const showInfoSnackbar = (message) => {
    showSnackbar(message, 'info');
  };

  return {
    showSuccessSnackbar,
    showErrorSnackbar,
    showWarningSnackbar,
    showInfoSnackbar,
  };
};

export default useCustomSnackbar;
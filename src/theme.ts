import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
    },

    secondary: {
      main: '#475569',
    },

    success: {
      main: '#16A34A',
    },

    warning: {
      main: '#F59E0B',
    },

    error: {
      main: '#DC2626',
    },

    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.04)',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 42,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },

    MuiFormControl: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },
  },
});

export default theme;

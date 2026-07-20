import { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: Severity) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState('');

  const [severity, setSeverity] = useState<Severity>('success');

  const showSnackbar = (msg: string, type: Severity = 'success') => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={() => setOpen(false)}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  return useContext(SnackbarContext);
}

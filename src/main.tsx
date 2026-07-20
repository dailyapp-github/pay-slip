import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from './App';
import theme from './theme';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from './context/SnackbarContext';
import { LoadingProvider } from './context/LoadingContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <HashRouter>
      <AuthProvider>
        <SnackbarProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </SnackbarProvider>
      </AuthProvider>
    </HashRouter>
  </ThemeProvider>,
);

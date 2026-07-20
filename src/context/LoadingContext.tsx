import { createContext, useContext, useState } from 'react';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';

interface LoadingContextType {
  showLoading: (title?: string, subtitle?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
  hideLoading: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('Loading...');

  const [subtitle, setSubtitle] = useState('');

  const showLoading = (loadingTitle = 'Loading...', loadingSubtitle = '') => {
    setTitle(loadingTitle);
    setSubtitle(loadingSubtitle);
    setOpen(true);
  };

  const hideLoading = () => {
    setOpen(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
      }}
    >
      {children}

      <Backdrop
        open={open}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 10,
          color: '#fff',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <CircularProgress color="inherit" />

          <Typography
            variant="h6"
            sx={{
              mt: 3,
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                opacity: 0.8,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Backdrop>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}

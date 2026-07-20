import { Box, CircularProgress, Typography } from '@mui/material';

export default function Splash() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: '#1976d2',
        color: '#fff',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        Payroll Mailer
      </Typography>

      <Typography sx={{ mt: 1, opacity: 0.8 }}>Version 1.0.0</Typography>

      <CircularProgress color="inherit" sx={{ mt: 5 }} />

      <Typography sx={{ mt: 2 }}>Loading...</Typography>
    </Box>
  );
}

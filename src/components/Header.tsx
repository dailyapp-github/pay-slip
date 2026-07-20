import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        height: 64,
        bgcolor: '#fff',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h6">Payroll Mailer</Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography>{user?.username}</Typography>

        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
}

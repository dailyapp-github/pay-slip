import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AuthService } from '../services/auth.service';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const result = await AuthService.login(email, password);

      await login(result.token);

      navigate('/');
    } catch (err: unknown) {
      let message = 'Login gagal.';

      if (err instanceof Error) {
        message = err.message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        bgcolor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          width: 420,
        }}
      >
        <CardContent>
          <Typography variant="h5">Payroll Mailer</Typography>

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

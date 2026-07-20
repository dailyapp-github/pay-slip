import { useEffect, useState } from 'react';
import { TUser } from '../../types/User';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

interface UserDialogProps {
  open: boolean;
  data?: TUser | null;
  onClose: () => void;
  onSave: (user: TUser) => void;
}

const emptyUser: TUser = {
  _id: '',
  username: '',
  email: '',
  password: '',
  emailPassword: '',
  active: true,
  role: 'user',
};

export default function UserDialog({
  open,
  data,
  onClose,
  onSave,
}: UserDialogProps) {
  const [form, setForm] = useState<TUser>(emptyUser);

  // useEffect(() => {
  //   if (data) {
  //     setForm(data);
  //   } else {
  //     setForm(emptyUser);
  //   }
  // }, [data, open]);
  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        password: '',
        emailPassword: '',
      });
    } else {
      setForm(emptyUser);
    }
  }, [data, open]);

  const handleChange =
    (field: keyof TUser) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSave = () => {
    if (!form.email.trim()) {
      alert('email is required');
      return;
    }

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data ? 'Edit User' : 'Add User'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Username"
            value={form.username}
            onChange={handleChange('username')}
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
          />

          <TextField
            label="Password"
            value={form.password}
            onChange={handleChange('password')}
            fullWidth
          />

          <TextField
            label="Email Password"
            value={form.emailPassword}
            onChange={handleChange('emailPassword')}
            fullWidth
          />

          <TextField
            select
            label="Role"
            value={form.role}
            onChange={handleChange('role')}
            fullWidth
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMINISTRATOR">Administrator</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

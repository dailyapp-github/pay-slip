import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from '@mui/material';

import { Recipient } from '../../types/Recipient';
import { Company } from '../../types/Company';
import { CompanyService } from '../../services/company.service';

interface RecipientDialogProps {
  open: boolean;
  data?: Recipient | null;
  onClose: () => void;
  onSave: (data: Recipient) => void;
}

const emptyRecipient: Recipient = {
  companyId: '',
  nik: '',
  name: '',
  email: '',
  pdfPassword: '',
  active: true,
};

export default function RecipientDialog({
  open,
  data,
  onClose,
  onSave,
}: RecipientDialogProps) {
  const [form, setForm] = useState<Recipient>(emptyRecipient);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    loadCompany();
  }, []);

  useEffect(() => {
    if (data) {
      setForm(data);
    } else {
      setForm(emptyRecipient);
    }
  }, [data, open]);

  const loadCompany = async () => {
    const result = await CompanyService.getAll();
    setCompanies(result);
  };

  const handleChange =
    (field: keyof Recipient) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'active' ? event.target.checked : event.target.value;

      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = () => {
    if (!form.companyId) {
      alert('Company is required');
      return;
    }

    if (!form.nik.trim()) {
      alert('NIK is required');
      return;
    }

    if (!form.name.trim()) {
      alert('Name is required');
      return;
    }

    if (!form.email.trim()) {
      alert('Email is required');
      return;
    }

    if (!form.pdfPassword.trim()) {
      alert('Password PDF is required');
      return;
    }

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{data ? 'Edit Recipient' : 'Add Recipient'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            select
            label="Company"
            value={form.companyId}
            onChange={handleChange('companyId')}
            fullWidth
          >
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="NIK"
            value={form.nik}
            onChange={handleChange('nik')}
            fullWidth
          />

          <TextField
            label="Employee Name"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={handleChange('email')}
            fullWidth
          />

          <TextField
            label="PDF Password"
            value={form.pdfPassword}
            onChange={handleChange('pdfPassword')}
            helperText="Example: 1996-05-10"
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={form.active}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    active: e.target.checked,
                  }))
                }
              />
            }
            label="Active"
          />
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

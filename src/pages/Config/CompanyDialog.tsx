import { useEffect, useState } from 'react';

import {
  // Avatar,
  // Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { Company } from '../../types/Company';

interface CompanyDialogProps {
  open: boolean;
  company?: Company | null;
  onClose: () => void;
  onSave: (company: Company) => void;
}

const emptyCompany: Company = {
  name: '',
  code: '',
  phone: '',
  website: '',
  address: '',
  logo: '',
};

export default function CompanyDialog({
  open,
  company,
  onClose,
  onSave,
}: CompanyDialogProps) {
  console.log('CompanyDialog Render');

  const [form, setForm] = useState<Company>(emptyCompany);

  useEffect(() => {
    if (company) {
      setForm(company);
    } else {
      setForm(emptyCompany);
    }
  }, [company, open]);

  const handleChange =
    (field: keyof Company) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  // const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setForm((prev) => ({
  //       ...prev,
  //       logo: reader.result as string,
  //     }));
  //   };

  //   reader.readAsDataURL(file);
  // };

  const handleSave = () => {
    console.log('HANDLE SAVE');

    if (!form.name.trim()) {
      alert('Company Name is required');
      return;
    }

    // alert(JSON.stringify(form));

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{company ? 'Edit Company' : 'Add Company'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Company Name"
            value={form.name}
            onChange={handleChange('name')}
            fullWidth
          />

          <TextField
            label="Company Code"
            value={form.code}
            onChange={handleChange('code')}
            fullWidth
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

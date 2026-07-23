import { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import { Company } from '../../types/Company';
import { CompanyService } from '../../services/company.service';

interface Props {
  open: boolean;
  company: Company | null;

  onClose: () => void;

  onDuplicate: (
    destinationCompanyIds: string[],
    overwrite: boolean,
  ) => Promise<void>;
}

export default function MailTemplateDuplicateDialog({
  open,
  company,
  onClose,
  onDuplicate,
}: Props) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [overwrite, setOverwrite] = useState(false);

  useEffect(() => {
    if (!open || !company) return;

    loadCompany();
    setSelected([]);
    setOverwrite(false);
  }, [open, company]);

  const loadCompany = async () => {
    const result = await CompanyService.getAll();

    setCompanies(result.filter((x) => x._id !== company?._id));
  };

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDuplicate = async () => {
    if (selected.length === 0) {
      alert('Please select destination company.');
      return;
    }

    await onDuplicate(selected, overwrite);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Duplicate Mail Template</DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            <b>Source Company</b>
          </Typography>

          <Typography>{company?.name}</Typography>

          <Typography>
            <b>Destination Company</b>
          </Typography>

          <List dense>
            {companies.map((item) => (
              <ListItem key={item._id} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selected.includes(item._id!)}
                      onChange={() => toggle(item._id!)}
                    />
                  }
                  label={`${item.name} (${item.code})`}
                />
              </ListItem>
            ))}
          </List>

          <FormControlLabel
            control={
              <Switch
                checked={overwrite}
                onChange={(e) => setOverwrite(e.target.checked)}
              />
            }
            label="Replace existing template"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleDuplicate}>
          Duplicate
        </Button>
      </DialogActions>
    </Dialog>
  );
}

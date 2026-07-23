import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { Company } from '../../types/Company';
import { ExcelTemplate } from '../../types/ExcelTemplate';
import { CompanyService } from '../../services/company.service';
import { ExcelTemplateService } from '../../services/excel-template.service';

interface DuplicateExcelTemplateDialogProps {
  open: boolean;
  template: ExcelTemplate | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DuplicateExcelTemplateDialog({
  open,
  template,
  onClose,
  onSuccess,
}: DuplicateExcelTemplateDialogProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    if (!open) return;

    loadCompanies();
    setCompanyId('');
  }, [open]);

  const loadCompanies = async () => {
    const result = await CompanyService.getAll();
    setCompanies(result);
  };

  const availableCompanies = useMemo(() => {
    return companies.filter((company) => company._id !== template?.companyId);
  }, [companies, template]);

  const handleDuplicate = async () => {
    if (!template?.companyId) return;

    if (!companyId) {
      alert('Please select destination company');
      return;
    }

    await ExcelTemplateService.duplicate(template.companyId, [companyId]);

    setCompanyId('');

    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Duplicate Excel Template</DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <Typography>
            <strong>Source Company</strong>
            <br />
            {template?.companyName}
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Destination Company</InputLabel>

            <Select
              value={companyId}
              label="Destination Company"
              onChange={(e) => setCompanyId(e.target.value)}
            >
              {availableCompanies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

import { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import { Add, Delete } from '@mui/icons-material';

import { ExcelTemplate, ExcelTemplateColumn } from '../../types/ExcelTemplate';

import { Company } from '../../types/Company';
import { CompanyService } from '../../services/company.service';

interface ExcelTemplateDialogProps {
  open: boolean;
  data?: ExcelTemplate | null;
  onClose: () => void;
  onSave: (data: ExcelTemplate) => void;
}

const emptyTemplate: ExcelTemplate = {
  companyId: '',
  active: true,
  columns: [],
};

const emptyColumn: ExcelTemplateColumn = {
  header: '',
  label: '',
  type: 'employee',
  required: false,
};

export default function ExcelTemplateDialog({
  open,
  data,
  onClose,
  onSave,
}: ExcelTemplateDialogProps) {
  const [form, setForm] = useState<ExcelTemplate>(emptyTemplate);
  const [companies, setCompanies] = useState<Company[]>([]);

  const loadCompany = async () => {
    const result = await CompanyService.getAll();
    setCompanies(result);
  };

  useEffect(() => {
    if (!open) return;

    loadCompany();

    if (data) {
      setForm(data);
    } else {
      setForm(emptyTemplate);
    }
  }, [open, data]);

  const handleCompany = (value: string) => {
    setForm((prev) => ({
      ...prev,
      companyId: value,
    }));
  };

  const handleColumnChange = <K extends keyof ExcelTemplateColumn>(
    index: number,
    field: K,
    value: ExcelTemplateColumn[K],
  ) => {
    setForm((prev) => {
      const columns = [...prev.columns];

      columns[index] = {
        ...columns[index],
        [field]: value,
      };

      return {
        ...prev,
        columns,
      };
    });
  };

  const addColumn = () => {
    setForm((prev) => ({
      ...prev,
      columns: [...prev.columns, { ...emptyColumn }],
    }));
  };

  const removeColumn = (index: number) => {
    setForm((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!form.companyId) {
      alert('Company is required');
      return;
    }

    if (form.columns.length === 0) {
      alert('Please add at least one column.');
      return;
    }

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        {data ? 'Edit Excel Template' : 'Add Excel Template'}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>

            <Select
              value={form.companyId}
              label="Company"
              onChange={(e) => handleCompany(e.target.value)}
            >
              {companies.map((company) => (
                <MenuItem key={company._id} value={company._id}>
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell width={250}>Excel Header</TableCell>
                <TableCell width={250}>Display Label</TableCell>
                <TableCell width={200}>Type</TableCell>
                <TableCell width={120}>Required</TableCell>
                <TableCell width={80}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {form.columns.map((column, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={column.header}
                      onChange={(e) =>
                        handleColumnChange(index, 'header', e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      size="small"
                      fullWidth
                      value={column.label}
                      onChange={(e) =>
                        handleColumnChange(index, 'label', e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <FormControl fullWidth size="small">
                      <Select
                        value={column.type}
                        onChange={(e) =>
                          handleColumnChange(index, 'type', e.target.value)
                        }
                      >
                        <MenuItem value="employee">Employee</MenuItem>

                        <MenuItem value="benefit">Benefit</MenuItem>

                        <MenuItem value="deduction">Deduction</MenuItem>

                        <MenuItem value="totalBenefit">Total Benefit</MenuItem>

                        <MenuItem value="totalDeduction">
                          Total Deduction
                        </MenuItem>

                        <MenuItem value="netSalary">Net Salary</MenuItem>

                        <MenuItem value="information">Information</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  <TableCell align="center">
                    <Checkbox
                      checked={column.required}
                      onChange={(e) =>
                        handleColumnChange(index, 'required', e.target.checked)
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => removeColumn(index)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button variant="outlined" startIcon={<Add />} onClick={addColumn}>
            Add Column
          </Button>
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

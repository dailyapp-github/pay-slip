import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { SendSlipPreviewRow } from '../../types/SendSlip';

interface Props {
  open: boolean;
  data: SendSlipPreviewRow | null;
  onClose: () => void;
}

export default function SendSlipDetailDialog({ open, data, onClose }: Props) {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Payslip Detail</DialogTitle>

      <DialogContent dividers>
        {/* Employee */}

        <Typography variant="h6" gutterBottom>
          Employee
        </Typography>

        <List dense>
          {data.employee.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.label} secondary={item.value} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Benefit */}

        <Typography variant="h6" gutterBottom>
          Benefits
        </Typography>

        <List dense>
          {data.benefits.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.label} />

              <Typography>{item.amount.toLocaleString('id-ID')}</Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Deduction */}

        <Typography variant="h6" gutterBottom>
          Deductions
        </Typography>

        <List dense>
          {data.deductions.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.label} />

              <Typography>{item.amount.toLocaleString('id-ID')}</Typography>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Information */}

        <Typography variant="h6" gutterBottom>
          Information
        </Typography>

        <List dense>
          {data.informations.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.label} secondary={item.value} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Summary */}

        <Box>
          <Typography>
            Total Benefit : {data.totalBenefit.toLocaleString('id-ID')}
          </Typography>

          <Typography>
            Total Deduction : {data.totalDeduction.toLocaleString('id-ID')}
          </Typography>

          <Typography variant="h6">
            Net Salary : {data.netSalary.toLocaleString('id-ID')}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = 'Confirmation',
  message,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { Company } from '../../types/Company';
import { MailTemplateService } from '../../services/mail-template.service';
import MailEditor from '../../components/editor/MailEditor';

interface MailTemplateDialogProps {
  open: boolean;
  company: Company | null;
  onClose: () => void;
  onSave: (content: string) => void;
}

export default function MailTemplateDialog({
  open,
  company,
  onClose,
  onSave,
}: MailTemplateDialogProps) {
  const [content, setContent] = useState('');
  const defaultTemplate = `
<p>Please find attached your payslip.</p>

<p>
If you have any questions,<br>
please contact HR.
</p>

<p>Thank you.</p>

<p>
Best Regards,<br>
Human Resource Department
</p>
`;

  useEffect(() => {
    const loadTemplate = async () => {
      if (!company?._id) return;

      try {
        const result = await MailTemplateService.getByCompany(company._id);

        setContent(result?.content || defaultTemplate);
      } catch (err) {
        setContent(defaultTemplate);
      }
    };

    if (open) {
      loadTemplate();
    }
  }, [company, open]);

  const handleSave = () => {
    if (!content.trim()) {
      alert('Mail template content is required.');
      return;
    }

    onSave(content);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Mail Template - {company?.name}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <MailEditor
            key={`${company?._id}-${open}`}
            value={content}
            onChange={setContent}
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

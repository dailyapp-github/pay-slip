import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  // TextField,
} from '@mui/material';

// import { MailTemplate } from '../../types/MailTemplate';
import { Company } from '../../types/Company';
import { MailTemplateService } from '../../services/mail-template.service';
import MailEditor from '../../components/editor/MailEditor';

interface MailTemplateDialogProps {
  open: boolean;
  company: Company | null;
  onClose: () => void;
  onSave: (content: string) => void;
}

// const emptyTemplate: MailTemplate = {
//   companyId: '',
//   content: `Please find attached your payslip.

// If you have any questions,
// please contact HR.

// Thank you.

// Best Regards,

// Human Resource Department`,
// };

export default function MailTemplateDialog({
  open,
  company,
  onClose,
  onSave,
}: MailTemplateDialogProps) {
  //   const [form, setForm] = useState<MailTemplate>(emptyTemplate);
  const [content, setContent] = useState('');

  //   useEffect(() => {
  //     if (!company) return;

  //     loadTemplate();
  //   }, [company]);

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
  //   const loadTemplate = async () => {
  //     if (!company?._id) return;

  //     try {
  //       const result = await MailTemplateService.getByCompany(company._id);

  //       setContent(result?.content ?? '');
  //     } catch {
  //       setContent('');
  //     }
  //   };

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
          {/* <TextField
            label="Template Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={12}
            fullWidth
            helperText="This content will appear in the email body before the payslip attachment."
          /> */}
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

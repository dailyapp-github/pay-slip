import { Editor } from '@tiptap/react';

import { Box, Button, Typography, Paper } from '@mui/material';

interface Props {
  editor: Editor | null;
}

const placeholders = [
  { label: 'Employee Name', value: '{{employee_name}}' },
  { label: 'NIK', value: '{{nik}}' },
  { label: 'Period', value: '{{period}}' },
  { label: 'Company', value: '{{company_name}}' },
  { label: 'Password', value: '{{password}}' },
];

export default function PlaceholderPanel({ editor }: Props) {
  if (!editor) return null;

  const insertPlaceholder = (value: string) => {
    editor.chain().focus().insertContent(value).run();
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        width: 220,
        borderLeft: 1,
        borderColor: 'divider',
        borderRadius: 0,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        Placeholder
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
        }}
      >
        {placeholders.map((item) => (
          <Button
            key={item.value}
            fullWidth
            variant="outlined"
            size="small"
            onClick={() => insertPlaceholder(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Paper>
  );
}

import { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function SendSlip() {
  const [file, setFile] = useState<File | null>(null);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];

    if (selected) {
      setFile(selected);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Send Slip
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 5,
          border: '2px dashed #bdbdbd',
          textAlign: 'center',
        }}
      >
        <UploadFileIcon
          sx={{
            fontSize: 70,
            color: 'primary.main',
            mb: 2,
          }}
        />

        <Typography variant="h6">Upload File Excel Pay Slip</Typography>

        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
          Pilih file Excel yang berisi daftar slip gaji yang akan dikirim.
        </Typography>

        <Button variant="contained" component="label">
          Choose Excel File
          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            onChange={handleSelectFile}
          />
        </Button>

        {file && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              mt: 4,
            }}
          >
            <Typography>
              <strong>File :</strong> {file.name}
            </Typography>

            <Typography color="text.secondary">
              Size : {(file.size / 1024).toFixed(2)} KB
            </Typography>

            <Button variant="contained" color="success" sx={{ mt: 2 }}>
              Upload
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

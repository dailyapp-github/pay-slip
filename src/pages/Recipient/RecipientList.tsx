import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Add, Delete, Edit, Search, UploadFile } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Recipient } from '../../types/Recipient';
import { RecipientService } from '../../services/recipient.service';

import RecipientDialog from './RecipientDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import { useSnackbar } from '../../context/SnackbarContext';

export default function RecipientList() {
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = useState<Recipient[]>([]);
  const [keyword, setKeyword] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null,
  );

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteRecipient, setDeleteRecipient] = useState<Recipient | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await RecipientService.getAll();
    setRows(data);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.nik.toLowerCase().includes(keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(keyword.toLowerCase()) ||
        item.companyName?.toLowerCase().includes(keyword.toLowerCase())
      );
    });
  }, [rows, keyword]);

  const handleAdd = () => {
    setSelectedRecipient(null);
    setOpenDialog(true);
  };

  const handleEdit = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setOpenDialog(true);
  };

  const handleDelete = (recipient: Recipient) => {
    setDeleteRecipient(recipient);
    setOpenDelete(true);
  };

  const handleSave = async (recipient: Recipient) => {
    if (!recipient._id) {
      await RecipientService.create(recipient);
    } else {
      await RecipientService.update(recipient);
    }

    await loadData();
    showSnackbar('Recipient saved successfully', 'success');

    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (!deleteRecipient?._id) return;

    await RecipientService.delete(deleteRecipient._id);

    await loadData();

    setDeleteRecipient(null);
    showSnackbar('Recipient Deleted successfully', 'success');

    setOpenDelete(false);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      // 1. Jalankan proses import
      const response = await RecipientService.import(file);

      // 2. Cek apakah status dari server sukses (1000)
      if (response && response.status === 1000) {
        // Tampilkan alert sukses terlebih dahulu karena import-nya memang berhasil
        showSnackbar('Recipient imported successfully', 'success');

        // 3. Panggil loadData di dalam try-catch terisolasi agar jika loadData error,
        // tidak merusak/mengubah alert sukses menjadi alert gagal.
        try {
          await loadData();
        } catch (loadError) {
          console.error(
            'Import sukses, tetapi gagal memperbarui tampilan data:',
            loadError,
          );
          showSnackbar(
            'Recipient imported successfully but failed update datas',
            'success',
          );
          // Anda bisa memberikan alert opsional di sini jika mau
          // alert('Gagal memuat ulang data terbaru, silakan refresh halaman.');
        }
      } else {
        showSnackbar('Recipient imported Failed', 'error');
      }
    } catch (err) {
      // Masuk ke sini HANYA jika proses import-nya yang gagal total (network error/500)
      console.error('Error saat proses import:', err);
      alert(
        'Import recipient gagal. Silakan periksa koneksi atau format file Anda.',
      );
      showSnackbar(
        'Recipient imported Failed. Please check your connection',
        'error',
      );
    } finally {
      event.target.value = '';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company',
      flex: 1.5,
    },
    {
      field: 'nik',
      headerName: 'NIK',
      width: 120,
    },
    {
      field: 'name',
      headerName: 'Employee Name',
      flex: 1.8,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
    },
    {
      field: 'active',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>

          <IconButton color="error" onClick={() => handleDelete(params.row)}>
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5">Recipient</Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<UploadFile />}
            onClick={handleImport}
          >
            Import Recipient
          </Button>

          <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
            Add Recipient
          </Button>
        </Stack>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search recipient..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
      </Paper>

      <Paper sx={{ height: 550 }}>
        <DataGrid
          rows={filteredRows}
          getRowId={(row) => row._id!}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Paper>

      <RecipientDialog
        open={openDialog}
        data={selectedRecipient}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={openDelete}
        title="Delete Recipient"
        message={`Delete recipient "${deleteRecipient?.name}" ?`}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
}

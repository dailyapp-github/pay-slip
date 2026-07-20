import { Add, Delete, Edit, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  // Paper,
  TextField,
  // Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useMemo, useState } from 'react';
import { TUser } from '../../types/User';
import { UserService } from '../../services/user.service';
import UserDialog from './UserDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import ContentCard from '../../components/ContentCard';
import { useSnackbar } from '../../context/SnackbarContext';

export default function UserList() {
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = useState<TUser[]>([]);
  const [keyword, setKeyword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteUser, setDeleteUser] = useState<TUser | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await UserService.getAll();
    setRows(data);
  };

  const filteredRows = useMemo(() => {
    return rows.filter(
      (item) =>
        item.username.toLowerCase().includes(keyword.toLowerCase()) ||
        item.email.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [rows, keyword]);

  const handleAdd = () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleEdit = (user: TUser) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (user: TUser) => {
    setDeleteUser(user);
    setOpenDelete(true);
  };

  const handleSave = async (user: TUser) => {
    if (user._id === '' || user._id === undefined) {
      await UserService.create(user);
    } else {
      await UserService.update(user);
    }

    await loadData();
    showSnackbar('User saved successfully', 'success');

    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (!deleteUser) return;

    await UserService.delete(deleteUser._id || '');

    await loadData();
    showSnackbar('User deleted successfully', 'success');

    setOpenDelete(false);
    setDeleteUser(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Username',
      flex: 1.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1.5,
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
    <ContentCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <TextField
          placeholder="Search user..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{
            width: 320,
          }}
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
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          size="large"
        >
          Add User
        </Button>
      </Box>

      <DataGrid
        sx={{
          border: 0,

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'background.default',
            borderBottom: '1px solid',
            borderColor: 'divider',
            fontWeight: 700,
          },

          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid',
            borderColor: '#F1F5F9',
          },

          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid',
            borderColor: 'divider',
          },
        }}
        rows={filteredRows}
        getRowId={(filteredRow) => filteredRow._id}
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
      <UserDialog
        open={openDialog}
        data={selectedUser}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={openDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteUser?.username}"?`}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </ContentCard>
  );
}

import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  IconButton,
  // Paper,
  TextField,
  // Typography,
  Avatar,
  InputAdornment,
  Chip,
} from '@mui/material';

import { Add, Delete, Edit, Search } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Company } from '../../types/Company';
import CompanyDialog from './CompanyDialog';
import ConfirmDialog from '../../components/ConfirmDialog';
import { CompanyService } from '../../services/company.service';
import ContentCard from '../../components/ContentCard';
import { useSnackbar } from '../../context/SnackbarContext';

// import { companyMock } from '../../mocks/company.mock';

export default function CompanyList() {
  const { showSnackbar } = useSnackbar();
  const [keyword, setKeyword] = useState('');
  const [rows, setRows] = useState<Company[]>([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const [deleteCompany, setDeleteCompany] = useState<Company | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.code.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [rows, keyword]);

  const loadData = async () => {
    const result = await CompanyService.getAll();
    setRows(result);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setSelectedCompany(null);
    setOpenDialog(true);
  };

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  const handleDelete = (company: Company) => {
    setDeleteCompany(company);
    setOpenDelete(true);
  };

  const refreshData = async () => {
    const data = await CompanyService.getAll();
    setRows(data);
  };

  const handleSave = async (company: Company) => {
    console.log('COMPANY', company);
    if (!company._id) {
      await CompanyService.create(company);
    } else {
      await CompanyService.update(company);
    }

    await refreshData();
    showSnackbar('Company saved successfully', 'success');

    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    if (!deleteCompany) return;

    await CompanyService.delete(deleteCompany._id!);

    await refreshData();

    setOpenDelete(false);
    setDeleteCompany(null);
    showSnackbar('Company Deleted successfully', 'success');
  };

  const columns: GridColDef[] = [
    {
      field: 'logo',
      headerName: 'Logo',
      width: 90,
      sortable: false,
      renderCell: () => <Avatar sx={{ width: 40, height: 40 }}>C</Avatar>,
    },
    {
      field: 'name',
      headerName: 'Company Name',
      flex: 1.5,
    },
    {
      field: 'code',
      headerName: 'Code',
      flex: 1.5,
    },
    {
      field: 'isActive',
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
    // <Box>
    //   <Box
    //     sx={{
    //       display: 'flex',
    //       justifyContent: 'space-between',
    //       alignItems: 'center',
    //       mb: 3,
    //     }}
    //   >
    //     <Typography variant="h5">Company</Typography>

    //     <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
    //       Add Company
    //     </Button>
    //   </Box>

    //   <Paper
    //     sx={{
    //       p: 2,
    //       mb: 2,
    //     }}
    //   >
    //     <TextField
    //       fullWidth
    //       placeholder="Search company..."
    //       value={keyword}
    //       onChange={(e) => setKeyword(e.target.value)}
    //       slotProps={{
    //         input: {
    //           startAdornment: (
    //             <InputAdornment position="start">
    //               <Search />
    //             </InputAdornment>
    //           ),
    //         },
    //       }}
    //     />
    //   </Paper>

    //   <Paper sx={{ height: 500 }}>
    //     <DataGrid
    //       rows={filteredRows}
    //       getRowId={(filteredRow) => filteredRow._id}
    //       columns={columns}
    //       pageSizeOptions={[10, 20, 50]}
    //       initialState={{
    //         pagination: {
    //           paginationModel: {
    //             pageSize: 10,
    //             page: 0,
    //           },
    //         },
    //       }}
    //       disableRowSelectionOnClick
    //     />
    //   </Paper>
    //   <CompanyDialog
    //     open={openDialog}
    //     company={selectedCompany}
    //     onClose={() => setOpenDialog(false)}
    //     onSave={handleSave}
    //   />
    //   <ConfirmDialog
    //     open={openDelete}
    //     title="Delete Company"
    //     message={`Are you sure you want to delete "${deleteCompany?.name}"?`}
    //     onClose={() => setOpenDelete(false)}
    //     onConfirm={confirmDelete}
    //   />
    // </Box>

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
          placeholder="Search company..."
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
          Add Company
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
      <CompanyDialog
        open={openDialog}
        company={selectedCompany}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />
      <ConfirmDialog
        open={openDelete}
        title="Delete Company"
        message={`Are you sure you want to delete "${deleteCompany?.name}"?`}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      />
    </ContentCard>
  );
}

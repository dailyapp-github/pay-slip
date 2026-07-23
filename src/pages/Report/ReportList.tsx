import { useEffect, useMemo, useState } from 'react';

import { Box, Chip, InputAdornment, TextField } from '@mui/material';

import { Search } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import ContentCard from '../../components/ContentCard';

import { SendSlipReport } from '../../types/SendSlipReport';
import { SendSlipReportService } from '../../services/send-slip-report.service';

export default function ReportList() {
  const [rows, setRows] = useState<SendSlipReport[]>([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await SendSlipReportService.getAll();

      setRows(result);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRows = useMemo(() => {
    const key = keyword.toLowerCase();

    return rows.filter((item) =>
      [
        item.companyName,
        item.employeeName,
        item.employeeNik,
        item.period,
        item.email,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(key)),
    );
  }, [rows, keyword]);

  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company',
      flex: 1.5,
    },
    {
      field: 'employeeName',
      headerName: 'Employee',
      flex: 2,
    },
    {
      field: 'employeeNik',
      headerName: 'NIK',
      width: 140,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
    },
    {
      field: 'period',
      headerName: 'Period',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          size="small"
          color={params.value === 'SUCCESS' ? 'success' : 'error'}
          label={params.value}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Sent At',
      width: 180,
      valueFormatter: (value) =>
        value ? new Date(value).toLocaleString('id-ID') : '-',
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
          placeholder="Search report..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          sx={{
            width: 350,
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
        columns={columns}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 20, 50, 100]}
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
    </ContentCard>
  );
}

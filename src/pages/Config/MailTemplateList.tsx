import { useEffect, useState } from 'react';

import { Chip, IconButton } from '@mui/material';

import { Edit } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Company } from '../../types/Company';
import { CompanyService } from '../../services/company.service';
import { MailTemplateService } from '../../services/mail-template.service';
import MailTemplateDialog from './MailTemplateDialog';
import ContentCard from '../../components/ContentCard';
import { useSnackbar } from '../../context/SnackbarContext';

interface CompanyTemplate extends Company {
  configured: boolean;
}

export default function MailTemplateList() {
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = useState<CompanyTemplate[]>([]);
  const [selectedCompany, setSelectedCompany] =
    useState<CompanyTemplate | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const companies = await CompanyService.getAll();

    const result = await Promise.all(
      companies.map(async (company) => {
        try {
          const template = await MailTemplateService.getByCompany(company._id!);

          return {
            ...company,
            configured: !!template,
          };
        } catch {
          return {
            ...company,
            configured: false,
          };
        }
      }),
    );

    setRows(result);
  };

  const handleEdit = (company: CompanyTemplate) => {
    setSelectedCompany(company);
    setOpenDialog(true);
  };

  const handleSave = async (content: string) => {
    if (!selectedCompany?._id) return;

    await MailTemplateService.save(selectedCompany._id, content);

    showSnackbar('Template saved successfully', 'success');

    setOpenDialog(false);

    loadData();
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Company',
      flex: 2,
    },
    {
      field: 'code',
      headerName: 'Code',
      width: 120,
    },
    {
      field: 'configured',
      headerName: 'Template',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Configured' : 'Not Configured'}
          color={params.value ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
          <Edit />
        </IconButton>
      ),
    },
  ];

  return (
    <ContentCard>
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
        rows={rows}
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
      <MailTemplateDialog
        open={openDialog}
        company={selectedCompany}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />
    </ContentCard>
  );
}

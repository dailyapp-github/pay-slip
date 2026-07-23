import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

import { Add, ContentCopy, Download, Edit, Search } from '@mui/icons-material';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ExcelTemplate } from '../../types/ExcelTemplate';
import { ExcelTemplateService } from '../../services/excel-template.service';
import ExcelTemplateDialog from './ExcelTemplateDialog';
// import ConfirmDialog from '../../components/ConfirmDialog';
import ContentCard from '../../components/ContentCard';
import { useSnackbar } from '../../context/SnackbarContext';
import DuplicateExcelTemplateDialog from './DuplicateExcelTemplateDialog';

export default function ExcelTemplateList() {
  const { showSnackbar } = useSnackbar();
  const [rows, setRows] = useState<ExcelTemplate[]>([]);
  const [keyword, setKeyword] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<ExcelTemplate | null>(null);

  const [openDuplicate, setOpenDuplicate] = useState(false);

  const [duplicateTemplate, setDuplicateTemplate] =
    useState<ExcelTemplate | null>(null);

  // const [openDelete, setOpenDelete] = useState(false);
  // const [deleteTemplate, setDeleteTemplate] = useState<ExcelTemplate | null>(
  //   null,
  // );

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await ExcelTemplateService.getAll();
    setRows(data);
  };

  const filteredRows = useMemo(() => {
    return rows.filter((item) =>
      item?.companyName?.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [rows, keyword]);

  const handleAdd = () => {
    setSelectedTemplate(null);
    setOpenDialog(true);
  };

  const handleEdit = (template: ExcelTemplate) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const handleDuplicate = (template: ExcelTemplate) => {
    setDuplicateTemplate(template);
    setOpenDuplicate(true);
  };

  // const handleDelete = (template: ExcelTemplate) => {
  //   setDeleteTemplate(template);
  //   setOpenDelete(true);
  // };

  // const handleSave = async (template: ExcelTemplate) => {
  //   await ExcelTemplateService.create(template);

  //   await loadData();
  //   showSnackbar('Template saved successfully', 'success');

  //   setOpenDialog(false);
  // };

  const handleSave = async (template: ExcelTemplate) => {
    await ExcelTemplateService.save(template);

    await loadData();

    showSnackbar('Template saved successfully', 'success');

    setOpenDialog(false);
  };

  // const confirmDelete = async () => {
  //   if (!deleteTemplate?._id) return;

  //   await ExcelTemplateService.delete(deleteTemplate._id);

  //   await loadData();
  //   showSnackbar('Template Deleted successfully', 'success');

  //   setOpenDelete(false);
  //   setDeleteTemplate(null);
  // };

  const handleDownloadTemplate = async () => {
    await ExcelTemplateService.downloadTemplate();
  };

  const columns: GridColDef[] = [
    {
      field: 'companyName',
      headerName: 'Company',
      flex: 2,
    },
    {
      field: 'columns',
      headerName: 'Mappings',
      width: 120,
      renderCell: (params) => params.value?.length ?? 0,
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
      // renderCell: (params) => (
      //   <>
      //     <IconButton color="primary" onClick={() => handleEdit(params.row)}>
      //       <Edit />
      //     </IconButton>

      //     {/* <IconButton color="error" onClick={() => handleDelete(params.row)}>
      //       <Delete />
      //     </IconButton> */}
      //   </>
      // ),
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <Edit />
          </IconButton>

          <IconButton
            color="secondary"
            onClick={() => handleDuplicate(params.row)}
          >
            <ContentCopy />
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
    //     <Typography variant="h5">Excel Template</Typography>

    //     <Button
    //       variant="outlined"
    //       color="success"
    //       startIcon={<Download />}
    //       onClick={handleDownloadTemplate}
    //     >
    //       Download Template
    //     </Button>

    //     <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
    //       Add Template
    //     </Button>
    //   </Box>

    //   <Paper sx={{ p: 2, mb: 2 }}>
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
    //       getRowId={(row) => row._id ?? row.companyId}
    //       columns={columns}
    //       pageSizeOptions={[10, 20, 50]}
    //       initialState={{
    //         pagination: {
    //           paginationModel: {
    //             page: 0,
    //             pageSize: 10,
    //           },
    //         },
    //       }}
    //       disableRowSelectionOnClick
    //     />
    //   </Paper>

    //   <ExcelTemplateDialog
    //     open={openDialog}
    //     data={selectedTemplate}
    //     onClose={() => setOpenDialog(false)}
    //     onSave={handleSave}
    //   />

    //   <ConfirmDialog
    //     open={openDelete}
    //     title="Delete Excel Template"
    //     message={`Delete template "${deleteTemplate?.companyName}" ?`}
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
          placeholder="Search Company..."
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
          variant="outlined"
          color="success"
          startIcon={<Download />}
          onClick={handleDownloadTemplate}
        >
          Download Template
        </Button>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
          size="large"
        >
          Add Template
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
      <ExcelTemplateDialog
        open={openDialog}
        data={selectedTemplate}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />

      <DuplicateExcelTemplateDialog
        open={openDuplicate}
        template={duplicateTemplate}
        onClose={() => setOpenDuplicate(false)}
        onSuccess={async () => {
          await loadData();
          setOpenDuplicate(false);

          showSnackbar('Template duplicated successfully', 'success');
        }}
      />

      {/* <ConfirmDialog
        open={openDelete}
        title="Delete Excel Template"
        message={`Delete template "${deleteTemplate?.companyName}" ?`}
        onClose={() => setOpenDelete(false)}
        onConfirm={confirmDelete}
      /> */}
    </ContentCard>
  );
}

// import { useEffect, useMemo, useState } from 'react';

// import {
//   Box,
//   Button,
//   Chip,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from '@mui/material';

// import { Add, Delete, Edit, Search } from '@mui/icons-material';

// import { DataGrid, GridColDef } from '@mui/x-data-grid';

// import { ExcelTemplate } from '../../types/ExcelTemplate';
// import { ExcelTemplateService } from '../../services/excel-template.service';
// import ExcelTemplateDialog from './ExcelTemplateDialog';
// import ConfirmDialog from '../../components/ConfirmDialog';

// export default function ExcelTemplateList() {
//   const [rows, setRows] = useState<ExcelTemplate[]>([]);
//   const [keyword, setKeyword] = useState('');

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] =
//     useState<ExcelTemplate | null>(null);

//   const [openDelete, setOpenDelete] = useState(false);
//   const [deleteTemplate, setDeleteTemplate] = useState<ExcelTemplate | null>(
//     null,
//   );

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const data = await ExcelTemplateService.getAll();
//     setRows(data);
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter((item) =>
//       item?.companyName?.toLowerCase().includes(keyword.toLowerCase()),
//     );
//   }, [rows, keyword]);

//   const handleAdd = () => {
//     setSelectedTemplate(null);
//     setOpenDialog(true);
//   };

//   const handleEdit = (template: ExcelTemplate) => {
//     setSelectedTemplate(template);
//     setOpenDialog(true);
//   };

//   const handleDelete = (template: ExcelTemplate) => {
//     setDeleteTemplate(template);
//     setOpenDelete(true);
//   };

//   const handleSave = async (template: ExcelTemplate) => {
//     if (!template._id) {
//       await ExcelTemplateService.create(template);
//     } else {
//       await ExcelTemplateService.update(template);
//     }

//     await loadData();

//     setOpenDialog(false);
//   };

//   const confirmDelete = async () => {
//     if (!deleteTemplate?._id) return;

//     await ExcelTemplateService.delete(deleteTemplate._id);

//     await loadData();

//     setOpenDelete(false);
//     setDeleteTemplate(null);
//   };

//   const columns: GridColDef[] = [
//     {
//       field: 'companyName',
//       headerName: 'Company',
//       flex: 2,
//     },
//     {
//       field: 'columns',
//       headerName: 'Mappings',
//       width: 120,
//       renderCell: (params) => params.value?.length ?? 0,
//     },
//     {
//       field: 'active',
//       headerName: 'Status',
//       width: 120,
//       renderCell: (params) => (
//         <Chip
//           label={params.value ? 'Active' : 'Inactive'}
//           color={params.value ? 'success' : 'default'}
//           size="small"
//         />
//       ),
//     },
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 120,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" onClick={() => handleEdit(params.row)}>
//             <Edit />
//           </IconButton>

//           <IconButton color="error" onClick={() => handleDelete(params.row)}>
//             <Delete />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5">Excel Template</Typography>

//         <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
//           Add Template
//         </Button>
//       </Box>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <TextField
//           fullWidth
//           placeholder="Search company..."
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Search />
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />
//       </Paper>

//       <Paper sx={{ height: 500 }}>
//         <DataGrid
//           rows={filteredRows}
//           getRowId={(row) => row._id!}
//           columns={columns}
//           pageSizeOptions={[10, 20, 50]}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 page: 0,
//                 pageSize: 10,
//               },
//             },
//           }}
//           disableRowSelectionOnClick
//         />
//       </Paper>

//       <ExcelTemplateDialog
//         open={openDialog}
//         data={selectedTemplate}
//         onClose={() => setOpenDialog(false)}
//         onSave={handleSave}
//       />

//       <ConfirmDialog
//         open={openDelete}
//         title="Delete Excel Template"
//         message={`Delete template "${deleteTemplate?.companyName}" ?`}
//         onClose={() => setOpenDelete(false)}
//         onConfirm={confirmDelete}
//       />
//     </Box>
//   );
// }

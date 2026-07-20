// import {
//   Box,
//   Button,
//   // Button,
//   Chip,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   // TextField,
//   Typography,
// } from '@mui/material';
// import { useEffect, useMemo, useState } from 'react';
// import { MailSetting } from '../../types/MailSetting';
// import { MailSettingService } from '../../services/mail-setting.service';
// // import { Add, Delete, Edit } from '@mui/icons-material';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import MailSettingDialog from './MailSettingDialog';
// import { Edit, Delete, Add, Search } from '@mui/icons-material';
// import ConfirmDialog from '../../components/ConfirmDialog';

// export default function MailSettingList() {
//   const [rows, setRows] = useState<MailSetting[]>([]);
//   const [keyword, setKeyword] = useState('');

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedMail, setSelectedMail] = useState<MailSetting | null>(null);

//   const [deleteMail, setDeleteMail] = useState<MailSetting | null>(null);
//   const [openDelete, setOpenDelete] = useState(false);

//   console.log(deleteMail, selectedMail);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     const data = await MailSettingService.getAll();
//     setRows(data);
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter(
//       (item) =>
//         item.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
//         item.senderEmail.toLowerCase().includes(keyword.toLowerCase()) ||
//         item.smtpHost.toLowerCase().includes(keyword.toLowerCase()),
//     );
//   }, [rows, keyword]);

//   const handleAdd = () => {
//     setSelectedMail(null);
//     setOpenDialog(true);
//   };

//   const handleEdit = (mail: MailSetting) => {
//     setSelectedMail(mail);
//     setOpenDialog(true);
//   };

//   const handleDelete = async (mail: MailSetting) => {
//     if (!window.confirm(`Delete "${mail.companyName}" ?`)) return;

//     await MailSettingService.delete(mail.id);

//     await loadData();
//   };

//   const handleSave = async (mail: MailSetting) => {
//     if (!mail.id) {
//       await MailSettingService.create(mail);
//     } else {
//       await MailSettingService.update(mail);
//     }

//     await loadData();

//     setOpenDialog(false);
//   };

//   const confirmDelete = async () => {
//     if (!deleteMail) return;

//     await MailSettingService.delete(deleteMail.id);

//     await loadData();

//     setOpenDelete(false);
//     setDeleteMail(null);
//   };

//   const columns: GridColDef[] = [
//     {
//       field: 'companyName',
//       headerName: 'Company',
//       flex: 1.5,
//     },
//     {
//       field: 'senderEmail',
//       headerName: 'Sender Email',
//       flex: 1.5,
//     },
//     {
//       field: 'smtpHost',
//       headerName: 'SMTP Host',
//       flex: 1.5,
//     },
//     {
//       field: 'smtpPort',
//       headerName: 'Port',
//       width: 100,
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
//         <Typography variant="h5">Mail Setting</Typography>

//         <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
//           Add Setting
//         </Button>
//       </Box>
//       <Paper
//         sx={{
//           p: 2,
//           mb: 2,
//         }}
//       >
//         <TextField
//           fullWidth
//           placeholder="Search Setting..."
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

//       {/* <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
//         Add Mail Setting
//       </Button> */}

//       <Paper sx={{ height: 500 }}>
//         <DataGrid
//           rows={filteredRows}
//           getRowId={(row) => row._id}
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
//       <MailSettingDialog
//         open={openDialog}
//         data={selectedMail}
//         onClose={() => setOpenDialog(false)}
//         onSave={handleSave}
//       />

//       <ConfirmDialog
//         open={openDelete}
//         title="Delete Mail Setting"
//         message={`Delete "${deleteMail?.companyName}" ?`}
//         onClose={() => setOpenDelete(false)}
//         onConfirm={confirmDelete}
//       />
//     </Box>
//   );
// }

import { useEffect, useRef, useState } from 'react';

import moment from 'moment';

import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Company } from '../../types/Company';
import { CompanyService } from '../../services/company.service';
import { SendSlipService } from '../../services/send-slip.service';
import { LoadingButton } from '@mui/lab';
import { SendSlipPreview, SendSlipPreviewRow } from '../../types/SendSlip';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SendSlipDetailDialog from './SendSlipDetailDialog';

import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorIcon from '@mui/icons-material/Error';
import PageHeader from '../../components/PageHeader';
import ContentCard from '../../components/ContentCard';
import { useSnackbar } from '../../context/SnackbarContext';
import { useLoading } from '../../context/LoadingContext';

type WorkflowStatus = 'idle' | 'preview' | 'generated' | 'completed';

export default function SendSlip() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { showLoading, hideLoading } = useLoading();

  const { showSnackbar } = useSnackbar();

  const [companies, setCompanies] = useState<Company[]>([]);

  const [companyId, setCompanyId] = useState('');

  const [period, setPeriod] = useState(moment().format('MMMM YYYY'));

  const [file, setFile] = useState<File | null>(null);

  // const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState<SendSlipPreview | null>(null);

  const [previewId, setPreviewId] = useState('');

  const [generateResult, setGenerateResult] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);

  const [workflow, setWorkflow] = useState<WorkflowStatus>('idle');

  const [openDetail, setOpenDetail] = useState(false);

  const [selectedRow, setSelectedRow] = useState<SendSlipPreviewRow | null>(
    null,
  );

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    const data = await CompanyService.getAll();

    setCompanies(data);
  };

  const handlePreview = async () => {
    if (!companyId) {
      showSnackbar('Please select a company', 'warning');
      return;
    }

    if (!file) {
      showSnackbar('Please select a file', 'warning');
      return;
    }
    setGenerateResult(null);
    setPreviewId('');
    setPreview(null);

    try {
      showLoading('Preview on process', 'Please wait...');

      const result = await SendSlipService.preview(companyId, period, file);

      setPreview(result);

      setPreviewId(result.previewId);
      setWorkflow('preview');
      showSnackbar('Rewiew File successfully', 'success');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to Rewiew File', 'error');
    } finally {
      hideLoading();
    }
  };

  const rows =
    preview?.rows.map((item, index) => ({
      id: index,

      status: item.status,

      nik: item.recipient?.nik ?? '-',

      name: item.recipient?.name ?? '-',

      email: item.recipient?.email ?? '-',

      netSalary: item.netSalary,

      data: item,
    })) ?? [];

  const handleGeneratePdf = async () => {
    try {
      showLoading('Generating PDF', 'Please wait...');

      const result = await SendSlipService.generate(previewId);

      setGenerateResult(result);
      setWorkflow('generated');

      showSnackbar(
        `Generate PDF completed successfully.\n\nTotal : ${result.total}\nSuccess : ${result.success}\nFailed : ${result.failed}`,
      );
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to Generate PDF', 'error');
    } finally {
      hideLoading();
    }
  };

  const handleSendEmail = async () => {
    try {
      showLoading('Sending Email', 'Please wait...');

      const result = await SendSlipService.send(previewId);

      console.log(result);
      setWorkflow('completed');

      showSnackbar('Email sent successfully', 'success');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to Email sent', 'error');
    } finally {
      hideLoading();
    }
  };

  const handleNewSession = () => {
    setCompanyId('');

    setPeriod(moment().format('MMMM YYYY'));

    setFile(null);

    setPreview(null);

    setPreviewId('');

    setGenerateResult(null);

    setSelectedRow(null);

    setOpenDetail(false);

    setWorkflow('idle');
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => (
        <Chip
          label={params.value === 'READY' ? 'Ready' : 'Recipient Not Found'}
          color={params.value === 'READY' ? 'success' : 'error'}
          size="small"
        />
      ),
    },

    {
      field: 'nik',
      headerName: 'NIK',
      width: 140,
    },

    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },

    {
      field: 'netSalary',
      headerName: 'Net Salary',
      width: 180,
      valueFormatter: (value) => Number(value).toLocaleString('id-ID'),
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => {
            setSelectedRow(params.row.data);
            setOpenDetail(true);
          }}
        >
          Detail
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Send Payslip"
        subtitle="Generate PDF and send employee payslips"
      />

      <Typography
        sx={{
          color: 'text.secondary',
          mb: 3,
        }}
      >
        Upload payroll excel, preview employee data, generate encrypted PDF and
        send email.
      </Typography>

      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Upload Payroll
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              mt: 0.5,
            }}
          >
            Select company and upload payroll excel file.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12 }}
            sx={{
              mb: 1,
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Company</InputLabel>

              <Select
                label="Company"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Company</em>
                </MenuItem>

                {companies.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{
              mb: 1,
            }}
          >
            <TextField
              fullWidth
              label="Period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box
              component="label"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,

                p: 2,

                border: '1px dashed',

                borderColor: 'divider',

                borderRadius: 2,

                cursor: 'pointer',

                transition: '.2s',

                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              <UploadFileIcon
                color="primary"
                sx={{
                  fontSize: 34,
                }}
              />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {file ? file.name : 'Choose Payroll Excel'}
                </Typography>

                <Typography variant="body2">
                  {file ? `${(file.size / 1024).toFixed(1)} KB` : 'XLSX / XLS'}
                </Typography>
              </Box>

              <input
                ref={fileInputRef}
                hidden
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
              }}
            >
              {workflow === 'idle' && (
                <LoadingButton
                  variant="contained"
                  // loading={loading}
                  onClick={handlePreview}
                  size="large"
                >
                  Preview
                </LoadingButton>
              )}

              {workflow === 'preview' && (
                <LoadingButton
                  variant="contained"
                  color="secondary"
                  // loading={loading}
                  onClick={handleGeneratePdf}
                  size="large"
                >
                  Generate PDF
                </LoadingButton>
              )}

              {workflow === 'generated' && (
                <LoadingButton
                  variant="contained"
                  color="success"
                  // loading={loading}
                  onClick={handleSendEmail}
                  size="large"
                >
                  Send Email
                </LoadingButton>
              )}
              {workflow === 'completed' && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNewSession}
                >
                  New Session
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{
            mt: 2,
          }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <ContentCard>
              <DescriptionIcon
                sx={{
                  fontSize: 48,
                  color: 'primary.main',
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Total Employee
                </Typography>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  {preview?.total ?? 0}
                </Typography>
              </Box>
            </ContentCard>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ContentCard>
              <CheckCircleIcon
                sx={{
                  fontSize: 48,
                  color: 'success.main',
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Ready
                </Typography>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 700,
                    color: 'success.main',
                    lineHeight: 1.2,
                  }}
                >
                  {preview?.success ?? 0}
                </Typography>
              </Box>
            </ContentCard>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <ContentCard>
              <ErrorIcon
                sx={{
                  fontSize: 48,
                  color: 'error.main',
                }}
              />

              <Box>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: 13,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Failed
                </Typography>

                <Typography
                  sx={{
                    fontSize: 34,
                    fontWeight: 700,
                    color: 'error.main',
                    lineHeight: 1.2,
                  }}
                >
                  {preview?.failed ?? 0}
                </Typography>
              </Box>
            </ContentCard>
          </Grid>
        </Grid>
      </Paper>

      {preview && (
        // <Paper sx={{ mt: 3, height: 600 }}>
        <Paper
          elevation={2}
          sx={{
            mt: 3,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                Preview Employee
              </Typography>

              <Typography
                sx={{
                  color: 'text.secondary',
                  mt: 0.5,
                }}
              >
                Review employee data before generating PDF.
              </Typography>
            </Box>

            <Chip color="primary" label={`${rows.length} Employee`} />
          </Box>
          <ContentCard>
            <DataGrid
              sx={{
                border: 0,

                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0',
                },

                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 700,
                },

                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f8f9fa',
                },

                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },

                '& .MuiDataGrid-columnHeader:focus': {
                  outline: 'none',
                },
              }}
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              autoHeight={false}
              initialState={{
                pagination: {
                  paginationModel: {
                    page: 0,
                    pageSize: 10,
                  },
                },
              }}
            />
          </ContentCard>
        </Paper>
      )}
      {generateResult && (
        <>
          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
              fontWeight: 700,
            }}
          >
            Generate PDF Result
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <ContentCard>
                <DescriptionIcon
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Total PDF
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 34,
                      fontWeight: 700,
                    }}
                  >
                    {generateResult.total}
                  </Typography>
                </Box>
              </ContentCard>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ContentCard>
                <CheckCircleIcon
                  sx={{
                    fontSize: 48,
                    color: 'success.main',
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Success
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 34,
                      fontWeight: 700,
                      color: 'success.main',
                    }}
                  >
                    {generateResult.success}
                  </Typography>
                </Box>
              </ContentCard>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ContentCard>
                <ErrorIcon
                  sx={{
                    fontSize: 48,
                    color: 'error.main',
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    Failed
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 34,
                      fontWeight: 700,
                      color: 'error.main',
                    }}
                  >
                    {generateResult.failed}
                  </Typography>
                </Box>
              </ContentCard>
            </Grid>
          </Grid>
        </>
      )}

      <SendSlipDetailDialog
        open={openDetail}
        data={selectedRow}
        onClose={() => setOpenDetail(false)}
      />
    </Box>
  );
}

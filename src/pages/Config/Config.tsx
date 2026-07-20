import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import CompanyList from './CompanyList';
import UserList from './UserList';
import ExcelTemplateList from './ExcelTemplateList';
import MailTemplateList from './MailTemplateList';
import PageHeader from '../../components/PageHeader';

export default function Config() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader
        title="Configuration"
        subtitle="Manage application configuration"
      />

      <Typography
        sx={{
          color: 'text.secondary',
          mb: 3,
        }}
      >
        Manage company, users, templates and application settings.
      </Typography>

      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            pt: 1,
            borderBottom: 1,
            borderColor: 'divider',

            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 56,
            },
          }}
        >
          <Tab label="User" />
          <Tab label="Company" />
          <Tab label="Mail Template" />
          <Tab label="Excel Template" />
        </Tabs>

        <Box
          sx={{
            p: 3,
            minHeight: 600,
          }}
        >
          {tab === 0 && <UserList />}
          {tab === 1 && <CompanyList />}
          {tab === 2 && <MailTemplateList />}
          {tab === 3 && <ExcelTemplateList />}
        </Box>
      </Paper>
    </Box>
  );
}

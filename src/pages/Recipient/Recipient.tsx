// import { Box } from '@mui/material';
// import RecipientList from './RecipientList';

// export default function Recipient() {
//   return (
//     <Box sx={{ p: 3 }}>
//       <RecipientList />
//     </Box>
//   );
// }

import { Box } from '@mui/material';

import PageHeader from '../../components/PageHeader';
import RecipientList from './RecipientList';

export default function Recipient() {
  return (
    <Box>
      <PageHeader
        title="Recipients"
        subtitle="Manage employee recipient data"
      />

      <RecipientList />
    </Box>
  );
}

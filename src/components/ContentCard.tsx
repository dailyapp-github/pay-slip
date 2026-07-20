import { Paper } from '@mui/material';
import { ReactNode } from 'react';

interface ContentCardProps {
  children: ReactNode;
}

export default function ContentCard({ children }: ContentCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      {children}
    </Paper>
  );
}

import React from 'react';
import { Box } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      pt: { xs: 2, md: 4 },
      pb: { xs: 10, md: 10 },
      px: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: 420, md: 900 },
        px: { xs: 1, md: 3 },
        mx: 'auto',
      }}
    >
      {children}
    </Box>
  </Box>
);

export default Layout; 
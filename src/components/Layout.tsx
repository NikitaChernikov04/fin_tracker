import React from 'react';
import { Box } from '@mui/material';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      minHeight: '100vh',
      width: '100vw',
      bgcolor: 'background.default',
      pt: { xs: 2, md: 4 },
      pb: { xs: 10, md: 10 },
      px: { xs: 0.5, md: 2 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      boxSizing: 'border-box',
    }}
  >
    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
      {children}
    </Box>
  </Box>
);

export default Layout; 
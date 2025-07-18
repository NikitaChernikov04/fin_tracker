import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import UserSelector from './UserSelector';

const titles: Record<string, string> = {
  '/': 'Главная',
  '/transactions': 'Операции',
  '/budget': 'Бюджет',
  '/piggybanks': 'Копилки',
  '/settings': 'Настройки',
};

const Navigation: React.FC = () => {
  const location = useLocation();
  const title = titles[location.pathname] || '';

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 56 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20, color: 'text.primary' }}>{title}</Typography>
        <Box>
          <UserSelector />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 
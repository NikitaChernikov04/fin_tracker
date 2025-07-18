import React from 'react';
import { Typography } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

const Logo: React.FC = () => (
  <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', fontWeight: 700 }}>
    <SavingsIcon sx={{ mr: 1 }} />
    ФинТрекер
  </Typography>
);

export default Logo; 
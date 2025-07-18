import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/HomeRounded';
import ListAltIcon from '@mui/icons-material/ListAltRounded';
import SavingsIcon from '@mui/icons-material/SavingsRounded';
import PieChartIcon from '@mui/icons-material/PieChartOutlineRounded';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Главная', icon: <DashboardIcon />, to: '/' },
  { label: 'Операции', icon: <ListAltIcon />, to: '/transactions' },
  { label: 'Копилки', icon: <SavingsIcon />, to: '/piggybanks' },
  { label: 'Бюджет', icon: <PieChartIcon />, to: '/budget' },
  { label: 'Настройки', icon: <SettingsIcon />, to: '/settings' },
];

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = navItems.findIndex(item => item.to === location.pathname);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }} elevation={8}>
      <BottomNavigation
        showLabels
        value={current === -1 ? 0 : current}
        onChange={(_, newValue) => navigate(navItems[newValue].to)}
        sx={{ borderRadius: 0, height: 64 }}
      >
        {navItems.map(item => (
          <BottomNavigationAction key={item.to} label={item.label} icon={item.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav; 
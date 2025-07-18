import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField } from '@mui/material';
import { useFinance } from '../context/FinanceContext';

const Budget: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { currentUser, budget } = state;
  const userBudget = budget && budget.userId === currentUser ? budget : null;
  const [amount, setAmount] = useState(userBudget ? userBudget.total.toString() : '');
  const [month, setMonth] = useState(userBudget ? userBudget.month : new Date().toISOString().slice(0, 7));

  const handleSave = () => {
    if (!amount) return;
    dispatch({
      type: 'SET_BUDGET',
      payload: {
        userId: currentUser,
        month,
        total: Number(amount),
        categories: {},
      },
    });
  };

  return (
    <Box sx={{ pb: 10, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Card sx={{ bgcolor: 'background.paper', boxShadow: 4, borderRadius: 1, p: { xs: 1.5, sm: 2 }, mb: 3 }}>
        <CardContent sx={{ p: 0, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500, fontSize: 18, textAlign: 'center' }}>
            Месячный бюджет
          </Typography>
          <Typography variant="h3" color="primary" fontWeight={700} sx={{ fontSize: { xs: 28, sm: 40 }, textAlign: 'center' }}>
            {userBudget ? userBudget.total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) : '—'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
            Месяц: {userBudget ? userBudget.month : month}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: 'background.paper', boxShadow: 2, borderRadius: 1, p: { xs: 1.5, sm: 2 } }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500, textAlign: 'center' }}>
            Установить/изменить бюджет
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Сумма бюджета"
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              fullWidth
              inputProps={{ min: 0, step: 1 }}
            />
            <TextField
              label="Месяц"
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              fullWidth
            />
            <Button variant="contained" size="large" sx={{ borderRadius: 1, fontWeight: 500, py: 1.2, fontSize: '0.95rem' }} onClick={handleSave}>
              Сохранить
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Budget; 
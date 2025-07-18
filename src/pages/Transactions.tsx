import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFinance } from '../context/FinanceContext';
import TransactionForm from '../components/TransactionForm';

const Transactions: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { currentUser, transactions } = state;
  const [open, setOpen] = useState(false);

  const userTransactions = transactions
    .filter(t => t.userId === currentUser)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleDelete = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  return (
    <Box sx={{ pb: 10, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <TransactionForm open={open} onClose={() => setOpen(false)} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', width: '100%' }}>Операции</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ borderRadius: 1, fontWeight: 500, px: 3, py: 1.2, ml: 2, fontSize: '0.95rem' }}>
          Добавить
        </Button>
      </Box>
      <Stack spacing={2}>
        {userTransactions.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            Нет операций
          </Typography>
        ) : (
          userTransactions.map(t => (
            <Card key={t.id} sx={{ boxShadow: 2, borderRadius: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', px: 2, py: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" color={t.type === 'income' ? 'success.main' : 'error.main'} fontWeight={700} sx={{ fontSize: 20 }}>
                  {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t.category} • {new Date(t.date).toLocaleDateString('ru-RU')}
                </Typography>
                {t.comment && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontStyle: 'italic' }}>
                    {t.comment}
                  </Typography>
                )}
              </Box>
              <IconButton color="error" onClick={() => handleDelete(t.id)} sx={{ ml: 1, borderRadius: 1 }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Transactions; 
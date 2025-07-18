import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, LinearProgress, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFinance } from '../context/FinanceContext';
import PiggyDepositForm from '../components/PiggyDepositForm';

const PiggyBanks: React.FC = () => {
  const { state, dispatch } = useFinance();
  const { currentUser, piggyBanks } = state;
  const userPiggyBanks = piggyBanks.filter(p => p.userId === currentUser);

  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [depositOpen, setDepositOpen] = useState(false);
  const [activePiggyId, setActivePiggyId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!name || !target) return;
    dispatch({
      type: 'ADD_PIGGYBANK',
      payload: {
        id: Date.now().toString(),
        userId: currentUser,
        name,
        target: Number(target),
        deposits: [],
      },
    });
    setName('');
    setTarget('');
  };

  const handleDeposit = (piggyId: string) => {
    setActivePiggyId(piggyId);
    setDepositOpen(true);
  };

  const handleDepositSubmit = (amount: number, date: string) => {
    if (!activePiggyId) return;
    const piggy = userPiggyBanks.find(p => p.id === activePiggyId);
    if (!piggy) return;
    const newDeposit = { id: Date.now().toString(), amount, date };
    dispatch({
      type: 'EDIT_PIGGYBANK',
      payload: { ...piggy, deposits: [...piggy.deposits, newDeposit] },
    });
    setDepositOpen(false);
    setActivePiggyId(null);
  };

  return (
    <Box sx={{ pb: 10, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <PiggyDepositForm
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        onSubmit={handleDepositSubmit}
      />
      <Card sx={{ bgcolor: 'background.paper', boxShadow: 2, borderRadius: 1, p: { xs: 1.5, sm: 2 }, mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500, textAlign: 'center' }}>
            Новая копилка
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Название"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Цель (₽)"
              type="number"
              value={target}
              onChange={e => setTarget(e.target.value)}
              fullWidth
              inputProps={{ min: 1, step: 1 }}
            />
            <Button variant="contained" size="large" sx={{ borderRadius: 1, fontWeight: 500, py: 1.2, fontSize: '0.95rem' }} onClick={handleAdd}>
              Создать
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Grid container spacing={0} direction="column">
        {userPiggyBanks.length === 0 ? (
          <Grid item xs={12}>
            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
              Нет копилок
            </Typography>
          </Grid>
        ) : (
          userPiggyBanks.map(p => {
            const saved = p.deposits.reduce((acc, d) => acc + d.amount, 0);
            const progress = p.target > 0 ? saved / p.target : 0;
            return (
              <Grid item xs={12} key={p.id} sx={{ mb: 2 }}>
                <Card sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, p: { xs: 1.5, sm: 2 } }}>
                  <CardContent sx={{ p: 0, textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'center', flex: 1 }}>
                        {p.name}
                      </Typography>
                      <IconButton color="primary" onClick={() => handleDeposit(p.id)} sx={{ ml: 1, borderRadius: 1 }}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                      Цель: {p.target.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={progress * 100} sx={{ height: 12, borderRadius: 6 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                        Накоплено: {saved.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })} ({(progress * 100).toFixed(0)}%)
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default PiggyBanks; 
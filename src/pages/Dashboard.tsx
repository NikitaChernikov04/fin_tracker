import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const pieColors = ['#47624F', '#3CB371', '#A3B18A', '#B6C4B6', '#D9E4DD', '#B0B0B0', '#F4F6EE'];

const Dashboard: React.FC = () => {
  const { state } = useFinance();
  const { currentUser, transactions, budget, piggyBanks } = state;

  // Баланс: сумма доходов - сумма расходов для текущего пользователя
  const userTransactions = transactions.filter(t => t.userId === currentUser);
  const balance = userTransactions.reduce((acc, t) => acc + (t.type === 'income' ? t.amount : -t.amount), 0);

  // Бюджет текущего пользователя
  const userBudget = budget && budget.userId === currentUser ? budget : null;
  const budgetTotal = userBudget ? userBudget.total : 0;
  const budgetSpent = userTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  // Копилки текущего пользователя
  const userPiggyBanks = piggyBanks.filter(p => p.userId === currentUser);
  // Для примера: общий прогресс по всем копилкам (сумма всех взносов / сумма всех целей)
  const piggyTotal = userPiggyBanks.reduce((acc, p) => acc + p.target, 0);
  const piggySaved = userPiggyBanks.reduce((acc, p) => acc + p.deposits.reduce((sum, d) => sum + d.amount, 0), 0);
  const piggyProgress = piggyTotal > 0 ? piggySaved / piggyTotal : 0;

  // Данные для PieChart
  const expenses = userTransactions.filter(t => t.type === 'expense');
  const categoryMap: Record<string, number> = {};
  expenses.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  return (
    // @ts-ignore
    <Grid container spacing={{ xs: 0, md: 2 }} direction={{ xs: 'column', md: 'row' }} sx={{ pb: 0, mx: 'auto' }}>
      {/* @ts-ignore */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ bgcolor: 'background.paper', boxShadow: 4, borderRadius: 1, p: 1, mb: 1, flex: 1 }}>
          <CardContent sx={{ p: 0, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ fontWeight: 500, fontSize: 16, textAlign: 'center' }}>
              Баланс
            </Typography>
            <Typography variant="h2" color={balance >= 0 ? 'success.main' : 'error.main'} fontWeight={700} sx={{ fontSize: 24, textAlign: 'center' }}>
              {balance.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, p: 1, mb: 1, flex: 1 }}>
          <CardContent sx={{ p: 0, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }}>
              Бюджет месяца
            </Typography>
            <Typography variant="h4" color="primary" fontWeight={700} sx={{ fontSize: 18, textAlign: 'center' }}>
              {budgetTotal.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Потрачено: {budgetSpent.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Осталось: {(budgetTotal - budgetSpent).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* @ts-ignore */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, p: 1, mb: 1, flex: 1 }}>
          <CardContent sx={{ p: 0, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }}>
              Копилки
            </Typography>
            <Box sx={{ width: '100%', mt: 2 }}>
              <Box sx={{ bgcolor: 'grey.200', borderRadius: 2, height: 12, overflow: 'hidden' }}>
                <Box sx={{ width: `${piggyProgress * 100}%`, bgcolor: 'success.main', height: '100%', transition: 'width 0.5s' }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                Прогресс: {(piggyProgress * 100).toFixed(0)}%
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: 'background.paper', boxShadow: 2, borderRadius: 1, p: 1, flex: 1 }}>
          <CardContent sx={{ p: 0, textAlign: 'center' }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontWeight: 500, fontSize: 15, textAlign: 'center' }}>
              Диаграмма расходов по категориям
            </Typography>
            <Box sx={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.400' }}>
              {pieData.length === 0 ? (
                <Typography color="text.secondary">Нет расходов для отображения</Typography>
              ) : (
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={45}
                      label
                    >
                      {pieData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={v => `${v} ₽`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard; 
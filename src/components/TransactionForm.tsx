import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFinance } from '../context/FinanceContext';
import { TransactionType } from '../models';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  'Зарплата', 'Подарок', 'Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Покупки', 'Другое'
];

const TransactionForm: React.FC<TransactionFormProps> = ({ open, onClose }) => {
  const { state, dispatch } = useFinance();
  const [type, setType] = useState<TransactionType>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        id: Date.now().toString(),
        userId: state.currentUser,
        type,
        category,
        amount: Number(amount),
        date,
        comment,
      },
    });
    onClose();
    setType('income');
    setCategory('');
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    setComment('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Добавить операцию</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Тип</InputLabel>
            <Select
              labelId="type-label"
              value={type}
              label="Тип"
              onChange={e => setType(e.target.value as TransactionType)}
            >
              <MenuItem value="income">Доход</MenuItem>
              <MenuItem value="expense">Расход</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-label">Категория</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Категория"
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Сумма"
            type="number"
            fullWidth
            value={amount}
            onChange={e => setAmount(e.target.value)}
            inputProps={{ min: 1, step: 1 }}
            required
          />
          <TextField
            label="Дата"
            type="date"
            fullWidth
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Комментарий"
            fullWidth
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">Сохранить</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TransactionForm; 
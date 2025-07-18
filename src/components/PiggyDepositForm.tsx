import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface PiggyDepositFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, date: string) => void;
}

const PiggyDepositForm: React.FC<PiggyDepositFormProps> = ({ open, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSubmit(Number(amount), date);
    setAmount('');
    setDate(new Date().toISOString().slice(0, 10));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Пополнить копилку</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Сумма"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            inputProps={{ min: 1, step: 1 }}
            required
            fullWidth
          />
          <TextField
            label="Дата"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
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

export default PiggyDepositForm; 
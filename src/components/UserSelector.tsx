import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useFinance } from '../context/FinanceContext';

const UserSelector: React.FC = () => {
  const { state, dispatch } = useFinance();

  return (
    <FormControl size="small" sx={{ minWidth: 120, ml: 2 }}>
      <InputLabel id="user-select-label">Пользователь</InputLabel>
      <Select
        labelId="user-select-label"
        value={state.currentUser}
        label="Пользователь"
        onChange={e => dispatch({ type: 'SET_USER', payload: e.target.value })}
      >
        {state.users.map(user => (
          <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelector; 
import React, { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';
import { Transaction, Budget, PiggyBank, UserId } from '../models';

export interface User {
  id: UserId;
  name: string;
}

export interface FinanceState {
  users: User[];
  currentUser: UserId;
  transactions: Transaction[];
  budget: Budget | null;
  piggyBanks: PiggyBank[];
}

const initialState: FinanceState = {
  users: [
    { id: 'nikita', name: 'Никита' },
    { id: 'alina', name: 'Алина' },
  ],
  currentUser: 'nikita',
  transactions: [],
  budget: null,
  piggyBanks: [],
};

type Action =
  | { type: 'SET_USER'; payload: UserId }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_BUDGET'; payload: Budget }
  | { type: 'ADD_PIGGYBANK'; payload: PiggyBank }
  | { type: 'EDIT_PIGGYBANK'; payload: PiggyBank }
  | { type: 'DELETE_PIGGYBANK'; payload: string };

function financeReducer(state: FinanceState, action: Action): FinanceState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [...state.transactions, action.payload] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t),
      };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    case 'ADD_PIGGYBANK':
      return { ...state, piggyBanks: [...state.piggyBanks, action.payload] };
    case 'EDIT_PIGGYBANK':
      return {
        ...state,
        piggyBanks: state.piggyBanks.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PIGGYBANK':
      return { ...state, piggyBanks: state.piggyBanks.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
}

const STORAGE_KEY = 'finance-app-state-v1';

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => undefined });

export const useFinance = () => useContext(FinanceContext);

function loadState(): Partial<FinanceState> | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const loaded = loadState();
  const [state, dispatch] = useReducer(financeReducer, { ...initialState, ...loaded });

  useEffect(() => {
    const { transactions, budget, piggyBanks } = state;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ transactions, budget, piggyBanks })
    );
  }, [state.transactions, state.budget, state.piggyBanks]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}; 
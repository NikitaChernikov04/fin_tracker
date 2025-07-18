import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import Navigation from './components/Navigation';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budget from './pages/Budget';
import PiggyBanks from './pages/PiggyBanks';
import Settings from './pages/Settings';
import BottomNav from './components/BottomNav';

const App: React.FC = () => (
  <FinanceProvider>
    <Router>
      <Navigation />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/piggybanks" element={<PiggyBanks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <BottomNav />
    </Router>
  </FinanceProvider>
);

export default App;

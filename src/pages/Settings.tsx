import React, { useRef } from 'react';
import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';

const STORAGE_KEY = 'finance-app-state-v1';

const Settings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все данные?')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  const handleExport = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finance-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target?.result as string);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
        window.location.reload();
      } catch {
        alert('Ошибка импорта: некорректный файл');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ pb: 10, width: '100%', maxWidth: 420, mx: 'auto' }}>
      <Card sx={{ bgcolor: 'background.paper', boxShadow: 2, borderRadius: 1, p: { xs: 1.5, sm: 2 }, mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{ textAlign: 'center' }}>
            Настройки
          </Typography>
          <Stack spacing={2} mt={2}>
            <Button variant="contained" color="error" onClick={handleReset} sx={{ borderRadius: 1, fontWeight: 500, fontSize: '0.95rem' }}>
              Сбросить все данные
            </Button>
            <Button variant="outlined" color="primary" onClick={handleExport} sx={{ borderRadius: 1, fontWeight: 500, fontSize: '0.95rem' }}>
              Экспорт данных (JSON)
            </Button>
            <Button
              variant="outlined"
              color="primary"
              component="label"
              sx={{ borderRadius: 1, fontWeight: 500, fontSize: '0.95rem' }}
            >
              Импорт данных (JSON)
              <input
                type="file"
                accept="application/json"
                hidden
                ref={fileInputRef}
                onChange={handleImport}
              />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings; 
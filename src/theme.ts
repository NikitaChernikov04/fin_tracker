import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#47624F',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F4F6EE',
      contrastText: '#47624F',
    },
    background: {
      default: '#F0F2E9',
      paper: '#fff',
    },
    success: {
      main: '#3CB371',
    },
    error: {
      main: '#D32F2F',
    },
    text: {
      primary: '#222',
      secondary: '#47624F',
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export default theme; 
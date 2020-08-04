import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './dashboard-view/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2E7D32'
    },
    secondary: {
      main: '#C62828'
    },
    background: {
      default: '#F4F6F8'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
        <CssBaseline />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
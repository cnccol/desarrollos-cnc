import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Gastos from './app-view/Gastos';

let theme = createMuiTheme({
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

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <CssBaseline />
        <Gastos theme={theme} />
      </div>
    </ThemeProvider>
  );
}

export default App;

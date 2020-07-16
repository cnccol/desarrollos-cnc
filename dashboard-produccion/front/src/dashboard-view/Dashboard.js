import React, { useState } from 'react';
import Logo from '../logo.png';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DateSelect from './components/DateSelect';
import IndicatorsGrid from './components/IndicatorsGrid';
import Chart from './components/Chart';
import TableSelect from './components/TableSelect';
import data from './data';
import rows from './rows';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2E7D32',
        },
        secondary: {
            main: '#C62828',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    }
});

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        fontWeight: 500
    },
    logo: {
        width: 135,
        marginRight: theme.spacing(4)
    }
}));

function Dashboard() {
    const classes = useStyles();
    const [startDate, startDateChange] = useState(new Date());
    const [endDate, endDateChange] = useState(new Date());
    const indicators = [
        { title: 'Total de llamadas realizadas 1', content: '10.000' },
        { title: 'Total de llamadas realizadas 2', content: '2.000' },
        { title: 'Total de llamadas realizadas 3', content: '1.500' },
        { title: 'Total de llamadas realizadas 4', content: '800' },
        { title: 'Total de llamadas realizadas 5', content: '600' },
        { title: 'Total de llamadas realizadas 6', content: '200' }
    ];
    const [indicator, setIndicator] = useState(0);
    const [view, setView] = useState(0);

    return (
        <div className='Dashboard'>
            <header className='Dashboard-header'>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                            <MenuIcon />
                        </IconButton>
                        <a href={'https://www.centronacionaldeconsultoria.com/'}>
                            <img src={Logo} alt='logo' className={classes.logo} />
                        </a>
                        <Typography variant='h5' className={classes.title}>
                            Dashboard Producción
                        </Typography>
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                </AppBar>
            </header>
            <div className='Dashboard-body'>
                <Grid
                    container
                    direction='row'
                >
                    <Grid item>
                        <DateSelect
                            theme={theme}
                            startDate={startDate}
                            startDateChange={startDateChange}
                            endDate={endDate}
                            endDateChange={endDateChange}
                        />
                        <IndicatorsGrid
                            indicators={indicators}
                            setIndicator={setIndicator}
                        />
                    </Grid>
                    <Grid item>
                        <Chart
                            theme={theme}
                            data={data[indicator]}
                            title={indicators[indicator].title}
                        />
                    </Grid>
                </Grid>
                <TableSelect
                    theme={theme}
                    view={view}
                    setView={setView}
                    rows={rows}
                />
            </div>
        </div >
    );
}

export default Dashboard;
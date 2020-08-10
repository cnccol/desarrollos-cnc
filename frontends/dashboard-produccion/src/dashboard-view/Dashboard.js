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
        { title: 'Total de llamadas realizadas', content: '10.000', background: '#1976D2' },
        { title: 'Total de llamadas que pasan filtro', content: '2.000', background: '#F57C00' },
        { title: 'Total de llamadas efectivas', content: '1.500', background: '#388E3C' },
        { title: 'Total de llamadas rechazadas', content: '800', background: '#D32F2F' },
        { title: 'Total de tiempo en llamadas', content: '600', background: '#0097A7' },
        { title: 'Total de encuestas efectivas', content: '200', background: '#5D4037' }
    ];
    const [indicator, setIndicator] = useState(0);
    const [view, setView] = useState(0);
    const [interval, setInterval] = useState(0);

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
                            title={indicators[indicator].title}
                            data={data[indicator]}
                            background={indicators[indicator].background}
                            interval={interval}
                            setInterval={setInterval}
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
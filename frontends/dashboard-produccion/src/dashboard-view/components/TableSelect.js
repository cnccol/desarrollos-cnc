import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Card,
    CardHeader,
    CardContent,
    FormControlLabel,
    RadioGroup,
    Radio,
    Divider,
    Collapse,
    TextField,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import TableA from './TableA';
import TableB from './TableB';

const useStyles = makeStyles((theme) => ({
    cardTable: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    cardTableContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0
        }
    },
    tableTitle: {
        fontSize: '15pt',
        fontWeight: 500
    }
}));

function TableSelect(props) {
    const classes = useStyles();
    const theme = props.theme;
    const view = props.view;
    const setView = props.setView;
    const rows = props.rows;
    const rowsLength = rows.length;
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [changeView, setChangeView] = useState(true);
    const [filter, setFilter] = useState('');

    return (
        <Card className={classes.cardTable} style={{ minHeight: 208 + 55.2 * Math.min(rowsPerPage, rows.length) }}>
            <CardHeader
                title={
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                    >
                        <Grid item>
                            <Typography className={classes.tableTitle} variant='h5'>
                                Consolidado
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{ width: 300, marginLeft: theme.spacing(10), marginRight: theme.spacing(2) }}
                                size='small'
                                variant='outlined'
                                placeholder='Buscar...'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: filter !== '' ? (
                                        < IconButton size='small' onClick={() => setFilter('')}>
                                            <ClearIcon />
                                        </IconButton>
                                    ) : null
                                }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justify='flex-end'
                            >
                                <Grid item>
                                    <Typography style={{ marginRight: theme.spacing(2) }}>
                                        Seleccione la vista en la que desea consultar el consolidado:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <RadioGroup
                                        row
                                        value={view}
                                        onChange={(e) => {
                                            let newView = e.target.value;
                                            setChangeView(false);
                                            setTimeout(() => {
                                                setFilter('');
                                                setView(parseInt(newView));
                                                setChangeView(true);
                                            }, 350);
                                        }}
                                    >
                                        <FormControlLabel value={0} control={<Radio color='primary' />} label='Vista por encuestador' />
                                        <FormControlLabel value={1} control={<Radio color='primary' />} label='Vista por estudio' />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            />
            <Divider />
            <CardContent className={classes.cardTableContent}>
                <Collapse in={changeView}>
                    {view === 0 ?
                        <TableA
                            rows={rows.filter(row => {
                                return row.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
                            })}
                            rowsLength={rowsLength}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            filter={filter}
                        />

                        :
                        <TableB
                            rows={rows.filter(row => {
                                return row.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
                            })}
                            rowsLength={rowsLength}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            filter={filter}
                        />
                    }
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default TableSelect;
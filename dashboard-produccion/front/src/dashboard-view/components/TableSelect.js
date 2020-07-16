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
    Divider
} from '@material-ui/core';
import TableA from './TableA';

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
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                            <Typography style={{ marginLeft: theme.spacing(10), marginRight: theme.spacing(2) }}>
                                Seleccione la vista en la que desea consultar el consolidado:
                            </Typography>
                        </Grid>
                        <Grid item>
                            <RadioGroup value={view} onChange={(e) => setView(parseInt(e.target.value))} row>
                                <FormControlLabel value={0} control={<Radio color='primary' />} label='Vista por encuestador' />
                                <FormControlLabel value={1} control={<Radio color='primary' />} label='Vista por estudio' />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                }
            />
            <Divider />
            <CardContent className={classes.cardTableContent}>
                <TableA
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </CardContent>
        </Card>
    );
}

export default TableSelect;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';
import DateRangePicker from './DateRangePicker';

const useStyles = makeStyles((theme) => ({
    cardDate: {
        margin: theme.spacing(2),
        width: 566
    },
    cardDateContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0
        }
    },
    dateSelect: {
        margin: theme.spacing(2),
        width: 534
    }
}));

function DateSelect(props) {
    const classes = useStyles();
    const theme = props.theme;

    return (
        <Card className={classes.cardDate}>
            <CardContent className={classes.cardDateContent}>
                <Grid
                    container
                    className={classes.dateSelect}
                    direction='row'
                    alignItems='center'
                >
                    <Grid item>
                        <Typography style={{ marginRight: theme.spacing(2) }}>
                            Seleccione el rango de fechas:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <DateRangePicker
                            props={props}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default DateSelect;
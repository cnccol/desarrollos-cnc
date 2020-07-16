import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
} from '@material-ui/core';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const useStyles = makeStyles((theme) => ({
    cardChart: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 905,
        height: 480
    },
    cardChartContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: theme.spacing(0.825)
        }
    },
    chartTitle: {
        fontSize: '15pt',
        fontWeight: 500
    }
}));

function Chart(props) {
    const classes = useStyles();
    const theme = props.theme;
    const title = props.title;
    const data = props.data;

    return (
        <Card className={classes.cardChart}>
            <CardHeader
                style={{ height: 74 }}
                title={
                    <Typography className={classes.chartTitle} variant='h5'>
                        {title}
                    </Typography>
                }
            />
            <CardContent className={classes.cardChartContent}>
                <ResponsiveContainer width='100%' height={380}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5, right: 40, left: 15, bottom: 5,
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray='3 3' />
                        <XAxis stroke={theme.palette.text.primary} dataKey='fecha' tick={{ fontSize: '14px', fill: theme.palette.text.primary }} />
                        <YAxis stroke={theme.palette.text.primary} tick={{ fontSize: '14px', fill: theme.palette.text.primary }} />
                        <Tooltip position={{ y: -10 }} animationDuration={250} wrapperStyle={{ fontSize: '15px' }} />
                        <Legend />
                        <Bar dataKey='Llamadas realizadas' fill='#1976D2' radius={[50, 50, 0, 0]} barSize={10} />
                        <Bar dataKey='Llamadas esperadas' fill='#616161' radius={[50, 50, 0, 0]} barSize={10} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default Chart;
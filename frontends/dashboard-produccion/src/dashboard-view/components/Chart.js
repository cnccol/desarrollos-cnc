import React, { useRef, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Card,
    CardHeader,
    CardContent,
    Grid,
    FormControlLabel,
    RadioGroup,
    Radio
} from '@material-ui/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES';

am4core.useTheme(am4themes_animated);

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
    const title = props.title;
    const data = props.data;
    const background = props.background;
    const interval = props.interval;
    const setInterval = props.setInterval;
    const chart = useRef(null);

    const radioStyle = makeStyles(() => ({
        radio: {
            '&$checked': {
                color: background
            }
        },
        checked: {}
    }));
    const radioClasses = radioStyle();

    useLayoutEffect(() => {
        let new_chart = am4core.create('chartdiv', am4charts.XYChart);
        new_chart.language.locale = am4lang_es_ES;

        new_chart.data = data

        let valueAxis = new_chart.yAxes.push(new am4charts.ValueAxis());

        let categoryAxis = new_chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'fecha';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.cellStartLocation = 0.35;
        categoryAxis.renderer.cellEndLocation = 0.65;

        new_chart.events.on('ready', function () {
            let min = valueAxis.min
            let max = valueAxis.max
            valueAxis.min = min;
            valueAxis.max = max;
            categoryAxis.minZoomCount = 3;
            categoryAxis.zoomToIndexes(data.length - 7, data.length);
            setTimeout(() => {
                categoryAxis.maxZoomCount = 7;
            }, 600);
        });

        let series = new_chart.series.push(new am4charts.ColumnSeries());
        series.name = 'Llamadas realizadas';
        series.dataFields.valueY = 'real';
        series.dataFields.categoryX = 'fecha';
        series.columns.template.column.cornerRadiusTopLeft = 50;
        series.columns.template.column.cornerRadiusTopRight = 50;
        series.columns.template.width = am4core.percent(50);
        series.columns.template.fill = am4core.color(background)
        series.columns.template.stroke = am4core.color(background)
        series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';

        let series2 = new_chart.series.push(new am4charts.ColumnSeries());
        series2.name = 'Llamadas esperadas';
        series2.dataFields.valueY = 'esperado';
        series2.dataFields.categoryX = 'fecha';
        series2.columns.template.column.cornerRadiusTopLeft = 50;
        series2.columns.template.column.cornerRadiusTopRight = 50;
        series2.columns.template.width = am4core.percent(50);
        series2.columns.template.fill = am4core.color('#616161')
        series2.columns.template.stroke = am4core.color('#616161')
        series2.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';

        let scrollbarX = new am4core.Scrollbar();
        scrollbarX.background.fill = am4core.color('#616161')
        scrollbarX.thumb.background.fill = am4core.color('#616161')
        scrollbarX.startGrip.background.fill = am4core.color('#616161')
        scrollbarX.endGrip.background.fill = am4core.color('#616161')
        new_chart.scrollbarX = scrollbarX;
        new_chart.scrollbarX.parent = new_chart.bottomAxesContainer;

        new_chart.legend = new am4charts.Legend();
        let markerTemplate = new_chart.legend.markers.template;
        markerTemplate.width = 15;
        markerTemplate.height = 15;

        new_chart.logo.disabled = true;
        new_chart.zoomOutButton.disabled = true;

        chart.current = new_chart;

        return () => {
            new_chart.dispose();
        };
    }, [data, background]);

    return (
        <Card className={classes.cardChart}>
            <CardHeader
                style={{ height: 74 }}
                title={
                    <Grid
                        container
                        direction='row'
                        alignItems='center'
                    >
                        <Grid item>
                            <Typography className={classes.chartTitle} variant='h5'>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Grid
                                container
                                direction='row'
                                alignItems='center'
                                justify='flex-end'
                            >
                                <Grid item>
                                    <Typography style={{ marginRight: '16px' }}>
                                        Seleccione el intervalo de tiempo:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <RadioGroup
                                        row
                                        value={interval}
                                        onChange={(e) => {
                                            setInterval(parseInt(e.target.value));
                                        }}
                                    >
                                        <FormControlLabel value={0} control={<Radio classes={{ root: radioClasses.radio, checked: radioClasses.checked }} color='primary' />} label='Días' />
                                        <FormControlLabel value={1} control={<Radio classes={{ root: radioClasses.radio, checked: radioClasses.checked }} color='primary' />} label='Horas' />
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                }
            />
            <CardContent className={classes.cardChartContent}>
                <div
                    id='chartdiv'
                    style={{ width: '905px', height: '404px', paddingRight: 57 }}
                />
            </CardContent>
        </Card>
    );
}

export default Chart;
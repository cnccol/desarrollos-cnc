import React, { useState } from 'react';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import EsLocale from 'date-fns/locale/es';
import isSameDay from 'date-fns/isSameDay';
import isAfter from 'date-fns/isAfter';

const useStyles = makeStyles((theme) => ({
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: '0 2px',
        color: theme.palette.text.primary,
        padding: 0,
        borderRadius: '50%',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        }
    },
    hidden: {
        opacity: 0,
        pointerEvents: 'none'
    },
    current: {
        color: theme.palette.primary.main,
        fontWeight: 600
    },
    dayDisabled: {
        pointerEvents: 'none',
        color: theme.palette.text.hint
    },
    daySelected: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    dayHover: {
        color: theme.palette.primary.contrastText,
        backgroundColor: '#616161',
        fontWeight: theme.typography.fontWeightMedium,
        '&:hover': {
            backgroundColor: '#616161',
        }
    },
    highlight: {
        color: theme.palette.primary.contrastText,
        backgroundColor: '#A5D6A7'
    },
    firstHighlight: {
        color: theme.palette.primary.contrastText,
        background: 'linear-gradient(90deg, white 50%, #A5D6A7 50%)'
    },
    endHighlight: {
        color: theme.palette.primary.contrastText,
        background: 'linear-gradient(90deg, #A5D6A7 50%, white 50%)'
    }
}));

function DateRangePicker(props) {
    const classes = useStyles();
    const theme = props.props.theme;
    const materialTheme = createMuiTheme(theme, {
        overrides: {
            MuiPickersCalendar: {
                transitionContainer: {
                    height: 250
                },
            },
        },
    })

    const startDate = props.props.startDate;
    const startDateChange = props.props.startDateChange;
    const endDate = props.props.endDate;
    const endDateChange = props.props.endDateChange;
    const [hover, setHover] = useState(undefined);
    const [openPicker, setOpenPicker] = useState(false);
    const min = Math.min(startDate, endDate || hover);
    const max = Math.max(startDate, endDate || hover);

    function renderDay(day, selectedDate, dayInCurrentMonth, dayComponent) {
        const wrapperClassName = clsx({
            [classes.highlight]: isAfter(day, min) && isAfter(max, day) && dayInCurrentMonth,
            [classes.firstHighlight]: ((isSameDay(hover, day) && startDate && isAfter(startDate, hover) && !endDate) || (isSameDay(day, startDate) && !isSameDay(day, endDate) && (!isSameDay(day, hover) || endDate))) && dayInCurrentMonth,
            [classes.endHighlight]: ((isSameDay(hover, day) && startDate && isAfter(hover, startDate) && !endDate) || (isSameDay(day, endDate) && !isSameDay(day, startDate) && (!isSameDay(day, hover) || endDate)) || (isSameDay(day, startDate) && isAfter(startDate, hover) && !endDate)) && dayInCurrentMonth,
        });

        const dayClassName = clsx(classes.day, {
            [classes.hidden]: dayComponent.props.hidden,
            [classes.current]: dayComponent.props.current,
            [classes.dayDisabled]: dayComponent.props.disabled,
            [classes.daySelected]: isSameDay(day, startDate) || isSameDay(day, endDate),
            [classes.dayHover]: (isSameDay(hover, day) && startDate && !endDate),
        });

        return (
            <div
                style={{ height: 40 }}
                onClick={(e) => {
                    if (dayInCurrentMonth && !isAfter(day, new Date())) {
                        e.stopPropagation();
                        if (!startDate) startDateChange(day);
                        else if (!endDate) {
                            if (isAfter(startDate, day)) {
                                endDateChange(startDate);
                                startDateChange(day);
                            } else {
                                endDateChange(day);
                            }
                            setOpenPicker(false);
                        } else {
                            startDateChange(day);
                            endDateChange(undefined);
                        }
                    }
                }}
                onMouseEnter={() => { if (dayInCurrentMonth && !isAfter(day, new Date())) { setHover(day) } }}
            >
                <div
                    className={wrapperClassName}
                    style={{ marginBottom: theme.spacing(0.5) }}
                >
                    <div
                        className={dayClassName}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: '0.875rem' }}> {format(day, 'd')} </span>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={EsLocale}>
            <ThemeProvider theme={materialTheme}>
                <DatePicker
                    size='small'
                    open={openPicker}
                    onOpen={() => setOpenPicker(true)}
                    onClose={() => { if (startDate && endDate) setOpenPicker(false) }}
                    variant='inline'
                    inputVariant='outlined'
                    disableToolbar={true}
                    disableFuture={true}
                    value={startDate}
                    inputProps={{ style: { textAlign: 'center', width: 274 } }}
                    onChange={startDateChange}
                    renderDay={renderDay}
                    allowKeyboardControl={false}
                    autoFocus={true}
                    labelFunc={() => startDate && endDate ? `${format(startDate, "dd 'de' MMM, yyyy", { locale: EsLocale })}  -  ${format(endDate, "dd 'de' MMM, yyyy", { locale: EsLocale })}` : ''}
                />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    );
}

export default DateRangePicker;
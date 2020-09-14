import React from 'react';
import {
    Typography,
    CardHeader,
    CardContent,
    Grid,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Collapse
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import EsLocale from 'date-fns/locale/es';

import Transporte from './Transporte';

function Informacion(props) {
    const theme = props.theme;
    const refs = props.refs;
    const errors = props.errors;
    const setErrors = props.setErrors;
    const setShowError = props.setShowError;

    const costCenters = props.costCenters;
    const costCenter = props.costCenter;
    const setCostCenter = props.setCostCenter;
    const date = props.date;
    const setDate = props.setDate;
    const type = props.type;
    const setType = props.setType;

    const transportType = props.transportType;
    const setTransportType = props.setTransportType;
    const tripStart = props.tripStart;
    const setTripStart = props.setTripStart;
    const tripEnd = props.tripEnd;
    const setTripEnd = props.setTripEnd;
    const departments = props.departments;
    const department1 = props.department1;
    const setDepartment1 = props.setDepartment1;
    const department2 = props.department2;
    const setDepartment2 = props.setDepartment2;
    const municipalitiesFilter = props.municipalitiesFilter;
    const municipality1 = props.municipality1;
    const setMunicipality1 = props.setMunicipality1;
    const municipality2 = props.municipality2;
    const setMunicipality2 = props.setMunicipality2;
    const setPlate = props.setPlate;
    const setFile3 = props.setFile3;

    const expenseDescription = props.expenseDescription;
    const setExpenseDescription = props.setExpenseDescription;
    const expenseValue = props.expenseValue;
    const setExpenseValue = props.setExpenseValue;

    const clearTripDescription = props.clearTripDescription;

    return (
        <React.Fragment>
            <CardHeader
                title={
                    <Typography variant='h6'>Información del gasto</Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    direction='column'
                    justify='center'
                >
                    <Grid item>
                        <Typography ref={refs[21]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Selecciona el centro de costos correspondiente al gasto:</Typography>
                        <Autocomplete
                            value={costCenter}
                            onChange={(event, value) => {
                                setCostCenter(value);
                                errors[19] = false;
                                setErrors([...errors]);
                            }}
                            options={
                                costCenters.map(option => option.nombre)
                            }
                            noOptionsText='No hay coincidencias'
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    size='small'
                                    variant='outlined'
                                    fullWidth
                                    error={errors[19]}
                                    helperText={errors[19] ? 'Este campo no puede estar vacío' : null}
                                />
                            )}
                        />
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Grid item>
                        <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Selecciona la fecha en la que fue generado el gasto:</Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={EsLocale}>
                            <DatePicker
                                size='small'
                                inputVariant='outlined'
                                format="EEEE, dd 'de' MMMM 'del' yyyy"
                                fullWidth={true}
                                disableToolbar={true}
                                minDate={(new Date()).setDate((new Date()).getDate() - 30)}
                                disableFuture={true}
                                autoOk={true}
                                value={date}
                                onChange={setDate}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Grid item xs>
                        <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Selecciona el rubro al que está relacionado el gasto:</Typography>
                        <RadioGroup
                            value={type}
                            onChange={(e) => { setType(parseInt(e.target.value)); clearTripDescription() }}
                        >
                            <FormControlLabel value={0} control={<Radio color='primary' />} label='Manutención' />
                            <FormControlLabel value={1} control={<Radio color='primary' />} label='Alojamiento' />
                            <FormControlLabel value={2} control={<Radio color='primary' />} label='Transporte' />
                        </RadioGroup>
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Collapse in={type === 2}>
                        <Grid item xs>
                            <Transporte
                                theme={theme}
                                refs={refs}
                                errors={errors}
                                setErrors={setErrors}
                                setShowError={setShowError}
                                transportType={transportType}
                                setTransportType={setTransportType}
                                tripStart={tripStart}
                                setTripStart={setTripStart}
                                tripEnd={tripEnd}
                                setTripEnd={setTripEnd}
                                departments={departments}
                                department1={department1}
                                setDepartment1={setDepartment1}
                                department2={department2}
                                setDepartment2={setDepartment2}
                                municipalitiesFilter={municipalitiesFilter}
                                municipality1={municipality1}
                                setMunicipality1={setMunicipality1}
                                municipality2={municipality2}
                                setMunicipality2={setMunicipality2}
                                setPlate={setPlate}
                                setFile3={setFile3}
                                clearTripDescription={clearTripDescription}
                            />
                        </Grid>
                        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    </Collapse>
                    <Grid item xs>
                        <Typography ref={refs[8]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Valor del gasto:</Typography>
                        <CurrencyTextField
                            modifyValueOnWheel={false}
                            size='small'
                            variant='outlined'
                            currencySymbol='$'
                            outputFormat='string'
                            minimumValue='0'
                            maximumValue='2000000'
                            textAlign='left'
                            decimalPlaces={0}
                            fullWidth
                            value={expenseValue}
                            onChange={(event, value) => { setExpenseValue(value); errors[8] = false; setErrors([...errors]); setShowError(false) }}
                            error={errors[8]}
                            helperText={errors[8] ? 'Este campo no puede estar vacío y debe ser mayor a cero' : null}
                        />
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Grid item xs>
                        <Typography ref={refs[9]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Descripción del gasto:</Typography>
                        <TextField
                            size='small'
                            variant='outlined'
                            fullWidth
                            multiline
                            rows={4}
                            value={expenseDescription}
                            onChange={(e) => { setExpenseDescription(e.target.value); errors[9] = false; setErrors([...errors]); setShowError(false) }}
                            error={errors[9]}
                            helperText={errors[9] ? 'Este campo no puede estar vacío' : null}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </React.Fragment>
    );
}

export default Informacion;
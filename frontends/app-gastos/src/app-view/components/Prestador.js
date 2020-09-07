import React from 'react';
import {
    Typography,
    CardHeader,
    CardContent,
    Grid,
    Divider,
    TextField,
    Collapse,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

function Prestador(props) {
    const theme = props.theme;
    const refs = props.refs;
    const errors = props.errors;
    const setErrors = props.setErrors;
    const setShowError = props.setShowError;

    const name = props.name;
    const setName = props.setName;
    const id = props.id;
    const setId = props.setId;
    const address = props.address;
    const setAddress = props.setAddress;
    const phone = props.phone;
    const setPhone = props.setPhone;
    const plate = props.plate;
    const setPlate = props.setPlate;
    const city = props.city;
    const setCity = props.setCity;

    const type = props.type;
    const transportType = props.transportType;
    const municipalities = props.municipalities;

    return (
        <React.Fragment>
            <CardHeader
                title={
                    <Typography variant='h6'>Datos del prestador del servicio</Typography>
                }
            />
            <Divider />
            <CardContent>
                <Grid
                    container
                    direction='column'
                    justify='center'
                >
                    <Grid item xs>
                        <Typography ref={refs[10]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Nombre o razón social:</Typography>
                        <TextField
                            size='small'
                            variant='outlined'
                            fullWidth
                            value={name}
                            onChange={(e) => { setName(e.target.value); errors[10] = false; setErrors([...errors]); setShowError(false) }}
                            error={errors[10]}
                            helperText={errors[10] ? 'Este campo no puede estar vacío' : null}
                        />
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Grid item xs>
                        <Typography ref={refs[11]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Cédula o NIT:</Typography>
                        <TextField
                            size='small'
                            variant='outlined'
                            fullWidth
                            value={id}
                            onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setId(e.target.value); errors[11] = false; setErrors([...errors]); setShowError(false) }}
                            error={errors[11]}
                            helperText={errors[11] ? 'Este campo no puede estar vacío' : null}
                        />
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Collapse in={type !== 2}>
                        <Grid item xs>
                            <Typography ref={refs[12]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Dirección:</Typography>
                            <TextField
                                size='small'
                                variant='outlined'
                                fullWidth
                                value={address}
                                onChange={(e) => { setAddress(e.target.value); errors[12] = false; setErrors([...errors]); setShowError(false) }}
                                error={errors[12]}
                                helperText={errors[12] ? 'Este campo no puede estar vacío' : null}
                            />
                        </Grid>
                        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    </Collapse>
                    <Grid item xs>
                        <Typography ref={refs[13]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Teléfono:</Typography>
                        <TextField
                            size='small'
                            variant='outlined'
                            fullWidth
                            value={phone}
                            onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); setPhone(e.target.value); errors[13] = false; setErrors([...errors]); setShowError(false) }}
                            error={errors[13]}
                            helperText={errors[13] ? 'Este campo no puede estar vacío' : null}
                        />
                    </Grid>
                    <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    <Collapse in={transportType === 'Taxi'}>
                        <Grid item xs>
                            <Typography ref={refs[14]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Placa del vehículo:</Typography>
                            <TextField
                                size='small'
                                variant='outlined'
                                fullWidth
                                value={plate}
                                onChange={(e) => { setPlate(e.target.value); errors[14] = false; setErrors([...errors]); setShowError(false) }}
                                error={errors[14]}
                                helperText={errors[14] ? 'Este campo no puede estar vacío' : null}
                            />
                        </Grid>
                        <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                    </Collapse>
                    <Grid item xs>
                        <Typography ref={refs[15]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Ciudad o municipio:</Typography>
                        <Autocomplete
                            value={city}
                            onChange={(event, value) => { setCity(value); errors[15] = false; setErrors([...errors]); setShowError(false) }}
                            options={municipalities.map(option => option.municipio)}
                            noOptionsText='No hay coincidencias'
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    size='small'
                                    variant='outlined'
                                    fullWidth
                                    error={errors[15]}
                                    helperText={errors[15] ? 'Este campo no puede estar vacío' : null}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </React.Fragment>
    );
}

export default Prestador;
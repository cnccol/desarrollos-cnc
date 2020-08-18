import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    IconButton,
    Tooltip,
    CardContent,
    Grid,
    Divider,
    TextField,
    Collapse
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    button: {
        cursor: 'default',
        '&:hover': {
            background: 'none'
        },
        "&$buttonDisabled": {
            color: '#757575'
        }
    },
    buttonDisabled: {},
    tooltip: {
        margin: 0,
    },
}));

function Transporte(props) {
    const classes = useStyles();
    const theme = props.theme;
    const refs = props.refs;
    const errors = props.errors;
    const setErrors = props.setErrors;
    const setShowError = props.setShowError;

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

    const [openTooltip, setOpenTooltip] = useState(false);
    const setPlate = props.setPlate;
    const setFile3 = props.setFile3;

    const clearTripDescription = props.clearTripDescription;

    return (
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Tipo de transporte:</Typography>
            <Grid
                container
                direction='row'
                alignItems='center'
            >
                <Grid item xs>
                    <Autocomplete
                        value={transportType}
                        onChange={(event, value) => {
                            if (value !== null) {
                                clearTripDescription();
                                setTransportType(value);
                                setPlate('');
                                setFile3(null);
                                errors[14] = false;
                                errors[18] = false;
                                setErrors([...errors]);
                            }
                        }}
                        options={
                            [
                                { key: 0, value: "Urbano" },
                                { key: 1, value: "Taxi" },
                                { key: 2, value: "Intermunicipal/departamental" },
                                { key: 3, value: "Transporte fluvial" },
                                { key: 4, value: "Transporte especial" },
                            ].map(option => option.value)
                        }
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                {
                    transportType === 'Transporte especial' ?
                        <Grid item>
                            <Tooltip
                                title={
                                    <Typography align='center' variant='body2'>Para el caso de transporte especial, aplican: mototaxi, caballo/burro, bicicleta u otros</Typography>
                                }
                                arrow
                                onOpen={() => setOpenTooltip(true)}
                                onClose={() => setOpenTooltip(false)}
                                open={openTooltip}
                                leaveTouchDelay={8000}
                                classes={{ tooltip: classes.tooltip }}
                            >
                                <IconButton
                                    classes={{ root: classes.button, disabled: classes.buttonDisabled }}
                                    onClick={() => setOpenTooltip(true)}
                                    style={{ height: 40, width: 40 }}
                                >
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        :
                        null
                }
            </Grid>
            <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
            <Typography style={{ marginBottom: theme.spacing(2) }} variant='body1'>Datos del desplazamiento:</Typography>
            <Collapse in={transportType === 'Urbano' || transportType === 'Taxi'}>
                <Grid item xs style={{ marginBottom: theme.spacing(1) }}>
                    <Typography ref={refs[2]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
                    <Autocomplete
                        value={department1}
                        onChange={(event, value) => { setDepartment1(value); setMunicipality1(null); errors[2] = false; setErrors([...errors]); setShowError(false) }}
                        options={departments.map(option => option.departamento)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[2]}
                                helperText={errors[2] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs style={{ marginBottom: theme.spacing(1) }}>
                    <Typography ref={refs[3]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
                    <Autocomplete
                        disabled={!department1}
                        value={municipality1}
                        onChange={(event, value) => { setMunicipality1(value); errors[3] = false; setErrors([...errors]); setShowError(false) }}
                        options={municipalitiesFilter(department1).map(option => option.municipio)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[3]}
                                helperText={errors[3] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs style={{ marginBottom: theme.spacing(1) }}>
                    <Typography ref={refs[4]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Origen:</Typography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        value={tripStart}
                        onChange={(e) => { setTripStart(e.target.value); errors[4] = false; setErrors([...errors]); setShowError(false) }}
                        error={errors[4]}
                        helperText={errors[4] ? 'Este campo no puede estar vacío' : null}
                    />
                </Grid>
                <Grid item xs>
                    <Typography ref={refs[5]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Destino:</Typography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        value={tripEnd}
                        onChange={(e) => { setTripEnd(e.target.value); errors[5] = false; setErrors([...errors]); setShowError(false) }}
                        error={errors[5]}
                        helperText={errors[5] ? 'Este campo no puede estar vacío' : null}
                    />
                </Grid>
            </Collapse>
            <Collapse in={!(transportType === 'Urbano' || transportType === 'Taxi')}>
                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Origen:</Typography>
                <Grid item xs style={{ marginBottom: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
                    <Typography ref={refs[19]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
                    <Autocomplete
                        value={department1}
                        onChange={(event, value) => { setDepartment1(value); setMunicipality1(null); errors[2] = false; setErrors([...errors]); setShowError(false) }}
                        options={departments.map(option => option.departamento)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[2]}
                                helperText={errors[2] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs style={{ marginBottom: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
                    <Typography ref={refs[20]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
                    <Autocomplete
                        disabled={!department1}
                        value={municipality1}
                        onChange={(event, value) => { setMunicipality1(value); errors[3] = false; setErrors([...errors]); setShowError(false) }}
                        options={municipalitiesFilter(department1).map(option => option.municipio)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[3]}
                                helperText={errors[3] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
                <Typography style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }} variant='body1'>Destino:</Typography>
                <Grid item xs style={{ marginBottom: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
                    <Typography ref={refs[6]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
                    <Autocomplete
                        value={department2}
                        onChange={(event, value) => { setDepartment2(value); setMunicipality2(null); errors[6] = false; setErrors([...errors]); setShowError(false) }}
                        options={departments.map(option => option.departamento)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[6]}
                                helperText={errors[6] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs style={{ marginBottom: theme.spacing(1), paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
                    <Typography ref={refs[7]} style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
                    <Autocomplete
                        disabled={!department2}
                        value={municipality2}
                        onChange={(event, value) => { setMunicipality2(value); errors[7] = false; setErrors([...errors]); setShowError(false) }}
                        options={municipalitiesFilter(department2).map(option => option.municipio)}
                        noOptionsText='No hay coincidencias'
                        renderInput={params => (
                            <TextField
                                {...params}
                                size='small'
                                variant='outlined'
                                fullWidth
                                error={errors[7]}
                                helperText={errors[7] ? 'Este campo no puede estar vacío' : null}
                            />
                        )}
                    />
                </Grid>
            </Collapse>
        </CardContent>
    );
}

export default Transporte;
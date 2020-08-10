import React, { useState, useRef } from 'react';
import Logo from '../logo.png';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Avatar,
    Typography,
    Button,
    IconButton,
    Tooltip,
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Grid,
    Divider,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    Collapse,
    Backdrop,
    CircularProgress,
    Snackbar
} from '@material-ui/core';
import { Alert, AlertTitle, Autocomplete } from '@material-ui/lab';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import EsLocale from 'date-fns/locale/es';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HelpIcon from '@material-ui/icons/Help';
import departments from './departamentos';
import municipalities from './municipios';

const API_DEFAULT = 'http://cloud.cnccol.com:5000';
const API_LOGIN = API_DEFAULT + '/auth';
const API_GASTO = API_DEFAULT + '/gasto';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontWeight: 500
    },
    a: {
        height: 37.39,
        '@media (min-width:600px)': {
            height: 45.89
        },
    },
    logo: {
        width: 110,
        '@media (min-width:600px)': {
            width: 135
        },
        marginRight: theme.spacing(4)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#B71C1C',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
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

function Gastos(props) {
    const classes = useStyles();
    const theme = props.theme;

    const [auth, setAuth] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [addExpense, changeAddExpense] = useState(false);

    const [date, setDate] = useState(new Date());
    const [type, setType] = useState(0);

    const [transportType, setTransportType] = useState('Urbano');
    const [department1, setDepartment1] = useState(null);
    const [municipality1, setMunicipality1] = useState(null);
    const [department2, setDepartment2] = useState(null);
    const [municipality2, setMunicipality2] = useState(null);
    const [tripStart, setTripStart] = useState('');
    const [tripEnd, setTripEnd] = useState('');

    const [expenseValue, setExpenseValue] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState(null);
    const [plate, setPlate] = useState('');

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [base64_1, setBase64_1] = useState('');
    const [base64_2, setBase64_2] = useState('');
    const [base64_3, setBase64_3] = useState('');

    const hiddenFileInput = useRef(null);
    const hiddenFileInput2 = useRef(null);
    const hiddenFileInput3 = useRef(null);

    const [errors, setErrors] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorFile, setErrorFile] = useState(false);
    const [messageError2, setMessageError2] = useState('');
    const [openTooltip, setOpenTooltip] = useState(false);

    function validateLogin() {
        let errorLogin = false;
        if (user === '') {
            errorLogin = true;
            errors[0] = true;
        }
        if (password === '') {
            errorLogin = true;
            errors[1] = true;
        }
        if (errorLogin) {
            setErrors([...errors]);
        }
        else {
            login()
        }
    }

    async function login() {
        setShowBackdrop(true);
        const res = await fetch(API_LOGIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'username': user,
                'password': password
            })
        })
        res
            .json()
            .then(d => {
                setShowBackdrop(false);
                if (d['access_token']) {
                    setAccessToken(d['access_token']);
                    setAuth(true);
                    setPassword('');
                }
                else {
                    setShowError(true);
                    setMessageError('Los datos de usuario y contraseña son incorrectos');
                    window.scrollTo(0, 0);
                }
            })
    }

    function validateSend() {
        let errorSend = false;
        if (type === 2) {
            if (department1 === null) {
                errorSend = true;
                errors[2] = true;
            }
            if (municipality1 === null) {
                errorSend = true;
                errors[3] = true;
            }
            if (transportType === 'Urbano' || transportType === 'Taxi') {
                if (tripStart === '') {
                    errorSend = true;
                    errors[4] = true;
                }
                if (tripEnd === '') {
                    errorSend = true;
                    errors[5] = true;
                }
            }
            else {
                if (department2 === null) {
                    errorSend = true;
                    errors[6] = true;
                }
                if (municipality2 === null) {
                    errorSend = true;
                    errors[7] = true;
                }
            }
        }
        else {
            if (address === '') {
                errorSend = true;
                errors[12] = true;
            }
        }
        if (expenseValue === '' || parseInt(expenseValue) <= 0) {
            errorSend = true;
            errors[8] = true;
        }
        if (expenseDescription === '') {
            errorSend = true;
            errors[9] = true;
        }
        if (name === '') {
            errorSend = true;
            errors[10] = true;
        }
        if (id === '') {
            errorSend = true;
            errors[11] = true;
        }
        if (phone === '') {
            errorSend = true;
            errors[13] = true;
        }
        if (transportType === 'Taxi') {
            if (plate === '') {
                errorSend = true;
                errors[14] = true;
            }
            if (file3 === null) {
                errorSend = true;
                errors[18] = true;
            }
        }
        if (city === null) {
            errorSend = true;
            errors[15] = true;
        }
        if (file === null) {
            errorSend = true;
            errors[16] = true;
        }
        if (file2 === null) {
            errorSend = true;
            errors[17] = true;
        }
        if (errorSend) {
            setErrors([...errors]);
            setErrorFile(true);
            setMessageError2('Existen errores en algunos campos, por favor revisa la información suministrada');
        }
        else {
            send();
        }
    }

    async function send() {
        setShowBackdrop(true);
        const res = await fetch(API_GASTO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + accessToken },
            body: JSON.stringify({
                'cedula': user,
                'fecha': format(date, 'yyyy-MM-dd'),
                'tipo': type + 1,
                'valor': parseInt(expenseValue),
                'descripcion': expenseDescription,
                'identificacion': base64_1.split('base64,')[1],
                'documento': base64_2.split('base64,')[1],
                'origen': tripStart,
                'destino': tripEnd,
                'medio': type === 2 ? transportType : '',
                'beneficiario_documento': id,
                'beneficiario_nombre': name,
                'beneficiario_telefono': phone,
                'beneficiario_ciudad': city,
                'beneficiario_direccion': address,
                'beneficiario_placa': plate,
                'foto_planilla': base64_3 !== '' ? base64_3.split('base64,')[1] : '',
                'origen_ciudad': municipality1 === null ? '' : municipality1,
                'destino_ciudad': municipality2 === null ? '' : municipality2,
                'origen_departamento': department1 === null ? '' : department1,
                'destino_departamento': department2 === null ? '' : department2
            })
        })
        res
            .json()
            .then(d => {
                setShowBackdrop(false);
                if (d['cedula']) {
                    setShowSuccess(true);
                    clearTripDescription();
                    clearExpensiveInformation();
                    clearBeneficiaryInformation();
                    window.scrollTo(0, 0);
                }
                else if (d['error'] === 'Invalid token') {
                    setAuth(false);
                    clearTripDescription();
                    clearExpensiveInformation();
                    clearBeneficiaryInformation()
                    setShowError(true);
                    setMessageError('Tu sesión expiró, inicia nuevamente');
                    window.scrollTo(0, 0);
                }
                else {
                    setShowError(true);
                    setMessageError('Los datos son incorrectos');
                    window.scrollTo(0, 0);
                }
            })
    }

    function clearTripDescription() {
        setTransportType('Urbano');
        setTripStart('');
        setTripEnd('');
        setDepartment1(null);
        setMunicipality1(null);
        setDepartment2(null);
        setMunicipality2(null);
        errors[2] = false;
        errors[3] = false;
        errors[4] = false;
        errors[5] = false;
        errors[6] = false;
        errors[7] = false;
        setErrors([...errors]);
    }

    function clearExpensiveInformation() {
        setDate(new Date());
        setType(0);
        setExpenseValue('');
        setExpenseDescription('');
        setFile(null);
        setFile2(null);
        setBase64_1('');
        setBase64_2('');
        errors[8] = false;
        errors[9] = false;
        errors[16] = false;
        errors[17] = false;
        errors[18] = false;
        setErrors([...errors]);
    }

    function clearBeneficiaryInformation() {
        setName('');
        setId('');
        setAddress('');
        setPhone('');
        setPlate('');
        setCity(null);
        setFile3(null);
        setBase64_2('');
        errors[10] = false;
        errors[11] = false;
        errors[12] = false;
        errors[13] = false;
        errors[14] = false;
        errors[15] = false;
        errors[18] = false;
        setErrors([...errors]);
    }

    function Base64(file, changeFile, changeBase, index) {
        if (file !== undefined) {
            if (file.type.split('/')[0] === 'image') {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    changeFile(file);
                    changeBase(reader.result);
                    errors[index] = false;
                    setErrors([...errors]);
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }
            else {
                setErrorFile(true);
                setMessageError2('El tipo de archivo seleccionado no es reconocido');
            }
        }
    }

    function municipalitiesFilter(department) {
        return (municipalities.filter(municipality => {
            return municipality.departamento === department;
        }))
    }

    return (
        <div className='Dashboard'>
            <header className='Dashboard-header'>
                <AppBar position='static'>
                    <Toolbar>
                        <a className={classes.a} href={'https://www.centronacionaldeconsultoria.com/'}>
                            <img src={Logo} alt='logo' className={classes.logo} />
                        </a>
                        <Typography variant='h5' className={classes.title}>
                            App de Gastos
                        </Typography>
                        {
                            !auth ?
                                null
                                :
                                <IconButton edge='start' color='inherit' onClick={() => { setAuth(false); changeAddExpense(false) }}>
                                    <ExitToAppIcon />
                                </IconButton>
                        }
                    </Toolbar>
                </AppBar>
            </header>
            <div className='Dashboard-body'>
                <Container component='main' maxWidth='md'>
                    <Collapse style={{ marginTop: theme.spacing(2), marginBottom: showError ? theme.spacing(2) : null }} in={showError}>
                        <Alert
                            severity='error'
                            action={
                                <IconButton
                                    aria-label='close'
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                >
                                    <CloseIcon fontSize='inherit' />
                                </IconButton>
                            }
                        >
                            <AlertTitle>Error</AlertTitle>
                            <Typography variant='body2'>{messageError}</Typography>
                        </Alert>
                    </Collapse>
                </Container>
                {
                    !auth ?
                        <Container component='main' maxWidth='xs'>
                            <Card style={{ marginBottom: theme.spacing(2) }}>
                                <CardContent>
                                    <Grid
                                        container
                                        direction='column'
                                        alignItems='center'
                                        justify='center'
                                        style={{ marginBottom: theme.spacing(4) }}
                                    >
                                        <Grid item>
                                            <Avatar className={classes.avatar}>
                                                <LockOutlinedIcon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5'>Inicio de sesión</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        container
                                        direction='column'
                                        justify='center'
                                    >
                                        <Grid item xs style={{ marginBottom: theme.spacing(2) }}>
                                            <TextField
                                                fullWidth={true}
                                                size='small'
                                                variant='outlined'
                                                label='Usuario'
                                                value={user}
                                                onChange={(e) => { setUser(e.target.value); errors[0] = false; setErrors([...errors]); setShowError(false) }}
                                                error={errors[0]}
                                                helperText={errors[0] ? 'Este campo no puede estar vacío' : null}
                                            />
                                        </Grid>
                                        <Grid item xs style={{ marginBottom: theme.spacing(4) }}>
                                            <TextField
                                                fullWidth={true}
                                                type='password'
                                                size='small'
                                                variant='outlined'
                                                label='Contraseña'
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value); errors[1] = false; setErrors([...errors]); setShowError(false) }}
                                                error={errors[1]}
                                                helperText={errors[1] ? 'Este campo no puede estar vacío' : null}
                                            />
                                        </Grid>
                                        <Grid item xs>
                                            <Button fullWidth={true} variant='contained' color='primary' onClick={() => validateLogin()}>Iniciar sesión</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                        :
                        !addExpense ?
                            <Container component='main' maxWidth='xs'>
                                <Card style={{ marginBottom: theme.spacing(2) }}>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction='column'
                                            alignItems='center'
                                            justify='center'
                                            style={{ marginTop: theme.spacing(1) }}
                                        >
                                            <Grid item>
                                                <Typography variant='h5'>¡Hola!</Typography>
                                            </Grid>
                                            <Grid item style={{ marginBottom: theme.spacing(4) }}>
                                                <Typography variant='h5'>Bienvenido al App de Gastos</Typography>
                                            </Grid>

                                        </Grid>
                                        <Button fullWidth={true} variant='contained' color='primary' onClick={() => changeAddExpense(true)}>Agregar nuevo gasto</Button>
                                    </CardContent>
                                </Card>
                            </Container>
                            :
                            <Container component='main' maxWidth='md'>
                                <Card style={{ marginBottom: theme.spacing(2) }}>
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Selecciona la fecha en la que fue generado el gasto:</Typography>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={EsLocale}>
                                                    <DatePicker
                                                        size='small'
                                                        inputVariant='outlined'
                                                        format="EEEE, dd 'de' MMMM 'del' yyyy"
                                                        fullWidth={true}
                                                        disableToolbar={true}
                                                        minDate={(new Date()).setDate((new Date()).getDate() - 7)}
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Origen:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Destino:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Departamento:</Typography>
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
                                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Municipio:</Typography>
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
                                                </Grid>
                                                <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            </Collapse>
                                            <Grid item xs>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Valor del gasto:</Typography>
                                                <CurrencyTextField
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Descripción del gasto:</Typography>
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
                                    <Divider />
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Nombre o razón social:</Typography>
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Cédula o NIT:</Typography>
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
                                                    <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Dirección:</Typography>
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Teléfono:</Typography>
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
                                                    <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Placa del vehículo:</Typography>
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
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Ciudad o municipio:</Typography>
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
                                    <Divider />
                                    <CardHeader
                                        title={
                                            <Typography variant='h6'>Archivos de soporte</Typography>
                                        }
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Grid container
                                            direction='column'
                                            justify='center'
                                        >
                                            <Grid item>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Cédula o RUT del prestador del servicio asociado al gasto:</Typography>
                                                <Grid
                                                    container
                                                    direction='row'
                                                    alignItems='center'
                                                >
                                                    <Grid item>
                                                        <Button size='small' variant='outlined' style={{ marginRight: theme.spacing(1) }} onClick={() => hiddenFileInput.current.click()}>
                                                            Cargar archivo
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color={errors[16] ? 'error' : 'inherit'} variant='body2'>{file ? file.name : 'Ningún archivo cargado'}</Typography>
                                                    </Grid>
                                                    <input
                                                        type='file'
                                                        ref={hiddenFileInput}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => Base64(e.target.files[0], setFile, setBase64_1, 16)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            <Grid item>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Recibo o documento equivalente a la factura:</Typography>
                                                <Grid
                                                    container
                                                    direction='row'
                                                    alignItems='center'
                                                >
                                                    <Grid item>
                                                        <Button size='small' variant='outlined' style={{ marginRight: theme.spacing(1) }} onClick={() => hiddenFileInput2.current.click()}>
                                                            Cargar archivo
                                                    </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color={errors[17] ? 'error' : 'inherit'} variant='body2'>{file2 ? file2.name : 'Ningún archivo cargado'}</Typography>
                                                    </Grid>
                                                    <input
                                                        type='file'
                                                        ref={hiddenFileInput2}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => Base64(e.target.files[0], setFile2, setBase64_2, 17)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Collapse in={transportType === 'Taxi'}>
                                                <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                                <Grid item>
                                                    <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Foto planilla:</Typography>
                                                    <Grid
                                                        container
                                                        direction='row'
                                                        alignItems='center'
                                                    >
                                                        <Grid item>
                                                            <Button size='small' variant='outlined' style={{ marginRight: theme.spacing(1) }} onClick={() => hiddenFileInput3.current.click()}>
                                                                Cargar archivo
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography color={errors[18] ? 'error' : 'inherit'} variant='body2'>{file3 ? file3.name : 'Ningún archivo cargado'}</Typography>
                                                        </Grid>
                                                        <input
                                                            type='file'
                                                            ref={hiddenFileInput3}
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => Base64(e.target.files[0], setFile3, setBase64_3, 18)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Collapse>
                                        </Grid>
                                    </CardContent>
                                    <Divider style={{ marginBottom: theme.spacing(1) }} />
                                    <CardActions style={{ paddingRight: theme.spacing(4), marginBottom: theme.spacing(1) }}>
                                        <Grid
                                            container
                                            direction='row'
                                            justify='flex-end'
                                        >
                                            <Grid item style={{ marginRight: theme.spacing(4) }}>
                                                <Button style={{ width: 103.21 }} variant='contained' color='primary' onClick={() => validateSend()}>Enviar</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button style={{ width: 103.21 }} variant='contained' color='secondary' onClick={() => { changeAddExpense(false); clearTripDescription(); clearExpensiveInformation(); clearBeneficiaryInformation() }}>Cancelar</Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Container>

                }
                <Backdrop className={classes.backdrop} open={showBackdrop}>
                    <CircularProgress color='inherit' />
                </Backdrop>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={showSuccess}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccess(false)}
                >
                    <Alert onClose={() => setShowSuccess(false)} severity='success'>
                        La información fue enviada exitosamente
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={errorFile}
                    autoHideDuration={6000}
                    onClose={() => setErrorFile(false)}
                >
                    <Alert onClose={() => setErrorFile(false)} severity='error'>
                        {messageError2}
                    </Alert>
                </Snackbar>
            </div>
        </div >
    );
}

export default Gastos;
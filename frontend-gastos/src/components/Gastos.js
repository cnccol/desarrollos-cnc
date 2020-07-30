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
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import EsLocale from 'date-fns/locale/es';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const API_LOGIN = '/auth';
const API_GASTO = '/gasto';

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
    const [tripStart, setTripStart] = useState('');
    const [tripEnd, setTripEnd] = useState('');
    const [conveyance, setConveyance] = useState('');
    const [expenseValue, setExpenseValue] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [base64_1, setBase64_1] = useState('');
    const [base64_2, setBase64_2] = useState('');
    const hiddenFileInput = useRef(null);
    const hiddenFileInput2 = useRef(null);
    const [errors, setErrors] = useState([false, false, false, false, false, false, false, false, false]);
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorFile, setErrorFile] = useState(false);

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
                "username": user,
                "password": password
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
        if (type === 1) {
            if (tripStart === '') {
                errorSend = true;
                errors[2] = true;
            }
            if (tripEnd === '') {
                errorSend = true;
                errors[3] = true;
            }
            if (conveyance === '') {
                errorSend = true;
                errors[4] = true;
            }
        }
        if (expenseValue === '' || parseInt(expenseValue) <= 0) {
            errorSend = true;
            errors[5] = true;
        }
        if (expenseDescription === '') {
            errorSend = true;
            errors[6] = true;
        }
        if (file === null) {
            errorSend = true;
            errors[7] = true;
        }
        if (file2 === null) {
            errorSend = true;
            errors[8] = true;
        }
        if (errorSend) {
            setErrors([...errors]);
        }
        else {
            send()
        }
    }

    async function send() {
        setShowBackdrop(true);
        const res = await fetch(API_GASTO, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'JWT ' + accessToken },
            body: JSON.stringify({
                "cedula": user,
                "fecha": format(date, 'yyyy-MM-dd'),
                "tipo": type + 1,
                "valor": parseInt(expenseValue),
                "descripcion": expenseDescription,
                "identificacion": base64_1.split('base64,')[1],
                "documento": base64_2.split('base64,')[1],
                "origen": tripStart,
                "destino": tripEnd,
                "medio": conveyance
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
                }
                else if (d['error'] === 'Invalid token') {
                    setAuth(false);
                    clearTripDescription();
                    clearExpensiveInformation();
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
        setTripStart('');
        setTripEnd('');
        setConveyance('');
        errors[2] = false;
        errors[3] = false;
        errors[4] = false;
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
        errors[5] = false;
        errors[6] = false;
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
            }
        }
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
                        {!auth ?
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
                <Container component="main" maxWidth="md">
                    <Collapse style={{ marginTop: theme.spacing(2), marginBottom: showError ? theme.spacing(2) : null }} in={showError}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowError(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
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
                        <Container component="main" maxWidth="xs">
                            <Card style={{ marginBottom: theme.spacing(2) }}>
                                <CardContent>
                                    <Grid
                                        container
                                        direction="column"
                                        alignItems="center"
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
                                        direction="column"
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
                                                type="password"
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
                            <Container component="main" maxWidth="xs">
                                <Card style={{ marginBottom: theme.spacing(2) }}>
                                    <CardContent>
                                        <Grid
                                            container
                                            direction="column"
                                            alignItems="center"
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
                            <Container component="main" maxWidth="md">
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
                                            direction="column"
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
                                                    <FormControlLabel value={0} control={<Radio color='primary' />} label='Alimentación' />
                                                    <FormControlLabel value={1} control={<Radio color='primary' />} label='Transporte' />
                                                </RadioGroup>
                                            </Grid>
                                            <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            <Collapse in={type === 1}>
                                                <Grid item xs>
                                                    <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Descripción del recorrido</Typography>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        alignItems='center'
                                                        style={{ marginBottom: theme.spacing(1) }}
                                                    >
                                                        <Grid item style={{ marginRight: theme.spacing(2), width: 147.5 }} >
                                                            <Typography variant='body1'>Origen:</Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField
                                                                size='small'
                                                                variant="outlined"
                                                                fullWidth
                                                                value={tripStart}
                                                                onChange={(e) => { setTripStart(e.target.value); errors[2] = false; setErrors([...errors]); setShowError(false) }}
                                                                error={errors[2]}
                                                                helperText={errors[2] ? 'Este campo no puede estar vacío' : null}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        alignItems='center'
                                                        style={{ marginBottom: theme.spacing(1) }}
                                                    >
                                                        <Grid item style={{ marginRight: theme.spacing(2), width: 147.5 }} >
                                                            <Typography variant='body1'>Destino:</Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField
                                                                size='small'
                                                                variant="outlined"
                                                                fullWidth
                                                                value={tripEnd}
                                                                onChange={(e) => { setTripEnd(e.target.value); errors[3] = false; setErrors([...errors]); setShowError(false) }}
                                                                error={errors[3]}
                                                                helperText={errors[3] ? 'Este campo no puede estar vacío' : null}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        alignItems='center'
                                                    >
                                                        <Grid item style={{ marginRight: theme.spacing(2) }} >
                                                            <Typography variant='body1'>Medio de transporte:</Typography>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <TextField
                                                                size='small'
                                                                variant="outlined"
                                                                fullWidth
                                                                value={conveyance}
                                                                onChange={(e) => { setConveyance(e.target.value); errors[4] = false; setErrors([...errors]); setShowError(false) }}
                                                                error={errors[4]}
                                                                helperText={errors[4] ? 'Este campo no puede estar vacío' : null}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            </Collapse>
                                            <Grid item xs>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Valor del gasto:</Typography>
                                                <CurrencyTextField
                                                    size='small'
                                                    variant="outlined"
                                                    currencySymbol="$"
                                                    outputFormat="string"
                                                    minimumValue='0'
                                                    textAlign='left'
                                                    decimalPlaces={0}
                                                    fullWidth
                                                    value={expenseValue}
                                                    onChange={(event, value) => { setExpenseValue(value); errors[5] = false; setErrors([...errors]); setShowError(false) }}
                                                    error={errors[5]}
                                                    helperText={errors[5] ? 'Este campo no puede estar vacío y debe ser mayor a cero' : null}
                                                />
                                            </Grid>
                                            <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            <Grid item xs>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Descripción del gasto:</Typography>
                                                <TextField
                                                    size='small'
                                                    variant="outlined"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    value={expenseDescription}
                                                    onChange={(e) => { setExpenseDescription(e.target.value); errors[6] = false; setErrors([...errors]); setShowError(false) }}
                                                    error={errors[6]}
                                                    helperText={errors[6] ? 'Este campo no puede estar vacío' : null}
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
                                            direction="column"
                                            justify='center'
                                        >
                                            <Grid item>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>RUT o cédula del prestador del servicio asociado al gasto:</Typography>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    alignItems='center'
                                                >
                                                    <Grid item>
                                                        <Button size='small' variant='outlined' style={{ marginRight: theme.spacing(1) }} onClick={() => hiddenFileInput.current.click()}>
                                                            Cargar archivo
                                                        </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color={errors[7] ? 'error' : 'inherit'} variant='body2'>{file ? file.name : 'Ningún archivo cargado'}</Typography>
                                                    </Grid>
                                                    <input
                                                        type="file"
                                                        ref={hiddenFileInput}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => Base64(e.target.files[0], setFile, setBase64_1, 7)}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                                            <Grid item>
                                                <Typography style={{ marginBottom: theme.spacing(1) }} variant='body1'>Recibo o documento equivalente a la factura:</Typography>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    alignItems='center'
                                                >
                                                    <Grid item>
                                                        <Button size='small' variant='outlined' style={{ marginRight: theme.spacing(1) }} onClick={() => hiddenFileInput2.current.click()}>
                                                            Cargar archivo
                                                    </Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography color={errors[8] ? 'error' : 'inherit'} variant='body2'>{file2 ? file2.name : 'Ningún archivo cargado'}</Typography>
                                                    </Grid>
                                                    <input
                                                        type="file"
                                                        ref={hiddenFileInput2}
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => Base64(e.target.files[0], setFile2, setBase64_2, 8)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Divider style={{ marginBottom: theme.spacing(1) }} />
                                    <CardActions style={{ paddingRight: theme.spacing(4), marginBottom: theme.spacing(1) }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify='flex-end'
                                        >
                                            <Grid item style={{ marginRight: theme.spacing(4) }}>
                                                <Button style={{ width: 103.21 }} variant='contained' color='primary' onClick={() => validateSend()}>Enviar</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button style={{ width: 103.21 }} variant='contained' color='secondary' onClick={() => { changeAddExpense(false); clearTripDescription(); clearExpensiveInformation() }}>Cancelar</Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Container>

                }
                <Backdrop className={classes.backdrop} open={showBackdrop}>
                    <CircularProgress color="inherit" />
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
                    <Alert onClose={() => setShowSuccess(false)} severity="success">
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
                    <Alert onClose={() => setErrorFile(false)} severity="error">
                        El tipo de archivo seleccionado no es reconocido
                    </Alert>
                </Snackbar>
            </div>
        </div >
    );
}

export default Gastos;
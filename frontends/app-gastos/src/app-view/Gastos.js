import React, { useState, useRef } from 'react';
import Logo from '../logo.png';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Container,
    Card,
    CardActions,
    Grid,
    Divider,
    Collapse,
    Backdrop,
    CircularProgress,
    Snackbar
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { format } from 'date-fns';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import departments from './components/data/departamentos';
import municipalities from './components/data/municipios';

import Sesion from './components/Sesion';
import Menu from './components/Menu';
import Informacion from './components/Informacion';
import Prestador from './components/Prestador';
import Soporte from './components/Soporte';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function Gastos(props) {
    const classes = useStyles();
    const theme = props.theme;

    const [auth, setAuth] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [addExpense, changeAddExpense] = useState(false);

    const [costCenter, setCostCenter] = useState(null);
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

    const [errors, setErrors] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const refs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
    const [showError, setShowError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorFile, setErrorFile] = useState(false);
    const [messageError2, setMessageError2] = useState('');

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
        let minTop = Infinity;
        if (type === 2) {
            if (department1 === null) {
                errorSend = true;
                errors[2] = true;
                if (transportType === 'Urbano' || transportType === 'Taxi') {
                    minTop = Math.min(minTop, refs[2].current.offsetTop)
                }
                else {
                    minTop = Math.min(minTop, refs[19].current.offsetTop)
                }
            }
            if (municipality1 === null) {
                errorSend = true;
                errors[3] = true;
                if (transportType === 'Urbano' || transportType === 'Taxi') {
                    minTop = Math.min(minTop, refs[3].current.offsetTop)
                }
                else {
                    minTop = Math.min(minTop, refs[20].current.offsetTop)
                }
            }
            if (transportType === 'Urbano' || transportType === 'Taxi') {
                if (tripStart === '') {
                    errorSend = true;
                    errors[4] = true;
                    minTop = Math.min(minTop, refs[4].current.offsetTop)
                }
                if (tripEnd === '') {
                    errorSend = true;
                    errors[5] = true;
                    minTop = Math.min(minTop, refs[5].current.offsetTop)
                }
            }
            else {
                if (department2 === null) {
                    errorSend = true;
                    errors[6] = true;
                    minTop = Math.min(minTop, refs[6].current.offsetTop)
                }
                if (municipality2 === null) {
                    errorSend = true;
                    errors[7] = true;
                    minTop = Math.min(minTop, refs[7].current.offsetTop)
                }
            }
        }
        else {
            if (address === '') {
                errorSend = true;
                errors[12] = true;
                minTop = Math.min(minTop, refs[12].current.offsetTop)
            }
        }
        if (expenseValue === '' || parseInt(expenseValue) <= 0) {
            errorSend = true;
            errors[8] = true;
            minTop = Math.min(minTop, refs[8].current.offsetTop)
        }
        if (expenseDescription.replace(/(\r\n|\n|\r)/gm, "") === '') {
            errorSend = true;
            errors[9] = true;
            minTop = Math.min(minTop, refs[9].current.offsetTop)
        }
        if (name === '') {
            errorSend = true;
            errors[10] = true;
            minTop = Math.min(minTop, refs[10].current.offsetTop)
        }
        if (id === '') {
            errorSend = true;
            errors[11] = true;
            minTop = Math.min(minTop, refs[11].current.offsetTop)
        }
        if (phone === '') {
            errorSend = true;
            errors[13] = true;
            minTop = Math.min(minTop, refs[13].current.offsetTop)
        }
        if (transportType === 'Taxi') {
            if (plate === '') {
                errorSend = true;
                errors[14] = true;
                minTop = Math.min(minTop, refs[14].current.offsetTop)
            }
            if (file3 === null) {
                errorSend = true;
                errors[18] = true;
                minTop = Math.min(minTop, refs[18].current.offsetTop)
            }
        }
        if (city === null) {
            errorSend = true;
            errors[15] = true;
            minTop = Math.min(minTop, refs[15].current.offsetTop)
        }
        if (file === null) {
            errorSend = true;
            errors[16] = true;
            minTop = Math.min(minTop, refs[16].current.offsetTop)
        }
        if (file2 === null) {
            errorSend = true;
            errors[17] = true;
            minTop = Math.min(minTop, refs[17].current.offsetTop)
        }
        if (costCenter == null) {
            errorSend = true;
            errors[19] = true;
            minTop = Math.min(minTop, refs[21].current.offsetTop)
        }
        if (errorSend) {
            window.scrollTo(0, minTop - 20);
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
            .catch(error => {
                setShowBackdrop(false);
                setAuth(false);
                clearTripDescription();
                clearExpensiveInformation();
                clearBeneficiaryInformation();
                setErrorFile(true);
                setMessageError2('Tu sesión expiró, inicia sesión nuevamente');
                window.scrollTo(0, 0);
            })
        if (res !== undefined) {
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
        setCostCenter(null);
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
        errors[19] = false;
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
        setBase64_3('');
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
                            <Sesion
                                theme={theme}
                                errors={errors}
                                setErrors={setErrors}
                                setShowError={setShowError}
                                refs={refs}
                                user={user}
                                setUser={setUser}
                                password={password}
                                setPassword={setPassword}
                                validateLogin={validateLogin}
                            />
                        </Container>
                        :
                        !addExpense ?
                            <Container component='main' maxWidth='xs'>
                                <Menu
                                    theme={theme}
                                    changeAddExpense={changeAddExpense}
                                />
                            </Container>
                            :
                            <Container component='main' maxWidth='md'>
                                <Card style={{ marginBottom: theme.spacing(2) }}>
                                    <Informacion
                                        theme={theme}
                                        refs={refs}
                                        errors={errors}
                                        setErrors={setErrors}
                                        setShowError={setShowError}
                                        costCenter={costCenter}
                                        setCostCenter={setCostCenter}
                                        date={date}
                                        setDate={setDate}
                                        type={type}
                                        setType={setType}
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
                                        expenseDescription={expenseDescription}
                                        setExpenseDescription={setExpenseDescription}
                                        expenseValue={expenseValue}
                                        setExpenseValue={setExpenseValue}
                                        clearTripDescription={clearTripDescription}
                                    />
                                    <Divider />
                                    <Prestador
                                        theme={theme}
                                        refs={refs}
                                        errors={errors}
                                        setErrors={setErrors}
                                        setShowError={setShowError}
                                        name={name}
                                        setName={setName}
                                        id={id}
                                        setId={setId}
                                        address={address}
                                        setAddress={setAddress}
                                        phone={phone}
                                        setPhone={setPhone}
                                        plate={plate}
                                        setPlate={setPlate}
                                        city={city}
                                        setCity={setCity}
                                        type={type}
                                        transportType={transportType}
                                        municipalities={municipalities}
                                    />
                                    <Divider />
                                    <Soporte
                                        theme={theme}
                                        refs={refs}
                                        errors={errors}
                                        file={file}
                                        setFile={setFile}
                                        file2={file2}
                                        setFile2={setFile2}
                                        file3={file3}
                                        setFile3={setFile3}
                                        Base64={Base64}
                                        setBase64_1={setBase64_1}
                                        setBase64_2={setBase64_2}
                                        setBase64_3={setBase64_3}
                                        transportType={transportType}
                                    />
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
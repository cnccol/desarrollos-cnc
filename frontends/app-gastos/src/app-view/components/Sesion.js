import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Typography,
    Button,
    Grid,
    TextField,
    Card,
    CardContent
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#B71C1C',
    }
}));

function Sesion(props) {
    const classes = useStyles();
    const theme = props.theme;
    const errors = props.errors;
    const setErrors = props.setErrors;
    const setShowError = props.setShowError;
    const refs = props.refs;

    const user = props.user;
    const setUser = props.setUser;
    const password = props.password;
    const setPassword = props.setPassword;

    const validateLogin = props.validateLogin;

    return (
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
                            ref={refs[0]}
                            fullWidth={true}
                            size='small'
                            variant='outlined'
                            label='Usuario'
                            value={user}
                            onChange={(e) => { setUser(e.target.value); errors[0] = false; setErrors([...errors]); setShowError(false) }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter')
                                    validateLogin();
                            }}
                            error={errors[0]}
                            helperText={errors[0] ? 'Este campo no puede estar vacío' : null}
                        />
                    </Grid>
                    <Grid item xs style={{ marginBottom: theme.spacing(4) }}>
                        <TextField
                            ref={refs[1]}
                            fullWidth={true}
                            type='password'
                            size='small'
                            variant='outlined'
                            label='Contraseña'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); errors[1] = false; setErrors([...errors]); setShowError(false) }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter')
                                    validateLogin();
                            }}
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
    );
}

export default Sesion;
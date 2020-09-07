import React, { useRef } from 'react';
import {
    Typography,
    Button,
    CardHeader,
    CardContent,
    Grid,
    Divider,
    Collapse
} from '@material-ui/core';

function Soporte(props) {
    const theme = props.theme;
    const refs = props.refs;
    const errors = props.errors;

    const hiddenFileInput = useRef(null);
    const hiddenFileInput2 = useRef(null);
    const hiddenFileInput3 = useRef(null);

    const file = props.file;
    const setFile = props.setFile;
    const file2 = props.file2;
    const setFile2 = props.setFile2;
    const file3 = props.file3;
    const setFile3 = props.setFile3;

    const Base64 = props.Base64;
    const setBase64_1 = props.setBase64_1;
    const setBase64_2 = props.setBase64_2;
    const setBase64_3 = props.setBase64_3;

    const transportType = props.transportType;

    return (
        <React.Fragment>
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
                                <Typography ref={refs[16]} color={errors[16] ? 'error' : 'inherit'} variant='body2'>{file ? file.name : 'Ningún archivo cargado'}</Typography>
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
                                <Typography ref={refs[17]} color={errors[17] ? 'error' : 'inherit'} variant='body2'>{file2 ? file2.name : 'Ningún archivo cargado'}</Typography>
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
                                    <Typography ref={refs[18]} color={errors[18] ? 'error' : 'inherit'} variant='body2'>{file3 ? file3.name : 'Ningún archivo cargado'}</Typography>
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
        </React.Fragment>
    );
}

export default Soporte;
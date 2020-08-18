import React from 'react';
import {
    Typography,
    Button,
    Grid,
    Card,
    CardContent
} from '@material-ui/core';

function Menu(props) {
    const theme = props.theme;
    const changeAddExpense = props.changeAddExpense;

    return (
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
    );
}

export default Menu;
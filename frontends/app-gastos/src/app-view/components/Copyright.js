import React from 'react';
import {
    Box,
    Typography,
    Link
} from '@material-ui/core';

function Copyright() {
    return (
        <Box mt={8} mb={3}>
            <Typography variant='body2' align='center' style={{ color: '#616161' }}>
                {'Copyright © '}
                <Link variant='body2' color='inherit' href='https://www.centronacionaldeconsultoria.com/'>
                    Centro Nacional de Consultoría (CNC)
                </Link>{' '}
                {new Date().getFullYear()}
            </Typography>
        </Box>
    );
}

export default Copyright;
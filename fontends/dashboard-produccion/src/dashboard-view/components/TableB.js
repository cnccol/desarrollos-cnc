import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650
    },
    paginationCaption: {
        fontSize: 15
    },
    paginationToolbar: {
        "& > p:nth-of-type(2)": {
            fontSize: 15
        }
    },
    selectRowName: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
            fontWeight: 500
        }
    }
}));

function TableB(props) {
    const classes = useStyles();
    const rows = props.rows;
    const rowsLength = props.rowsLength;
    const rowsPerPage = props.rowsPerPage;
    const setRowsPerPage = props.setRowsPerPage;
    const filter = props.filter;
    const [page, setPage] = useState(0);

    return (
        <React.Fragment>
            <TableContainer>
                <Table className={classes.table}>
                    <TableHead style={{ backgroundColor: '#FAFAFA' }}>
                        <TableRow>
                            <TableCell style={{ fontSize: '16px', minWidth: 250 }}>Nombre estudio</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Llamadas realizadas</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Llamadas que pasan filtro</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Llamadas efectivas</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Llamadas rechazadas</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Tiempo en llamadas</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Encuestas efectivas</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Indicador de calidad</TableCell>
                            <TableCell style={{ fontSize: '16px', minWidth: 150 }} align='right'>Ranking</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.name}>
                                <TableCell style={{ fontSize: '16px' }} component='th' scope='row'>
                                    <span className={classes.selectRowName} onClick={() => console.log(row.name)}>{row.name}</span>
                                </TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.calories}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.fat}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.carbs}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.protein}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.calories}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.fat}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.carbs}</TableCell>
                                <TableCell style={{ fontSize: '16px' }} align='right'>{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {rows.length > 0 ?
                <TablePagination
                    style={{ marginTop: page > 0 && page === Math.ceil(rows.length / rowsPerPage) - 1 && (rows.length % rowsPerPage) > 0 ? 55.2 * (rowsPerPage - (rows.length % rowsPerPage)) : page === 0 && Math.floor(rows.length / rowsPerPage) === 0 && filter !== '' ? 55.2 * (Math.min(rowsPerPage, rowsLength) - rows.length) : 0 }}
                    SelectProps={{
                        style: { fontSize: 15 }
                    }}
                    classes={{
                        toolbar: classes.paginationToolbar,
                        caption: classes.paginationCaption
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage='Filas por página'
                    onChangePage={(e, newPage) => {
                        setPage(newPage);
                    }}
                    onChangeRowsPerPage={(e) => {
                        setRowsPerPage(+e.target.value);
                        setPage(0);
                    }}
                />
                :
                <Typography style={{ fontSize: '16px', margin: 16 }} variant='h5'>
                    No se encontraron resultados.
                </Typography>
            }
        </React.Fragment>
    );
}

export default TableB;
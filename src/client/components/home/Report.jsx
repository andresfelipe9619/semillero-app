import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Report({ data = [] }) {
  return (
    <TableContainer component={Paper} sx={{ m: 2, maxWidth: 640 }}>
      <Table sx={{ maxWidth: 640 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Modulo</TableCell>
            <TableCell align="right">Inscritos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow
              key={row.modulo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.modulo}
              </TableCell>
              <TableCell align="right">{row.inscritos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

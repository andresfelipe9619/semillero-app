import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Report({ data = {} }) {
  
  const [reporte, setReporte] = React.useState([]);

  React.useEffect(() => {
    setReporte(data.reporte_);
  }, [data]);

  return (
  <div className='_container_table_admin'>
      <TableContainer component={Paper} sx={{ m: 2, maxWidth: 640 }}>
        <Table sx={{ maxWidth: 640 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Modulo</strong></TableCell>
              <TableCell align="right"><strong>Inscritos</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (reporte.length === 0) ?
              (<TableRow
                  key={123}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                      <strong  className='_loader_info'> <h1>Cargando Informacion</h1></strong>
                </TableCell>
              </TableRow>)
              : 
              (data['reporte_']).map(row => (
                <TableRow
                  key={row.codigo}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a style={{  color: 'inherit'}} href={row.id_sheet} target="_blank">{row.name}</a>
                  </TableCell>
                  <TableCell align="right">{row.inscritos}</TableCell>
                </TableRow>
              ))
            }
             <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell><strong>Total:</strong></TableCell>
              <TableCell align="right"><strong>{data['total_inscritos']}</strong></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className='_container_table_img'>
        <img src="https://drive.google.com/uc?id=1GX6Qk1zbtEWfS44-2W1QzQrZBXePK0-g" alt="logo semillero" />
      </div>
    </div>
  );
}

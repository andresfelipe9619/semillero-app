import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import FormUpload from '../form-page/FormUpload';

export default function Documents({ handlePrevPage, handleSubmit }) {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Typography variant="h2" color="primary">
          Documentos
        </Typography>
        <Box px={4} py={2}>
          <Typography paragraph>
            Por tavor cargue los archivos necesarios para completar la
            inscrpcion Tenga en cuenta que los archivos deben ser en formato{' '}
            <strong>PDF</strong> y no deben pesar más de <strong>2Mb</strong>.
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <FormUpload label="docFile" name="docFile" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="constanciaEstudFile" name="constanciaEstudFile" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="constanciaFuncFile" name="constanciaFuncFile" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="reciboFile" name="reciboFile" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="recibosPublicos" name="recibosPublicos" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="cartaSolicitud" name="cartaSolicitud" />
      </Grid>
      <Grid item md={12}>
        <FormUpload label="actaGrado" name="actaGrado" />
      </Grid>
      <Grid
        item
        container
        md={12}
        justifyContent="center"
        component={Box}
        my={4}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Enviar
        </Button>
      </Grid>
      <Grid item container md={12} justifyContent="flex-start">
        <Button variant="contained" onClick={handlePrevPage}>
          Anterior
        </Button>
      </Grid>
    </Grid>
  );
}

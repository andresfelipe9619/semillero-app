import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import Card from '../card/Card';
import CheckboxesGroup from '../form-page/FormCheckbox';
import FormInput from '../form-page/FormInput';

export default function SecondPage({ handlePrevPage, ...formik }) {
  return (
    <>
      <Card>
        <Grid container spacing={3}>
          <Typography variant="h2" color="primary">
            Tipo de vinculación:
          </Typography>
          <Grid item md={6}>
            <CheckboxesGroup
              name="convenio"
              options={[
                { value: 'particular', label: 'Particular' },
                { value: 'univalle', label: 'Relacion Univalle' },
              ]}
              {...formik}
            />
          </Grid>

          <Typography variant="h2" color="primary">
            Módulo a Matricular*:
          </Typography>
        </Grid>
      </Card>
      <Card>
        <Grid container spacing={3}>
          <Typography variant="h2" color="primary">
            Costo del Curso
          </Typography>
          <Grid item md={6}>
            <FormInput
              label="Valor a Consignar"
              name={'val_consignar'}
              {...formik}
            />
          </Grid>
          <Grid item md={6}>
            <FormInput
              label="Valor Consignado"
              name={'val_consignado'}
              {...formik}
            />
          </Grid>
          <Grid item md={2}>
            <FormInput label="Saldo Pendiente" name={'pendiente'} {...formik} />
          </Grid>
          <Grid item md={2}>
            <FormInput
              label="Numero de recibo. ID transacción, Numero de referenca o CUS"
              name={'recibo_consignacion'}
              {...formik}
            />
          </Grid>
          <Grid item md={2}>
            <FormInput
              label="Fecha de Consignación"
              name={'fecha_consignacion'}
              {...formik}
            />
          </Grid>
        </Grid>
      </Card>
      <Card useRight={false}>
        <Grid container spacing={3}>
          <Typography variant="h2" color="primary">
            Documentos
          </Typography>
          <Typography>
            Por tavor cargue los archivos necesarios para completar la
            inscrpcion Tenga en cuenta que los archivos deben ser en formato PDF
            y no deben pesar más de 2Mb
          </Typography>
          <Grid item container md={12} justifyContent="flex-start">
            <Button variant="contained" onClick={handlePrevPage}>
              Anterior
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

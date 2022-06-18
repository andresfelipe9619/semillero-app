import { Grid, Typography } from '@mui/material';
import React from 'react';
import Card from '../card/Card';
import CheckboxesGroup from '../form-page/FormCheckbox';
import FormInput from '../form-page/FormInput';
import { capitalize } from '../utils';
import Documents from './Documents';

export default function SecondPage({
  modulesByArea,
  handlePrevPage,
  handleSubmit,
  ...formik
}) {
  return (
    <>
      <Card>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Typography variant="h2" color="primary">
              Tipo de vinculación:
            </Typography>
          </Grid>
          <Grid item md={12}>
            <CheckboxesGroup
              name="convenio"
              options={[
                { value: 'particular', label: 'Particular' },
                { value: 'univalle', label: 'Relacion Univalle' },
              ]}
              {...formik}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h2" color="primary">
              Módulo a Matricular*:
            </Typography>
          </Grid>
          {Object.entries(modulesByArea).map(([name, courses]) => {
            const areaName = capitalize(name);
            return (
              <Grid item container md={12} key={name}>
                <Grid item md={12}>
                  <Typography variant="h2" color="primary">
                    {areaName}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <CheckboxesGroup
                    name="seleccion"
                    options={courses.map(({ nombre, codigo }) => ({
                      value: codigo,
                      label: nombre,
                    }))}
                    {...formik}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Card>
      <Card>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <Typography sm={12} variant="h2" color="primary">
              Costo del Curso
            </Typography>
          </Grid>
          <Grid item md={6} sm={7}>
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
          <Grid item md={6}>
            <FormInput label="Saldo Pendiente" name={'pendiente'} {...formik} />
          </Grid>
          <Grid item md={6}>
            <FormInput
              label="Numero de recibo. ID transacción, Numero de referenca o CUS"
              name={'recibo_consignacion'}
              {...formik}
            />
          </Grid>
          <Grid item md={6}>
            <FormInput
              label="Fecha de Consignación"
              name={'fecha_consignacion'}
              {...formik}
            />
          </Grid>
        </Grid>
      </Card>
      <Card useRight={false}>
        <Documents
          handleSubmit={handleSubmit}
          handlePrevPage={handlePrevPage}
        />
      </Card>
    </>
  );
}

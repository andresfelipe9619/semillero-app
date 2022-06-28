/* eslint-disable camelcase */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import Card from '../card/Card';
import FormInput from './FormInput';
import {
  capitalize,
  getModulePrice,
  getAllowedModulesByPrerequisiteModule,
} from '../../utils';
import Documents from './Documents';
import FormRadioGroup from './FormRadio';

export default function SecondPage({
  modulesByArea,
  handlePrevPage,
  handleSubmit,
  modules,
  ...formik
}) {
  const {
    grado,
    curso_anterior,
    seleccion,
    estamento,
    convenio,
    val_consignado = 0,
  } = formik.values;
  console.log('seleccion', seleccion);
  console.log('modules', modules);
  const oldCourse = modules.find(m => m.nombre === curso_anterior);

  const allowedModules = getAllowedModulesByPrerequisiteModule(
    modules,
    oldCourse?.codigo
  );
  const price = getModulePrice(seleccion, modules, { estamento, convenio });
  const diff = +val_consignado - +price;
  console.log('diff', diff);
  console.log('grado', { grado, allowedModules });
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
            <FormRadioGroup
              name="convenio"
              options={[
                { value: 'CONVENIO_COLEGIO', label: 'CONVENIO COLEGIO' },
                { value: 'PARTICULAR', label: 'PARTICULAR' },
                { value: 'RELACION_UNIVALLE', label: 'RELACIÓN UNIVALLE' },
                { value: 'BECADOS', label: 'BECADOS' },
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
              <Grid item container md={6} key={name}>
                <Grid item md={12}>
                  <Typography variant="h2" color="primary">
                    {areaName}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <FormRadioGroup
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
              readOnly
              label="Valor a Consignar"
              name={'val_consignar'}
              {...formik}
              values={{ val_consignar: price || 0 }}
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
            <FormInput
              readOnly
              label="Saldo Pendiente"
              name={'dif_consignado'}
              values={{ dif_consignado: diff }}
              {...formik}
            />
          </Grid>
          <Grid item md={6}>
            <FormInput
              label="Numero de recibo."
              helperText="ID transacción, Numero de referenca o CUS"
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
          errors={formik.errors}
          values={formik.values}
          isSubmitting={formik.isSubmitting}
          modulesByArea={modulesByArea}
          handleSubmit={handleSubmit}
          handlePrevPage={handlePrevPage}
          setFieldValue={formik.setFieldValue}
        />
      </Card>
    </>
  );
}

/* eslint-disable camelcase */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import Card from '../card/Card';
import FormInput from './FormInput';
import { capitalize } from '../../utils';
import Documents from './Documents';
import FormRadioGroup from './FormRadio';

function getAllowedModulesByPrerequisiteModule(modules, moduleCode) {
  if (!moduleCode || !modules) return [];
  return modules.filter(m =>
    m.prerrequisitos.split(',').some(p => p === moduleCode)
  );
}

export default function SecondPage({
  modulesByArea,
  handlePrevPage,
  handleSubmit,
  modules,
  ...formik
}) {
  const { grado, curso_anterior, curso, estamento, convenio } = formik.values;
  const oldCourse = modules.find(m => m.nombre === curso_anterior);
  const module = modules.find(m => m.codigo === curso);

  const allowedModules = getAllowedModulesByPrerequisiteModule(
    modules,
    oldCourse?.codigo
  );
  let price = 0;
  if (estamento === 'PRIVADO') price = module?.precio_privado;
  if (estamento === 'PUBLICO') price = module?.precio_publico;
  if (estamento === 'COBERTURA') price = module?.precio_cobertura;
  if (convenio === 'RELACION_UNIVALLE') price = module?.precio_univalle;
  if (convenio === 'BECADOS') {
    price = 0;
  }
  // let diff = +payed - +price;

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
              disabled
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
              disabled
              label="Saldo Pendiente"
              name={'pendiente'}
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
          modulesByArea={modulesByArea}
          handleSubmit={handleSubmit}
          handlePrevPage={handlePrevPage}
          setFieldValue={formik.setFieldValue}
        />
      </Card>
    </>
  );
}

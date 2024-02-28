/* eslint-disable camelcase */
import { Grid, Typography, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import Card from '../card/Card';
import FormInput from './FormInput';
import {
  capitalize,
  getModulePrice,
  getAllowedModulesByPrerequisiteModule,
} from '../../utils';
import Documents from './Documents';
import FormRadioGroup from './FormRadio';
import FormDateInput from './FormDateInput';
import FormSelect from './FormSelect';

import {
  DocumentTypeOptions,
  DocumentTypeOptionsAcudiente
} from './form-settings';
//
export default function SecondPage({
  modulesByArea,
  modulesByGrade,
  handlePrevPage,
  handleSubmit,
  isUserAdmin,
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
  const oldCourse = modules.find(m => m.nombre === curso_anterior);
  const [isDocente , setDocente] = React.useState(false);
  const valuesOptionsDocente = [
    { value: 'PARTICULAR', label: 'PARTICULAR' },
    { value: 'red_docente', label: 'RED DOCENTE' },
  ]
  const allowedModules = getAllowedModulesByPrerequisiteModule(
    modules,
    oldCourse?.codigo
  );
  const price = getModulePrice(seleccion, modules, { estamento, convenio });
  const diff = +price - +val_consignado;
  
  const lowercaseGrade = String(grado).toLowerCase();
  const modulesToShow = Object.entries(
    (modulesByGrade || {})[lowercaseGrade] || {}
  );

  React.useEffect( () => {
    setDocente(lowercaseGrade == 'docente');
  }, [lowercaseGrade])

  return (
    <>
      <Card>
        <Grid  className='_container_principal' container spacing={3} sx={{ width: '100%' }}>
          <Grid item md={12}>
            <Typography variant="h2" color="primary">
              Tipo de vinculación:
            </Typography>
          </Grid>
          <Grid item md={12}>
            <FormRadioGroup
              name="convenio"
              options={
                isDocente? valuesOptionsDocente :
              [
                { value: 'PARTICULAR', label: 'PARTICULAR' },
                { value: 'RELACION_UNIVALLE', label: 'RELACIÓN UNIVALLE' },
                ...(isUserAdmin
                  ? [
                      { value: 'BECADOS', label: 'BECADOS' },
                      { value: 'CONVENIO_COLEGIO', label: 'CONVENIO COLEGIO' },
                    ]
                  : []),
              ]}
              {...formik}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h2" color="primary">
              Módulo a Matricular:
            </Typography>
          </Grid>
          {modulesToShow.map(([name, courses]) => {
            const areaName = capitalize(name);
            return (
              <Grid item container md={6} key={name} alignContent="flex-start">
                <Grid item md={12}>
                  <Typography variant="h2" color="primary" gutterBottom>
                    {areaName}
                  </Typography>
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item md={12}>
                  <FormRadioGroup
                    name="seleccion"
                    row={false}
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
        <Grid  className='_container_principal' container spacing={3}>
          <Grid item md={3}>
            <Typography sm={12} variant="h2" color="primary">
              Costo del Curso
            </Typography>
          </Grid>
          <Grid item md={6} sm={7}>
            <FormInput
              money
              disabled
              label="Valor a Consignar"
              name={'val_consignar'}
              {...formik}
              values={{ val_consignar: price || 0 }}
            />
          </Grid>
          <Grid item md={6}>
            <FormInput
              money
              label="Valor Consignado"
              name={'val_consignado'}
              {...formik}
            />
          </Grid>
          <Grid item md={6}>
            <FormInput
              disabled
              money
              label="Saldo Pendiente"
              name={'dif_consignado'}
              {...formik}
              values={{ dif_consignado: diff || 0 }}
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
            <FormDateInput
              label="Fecha de Consignación"
              name={'fecha_consignacion'}
              {...formik}
            />
          </Grid>
        </Grid>
      </Card>
      <Card>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h2" color="primary">
                Datos de facturación
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormInput label="Nombre Acudiente o Contacto" name={'nombre_acudiente'} {...formik} />
            </Grid>
            <Grid item xs={12} md={2}>
              <FormSelect label="Tipo" name={'tipo_doc_acudiente'} options={DocumentTypeOptionsAcudiente} {...formik} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormInput label="N de Identificación" 
                         name={'num_doc_acudiente'} {...formik} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormInput 
                   label="Dirección" 
                   name={'direc_accudiente'} 
                   {...formik} />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormInput
                label="Telefono Acudiente"
                name={'tel_acudiente'}
                {...formik}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormInput
                type="email"
                label="Confirma Correo Facturacion"
                name={'facturacion_email'}
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

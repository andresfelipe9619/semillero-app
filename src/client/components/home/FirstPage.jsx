import { Button, Grid, Typography, Box } from '@mui/material';
import React from 'react';
import Card from '../card/Card';
import CheckboxesGroup from '../form-page/FormCheckbox';
import FormInput from '../form-page/FormInput';

const GenreOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'otro', label: 'Otro' },
];

export default function FirstPage({ handleNextPage, ...formik }) {
  return (
    <Card useRight={false}>
      <Grid container spacing={3}>
        <Grid item md={12} container justifyContent="center">
          <Box width={120} height={120} backgroundColor={'#555'} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Nombre" name={'nombre'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Apellidos" name={'apellido'} {...formik} />
        </Grid>
        <Grid item md={2}>
          <FormInput label="Tipo" name={'tipo_doc'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="N de Identificacion" name={'num_doc'} {...formik} />
        </Grid>
        <Grid item md={4}>
          <FormInput label="Ciudad" name={'ciudad_doc'} {...formik} />
        </Grid>
        <Grid item md={12}>
          <Typography variant="h3" color="primary">
            Solo se permite el registro con un correo gmail o univalle
          </Typography>
        </Grid>
        <Grid item md={7}>
          <FormInput label="Correo Electronico" name={'email'} {...formik} />
        </Grid>
        <Grid
          item
          md={5}
          container
          direction="column"
          alignContent="flex-start"
          alignItems="center"
        >
          <Typography variant="legend">No tienes correo gmail?</Typography>
          <Button variant="contained" onClick={handleNextPage}>
            Crea uno!
          </Button>
        </Grid>
        <Grid item md={7}>
          <FormInput
            label="Confirma Correo"
            name={'confirmEmail'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Celular" name={'tel_celular'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Telefono fijo" name={'tel_fijo'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <CheckboxesGroup
            name="genero"
            legend={'Genero'}
            options={GenreOptions}
            {...formik}
          />
        </Grid>
        <Grid item md={7}>
          <FormInput label="Fecha Nacimiento" name={'nacimiento'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Departamento Residencia"
            name={'depto_res'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Ciudad de Residencia"
            name={'ciudad_res'}
            {...formik}
          />
        </Grid>
        <Grid item md={7}>
          <FormInput
            label="Direccion Residencia"
            name={'direccion'}
            {...formik}
          />
        </Grid>
        <Grid item md={7}>
          <FormInput label="EPS" name={'eps'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Colegio" name={'colegio'} {...formik} />
        </Grid>
        <Grid item md={3}>
          <FormInput label="Estamento" name={'estamento'} {...formik} />
        </Grid>
        <Grid item md={3}>
          <FormInput label="Grado" name={'grado'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Nombre Acudiente"
            name={'nombre_acudiente'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Telefono Acudiente"
            name={'tel_acudiente'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Se ha inscrito antes en algun curso?"
            name={'inscrito_anterior'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Curso Anterior"
            name={'curso_anterior'}
            {...formik}
          />
        </Grid>
        <Grid item container md={12} justifyContent="flex-end">
          <Button variant="contained" onClick={handleNextPage}>
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

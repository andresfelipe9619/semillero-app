import { Button, Grid, Typography, Avatar } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import useErrorHandler from '../../hooks/useErrorHandler';
import EPSs from '../../utils/eps';
import Card from '../card/Card';
import { getFile } from '../../utils';
import FormDateInput from './FormDateInput';
import FormInput from './FormInput';
import FormRadioGroup from './FormRadio';
import FormSelect from './FormSelect';
import FormSwitch from './FormSwitch';
import FormUpload from './FormUpload';
import { departments, citiesGroupByDepartment } from '../../utils/cities';

const GOOGLE_URL =
  'https://accounts.google.com/SignUp?service=mail&hl=es&continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Des-ha-latam-co-bk-xplatform1&utm_campaign=es&utm_source=es-ha-latam-co-bk-xplatform1&utm_medium=ha';

const DocumentTypeOptions = [
  { value: 'T.I', label: 'T.I' },
  { value: 'C.C', label: 'C.C' },
  { value: 'C.E', label: 'Cedula de Extrangería' },
  { value: 'R.C', label: 'Registro Civil' },
];

const GenreOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'OTRO', label: 'Otro' },
];

const EPSOptions = EPSs.map(eps => ({ value: eps, label: eps }));

const NumberOfSchoolGrades = 11;

const GradeOptions = Array.from(
  { length: NumberOfSchoolGrades + 1 },
  (v, i) => {
    const isLast = i === NumberOfSchoolGrades;
    const grade = i + 1;
    return {
      value: isLast ? 'EGRESADO' : grade,
      label: isLast ? 'Egresado colegios' : `${grade}°`,
    };
  }
);

const EstateOptions = [
  { value: 'PUBLICO', label: 'Público' },
  { value: 'PRIVADO', label: 'Privado' },
  { value: 'COBERTURA', label: 'Cobertura' },
];

export default function FirstPage({ handleNextPage, modules, ...formik }) {
  const [avatar, setAvatar] = useState(null);
  const errorHandler = useErrorHandler();

  async function handleChangePhoto(event) {
    try {
      const [file] = event.currentTarget.files;
      formik.setFieldValue('photo', file);
      const { base64 } = await getFile(file);
      setAvatar(base64);
    } catch (error) {
      errorHandler(error);
    }
  }

  const createEmail = () => window.open(GOOGLE_URL);

  return (
    <Card useRight={false}>
      <Grid container spacing={3}>
        <Grid
          item
          md={12}
          container
          alignItems={'center'}
          alignContent={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Avatar
            variant="rounded"
            src={avatar}
            sx={{ width: 120, height: 120 }}
          >
            UV
          </Avatar>
          <Box mt={2}>
            <FormUpload
              name="photo"
              accept="image"
              handleChange={handleChangePhoto}
            />
          </Box>
          <span>Sube tu foto</span>
        </Grid>
        <Grid item md={6}>
          <FormInput label="Nombre" name={'nombre'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput label="Apellidos" name={'apellido'} {...formik} />
        </Grid>
        <Grid item md={2}>
          <FormSelect
            label="Tipo"
            name={'tipo_doc'}
            options={DocumentTypeOptions}
            {...formik}
          />
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
          <Button variant="contained" onClick={createEmail}>
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
          <FormRadioGroup
            name="genero"
            legend={'Genero'}
            options={GenreOptions}
            {...formik}
          />
        </Grid>
        <Grid item md={7}>
          <FormDateInput
            label="Fecha Nacimiento"
            name={'nacimiento'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormSelect
            options={departments}
            label="Departamento Residencia"
            name={'depto_res'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormSelect
            options={citiesGroupByDepartment[formik?.values?.depto_res]}
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
        <Grid item md={6}>
          <FormSelect
            label="EPS"
            name={'eps'}
            options={EPSOptions}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          {formik.values.eps === 'OTRA' && (
            <FormInput label="Otra EPS" name={'otraeps'} {...formik} />
          )}
        </Grid>
        <Grid item md={6}>
          <FormInput label="Colegio" name={'colegio'} {...formik} />
        </Grid>
        <Grid item md={3}>
          <FormSelect
            options={EstateOptions}
            label="Estamento"
            name={'estamento'}
            {...formik}
          />
        </Grid>
        <Grid item md={3}>
          <FormSelect
            options={GradeOptions}
            label="Grado"
            name={'grado'}
            {...formik}
          />
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
          <FormSwitch
            label="Se ha inscrito antes en algun curso?"
            name={'inscrito_anterior'}
            {...formik}
          />
        </Grid>
        {formik.values.inscrito_anterior && (
          <Grid item md={6}>
            <FormSelect
              label="Curso Anterior"
              name={'curso_anterior'}
              options={modules.map(({ nombre }) => ({
                label: nombre,
                value: nombre,
              }))}
              {...formik}
            />
          </Grid>
        )}
        <Grid item container md={12} justifyContent="flex-end">
          <Button variant="contained" onClick={handleNextPage}>
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

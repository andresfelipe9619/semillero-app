import React, { useState } from 'react';
import { Button, Grid, Typography, Avatar, Box, Alert } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import useErrorHandler from '../../hooks/useErrorHandler';
import Card from '../card/Card';
import { getFile } from '../../utils';
import FormDateInput from './FormDateInput';
import FormInput from './FormInput';
import FormRadioGroup from './FormRadio';
import FormSelect from './FormSelect';
import FormSwitch from './FormSwitch';
import FormUpload from './FormUpload';
import {
  departments,
  citiesGroupByDepartment,
  communes,
} from '../../utils/cities';
import {
  DocumentTypeOptions,
  EPSOptions,
  EstateOptions,
  GenreOptions,
  GOOGLE_URL,
  GradeOptions,
  SUPPORTED_IMAGE_FORMATS,
  DiscapacidadOptions,
  DiscapacidadOptionsAll
} from './form-settings';
// import { doc } from 'prettier';

const createEmail = () => window.open(GOOGLE_URL);

export default function FirstPage({ modules, ...formik }) {
  const [avatar, setAvatar] = useState(null);
  const errorHandler = useErrorHandler();
  const [IsDesabilitado, setIsDesabilitado] = useState(false);
  const [IsOtherGender, setIsOtherGender] = useState(false);

  const hasAnotherEPS = formik?.values?.eps === 'OTRA';
  const caliIsCali = formik?.values?.ciudad_res === 'Cali';
  const departmentCities = citiesGroupByDepartment[formik?.values?.depto_res];
  const haveStudyBefore = formik?.values?.inscrito_anterior === 'SI';

  async function handleChangePhoto(event) {
    try {
      const [file] = event.currentTarget.files || [];
      if (!file) return;
      formik.setFieldValue('photo', file);
      const { base64 } = await getFile(file);
      setAvatar(base64);
    } catch (error) {
      errorHandler(error);
    }
  }

  React.useEffect(() => {
    const { discapacidad } = formik.values;
    if(discapacidad === 'SI'){
      setIsDesabilitado(true);
    }
    else {
      setIsDesabilitado(false);
    }
  } , [formik.values.discapacidad]);

  React.useEffect(() => {
    const { genero } = formik.values;
    const element = document.getElementById("space_of_genero");

    if(genero === 'OTRO'){
      setIsOtherGender(true);
      element.style.display = "none";
    }
    else {
      setIsOtherGender(false);
      element.style.display = "block";
    }
  }, [formik.values.genero]);

  return (
    <Card useRight={false}>
      <Grid sx={{ position: 'relative'}}
            className='_container_principal' container spacing={3}>
      {/* <div className='_container_logo_form'>
        <img src="https://drive.google.com/uc?id=1N-iOqjZ-CNibL9txy7ULUCt3jXw_DQXc" alt="logo semillero" />
      </div> */}
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
            <AccountCircleOutlinedIcon fontSize="large" />
          </Avatar>
          <Box mt={2}>
            <FormUpload
              name="photo"
              accept={SUPPORTED_IMAGE_FORMATS.join()}
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
          <Alert severity="warning">
            Solo se permite el registro con un correo gmail o correounivalle.
          </Alert>
        </Grid>
        <Grid item md={7}>
          <FormInput
            type="email"
            label="Correo Electronico"
            name={'email'}
            {...formik}
          />
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
        <Grid item md={6}>
          <FormInput
            type="email"
            label="Confirma Correo"
            name={'confirmEmail'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          <FormInput label="Celular" name={'tel_celular'} {...formik} />
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Teléfono fijo ó celular alternativo"
            name={'tel_fijo'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          <FormRadioGroup
            name="genero"
            legend={'Género'}
            options={GenreOptions}
            {...formik}
          />
        </Grid>
        {
          IsOtherGender && (
            <Grid item md={6}>
              <FormInput
                label="Otro Genero"
                name={'otro_genero'}
                {...formik}
              />
          </Grid>
          )
        }
        <Grid id="space_of_genero" item md={6}></Grid>
        <Grid item md={6}>
          <FormDateInput
            label="Fecha Nacimiento"
            name={'nacimiento'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={4}>
          <FormSelect
            options={departments}
            label="Departamento Residencia"
            name={'depto_res'}
            {...formik}
          />
        </Grid>
        <Grid item md={4}>
          <FormSelect
            options={departmentCities}
            label="Ciudad de Residencia"
            name={'ciudad_res'}
            {...formik}
          />
        </Grid>
        <Grid item md={4}>
          {caliIsCali && (
            <FormSelect
              options={communes}
              label="Comuna de Residencia"
              name={'comuna_res'}
              {...formik}
            />
          )}
        </Grid>
        <Grid item md={6}>
          <FormInput
            label="Direccion Residencia"
            name={'direccion'}
            {...formik}
          />
        </Grid>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          <FormSelect
            label="EPS"
            name={'eps'}
            options={EPSOptions}
            {...formik}
          />
        </Grid>
        <Grid item md={6}>
          {hasAnotherEPS && (
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
            label="Nombre Acudiente o Contacto"
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
          <FormSelect
            options={DiscapacidadOptions}
            label="Discapacidad"
            name={'discapacidad'}
            {...formik}
          />
        </Grid>
        {
          IsDesabilitado && (<>
            <Grid item md={3}>
              <FormSelect
                options={DiscapacidadOptionsAll}
                label="Tipo De Discapacidad"
                name={'tipo_discapacidad'}
                {...formik}
              />
            </Grid>
            <Grid item md={3}>
              <FormInput
                label="Informacion Discapacidad"
                name={'info_discapacidad'}
                {...formik}
              />
            </Grid></>
          )
        }
        <Grid item md={6}>
          <FormSwitch
            label="Se ha inscrito antes en algun curso?"
            name={'inscrito_anterior'}
            {...formik}
          />
        </Grid>
        {haveStudyBefore && (
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
      </Grid>
    </Card>
  );
}

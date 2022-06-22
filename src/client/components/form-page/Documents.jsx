import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import FormUpload from './FormUpload';

export default function Documents({
  values,
  errors,
  modulesByArea,
  handlePrevPage,
  handleSubmit,
  setFieldValue,
}) {
  const { grado, estate, convenio, curso } = values;

  const isPublic = estate === 'PUBLICO';
  const isCoverage = estate === 'COBERTURA';
  const isFresita = estate === 'PRIVADO';

  const isCapucho = convenio === 'RELACION_UNIVALLE';
  const isScholar = convenio === 'BECADOS';
  const isSchoolAgreement = convenio === 'CONVENIO_COLEGIO';

  const isGraduated = grado === 'EGRESADO';
  // const isLastPhase = grado === 11 || isGraduated;

  function handleChange(name) {
    return event => {
      const [file] = event.currentTarget.files;
      setFieldValue(name, file);
    };
  }

  const isModuleShortCourse = moduleCode => {
    const shorts = modulesByArea['cursos cortos'];
    return Array.isArray(shorts)
      ? shorts.find(m => m.codigo === moduleCode)
      : false;
  };

  const isShortCourse = isModuleShortCourse(curso);

  const FormFiles = [
    { name: 'docFile', label: 'Documento Identidad', display: true },
    {
      name: 'constanciaEstudFile',
      label: 'Constancia Estudio',
      display:
        isPublic ||
        isCoverage ||
        isScholar ||
        (!isShortCourse && !isSchoolAgreement && !isGraduated && !isFresita),
    },
    {
      name: 'constanciaFuncFile',
      label: 'Constancia Funcionario',
      display: !isSchoolAgreement && isCapucho && !isScholar,
    },
    { name: 'Recibo', label: 'reciboFile', display: isCapucho },
    {
      name: 'recibosPublicos',
      label: 'Recibos Públicos',
      display: !isCapucho || isScholar,
    },
    {
      name: 'cartaSolicitud',
      label: 'Carta Solicitud',
      display: !isCapucho || isScholar,
    },
    { name: 'actaGrado', label: 'Acta Grado', display: isGraduated },
  ];

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
      {FormFiles.map(({ name, label, display }) => {
        const selectedFile = values[name];
        return (
          <Fade key={name} in={display} mountOnEnter unmountOnExit appear>
            <Grid container item md={12}>
              <Grid item md={3}>
                {label}
              </Grid>
              <Grid item md={3}>
                <FormUpload name={name} handleChange={handleChange(name)} />
              </Grid>
              <Grid item md={5}>
                {errors[name] || selectedFile?.name}
              </Grid>
            </Grid>
          </Fade>
        );
      })}
      <Grid
        item
        container
        md={12}
        justifyContent="center"
        component={Box}
        my={4}
      >
        <Button variant="contained" type="submit" onClick={handleSubmit}>
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

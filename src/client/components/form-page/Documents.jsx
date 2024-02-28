import React from 'react';
import {
  Box,
  Alert,
  Button,
  Grid,
  Typography,
  LinearProgress,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import FormUpload from './FormUpload';

export default function Documents({
  values,
  errors,
  isSubmitting,
  modulesByArea,
  handleSubmit,
  setFieldValue,
}) {
  const { grado, estamento, convenio, curso } = values;

  const isPublic = estamento === 'PUBLICO';
  const isCoverage = estamento === 'COBERTURA';
  const isFresita = estamento === 'PRIVADO';

  const isCapucho = convenio === 'RELACION_UNIVALLE';
  const isScholar = convenio === 'BECADOS';
  const isSchoolAgreement = convenio === 'CONVENIO_COLEGIO';
  const isDocente = convenio === 'red_docente'

  const isGraduated = grado === 'EGRESADO';
  // const isLastPhase = grado === 11 || isGraduated;

  function handleChange(name) {
    return event => {
      const [file] = event.currentTarget.files || [];
      if (!file) return;
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

  const handlerIIsConstance = () => {
    let response = false
    let isConstance = (!isShortCourse && !isSchoolAgreement && !isGraduated && !isFresita)
    if (!isDocente) {
      response = (isPublic || isCoverage || isScholar || isConstance)
    }

    return response
  }

  const FormFiles = [
    { name: 'docFile', label: 'Documento Identidad', display: true },
    { name: 'reciboFile', label: 'Recibo de Pago', display: true },
    {
      name: 'constanciaEstudFile',
      label: 'Constancia Estudio',
      display: handlerIIsConstance()
    },
    {
      name: 'constanciaFuncFile',
      label: 'Constancia Funcionario',
      display: isCapucho,
    },
    {
      name: 'recibosPublicos',
      label: 'Recibos Públicos',
      display: isScholar,
    },
    {
      name: 'cartaSolicitud',
      label: 'Carta Solicitud',
      display: isScholar,
    },
    {
      name: 'carnedocente',
      label: 'Carné Red Docente',
      display: isDocente,
    },
    { name: 'actaGrado', label: 'Acta Grado', display: isGraduated },
  ];

  const thereAreErrors = !!Object.keys(errors).length;

  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <Typography variant="h2" color="primary">
          Documentos
        </Typography>
        <Box px={4} py={2}>
          <Typography paragraph>
            Por favor cargue los archivos necesarios para completar la
            inscrpción. Tenga en cuenta que los archivos deben ser en formato{' '}
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
                <FormUpload
                  name={name}
                  handleChange={handleChange(name)}
                  isSubmitting={isSubmitting}
                />
              </Grid>
              <Grid item md={5}>
                <Typography variant="caption">
                  {selectedFile?.name || 'Ningún archivo seleccionado'}
                </Typography>
                {errors[name] && <Alert severity="error">{errors[name]}</Alert>}
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
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting || thereAreErrors}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </Grid>
      {thereAreErrors && (
        <Grid
          item
          container
          md={12}
          justifyContent="center"
          component={Box}
          my={2}
        >
          <Alert severity="warning">
            Recuerda llenar todos los campos requeridos
          </Alert>
        </Grid>
      )}
      {isSubmitting && (
        <Grid item md={12}>
          <LinearProgress />
        </Grid>
      )}
    </Grid>
  );
}

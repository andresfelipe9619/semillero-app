import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TermsAndConditions from './TermsAndConditions';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import {
  initialValues,
  validationSchema,
  testValues,
  filesByName,
} from './form-settings';
import { useAlertDispatch } from '../../context/Alert';
import { serverFunctions } from '../../utils/serverFunctions';
import { getFileName } from '../../utils';
import useErrorHandler from '../../hooks/useErrorHandler';

const Content = [FirstPage, SecondPage];
console.log('API', serverFunctions);
export default function FormPage({ editing }) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [modules, setModules] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [modulesByArea, setModulesByArea] = useState([]);
  const [modulesByGrade, setModulesByGrade] = useState([]);
  const { openAlert } = useAlertDispatch();
  const errorHandler = useErrorHandler();

  function handleSellingSoul() {
    setAccepted(true);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  function fileUploaded(status) {
    console.log('Estatus', status);
    if (status === 'exito') {
      openAlert({
        message:
          'La inscripción se realizó satisfactoriamente!\nRecibiras un correo para confirmar los datos de tu inscripcion.\nFavor entregar el recibo original el primer dia de clases a los monitores',
        variant: 'success',
      });
    }
    openAlert({ message: status, variant: 'error' });
  }

  function getFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.onerror = event => {
        reader.abort();
        errorHandler(event);
      };
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  async function getFilesData(formData) {
    const filesPromises = filesByName.map(async fileKey => {
      const doc = formData.num_doc;

      const fileString = await getFile(filesByName[fileKey]);
      const file = { base64: fileString, name: getFileName(fileKey, doc) };
      return file;
    });

    const files = await Promise.all(filesPromises);
    return files;
  }

  function getPaymentLink(formValues) {
    const { moduleCode, estate, agreement } = formValues;
    const module = modules.find(m => m.codigo === moduleCode);
    console.log('LINK {module, estate}', { module, estate });
    if (!module || !estate) return null;
    let link = '';
    // const payed = $('#val_consignado').val();
    if (estate === 'PRIVADO') link = module.link_privado;
    if (estate === 'PUBLICO') link = module.link_publico;
    if (estate === 'COBERTURA') link = module.link_publico;
    // Univalle overrides whatever estate is selected
    if (agreement === 'RELACION_UNIVALLE') link = module.link_univalle;
    console.log('link', link);
    return link;
  }

  async function onSubmit(formValues) {
    setLoading(true);
    const files = await getFilesData(formValues);
    const link = getPaymentLink(formValues);
    // openPaymentLink();
    const submit = editing
      ? serverFunctions.editStudent
      : serverFunctions.registerStudent;
    try {
      const result = await submit(
        JSON.stringify({ ...formValues, link, files })
      );
      fileUploaded(result);
    } catch (error) {
      errorHandler(error);
    }
  }

  const {
    setFieldValue,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    onSubmit,
    initialValues: testValues,
    validationSchema,
  });

  const fetchModulesByGrades = async () => {
    try {
      const result = await serverFunctions.getModulesByGrades();
      setModulesByGrade(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  function loadModules(allModules) {
    const areaModules = allModules
      .filter(module => module.disabled !== 'x')
      .reduce((acc, module) => {
        const { area } = module;
        if (acc[area]) acc[area].push(module);
        else acc[area] = [module];
        return acc;
      }, {});
    setModulesByArea(areaModules);
  }

  function loadCurrentPeriodData(data) {
    if (!data) return;
    console.log('Current Period Data', data);
    setCurrentPeriod(data.currentPeriod);
    setModules(data.modules);
    loadModules(data.modules);
  }

  const fetchCurrentPeriodData = async () => {
    try {
      const result = await serverFunctions.getCurrentPeriodData();
      console.log('result', result);
      loadCurrentPeriodData(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  // function hadleChangeGrade() {
  //   const anterior = $('#curso_anterior').val();
  //   console.log('MI ANTERIOR: ', anterior);
  //   const grade = String(this.value).toLocaleLowerCase();
  //   console.log('grade', grade);
  //   const estate = $('#estamento').val();
  //   hideModules();
  //   if (grade in MODULES.byGrades) {
  //     showModules(grade);
  //     showFiles({ grade, estate });
  //   }
  // }

  async function init() {
    setLoading(true);
    await fetchCurrentPeriodData();
    await fetchModulesByGrades();
    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  const inputProps = {
    setFieldValue,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  };
  console.log('{ values, errors }', { values, errors });

  if (!accepted) return <TermsAndConditions onClick={handleSellingSoul} />;
  const Form = Content[page];
  const formProps = {
    handleNextPage,
    handlePrevPage,
    loading,
    modules,
    modulesByArea,
    modulesByGrade,
    ...inputProps,
  };
  return <Form {...formProps} />;
}
// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec

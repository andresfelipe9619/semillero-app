/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import TermsAndConditions from './TermsAndConditions';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import {
  initialValues,
  validationSchema,
  // testValues,
  filesByName,
} from './form-settings';
import { useAlertDispatch } from '../../context/Alert';
import { serverFunctions as API } from '../../utils/serverFunctions';
import { getFileName, getModulePrice } from '../../utils';
import useErrorHandler from '../../hooks/useErrorHandler';

const Content = [FirstPage, SecondPage];

export default function FormPage({
  modules,
  studentData,
  modulesByArea,
  modulesByGrade,
}) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
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
      const file = formData[fileKey];
      if (!file) return null;
      const fileString = await getFile(file);
      const fileResult = {
        base64: fileString,
        name: getFileName(fileKey, doc),
      };
      return fileResult;
    });

    const files = await Promise.all(filesPromises);
    return files.filter(f => f);
  }

  function getPaymentLink(formValues) {
    const { moduleCode, estamento, convenio } = formValues;
    const module = modules.find(m => m.codigo === moduleCode);
    console.log('LINK {module, estamento}', { module, estamento });
    if (!module || !estamento) return null;
    let link = '';
    // const payed = $('#val_consignado').val();
    if (estamento === 'PRIVADO') link = module.link_privado;
    if (estamento === 'PUBLICO') link = module.link_publico;
    if (estamento === 'COBERTURA') link = module.link_publico;
    // Univalle overrides whatever estate is selected
    if (convenio === 'RELACION_UNIVALLE') link = module.link_univalle;
    console.log('link', link);
    return link;
  }

  async function onSubmit(formValues) {
    try {
      setLoading(true);
      const { seleccion, estamento, convenio, val_consignado = 0 } = formValues;
      const files = await getFilesData(formValues);
      const link = getPaymentLink(formValues);
      // openPaymentLink();
      const price = getModulePrice(seleccion, modules, { estamento, convenio });
      const dif_consignado = +price - +val_consignado;

      const submit = studentData ? API.editStudent : API.registerStudent;
      const result = await submit(
        JSON.stringify({
          ...formValues,
          link,
          files,
          dif_consignado,
          val_consignar: price || 0,
        })
      );
      console.log('result', result);
      if (result === 'exito') {
        openAlert({
          message:
            'La inscripción se realizó satisfactoriamente!\nRecibiras un correo para confirmar los datos de tu inscripcion.\nFavor entregar el recibo original el primer dia de clases a los monitores',
          variant: 'success',
        });
      }
      openAlert({ message: result, variant: 'error' });
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
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
    validationSchema,
    enableReinitialize: true,
    initialValues: studentData || initialValues,
  });

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

/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
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
import { getFileName, getModulePrice, getPaymentLink } from '../../utils';
import useErrorHandler from '../../hooks/useErrorHandler';

export default function FormPage({
  modules,
  editing,
  modulesByArea,
  modulesByGrade,
  studentData = {},
}) {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openAlert } = useAlertDispatch();
  const errorHandler = useErrorHandler();

  function handleSellingSoul() {
    setAccepted(true);
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

  async function onSubmit(formValues) {
    try {
      setLoading(true);
      const { seleccion, estamento, convenio, val_consignado = 0 } = formValues;
      const files = await getFilesData(formValues);
      const link = getPaymentLink(modules, formValues);
      // openPaymentLink();
      const price = getModulePrice(seleccion, modules, { estamento, convenio });
      const dif_consignado = +price - +val_consignado;

      const submit = editing ? API.editStudent : API.registerStudent;
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
        return openAlert({
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
    initialValues: { ...initialValues, ...studentData },
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

  useEffect(() => {
    console.log('{ values, errors }', { values, errors });
  }, [values, errors]);

  useEffect(() => {
    console.log('modulesByGrade', modulesByGrade);
  }, [modulesByGrade]);

  useEffect(() => {
    console.log('modulesByArea', modulesByArea);
  }, [modulesByArea]);

  if (!accepted) return <TermsAndConditions onClick={handleSellingSoul} />;

  const formProps = {
    loading,
    modules,
    modulesByArea,
    modulesByGrade,
    ...inputProps,
  };
  return (
    <>
      <FirstPage {...formProps} />
      <SecondPage {...formProps} />
    </>
  );
}
// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec

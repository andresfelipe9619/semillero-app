import React, { useEffect, useState } from 'react';
import { useAlertDispatch } from '../../context/Alert';
import useErrorHandler from '../../hooks/useErrorHandler';
import { serverFunctions } from '../../utils/serverFunctions';
import FormPage from '../form-page/FormPage';

console.log('API', serverFunctions);
export default function Home() {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { openAlert } = useAlertDispatch();
  const errorHandler = useErrorHandler();

  const authenticateCurrentUser = async () => {
    try {
      setLoading(true);
      const result = await serverFunctions.isAdmin();
      setIsUserAdmin(result);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  function loadStudent(personData) {
    console.log('Person', personData);
    const person = JSON.parse(personData);
    if (!person) {
      return openAlert({
        message: 'La cedula ingresada no corresponde a ningún estudiante',
        variant: 'warning',
      });
    }
    if (person.state === 'antiguo') {
      return openAlert({
        message:
          'El estudiante esta inscrito anteriormente, pero no el periodo actual ',
        variant: 'warning',
      });
    }
    // if (person.state === 'actual') return fillInStudentData(person);
    return null;
  }

  const searchPerson = async id => {
    try {
      const result = await serverFunctions.buscarPersona(id);
      loadStudent(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  function cargarInfo(documentToSearch) {
    try {
      // hideStudentRecord();
      if (!documentToSearch) {
        return openAlert({
          message: 'Ingrese una cedula para consultar',
          variant: 'warning',
        });
      }
      return searchPerson(documentToSearch);
    } catch (error) {
      return errorHandler(error);
    }
  }

  useEffect(() => {
    authenticateCurrentUser();
  }, []);

  // if (loading) return 'Loading ...';
  return (
    <>
      {isUserAdmin && <Searchbar {...{ cargarInfo }} />}
      <FormPage />
    </>
  );
}

function Searchbar() {
  const [documentToSearch, setDocumentToSearch] = useState(null);

  return 'searchbar';
}
// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec

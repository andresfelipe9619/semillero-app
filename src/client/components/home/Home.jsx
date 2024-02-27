import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useAlertDispatch } from '../../context/Alert';
import useErrorHandler from '../../hooks/useErrorHandler';
import FormPage from '../form-page/FormPage';
import Navbar from '../navbar/Navbar';
import { mockData, mockDataByGrade } from '../../mock-data';
import { serverFunctions as API } from '../../utils/serverFunctions';
import Report from './Report';

const isDev = process.env.NODE_ENV === 'development';

const Messages = {
  notExists: 'La cedula ingresada no corresponde a ningún estudiante.',
  oldStudent:
    'El estudiante esta inscrito anteriormente, pero no el periodo actual.',
};

export default function Home() {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [reportData, setReportData] = useState({'reporte_': [] , 'total_inscritos': 0});
  const [modules, setModules] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [modulesByArea, setModulesByArea] = useState([]);
  const [modulesByGrade, setModulesByGrade] = useState([]);
  const [editing, setEditing] = useState(false);
  const { openAlert } = useAlertDispatch();
  const errorHandler = useErrorHandler();

  console.log('modules', modules);
  const authenticateCurrentUser = async () => {
    try {
      setLoading(true);
      const isAdmin = await API.isAdmin();
      if (!isAdmin) setShowForm(true);
      setIsUserAdmin(isAdmin);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  function loadStudent(personData) {
    console.log('Person:', personData);
    const person = JSON.parse(personData);
    if (!person) {
      return openAlert({
        message: Messages.notExists,
        variant: 'warning',
      });
    }
    if (person.state === 'antiguo') {
      return openAlert({
        message: Messages.oldStudent,
        variant: 'warning',
      });
    }
    if (person.state === 'actual') {
      const currentPeriodModule = person.data[currentPeriod];
      const selectedModule = modules.find(
        m => m.nombre === currentPeriodModule
      );
      return setStudentData({
        ...person.data,
        seleccion: selectedModule?.codigo,
      });
    }
    return null;
  }

  const searchPerson = async id => {
    let result = null;
    try {
      setLoading(true);
      result = await API.buscarPersona(id);
      loadStudent(result);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
    return result;
  };
  const fetchModulesByGrades = async () => {
    try {
      const result = await API.getModulesByGrades();
      console.log('ModulesByGrades', result);
      setModulesByGrade(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  async function handleSearch(documentToSearch) {
    if (!documentToSearch) {
      openAlert({
        message: 'Ingrese una cedula para buscar!',
        variant: 'warning',
      });
    } else {
      const result = await searchPerson(documentToSearch);
      if (result) {
        setEditing(true);
        setShowForm(true);
      }
    }
  }
  async function handleRegister(documentToSearch) {
    setEditing(false);
    if (!documentToSearch) {
      openAlert({
        message: 'Ingrese una cedula para registrar!',
        variant: 'warning',
      });
    } else {
      setShowForm(true);
      setStudentData({ num_doc: documentToSearch });
    }
  }

  function loadModulesByArea(allModules) {
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
    loadModulesByArea(data.modules);
  }

  const fetchCurrentPeriodData = async () => {
    try {
      const result = await API.getCurrentPeriodData();
      console.log('result', result);
      loadCurrentPeriodData(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  const fetchReportData = async () => {
    try {
      const result = await API.getLenghtModuleActive();
      if (result !== null) {
        setReportData(result);
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  async function init() {
    setLoading(true);
    if (isDev) {
      loadCurrentPeriodData(mockData);
      setModulesByGrade(mockDataByGrade);
    } else {
      await fetchCurrentPeriodData();
      await fetchModulesByGrades();
      await fetchReportData();
    }
    setLoading(false);
  }

  useEffect(() => {
    authenticateCurrentUser();
    init();
  }, []);

  const showSearchBar = isUserAdmin || isDev;
  const showLoader = !isDev && loading;
  if (showLoader && !isUserAdmin) return <CircularIndeterminate />;
  return (
    <>
      {showSearchBar && (
        <Navbar
          sx={{ zIndex: 10}}
          loading={loading}
          handleSearch={handleSearch}
          handleRegister={handleRegister}
        />
      )}
      {showLoader && <CircularIndeterminate />}
      {!showForm && !showLoader && <Report data={reportData} />}
      {!showLoader && showForm && (
        <FormPage
          {...{
            editing,
            modules,
            isUserAdmin,
            studentData,
            modulesByArea,
            modulesByGrade,
          }}
        />
      )}
    </>
  );
}

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import TermsAndConditions from './TermsAndConditions';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import { initialValues, testValues, validationSchema } from './form-settings';
import { useAlertDispatch } from '../../context/Alert';

import { serverFunctions } from '../../utils/serverFunctions';

const PRICE_DATA = { estate: null, moduleCode: null, agreement: null };

const Content = [FirstPage, SecondPage];
console.log('API', serverFunctions);
export default function Home() {
  const [accepted, setAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [page, setPage] = useState(1);
  const [modules, setModules] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [modulesByArea, setModulesByArea] = useState([]);
  const [modulesByGrade, setModulesByGrade] = useState([]);
  const [filesByName, setfilesByName] = useState({});
  const [priceData, setPriceData] = useState(PRICE_DATA);
  const { openAlert } = useAlertDispatch();

  function errorHandler(error) {
    console.log('Error Handler ==>', error);
    openAlert({
      message: String(error),
      variant: 'error',
    });
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

  function getPaymentLink() {
    const { moduleCode, estate, agreement } = PRICE_DATA;
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

  // function openPaymentLink() {
  //   const link = getPaymentLink();
  //   if (link) window.open(link, '_blank');
  // }

  const getFileName = (fileKey, doc) => {
    if (fileKey === 'docFile') return `${doc}_DOCUMENTO`;
    if (fileKey === 'constanciaEstudFile') return `${doc}_COSNTANCIA_ESTUDIO`;
    if (fileKey === 'reciboFile') return `${doc}_RECIBO_PAGO`;
    if (fileKey === 'constanciaFuncFile')
      return `${doc}_CONSTANCIA_FUNCIONARIO`;
    if (fileKey === 'recibosPublicos') return `${doc}_RECIBO_PUBLICOS`;
    if (fileKey === 'cartaSolicitud') return `${doc}_CARTA_SOLICITUD`;
    if (fileKey === 'actaGrado') return `${doc}_ACTA_GRADO`;
    if (fileKey === 'photo') return `${doc}_FOTO_PERFIL`;
    return null;
  };

  async function getFilesData(formData) {
    const filesPromises = Object.keys(filesByName).map(async fileKey => {
      const doc = formData.num_doc;

      const fileString = await getFile(filesByName[fileKey]);
      const file = { base64: fileString, name: getFileName(fileKey, doc) };
      return file;
    });

    const files = await Promise.all(filesPromises);
    return files;
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      setLoading(true);
      const files = await getFilesData(values);
      const link = getPaymentLink();
      // openPaymentLink();
      try {
        const result = await serverFunctions.registerStudent(
          JSON.stringify({ ...values, link, files })
        );
        fileUploaded(result);
      } catch (error) {
        errorHandler(error);
      }
    },
  });

  const {
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  function handleSellingSoul() {
    setAccepted(true);
  }

  function handleNextPage() {
    setPage(page + 1);
  }

  function handlePrevPage() {
    setPage(page - 1);
  }

  const fetchModulesByGrades = async () => {
    try {
      const result = await serverFunctions.getModulesByGrades();
      setModulesByGrade(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  function fillInDataInForm(person) {
    const { data } = person;

    function onSuccess() {
      // for (const x in modules) {
      //   if (modules[x][0] === data[periodName]) {
      //     const moduleCode = modules[x][1];
      //     $(`#${moduleCode}`).prop('checked', true);
      //     $(`#${moduleCode}`).trigger('change');
      //   }
      // }
    }
    const periodName = currentPeriod;
    if (data[periodName]) {
      try {
        const result = serverFunctions.getModules();
        onSuccess(result);
      } catch (error) {
        errorHandler(error);
      }
    }
  }

  function fillInTestData() {
    // showStudentRecord();
    fillInDataInForm({ data: testValues });
  }

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

  function onSuccessAuth(isAdmin) {
    // if (!isAdmin) return hideAdminData();
    if (isAdmin) setIsUserAdmin(true);
    // return showSearchModule();
  }

  const authenticateCurrentUser = async () => {
    try {
      const result = await serverFunctions.isAdmin();
      onSuccessAuth(result);
    } catch (error) {
      errorHandler(error);
    }
  };

  function subscribeEventHandlers() {
    // $('#eps').on('change', handleChangeEps);
    // $('#myForm #save').on('click', enrollStudent);
    // $('.numeric').on('keypress', allowOnlyNumbers);
    // $('#myForm #edit').on('click', editStudentData);
    // $('#email').on('copy cut paste', DoNotCopyPaste);
    // $('#myForm #createEmail').on('click', createEmail);
    // $('#myForm #grado').on('change', hadleChangeGrade);
    // $("input[type='file']").on('change', handleFileChange);
    // $('#confirmEmail').on('copy cut paste', DoNotCopyPaste);
    // $('#myForm #estamento').on('change', handleChangeEstate);
    // $('#curso_anterior').on('change', handleChangeAnotherGrade);
    // $('#val_consignado').on('change', handleChangePriceData);
    // $('#photo').on('change', handleChangePhoto);
    // $('#val_consignado').on('change', handleChangePriceData);
    // $('#inscrito_anterior').on('change', handleChangePreviousRegister);
    // $('#myForm').on('click', 'input[name="convenio"]', handleClickAgreement);
  }

  // this is is replaced by handleSubmit from formik
  // function enrollStudent(e) {
  //   const isAgree = isAgreeWithTerms();
  //   if (isAgree) return validateAndSave();
  //   e.preventDefault();
  //   openAlert({
  //     message:
  //       'Debe aceptar los términos y condiciones para enviar el formulario.',
  //     variant: 'warning',
  //   });
  // }

  // function handleFileChange(e) {
  //   const { name } = e.target;
  //   const file = this.files[0];
  //   filesByName[name] = file;
  //   console.lNg('filesByname', filesByName);
  // }

  // function readURL(input, name) {
  //   try {
  //     const file = input.files[0];
  //     if (input.files && file) {
  //       filesByName[name] = file;
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = () => {
  //         // $('#prev').attr('src', e.target.result);
  //       };
  //     }
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // }

  // function handleChangePhoto(e) {
  //   const { name } = e.target;
  //   readURL(this, name);
  // }

  // function handleClickAgreement() {
  //   const val = $(this).val();
  //   PRICE_DATA.agreement = val;
  //   handleChangePriceData();
  //   const isPrivate = PRICE_DATA.estate === 'PRIVADO';
  //   const code = PRICE_DATA.moduleCode;
  //   const isShortCourse = isModuleShortCourse(code);

  //   if (val === 'RELACION_UNIVALLE') return showUnivalleRelationFiles();
  //   if (val === 'BECADOS') return showScholarshipFiles();
  //   if (val === 'CONVENIO_COLEGIO') hideStudyCertificate();
  //   else showStudyCertificate();

  //   hideUnivalleCertificate();
  //   hideScholarshipFiles();
  //   if (isPrivate || isShortCourse) hideStudyCertificate();
  // }

  // function handleChangeModule() {
  //   const moduleCode = $(this).val();
  //   setStudentFilesData({ moduleCode });
  //   handleChangePriceData();
  // }

  // function handleChangePriceData() {
  //   const { moduleCode, estate, agreement } = PRICE_DATA;
  //   const module = MODULES.all.find(m => m.codigo === moduleCode);
  //   console.log('{module, estate}', { module, estate });
  //   if (!module || !estate) return;
  //   let price = 0;
  //   const payed = $('#val_consignado').val();
  //   if (estate === 'PRIVADO') price = module.precio_privado;
  //   if (estate === 'PUBLICO') price = module.precio_publico;
  //   if (estate === 'COBERTURA') price = module.precio_cobertura;
  //   // Univalle and scolarship overrides whatever estate is selected
  //   if (agreement === 'RELACION_UNIVALLE') price = module.precio_univalle;
  //   if (agreement === 'BECADOS') {
  //     price = 0;
  //     $('#val_consignado').val(0);
  //   }
  //   let diff = +payed - +price;
  //   if (diff > 0) {
  //     $('#dif_consignado').removeClass('negative');
  //     diff = 0;
  //   } else if (diff < 0) {
  //     $('#dif_consignado').removeClass('positive');
  //     $('#dif_consignado').addClass('negative');
  //   } else {
  //     $('#dif_consignado').removeClass('positive');
  //     $('#dif_consignado').removeClass('negative');
  //   }
  //   $('#dif_consignado').val(diff);
  //   $('#val_consignar').val(price);
  // }

  // function setStudentFilesData({ estate, moduleCode, agreement }) {
  //   const studentEstate = estate || PRICE_DATA.estate;
  //   const studentModuleCode = moduleCode || PRICE_DATA.moduleCode;
  //   const studentAgreement = agreement || PRICE_DATA.agreement;
  //   const isShortCourse = isModuleShortCourse(studentModuleCode);
  //   const isPrivate = studentEstate === 'PRIVADO';

  //   if (estate) PRICE_DATA.estate = estate;
  //   if (agreement) PRICE_DATA.agreement = agreement;
  //   if (moduleCode) PRICE_DATA.moduleCode = moduleCode;

  //   handleChangePriceData();
  //   execEstate(studentEstate);
  //   execAgreement(studentAgreement);

  //   if (isPrivate || isShortCourse) hideStudyCertificate();
  // }

  // function execEstate(studentEstate) {
  //   const studentGrade = $('#grado').val();
  //   const isGraduated = studentGrade === 'EGRESADO';
  //   const isPublic = studentEstate === 'PUBLICO';
  //   const isCoverage = studentEstate === 'COBERTURA';
  //   if (isGraduated) return showGraduateFiles();
  //   if (isPublic || isCoverage) showStudyCertificate();
  //   hideGraduateFiles();
  // }

  // function execAgreement(studentAgreement) {
  //   if (studentAgreement === 'RELACION_UNIVALLE') {
  //     return showUnivalleRelationFiles();
  //   }
  //   if (studentAgreement === 'BECADOS') return showScholarshipFiles();
  //   if (studentAgreement === 'CONVENIO_COLEGIO') hideStudyCertificate();
  //   else showStudyCertificate();

  //   hideUnivalleCertificate();
  //   hideScholarshipFiles();
  // }

  // function handleChangeEstate() {
  //   const estate = $(this).val();
  //   setStudentFilesData({ estate });
  // }

  // const isModuleShortCourse = moduleCode =>
  //   Array.isArray(MODULES.byArea['cursos cortos'])
  //     ? MODULES.byArea['cursos cortos'].find(m => m.codigo === moduleCode)
  //     : false;

  // const createEmail = () =>
  //   window.open(
  //     'https://accounts.google.com/SignUp?service=mail&hl=es&continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Des-ha-latam-co-bk-xplatform1&utm_campaign=es&utm_source=es-ha-latam-co-bk-xplatform1&utm_medium=ha'
  //   );

  // function handleChangeEps() {
  //   const epsval = this.value;
  //   if (epsval.includes('OTRA')) return $('#otraeps').css('display', 'block');
  //   $('#otraeps').css('display', 'none');
  // }

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

  // function handleChangePreviousRegister() {
  //   const myres = this.value;
  //   if (myres.includes('SI'))
  //     return $('#curso_anterior').css('display', 'block');
  //   $('#curso_anterior').css('display', 'none');
  // }

  // function getAllowedModulesByPrerequisiteModule(module) {
  //   return MODULES.all.filter(m =>
  //     m.prerrequisitos.split(',').some(p => p === module)
  //   );
  // }

  // function handleChangeAnotherGrade() {
  //   const grade = $('#myForm #grado').val();
  //   const { value } = this;
  //   const oldCourse = MODULES.all.find(m => m.nombre === value);
  //   if (!oldCourse) return;
  //   const allowedModules = getAllowedModulesByPrerequisiteModule(
  //     oldCourse.codigo
  //   );
  //   if (!allowedModules.length) return;
  //   console.log('allowedModules', allowedModules);
  //   showModules(grade, allowedModules);
  // }

  // async function editStudentData() {
  //   const valid = validateAndSave();

  //   const onSuccess = person => {
  //     openAlert({
  //       message: 'Se edito el estudiante satisfactoriamente!',
  //       variant: 'success',
  //     });
  //   };
  //   if (!valid) return;
  //   const form = $('#myForm');
  //   const dataToEdit = await getFilesData(form);
  //   // $('#save').attr('disabled', true);
  //   try {
  //     const result = await API.editStudent(JSON.stringify(dataToEdit))();
  //     onSuccess(result);
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // }

  // function loadStudent(personData) {
  //   console.log('Person', personData);
  //   const person = JSON.parse(personData);
  //   if (!person) {
  //     return openAlert({
  //       message: 'La cedula ingresada no corresponde a ningún estudiante',
  //       variant: 'warning',
  //     });
  //   }
  //   if (person.state === 'antiguo') {
  //     return openAlert({
  //       message:
  //         'El estudiante esta inscrito anteriormente, pero no el periodo actual ',
  //       variant: 'warning',
  //     });
  //   }
  //   if (person.state === 'actual') return fillInStudentData(person);
  // }

  // const searchPerson = id =>
  //   google.script.run
  //     .withSuccessHandler(loadStudent)
  //     .withFailureHandler(errorHandler)
  //     .buscarPersona(id);

  // function cargarInfo() {
  //   try {
  //     const ced = $('#cedula_buscada').val();
  //     // hideStudentRecord();
  //     if (!ced) {
  //       return openAlert({
  //         message: 'Ingrese una cedula para consultar',
  //         variant: 'warning',
  //       });
  //     }
  //     searchPerson(ced);
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // }

  // function showEditButton() {
  //   // $('#myForm #save').css('display', 'none');
  //   // $('#myForm #edit').css('display', 'block');
  // }

  // function fillInStudentData(person) {
  //   // showStudentRecord();
  //   showEditButton();
  //   fillInDataInForm(person);
  // }

  // function getRequestPayload() {
  //   google.script.url.getLocation(location => {
  //     const payload = location.parameter.test || null;
  //     if (payload) return fillInTestData();
  //     return null;
  //   });
  // }

  function init() {
    setLoading(true);
    fetchCurrentPeriodData();
    fetchModulesByGrades();
    setTimeout(() => {
      authenticateCurrentUser();
      // populateDepartments();
      subscribeEventHandlers();
      // setTimeout(getRequestPayload, 1500);
      setLoading(false);
    }, 1500);
  }

  useEffect(() => {
    init();
  }, []);

  const inputProps = {
    isSubmitting,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  };

  if (!accepted) return <TermsAndConditions onClick={handleSellingSoul} />;
  const FormPage = Content[page];
  const formProps = {
    handleNextPage,
    handlePrevPage,
    loading,
    modules,
    modulesByArea,
    isUserAdmin,
    ...inputProps,
  };
  return <FormPage {...formProps} />;
}
// Testing
// https://script.google.com/a/correounivalle.edu.co/macros/s/AKfycbwoj14LEASjFWXfQOUbpOjgDnf7MftMK5_VLhLdB22COk1i1_lve1AWgCDd0UE2N5UM/exec

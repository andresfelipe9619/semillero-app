import { sendConfirmationEmail } from './email';
import { addStudentToModuleSheet, validateModule } from './modules';
import { getPersonFolder, uploadStudentFiles } from './drive';
import {
  getSheetFromSpreadSheet,
  getRawDataFromSheet,
  sheetValuesToObject,
  getPeriods,
  getCurrentPeriod,
  getModules,
  getReport,
  getCurrentPeriodStudents,
  getHeadersFromSheet,
  jsonToSheetValues,
  getCourseActiveByPeriod,
  getLenghtModuleActive
} from './sheets';

const GENERAL_DB =
  'https://docs.google.com/spreadsheets/d/1TsbNe2yNzhhmJ4vwyS3X0qztIP8kdKeSgoFY95C5-5U/edit#gid=0';
// test https://docs.google.com/spreadsheets/d/15Q6rA1lX04Jx820_JW2CI2fK9e3RMGsjmAvedbh2VyA/edit#gid=0

export function doGet() {
  return HtmlService.createTemplateFromFile('index.html').evaluate();
}

export function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

export function isAdmin() {
  const guest = Session.getActiveUser().getEmail();
  const admins = [
    'suarez.andres@correounivalle.edu.co',
    'semillero@correounivalle.edu.co',
    'yurany.velasco@correounivalle.edu.co',
    'samuel.ramirez@correounivalle.edu.co',
    'moreno.juan@correounivalle.edu.co',
    'garciamilton54@gmail.com',
    'ases.sistemas.regionales@correounivalle.edu.co',
    'cristian.machado@correounivalle.edu.co',
    'isabela.rosero@correounivalle.edu.co'
  ];
  Logger.log('guest');
  Logger.log(guest);
  const isGuessAdmin = admins.indexOf(String(guest)) >= 0;
  Logger.log(isGuessAdmin);

  return isGuessAdmin;
}

export function doPost(request) {
  Logger.log('request');
  Logger.log(request);

  if (typeof request !== 'undefined') {
    Logger.log(request);
    const params = request.parameter;
    Logger.log('params');
    Logger.log(params);
    return ContentService.createTextOutput(JSON.stringify(request.parameter));
  }
  return null;
}

export function readRequestParameter(request) {
  if (typeof request !== 'undefined') {
    const params = request.parameter;
    Logger.log(params.test);
    if (params.test) return true;
  }
  return false;
}

export function mergeObjects(...args) {
  const resObj = {};
  for (let i = 0; i < args.length; i += 1) {
    const obj = args[i];
    const keys = Object.keys(obj);
    for (let j = 0; j < keys.length; j += 1) {
      resObj[keys[j]] = obj[keys[j]];
    }
  }
  return resObj;
}

function registerStudentCurrentPeriod(data) {
  Logger.log('=============Registering In Current Period===========');
  Logger.log('Datos en registerStudentCurrentPeriod: ');
  Logger.log(data);

  addStudentToModuleSheet(data.seleccion, data);
  const inscritossheet = getSheetFromSpreadSheet(
    getCurrentPeriod().link,
    'INSCRITOS'
  );
  const lastRow = inscritossheet.getLastRow();
  const headers = getHeadersFromSheet(inscritossheet);
  const personValues = jsonToSheetValues(data, headers);
  Logger.log('personValues');
  Logger.log(personValues);

  inscritossheet.appendRow(personValues);
  const lastRowRes = inscritossheet.getLastRow();
  let response = 'Error!';
  if (lastRowRes > lastRow) {
    response = 'exito';
  }

  Logger.log('=============END Registering In Current Period===========');
  return response;
}

function registerStudentGeneral(data, person) {
  Logger.log('=============Registering In GENERAL DB===========');
  const inscritossheet = getSheetFromSpreadSheet(GENERAL_DB, 'INSCRITOS');
  const headers = getHeadersFromSheet(inscritossheet);
  const personValues = jsonToSheetValues(data, headers);
  Logger.log('PERSON VALUES');
  Logger.log(personValues);

  let response = 'Error!';

  if (person && person.index) {
    const inscritoRange = inscritossheet.getRange(
      Number(person.index),
      1,
      1,
      inscritossheet.getLastColumn()
    );
    inscritoRange.setValues([personValues]);
    response = 'exito';
  } else {
    const lastRow = inscritossheet.getLastRow();
    inscritossheet.appendRow(personValues);
    const lastRowRes = inscritossheet.getLastRow();

    if (lastRowRes > lastRow) {
      response = 'exito';
    }
  }
  Logger.log('=============END Registering In General DB===========');
  return response;
}

function registerStudentInSheets(data, currentStudentData) {
  registerStudentCurrentPeriod(data);
  return registerStudentGeneral(data, currentStudentData);
}

function getPersonPeriods(selectedModule, currentStudentData) {
  Logger.log('Current Student Data');
  Logger.log(currentStudentData);

  const currentPeriod = getCurrentPeriod().periodo;
  const periods = getPeriods().reduce((acc, p) => {
    let value = '-';
    const sheetDataPeriod =
      (currentStudentData?.data || {})[p.periodo] || value;

    const hasModuleOnOldPeriod = sheetDataPeriod && sheetDataPeriod !== '-';
    const isCurrentPeriod = p.periodo === currentPeriod;

    if (hasModuleOnOldPeriod) {
      value = sheetDataPeriod;
    }
    if (isCurrentPeriod) {
      value = selectedModule;
    }
    acc[p.periodo] = value;
    return acc;
  }, {});
  Logger.log('Student Periods');
  Logger.log(periods);
  return periods;
}

function getDataForRegistering(formData, currentStudentData) {
  const form = { ...formData };
  if (form.otraeps) form.eps = form.otraeps;
  if (!form.comuna_res) form.comuna_res = '-';
  if (form.inscrito_anterior === 'SI') {
    form.inscrito_anterior = form.curso_anterior;
  }
  const selectedModule = validateModule(form.seleccion);
  const periods = getPersonPeriods(selectedModule, currentStudentData);

  const data = mergeObjects(
    form,
    {
      nombre: form.nombre.toUpperCase(),
      apellido: form.apellido.toUpperCase(),
      ciudad_doc: form.ciudad_doc.toUpperCase(),
      eps: form.eps.toUpperCase(),
      email: form.email.toLowerCase(),
      colegio: form.colegio.toUpperCase(),
      estamento: form.estamento.toUpperCase(),
      depto_res: form.depto_res.toUpperCase(),
      nombre_acudiente: form.nombre_acudiente.toUpperCase(),
      ciudad_res: form.ciudad_res.toUpperCase(),
      modulo: selectedModule,
      observaciones: '',
      fecha_registro: new Date().toLocaleString(),
    },
    periods
  );

  return data;
}

function validatePerson(cedula) {
  Logger.log('=============Validating Person===========');
  const sheet = getSheetFromSpreadSheet(GENERAL_DB, 'INSCRITOS');
  const result = {
    state: 'no esta',
    index: -1,
    data: null,
  };
  const currentPeriod = getCurrentPeriod().periodo;//aqui
  const textFinder = sheet.createTextFinder(cedula);

  const studentFound = textFinder.findNext();

  const studentIndex = studentFound ? studentFound.getRow() : -1;
  if (studentIndex <= -1) return result;

  const studentRange = sheet.getSheetValues(
    Number(studentIndex),
    1,
    1,
    sheet.getLastColumn()
  );
  const headers = getHeadersFromSheet(sheet);
  const studentData = sheetValuesToObject(studentRange, headers)[0];
  const isSameDocument = String(studentData.num_doc) === String(cedula);
  if (!isSameDocument) return result;

  const isFromCurrentPeriod = String(studentData[currentPeriod]) !== '-';
  result.index = studentIndex;
  result.state = isFromCurrentPeriod ? 'actual' : 'antiguo';
  result.data = studentData;
  Logger.log('=============END Validating Person===========');
  return result;
}

function editEstudentGeneral(student, studentIndex) {
  try {
    const inscritossheet = getSheetFromSpreadSheet(GENERAL_DB, 'INSCRITOS');
    const headers = getHeadersFromSheet(inscritossheet);
    Logger.log('GENERAL PERIOD');
    Logger.log(student);
    const studentRange = inscritossheet.getRange(
      Number(studentIndex),
      1,
      1,
      inscritossheet.getLastColumn()
    );
    const studentData = jsonToSheetValues(student, headers);
    studentRange.setValues([studentData]);
    return 'exito';
  } catch (error) {
    Logger.log(error);
    throw new Error('Error editing student on General DB');
  }
}

export function editStudent(serializedData) {
  const form = JSON.parse(serializedData);
  const person = validatePerson(form.num_doc);
  const newData = getDataForRegistering(form, person);

  editEstudentGeneral(newData, person.index);
  // editStudentActualPeriod( newData );
}

export function editStudentActualPeriod(student) {
  Logger.log('ACTUAL PERIOD');
  Logger.log(student);

  const students = getCurrentPeriodStudents();
  const studentSheet = getSheetFromSpreadSheet(
    getCurrentPeriod().link,
    'INSCRITOS'
  );
  let esta = false;
  let indice = -1;
  students.forEach((s, i) => {
    if (String(s[3]) === String(student.data[3])) {
      esta = true;
      indice = i;
    } else {
      esta = false;
    }
  });
  Logger.log('esta');
  Logger.log(esta);

  if (esta) {
    const inscritoRange = studentSheet.getRange(
      Number(indice) + 1,
      1,
      1,
      studentSheet.getLastColumn()
    );
    Logger.log('data');
    Logger.log(student);
    inscritoRange.setValues([student.data]);
  } else {
    studentSheet.appendRow(student.data);
  }
  if (student.module) {
    const studentsModule = getRawDataFromSheet(
      getCurrentPeriod().link,
      student.module
    );
    const moduleSheet = getSheetFromSpreadSheet(
      getCurrentPeriod().link,
      student.module
    );
    let estais = false;
    let index = 0;
    studentsModule.forEach((s, i) => {
      if (s[3] === student.data[3]) {
        estais = true;
        index = i;
      }
    });

    Logger.log('estais');
    Logger.log(estais);
    const corte = student.data.slice(0, 9);
    Logger.log(corte);
    if (estais) {
      const moduleRange = moduleSheet.getRange(
        Number(index) + 1,
        1,
        1,
        moduleSheet.getLastColumn()
      );
      moduleRange.setValues([corte]);
    } else {
      moduleSheet.appendRow(corte);
    }
  }
}

export function getCurrentPeriodData() {
  const rawModules = getModules();
  const modules = sheetValuesToObject(rawModules);
  const currentPeriod = getCurrentPeriod().periodo;
  return { currentPeriod, modules };
}

export function getReportData() {
  const raw = getReport();
  const report = sheetValuesToObject(raw);
  return { report };
}

export function buscarPersona(cedula) {
  let folder;
  let person = validatePerson(cedula);
  if (person.state !== 'no esta') {
    person.files = [];
    folder = getPersonFolder(cedula);
    const files = folder.getFiles();
    Logger.log(`files: ${files}`);
    while (files.hasNext()) {
      const file = files.next();
      person.files.push({ name: file.getName(), url: file.getUrl() });
    }
  } else {
    person = null;
  }
  Logger.log('THIS IS WHAT U ARE LOOKING FOR');
  Logger.log(person);
  return JSON.stringify(person);
}

function avoidCollisionsInConcurrentAccessess() {
  const lock = LockService.getPublicLock();
  lock.waitLock(15000);
}

export function registerStudent(formString) {
  const form = JSON.parse(formString);
  if (!form || !Object.keys(form).length) throw new Error('No data sent');
  try {
    const person = validatePerson(form.num_doc);
    Logger.log('person');
    Logger.log(person);
    const isOldStudent = person.state === 'antiguo';
    const isCurrentStudent = person.state === 'actual';
    if (isCurrentStudent) {
      throw new Error('Ya esta inscrito en este periodo');
    }
    avoidCollisionsInConcurrentAccessess();
    const currentStudentData = isOldStudent ? person : null;
    const data = getDataForRegistering(form, currentStudentData);
    Logger.log('Data for registering');
    Logger.log(data);
    const filesResult = uploadStudentFiles(data.num_doc, data.files);
    Logger.log('Files Result');
    Logger.log(filesResult);
    const folderUrl = (filesResult || {}).folder;
    data.url_documentos = folderUrl;
    const response = registerStudentInSheets(data, currentStudentData);
    Logger.log('Response');
    Logger.log(response);
    sendConfirmationEmail(data, filesResult?.files || []);

    return response;
  } catch (error) {
    Logger.log('Error Registering Student');
    Logger.log(error);
    return error.toString();
  }
}

export function objectValuesToUpperCase(object, keys) {
  if (!object) return null;
  if (!keys.length) return object;
  const upperCaseValues = keys.reduce((acc, key) => {
    if (key in object) {
      acc[key] = object[key].toUpperCase();
    }
    return acc;
  }, {});
  return mergeObjects(object, upperCaseValues);
}

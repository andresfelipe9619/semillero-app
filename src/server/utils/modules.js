import {
  getSheetFromSpreadSheet,
  sheetValuesToObject,
  getCurrentPeriod,
  getModules,
} from './sheets';

const CURRENT_PERIOD_COLUMNS = [
  'nombre',
  'apellido',
  'tipo_doc',
  'num_doc',
  'ciudad_doc',
  'tel_fijo',
  'email',
  'grado',
  'colegio',
  'convenio',
  'val_consignar',
  'val_consignado',
  'dif_consignado',
  'recibo_consignacion',
  'fecha_consignacion',
];

export function getModulesByGrades() {
  const rawModules = getModules();
  let modules = sheetValuesToObject(rawModules);
  const allowedColumns = ['nombre', 'codigo', 'area', 'prueba'];
  modules = modules.reduce((acc, module) => {
    const newModule = { ...module };
    if (newModule.disabled === 'x') return acc;
    newModule.grades = Object.keys(newModule).reduce((prevArray, key) => {
      if (allowedColumns.indexOf(key) >= 0) return prevArray;
      const currentValue = newModule[key];
      delete newModule[key];
      if (currentValue === 'x') {
        prevArray.push(key);
      }
      return prevArray;
    }, []);
    acc.push(newModule);
    return acc;
  }, []);
  const modulesByGrades = modules.reduce((acc, module) => {
    const prevModules = { ...acc };
    module.grades.forEach(grade => {
      if (!(grade in prevModules)) {
        prevModules[grade] = {};
      }
      if (!(module.area in prevModules[grade])) {
        prevModules[grade][module.area] = [];
      }
      prevModules[grade][module.area].push({
        nombre: module.nombre,
        codigo: module.codigo,
        prueba: module.prueba,
      });
    });
    return prevModules;
  }, {});
  Logger.log(modulesByGrades);
  return modulesByGrades;
}

export function createModulesSheets() {
  const { link: actualPeriod } = getCurrentPeriod();
  const periodSpreadSheet = SpreadsheetApp.openByUrl(actualPeriod);

  const modules = getModules();

  Logger.log('creating modules');
  Logger.log(actualPeriod);
  Logger.log(modules[1][0]);
  Logger.log('--------------------------');
  const headers = CURRENT_PERIOD_COLUMNS;
  modules.forEach((module, index) => {
    let moduleSheet;
    if (index > 0) {
      const [sheet] = module;
      if (!getSheetFromSpreadSheet(actualPeriod, sheet)) {
        periodSpreadSheet.insertSheet(sheet);
        moduleSheet = getSheetFromSpreadSheet(actualPeriod, sheet);
        if (moduleSheet.getLastRow() === 0) {
          moduleSheet.appendRow(headers);
        }
      }
    }
  });
  return true;
}

export function addStudentToModuleSheet(module, data) {
  createModulesSheets();
  const { link: actualPeriod } = getCurrentPeriod();
  const modulos = getModules();

  modulos.forEach(modulo => {
    if (module === modulo[1]) {
      const moduleSheet = getSheetFromSpreadSheet(actualPeriod, modulo[0]);
      const lastRow = moduleSheet.getLastRow();
      const data2Write = CURRENT_PERIOD_COLUMNS.map(column => data[column]);
      Logger.log('data2Write');
      Logger.log(data2Write);
      moduleSheet.appendRow(data2Write);
      const lastRowRes = moduleSheet.getLastRow();

      if (lastRowRes > lastRow) return true;
      return false;
    }
    return false;
  });

  return true;
}

export function validateModule(moduleSelected) {
  let validModule = null;
  Logger.log('=============VALIDATING MODULES===========');
  Logger.log('module selected');
  Logger.log(moduleSelected);
  const modules = getModules();
  const modulesTitles = [];

  modules.forEach((module, index) => {
    if (index > 0) modulesTitles.push(module[1]);
  });

  Logger.log('Titulos modules');
  Logger.log(modulesTitles);

  if (!moduleSelected) throw new Error('No se reconoce el modulo seleccionado');
  modulesTitles.forEach((title, index) => {
    if (moduleSelected.localeCompare(title) === 0) {
      const moduleIndex = index + 1;
      [validModule] = modules[moduleIndex];
    }
  });

  Logger.log('Valid Module');
  Logger.log(validModule);
  Logger.log('=============END VALIDATING MODULES===========');
  return validModule;
}

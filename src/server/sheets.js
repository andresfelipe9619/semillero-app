const GENERAL_DB =
  'https://docs.google.com/spreadsheets/d/1TsbNe2yNzhhmJ4vwyS3X0qztIP8kdKeSgoFY95C5-5U/edit#gid=0';

export function normalizeString(value) {
  return String(value || '')
    .trim()
    .toLowerCase();
}
export function getSheetFromSpreadSheet(url, sheet) {
  const Spreedsheet = SpreadsheetApp.openByUrl(url);
  if (url && sheet) return Spreedsheet.getSheetByName(sheet);
  return null;
}

export function getRawDataFromSheet(url, sheet) {
  const mSheet = getSheetFromSpreadSheet(url, sheet);
  if (!mSheet) return null;
  return mSheet.getSheetValues(
    1,
    1,
    mSheet.getLastRow(),
    mSheet.getLastColumn()
  );
}

export function addHeadings(people, headings) {
  return people.map(personAsArray => {
    const personAsObj = {};

    headings.forEach((heading, i) => {
      personAsObj[heading] = personAsArray[i];
    });

    return personAsObj;
  });
}

export function sheetValuesToObject(sheetValues, headers) {
  const headings = headers || sheetValues[0].map(normalizeString);
  let people = null;
  if (sheetValues) people = headers ? sheetValues : sheetValues.slice(1);
  const peopleWithHeadings = addHeadings(people, headings);
  return peopleWithHeadings;
}

export function getPeriods() {
  const rawPeriods = getRawDataFromSheet(GENERAL_DB, 'PERIODOS');
  const periods = sheetValuesToObject(rawPeriods);
  return periods;
}

export function getCurrentPeriod() {
  const periods = getPeriods();
  return periods.find(period => {
    const active = normalizeString(period.activo);
    const isCurrentPeriod = active === 'x';
    return isCurrentPeriod;
  });
}

export function getModules() {
  const rawModules = getRawDataFromSheet(GENERAL_DB, 'MODULOS');
  Logger.log('modules');
  return rawModules;
}

export function getStudents() {
  const rawStudents = getRawDataFromSheet(GENERAL_DB, 'INSCRITOS');
  return rawStudents;
}

export function getReport() {
  const rawReport = getRawDataFromSheet(GENERAL_DB, 'REPORTE');
  return rawReport;
}

export function getCurrentPeriodStudents() {
  const rawStudents = getRawDataFromSheet(getCurrentPeriod().link, 'INSCRITOS');
  return rawStudents;
}

export function getHeadersFromSheet(sheet) {
  let headers = [];
  if (!sheet) return headers;
  [headers] = sheet.getSheetValues(1, 1, 1, sheet.getLastColumn());
  return headers;
}

export function jsonToSheetValues(json, headers) {
  const arrayValues = new Array(headers.length);
  const lowerHeaders = headers.map(normalizeString);
  Object.entries(json || {}).forEach(([key, value]) => {
    const keyValue = normalizeString(key);
    lowerHeaders.forEach((header, index) => {
      if (keyValue === header) {
        arrayValues[index] = String(value);
      }
    });
  });

  return arrayValues;
}

export function getCourseActiveByPeriod() {

    const data_period = getPeriods();
    const activePeriods = data_period.filter( period => (period.activo).toLowerCase() === 'x');
    const link_sheet = activePeriods[0].link;
    const spreadsheet_ = SpreadsheetApp.openByUrl(link_sheet);
    const sheets_ = spreadsheet_.getSheets();

    let sheetIds = []
    // Obtener los IDs de las hojas de cálculo
    sheets_.map(sheet => {  

      sheetIds.push({ id_: sheet.getSheetId() , "name_": sheet.getName() }) 
    
    });

    const data_modules = sheetValuesToObject(getModules());
    
    const { active: modules_desactive , desactive: modules_active } = data_modules.reduce((result, module) => {
      const isActive = (module.disabled).toLowerCase() === 'x';
      sheetIds.find( sheet => {
        if (sheet.name_ === module.nombre) {
          module.id_sheet = sheet.id_;
        }
      })
      result[isActive ? 'active' : 'desactive'].push({ 
        name: module.nombre ,
        codigo: module.codigo ,
        inscritos: 0,
        id_sheet: `${link_sheet}#gid=${module.id_sheet}`
      });
      return result;
    }, { active: [], desactive: [] });
    

   
    return {
       active: modules_active,
       desactive: modules_desactive,
       link: link_sheet
    }
    
}

export function getLenghtModuleActive() {
    try {
        const data_general = getCourseActiveByPeriod();

        let  reporte_ = []
        let  total_inscritos = 0;

        data_general.active.map( (element, index) => {
        const data_sheet = getRawDataFromSheet(data_general.link, element.name);

        //insertar dentro del elemento el numero de estudiantes
        data_general.active[index].inscritos = data_sheet.length - 1;
          total_inscritos += data_sheet.length - 1;
        })

        reporte_ = reporte_.concat(data_general.active, []);
        Logger.log(reporte_ , "reporte");

        return {
          "reporte_": reporte_,
          "total_inscritos": total_inscritos
        }

    } catch (error) {
      Logger.log(error);
    }
}
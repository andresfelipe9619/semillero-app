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

import * as Yup from 'yup';
import EPSs from '../../utils/eps';

const FILE_SIZE = 2;

const SUPPORTED_FORMATS = ['application/pdf', 'image/*'];

export const GOOGLE_URL =
  'https://accounts.google.com/SignUp?service=mail&hl=es&continue=http%3A%2F%2Fmail.google.com%2Fmail%2F%3Fpc%3Des-ha-latam-co-bk-xplatform1&utm_campaign=es&utm_source=es-ha-latam-co-bk-xplatform1&utm_medium=ha';

export const DocumentTypeOptions = [
  { value: 'T.I', label: 'T.I' },
  { value: 'C.C', label: 'C.C' },
  { value: 'C.E', label: 'Cedula de Extrangería' },
  { value: 'R.C', label: 'Registro Civil' },
];

export const GenreOptions = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'OTRO', label: 'Otro' },
];

export const EPSOptions = EPSs.map(eps => ({ value: eps, label: eps }));

export const NumberOfSchoolGrades = 11;

export const GradeOptions = Array.from(
  { length: NumberOfSchoolGrades + 1 },
  (_, i) => {
    const isLast = i === NumberOfSchoolGrades;
    const grade = i + 1;
    return {
      value: isLast ? 'EGRESADO' : grade,
      label: isLast ? 'Egresado colegios' : `${grade}°`,
    };
  }
);

export const EstateOptions = [
  { value: 'PUBLICO', label: 'Público' },
  { value: 'PRIVADO', label: 'Privado' },
  { value: 'COBERTURA', label: 'Cobertura' },
];

const filesByName = [
  'photo',
  'docFile',
  'constanciaEstudFile',
  'constanciaFuncFile',
  'reciboFile',
  'recibosPublicos',
  'cartaSolicitud',
  'actaGrado',
];

export function checkIfFileIsTooBig(file) {
  let valid = true;
  if (!file?.size) return false;
  const size = file.size / 1024 / 1024;
  if (size > FILE_SIZE) {
    valid = false;
  }
  return valid;
}

export function checkIfFileIsCorrectType(file) {
  if (!file?.size) return false;
  const valid = SUPPORTED_FORMATS.includes(file.type);
  return valid;
}

const initialValues = {
  nombre: '',
  apellido: '',
  tipo_doc: '',
  ciudad_doc: '',
  num_doc: '',
  email: '',
  confirmEmail: '',
  genero: '',
  nacimiento: '',
  tel_fijo: '',
  tel_celular: '',
  direccion: '',
  ciudad_res: '',
  comuna_res: '',
  depto_res: '',
  eps: '',
  otraeps: '',
  colegio: '',
  estamento: '',
  grado: '',
  nombre_acudiente: '',
  tel_acudiente: '',
  inscrito_anterior: '',
  curso_anterior: '',
  seleccion: '',
  convenio: '',
  val_consignado: '',
  val_consignar: '',
  recibo_consignacion: '',
  fecha_consignacion: '',
  terminos: '',
  photo: '',
  docFile: '',
  constanciaEstudFile: '',
  constanciaFuncFile: '',
  reciboFile: '',
  recibosPublicos: '',
  cartaSolicitud: '',
  actaGrado: '',
};

const testValues = {
  '2018A': '-',
  '2018B': '-',
  '2019A': 'Música, Percusión y Flauta Dulce - Apreciación Musical',
  '2019B': 'Funciones, Sucesiones y Límite',
  '2020A': 'De los Enteros A los racionales',
  '2020B': '-',
  '2021A': '-',
  '2021B': '-',
  '2022A': '-',
  '2022B': '-',
  '2023A': '-',
  '2023B': '-',
  apellido: 'SUAREZ',
  direccion: 'KR 49B #44-67',
  ciudad_doc: 'CALI',
  depto_res: 'Valle del Cauca',
  ciudad_res: 'Cali',
  colegio: 'CHINCA',
  convenio: 'PARTICULAR',
  email: 'andresfelipe9619@gmail.com',
  eps: 'EPS SURAMERICANA S.A.',
  estamento: 'PRIVADO',
  genero: 'M',
  grado: '7',
  inscrito_anterior: 'NO',
  nacimiento: '1996-11-25',
  nombre: 'ANDRES',
  nombre_acudiente: 'JULI',
  num_doc: '1144093949',
  tel_acudiente: '1111',
  tel_celular: '11111',
  tel_fijo: '2222',
  terminos: 'Acepto',
  tipo_doc: 'C.C',
  url_documentos: 'folderUrl',
  val_consignado: '500000',
  val_consignar: '300000',
  recibo_consignacion: '999999',
  fecha_consignacion: '2020-01-20',
};

const Texts = {
  requiredFields: 'Este campo es requerido',
  notIdentical: 'Los correos no coinciden',
  invalidFileSize: 'El archivo es demasiado grande, el máximo es 2MB',
  invalidFileType: 'El tipo de archivo es invalido',
  invalidEmail: 'El correo debe ser gmail o correounivalle',
};

const UnivalleRegex = /^[\w.+-]+@(gmail|correounivalle.edu)\.co(m)?$/;

const setFieldRequired = schema => schema.required(Texts.requiredFields);

const validationSchema = Yup.object({
  nombre: Yup.string().required(Texts.requiredFields),
  apellido: Yup.string().required(Texts.requiredFields),
  tipo_doc: Yup.string().required(Texts.requiredFields),
  ciudad_doc: Yup.string().required(Texts.requiredFields),
  num_doc: Yup.string().required(Texts.requiredFields),
  email: Yup.string()
    .matches(UnivalleRegex, Texts.invalidEmail)
    .required(Texts.requiredFields),
  confirmEmail: Yup.string()
    .matches(UnivalleRegex, Texts.invalidEmail)
    .required(Texts.requiredFields)
    .oneOf([Yup.ref('email')], Texts.notIdentical),
  genero: Yup.string().required(Texts.requiredFields),
  nacimiento: Yup.string().required(Texts.requiredFields),
  tel_fijo: Yup.string().required(Texts.requiredFields),
  tel_celular: Yup.string().required(Texts.requiredFields),
  direccion: Yup.string().required(Texts.requiredFields),
  depto_res: Yup.string().required(Texts.requiredFields),
  ciudad_res: Yup.string().required(Texts.requiredFields),
  comuna_res: Yup.string().when('ciudad_res', {
    is: 'Cali',
    then: setFieldRequired,
  }),
  eps: Yup.string().required(Texts.requiredFields),
  otraeps: Yup.string().when('eps', {
    is: 'OTRA',
    then: setFieldRequired,
  }),
  colegio: Yup.string().required(Texts.requiredFields),
  estamento: Yup.string().required(Texts.requiredFields),
  grado: Yup.string().required(Texts.requiredFields),
  nombre_acudiente: Yup.string().required(Texts.requiredFields),
  tel_acudiente: Yup.string().required(Texts.requiredFields),
  inscrito_anterior: Yup.string().required(Texts.requiredFields),
  curso_anterior: Yup.string().required(Texts.requiredFields),
  seleccion: Yup.string().required(Texts.requiredFields),
  convenio: Yup.string().required(Texts.requiredFields),
  val_consignado: Yup.number().required(Texts.requiredFields),
  val_consignar: Yup.number().required(Texts.requiredFields),
  recibo_consignacion: Yup.string().required(Texts.requiredFields),
  fecha_consignacion: Yup.string().required(Texts.requiredFields),
  terminos: Yup.string().required(Texts.requiredFields),
  photo: Yup.mixed()
    .required(Texts.requiredFields)
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  docFile: Yup.mixed()
    .required(Texts.requiredFields)
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  constanciaEstudFile: Yup.mixed()
    .when(['convenio', 'estamento'], {
      is: val => ['BECADOS', 'PUBLIC', 'COBERTURA'].includes(val),
      then: setFieldRequired,
    })
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  constanciaFuncFile: Yup.mixed()
    .when(['convenio'], {
      is: val => ['RELACION_UNIVALLE'].includes(val),
      then: setFieldRequired,
    })
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  reciboFile: Yup.mixed()
    .required(Texts.requiredFields)
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  recibosPublicos: Yup.mixed()
    .when(['convenio'], {
      is: val => ['BECADOS'].includes(val),
      then: setFieldRequired,
    })
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  cartaSolicitud: Yup.mixed()
    .when(['convenio'], {
      is: val => ['BECADOS'].includes(val),
      then: setFieldRequired,
    })
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
  actaGrado: Yup.mixed()
    .when(['grado'], {
      is: val => ['EGRESADO'].includes(val),
      then: setFieldRequired,
    })
    .test('is-big-file', Texts.invalidFileSize, checkIfFileIsTooBig)
    .test('is-correct-file', Texts.invalidFileType, checkIfFileIsCorrectType),
});

export {
  initialValues,
  testValues,
  SUPPORTED_FORMATS,
  validationSchema,
  filesByName,
};
import * as Yup from 'yup';

const FILE_SIZE = 2;
const SUPPORTED_FORMATS = ['application/pdf', 'image'];

const filesByName = [
  'constanciaEstudFile',
  'constanciaFuncFile',
  'reciboFile',
  'recibosPublicos',
  'cartaSolicitud',
  'actaGrado',
];

export function checkIfFilesAreTooBig(file) {
  let valid = true;
  if (!file?.size) return false;
  const size = file.size / 1024 / 1024;
  if (size > FILE_SIZE) {
    valid = false;
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file) {
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
  ciudad_doc: 'CALI',
  depto_res: 'VALLE DEL CAUCA',
  ciudad_res: 'CALI',
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
  fileSize: 'Archivo es demasiado grande, el máximo es 2MB',
  requiredFields: 'Este campo es requerido',
  invalidEmail: 'Ingrese un email valido',
};

const validationSchema = Yup.object({
  nombre: Yup.string().required(Texts.requiredFields),
  apellido: Yup.string().required(Texts.requiredFields),
  tipo_doc: Yup.string().required(Texts.requiredFields),
  ciudad_doc: Yup.string().required(Texts.requiredFields),
  num_doc: Yup.string().required(Texts.requiredFields),
  email: Yup.string()
    .email(Texts.invalidEmail)
    .required(Texts.requiredFields),
  confirmEmail: Yup.string()
    .email(Texts.invalidEmail)
    .required(Texts.requiredFields)
    .oneOf([Yup.ref('email')], 'Los correos no coinciden'),
  genero: Yup.string().required(Texts.requiredFields),
  nacimiento: Yup.string().required(Texts.requiredFields),
  tel_fijo: Yup.string().required(Texts.requiredFields),
  tel_celular: Yup.string().required(Texts.requiredFields),
  direccion: Yup.string().required(Texts.requiredFields),
  ciudad_res: Yup.string().required(Texts.requiredFields),
  comuna_res: Yup.string().required(Texts.requiredFields),
  depto_res: Yup.string().required(Texts.requiredFields),
  eps: Yup.string().required(Texts.requiredFields),
  otraeps: Yup.string().required(Texts.requiredFields),
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
    .test('is-big-file', Texts.fileSize, checkIfFilesAreTooBig)
    .test(
      'is-correct-file',
      'VALIDATION_FIELD_FILE_WRONG_TYPE',
      checkIfFilesAreCorrectType
    ),
  docFile: Yup.mixed()
    .required(Texts.requiredFields)
    .test('is-big-file', Texts.fileSize, checkIfFilesAreTooBig)
    .test(
      'is-correct-file',
      'VALIDATION_FIELD_FILE_WRONG_TYPE',
      checkIfFilesAreCorrectType
    ),
  constanciaEstudFile: Yup.mixed()
    .required(Texts.requiredFields)
    .test('is-big-file', Texts.fileSize, checkIfFilesAreTooBig)
    .test(
      'is-correct-file',
      'VALIDATION_FIELD_FILE_WRONG_TYPE',
      checkIfFilesAreCorrectType
    ),
  // constanciaFuncFile: Yup.string().required(Texts.requiredFields),
  // reciboFile: Yup.string().required(Texts.requiredFields),
  // recibosPublicos: Yup.string().required(Texts.requiredFields),
  // cartaSolicitud: Yup.string().required(Texts.requiredFields),
  // actaGrado: Yup.string().required(Texts.requiredFields),
});

export {
  initialValues,
  testValues,
  SUPPORTED_FORMATS,
  validationSchema,
  filesByName,
};

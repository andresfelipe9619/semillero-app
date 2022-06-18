import * as Yup from 'yup';
// const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ['application/pdf'];

export function checkIfFilesAreTooBig(file) {
  let valid = true;
  const size = file.size / 1024 / 1024;
  if (size > 10) {
    valid = false;
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file) {
  let valid = false;

  if (SUPPORTED_FORMATS.includes(file.type)) {
    valid = true;
  }

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

const testValues = { ...initialValues };

const Texts = {
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
  photo: Yup.string().required(Texts.requiredFields),
  docFile: Yup.string().required(Texts.requiredFields),
  // constanciaEstudFile: Yup.string()
  //   .required(Texts.requiredFields)
  //   .test('is-big-file', 'VALIDATION_FIELD_FILE_BIG', checkIfFilesAreTooBig)
  //   .test(
  //     'is-correct-file',
  //     'VALIDATION_FIELD_FILE_WRONG_TYPE',
  //     checkIfFilesAreCorrectType
  //   ),
  constanciaFuncFile: Yup.string().required(Texts.requiredFields),
  reciboFile: Yup.string().required(Texts.requiredFields),
  recibosPublicos: Yup.string().required(Texts.requiredFields),
  cartaSolicitud: Yup.string().required(Texts.requiredFields),
  actaGrado: Yup.string().required(Texts.requiredFields),
});

export { initialValues, testValues, SUPPORTED_FORMATS, validationSchema };

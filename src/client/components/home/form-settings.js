import * as Yup from 'yup';

// const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

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

const validationSchema = {
  nombre: Yup.string().required(),
  apellido: Yup.string().required(),
  tipo_doc: Yup.string().required(),
  ciudad_doc: Yup.string().required(),
  num_doc: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  confirmEmail: Yup.string()
    .email()
    .required(),
  genero: Yup.string().required(),
  nacimiento: Yup.string().required(),
  tel_fijo: Yup.string().required(),
  tel_celular: Yup.string().required(),
  direccion: Yup.string().required(),
  ciudad_res: Yup.string().required(),
  comuna_res: Yup.string().required(),
  depto_res: Yup.string().required(),
  eps: Yup.string().required(),
  otraeps: Yup.string().required(),
  colegio: Yup.string().required(),
  estamento: Yup.string().required(),
  grado: Yup.string().required(),
  nombre_acudiente: Yup.string().required(),
  tel_acudiente: Yup.string().required(),
  inscrito_anterior: Yup.string().required(),
  curso_anterior: Yup.string().required(),
  seleccion: Yup.string().required(),
  convenio: Yup.string().required(),
  val_consignado: Yup.number().required(),
  val_consignar: Yup.number().required(),
  recibo_consignacion: Yup.string().required(),
  fecha_consignacion: Yup.string().required(),
  terminos: Yup.string().required(),
  photo: Yup.string().required(),
  docFile: Yup.string().required(),
  constanciaEstudFile: Yup.string().required(),
  constanciaFuncFile: Yup.string().required(),
  reciboFile: Yup.string().required(),
  recibosPublicos: Yup.string().required(),
  cartaSolicitud: Yup.string().required(),
  actaGrado: Yup.string().required(),
};

export { initialValues, testValues, SUPPORTED_FORMATS, validationSchema };

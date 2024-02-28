export const getModulePrice = (choice, modules, { estamento, convenio }) => {
  const module = modules.find(m => m.codigo === choice);
  let price = 0;
  if (estamento === 'PRIVADO') price = module?.precio_privado;
  if (estamento === 'PUBLICO') price = module?.precio_publico;
  if (estamento === 'COBERTURA') price = module?.precio_cobertura;
  if (convenio === 'RELACION_UNIVALLE') price = module?.precio_univalle;
  if (convenio === 'red_docente') price = module?.red_docente;
  if (convenio === 'PARTICULAR') price = module?.precio_particular;
  if (convenio === 'BECADOS') {
    price = 0;
  }
  return price;
};

export function getPaymentLink(modules, formValues) {
  const { moduleCode, estamento, convenio } = formValues;
  const module = modules.find(m => m.codigo === moduleCode);
  console.log('LINK {module, estamento}', { module, estamento });
  if (!module || !estamento) return null;
  let link = '';
  // const payed = $('#val_consignado').val();
  if (estamento === 'PRIVADO') link = module.link_privado;
  if (estamento === 'PUBLICO') link = module.link_publico;
  if (estamento === 'COBERTURA') link = module.link_publico;
  // Univalle overrides whatever estate is selected
  if (convenio === 'RELACION_UNIVALLE') link = module.link_univalle;
  console.log('link', link);
  return link;
}

export function getAllowedModulesByPrerequisiteModule(modules, moduleCode) {
  if (!moduleCode || !modules) return [];
  return modules.filter(m =>
    m.prerrequisitos.split(',').some(p => p === moduleCode)
  );
}

export const getFileName = (fileKey, doc) => {
  if (fileKey === 'docFile') return `${doc}_DOCUMENTO`;
  if (fileKey === 'constanciaEstudFile') return `${doc}_COSNTANCIA_ESTUDIO`;
  if (fileKey === 'reciboFile') return `${doc}_RECIBO_PAGO`;
  if (fileKey === 'constanciaFuncFile') return `${doc}_CONSTANCIA_FUNCIONARIO`;
  if (fileKey === 'recibosPublicos') return `${doc}_RECIBO_PUBLICOS`;
  if (fileKey === 'cartaSolicitud') return `${doc}_CARTA_SOLICITUD`;
  if (fileKey === 'actaGrado') return `${doc}_ACTA_GRADO`;
  if (fileKey === 'photo') return `${doc}_FOTO_PERFIL`;
  if (fileKey === 'carnedocente') return `${doc}_CARNE_DOCENTE`;
  return null;
};

export const getFile = file => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve({ name: file.name, base64: reader.result });
    reader.readAsDataURL(file);
  });
};

export function removeSpaces(string) {
  const normalized = string.replace(/\s+/g, '');
  return normalized;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFileSize = fileSize => {
  let size = fileSize;
  const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
  let i = 0;
  while (size > 900) {
    size /= 1024;
    i += 1;
  }
  const exactSize = `${Math.round(size * 100) / 100} ${fSExt[i]}`;
  return exactSize;
};

const longFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};
const shortFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const formatDate = (date, long = true) =>
  new Date(date).toLocaleString(
    'en-US',
    long ? longFormatOptions : shortFormatOptions
  );

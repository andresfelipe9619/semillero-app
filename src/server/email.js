import { getCurrentPeriod, getModules } from './sheets';

export function getEmailTemplate(data, periodo) {
  const modules = getModules();

  let contenthtml = '';
  let moduleName = '';

  modules.forEach(module => {
    const [nombre, codigo] = module;
    if (codigo === data.seleccion) {
      moduleName = nombre;
    }
  });
  contenthtml += '<div style="text-align:center">';
  contenthtml += '<h3>INSCRIPCIÓN</h3>';
  contenthtml += '<h3>SEMILLERO UNIVERSIDAD DEL VALLE</h3>';
  contenthtml += `<h3>Actualmente se encuentra matriculado(a) en el periodo académico -----${periodo}------. </h3></div>`;
  contenthtml += `<p><strong>NOTA: Durante el periodo académico ${periodo}, toda la información con respecto a la confirmación de su matrícula, el calendario académico,  el inicio y las citaciones de las clases,  la programación de las actividades curriculares y el material académico, serán enviados al correo electrónico que registró en esta inscripción.</strong></p>`;
  contenthtml +=
    '<p><strong>Importante: </strong>Esta inscripción no será válida sin la respectiva verificación de su pago. Una vez realizada la verificación recibirá una confirmación de su matrícula por parte de la Coordinación General del Semillero Universidad del Valle. Por favor conserve su recibo de pago.</p><hr>';
  contenthtml += `<h3> Módulo: ${moduleName}</h3>`;
  contenthtml += `<p> <strong>Fecha de Inscripcion:</strong>	${new Date()}</p>`;
  contenthtml += `<p> <strong>Nombre Completo: </strong>${data.nombre} ${data.apellido}</p>`;
  contenthtml += `<p> <strong>Documento de Identidad:	</strong>${data.tipo_doc} ${data.num_doc}</p>`;
  contenthtml += `<p> <strong>Ciudad de Expedición: </strong>${data.ciudad_doc}</p>`;
  contenthtml += `<p> <strong>Email:	</strong>${data.email}</p>`;
  contenthtml += `<p> <strong>Teléfono: </strong>${data.tel_fijo}</p>`;
  contenthtml += `<p> <strong>Celular: 	</strong>${data.tel_celular}</p>`;
  contenthtml += `<p> <strong>Ciudad Residencia:	 </strong>${data.ciudad_res}</p>`;
  contenthtml += `<p> <strong>EPS: </strong>${data.eps}</p>`;
  contenthtml += `<p> <strong>InstituciÓn Educativa: </strong>${data.colegio}</p>`;
  contenthtml += `<p> <strong>Modalidad:  </strong>${data.estamento}</p>`;
  contenthtml += `<p> <strong>Grado:	</strong>${data.grado}</p>`;
  contenthtml += `<p> <strong>Acudiente:  </strong>${data.nombre_acudiente}</p>`;
  contenthtml += `<p> <strong>Teléfono del Acudiente: </strong>${data.tel_acudiente}</p>`;
  if ((data.curso_anterior || '').trim()) {
    contenthtml += `<p> <strong>Inscrito Anteriormente: </strong>${data.inscrito_anterior}</p>`;
  }
  contenthtml += `<p> <strong>Convenio: </strong>${data.convenio}</p>`;
  contenthtml += `<p> <strong>Costo del Curso:  </strong>${data.val_consignar}</p>`;
  contenthtml +=
    '<strong style="font-size: 2em;">RECUERDA QUE ESTA INSCRIPCIÓN NO SERÁ VÁLIDA SIN LA RESPECTIVA VERIFICACIÓN DE SU PAGO</strong>';
  contenthtml += `<p> <strong><a href="${data.link}">Enlace de pago</a></strong></p>`;

  return contenthtml;
}

export function sendEmailToAdmin(subject, body, files) {
  MailApp.sendEmail({
    // to: "andresfelipe9619@gmail.com",
    to: 'semillero@correounivalle.edu.co',
    subject,
    htmlBody: body,
    name: 'SEMILLEROS UNIVALLE',
    attachments: files,
  });
}

export function sendConfirmationEmail(data, files) {
  Logger.log('=============Sending Email===========');
  const { periodo } = getCurrentPeriod();
  const body = getEmailTemplate(data, periodo);
  let subModule = '';
  const modules = getModules();
  modules.forEach(module => {
    const [nombre, codigo] = module;
    if (codigo === data.seleccion) {
      subModule = nombre;
    }
  });

  const subject = `Inscripción ${periodo} ${subModule}`;
  Logger.log('Submodulo');
  Logger.log(subModule);
  MailApp.sendEmail({
    to: data.email,
    subject,
    htmlBody: body,
    name: 'SEMILLEROS UNIVALLE',
    attachments: files,
  });

  const urlFolder = data.url_documentos;
  const links = `<p> <strong> Enlace Documentos: </strong> <a href="${urlFolder}"> Carpeta con Documentos del Estudiante</a></p>`;
  const adminSubject = `${subject} ${data.nombre} ${data.apellido}`;
  const adminBody = body + links;

  sendEmailToAdmin(adminSubject, adminBody, files);
  Logger.log('=============END Sending Email===========');
}

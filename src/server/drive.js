const ROOT_FOLDER = 'SCRIPTS SEMILLEROS';
const FILES_FOLDER = 'Bodega de archivos';

function base64ToBlob(fileName, fileData) {
  const contentType = fileData.substring(5, fileData.indexOf(';'));
  const bytes = Utilities.base64Decode(
    fileData.substr(fileData.indexOf('base64,') + 7)
  );
  const blob = Utilities.newBlob(bytes, contentType, fileName);
  return blob;
}

function findOrCreateFolder(name, folder2search) {
  let folder;
  const folders = folder2search.getFoldersByName(name);
  if (folders.hasNext()) folder = folders.next();
  else folder = folder2search.createFolder(name);
  return folder;
}

export function getMainFolder() {
  const mainFolder = findOrCreateFolder(ROOT_FOLDER, DriveApp);
  return mainFolder;
}

export function getFilesFolder(folder) {
  let mainFolder = folder;
  if (!folder) mainFolder = getMainFolder();

  const filesFolder = findOrCreateFolder(FILES_FOLDER, mainFolder);
  return filesFolder;
}

export function getPersonFolder(name, folder) {
  const filesFolder = getFilesFolder(folder);
  const personFolder = findOrCreateFolder(name, filesFolder);
  return personFolder;
}

export function createPersonFile(fileName, numDoc, fileData) {
  const result = {
    url: '',
    name: '',
  };
  const mainFolder = getMainFolder();
  const currentFolder = getPersonFolder(numDoc, mainFolder);
  Logger.log(`Student Folder: ${currentFolder}`);
  const blob = base64ToBlob(fileName, fileData);

  const file = currentFolder.createFile(blob);
  file.setDescription(`Subido Por ${numDoc}`);
  result.url = file.getUrl();
  result.name = file.getName();
  result.file = file;
  return result;
}

export function uploadStudentFiles(numDoc, files) {
  Logger.log(`=======UPLOADING STUDENT ${numDoc} FILES======`);
  if (!files.length) return null;
  Logger.log('FILES:');
  const savedFiles = files.map(file => {
    const name = file.name || '';
    const base64 = file.base64 || '';
    Logger.log(name);
    const savedFile = createPersonFile(name, numDoc, base64);
    return savedFile.file;
  });
  const mainFolder = getMainFolder();
  const currentFolder = getPersonFolder(numDoc, mainFolder);
  const response = { files: savedFiles, folder: currentFolder.getUrl() };
  Logger.log('FILES RESPONSE:');
  Logger.log(response);

  Logger.log(`=======END UPLOADING STUDENT ${numDoc} FILES========`);
  return response;
}

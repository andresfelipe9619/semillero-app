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

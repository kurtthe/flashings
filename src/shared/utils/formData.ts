export const mapFilesFormData = (files: string[]) => {
  const dataFormFiles = new FormData();

  files.forEach((item, index) => {
    dataFormFiles.append('files[]', {
      uri: item,
      name: `file ${index}`,
      type: 'image/png',
    });
  });

  return dataFormFiles;
};

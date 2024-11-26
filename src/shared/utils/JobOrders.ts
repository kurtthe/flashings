import {FLASHINGS_DATA, MATERIALS, STORE} from '@models';
import {dataMaterials} from '@store/jobs/mocks';
import alert from '@services/general-request/alert';
import {config} from '@env/config';

export const getMaterial = (
  idMaterial: number,
  showAlert = false,
): MATERIALS => {
  const material = dataMaterials.find(
    item => item.id.toString() === idMaterial.toString(),
  );
  if (!material) {
    if (showAlert) {
      alert.show('Error loading material of order');
    }
    return {
      id: 1,
      value: 'galvanised',
      label: 'Galvanised',
      bgColor: '#a7aaaf',
      textColor: 'black',
      bold: false,
      disabled: false,
      material: 'Galvanised',
    };
  }

  if (material.id > 3 && material.id < 26) {
    return {
      ...material,
      label: `Colorbond ${material.label}`,
      value: `Colorbond ${material.value}`,
    };
  }

  return material;
};

export const getGirth = (
  data: FLASHINGS_DATA,
  sideTapered?: 'front' | 'back',
) => {
  let sizeLines = data.dataLines.map(lineInfo => lineInfo.distance);

  if (data.tapered && sideTapered) {
    sizeLines = data.tapered[sideTapered].map(lineInfo => lineInfo.distance);
  }
  let breaksAdd = 0;
  if (data.startType !== 'none') {
    breaksAdd += 10;
  }
  if (data.endType !== 'none') {
    breaksAdd += 10;
  }
  return sizeLines.reduce((a, b) => a + b, 0) + breaksAdd;
};

export const getBends = (data: FLASHINGS_DATA) => {
  const pointers = data.dataLines.map(lineInfo => lineInfo.points);

  let addTo = 0;
  if (data.startType !== 'none') {
    const valueToAdd = data.startType.includes('safety') ? 2 : 1;
    addTo += valueToAdd;
  }
  if (data.endType !== 'none') {
    const valueToAdd = data.endType.includes('safety') ? 2 : 1;
    addTo += valueToAdd;
  }

  const lengthPoint = pointers.length - 1 + addTo;
  return lengthPoint ?? 0;
};

export const mapDataFlashing = (
  flashings: FLASHINGS_DATA[],
  storeName: string,
  versionApp: string,
  delivery: string,
  address: string,
) => {
  let dataMapped = {};

  // @ts-ignore
  dataMapped[`store`] = storeName;
  // @ts-ignore
  dataMapped[`app_version`] = versionApp;
  // @ts-ignore
  dataMapped[`delivery_method`] = delivery;
  // @ts-ignore
  dataMapped[`delivery_address`] = address;

  for (const [index, dataFlashing] of flashings.entries()) {
    // @ts-ignore
    dataMapped[`flashing_name_${index + 1}`] =
      dataFlashing.name === '' ? `Flashing ${index + 1}` : dataFlashing.name;
    // @ts-ignore
    dataMapped[`material_${index + 1}`] = `0.55 ${
      getMaterial(dataFlashing.colourMaterial, true).value
    }`;
    // @ts-ignore
    dataMapped[`folds_${index + 1}`] = getBends(flashings[index]);

    if (dataFlashing.tapered) {
      // @ts-ignore
      dataMapped[`flash_${index + 1}_image`] =
        dataFlashing.tapered.frontImagePreview;
      // @ts-ignore
      dataMapped[`flash_${index + 1}_image_back`] =
        dataFlashing.tapered.backImagePreview;
      // @ts-ignore
      dataMapped[`girth_${index + 1}`] = `0.${getGirth(
        flashings[index],
        'front',
      )} m`;

      // @ts-ignore
      dataMapped[`girth_${index + 1}_back`] = `0.${getGirth(
        flashings[index],
        'back',
      )} m`;
      // @ts-ignore
      dataMapped[`tapered_${index + 1}`] = 'Tapered';
    } else {
      // @ts-ignore
      dataMapped[`flash_${index + 1}_image`] = dataFlashing.imgPreview;
      // @ts-ignore
      dataMapped[`girth_${index + 1}`] = `0.${getGirth(flashings[index])} m`;
      // @ts-ignore
      dataMapped[`tapered_${index + 1}`] = '';
    }
    // @ts-ignore
    dataMapped = {
      ...dataMapped,
      ...mapLengthsInputs(dataFlashing.flashingLengths, index + 1),
    };
  }
  return dataMapped;
};

const mapLengthsInputs = (
  data: FLASHINGS_DATA['flashingLengths'],
  numberFlashing: number,
) => {
  const dataMapped = {};
  data.forEach((dataLengths, index) => {
    // @ts-ignore
    dataMapped[`flash_${numberFlashing}_${index + 1}_qty`] = dataLengths.qty;
    // @ts-ignore
    dataMapped[`flash_${numberFlashing}_${index + 1}_length`] =
      `${dataLengths.length} ${config.unitMeasurement}`;
  });

  return dataMapped;
};

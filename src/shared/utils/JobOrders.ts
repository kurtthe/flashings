import { FLASHINGS_DATA, MATERIALS } from '@models';
import { dataMaterials } from '@store/jobs/mocks';

export const getMaterial = (idMaterial: number): MATERIALS => {
  const material = dataMaterials.find(item => item.id === idMaterial);
  if (!material) {
    return {
      id: 1,
      value: 'galvanised',
      label: 'Galvanised',
      bgColor: '#a7aaaf',
      textColor: 'black',
      bold: false,
      disabled: false,
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

export const mapDataFlashing = (flashings: FLASHINGS_DATA[]) => {
  let dataMapped = {};

  for (const [index, dataFlashing] of flashings.entries()) {
    // @ts-ignore
    dataMapped[`flashing_name_${index + 1}`] =
      dataFlashing.name === '' ? `Flashing ${index + 1}` : dataFlashing.name;
    // @ts-ignore
    dataMapped[`material_${index + 1}`] = `0.55 Colorbond ${
      getMaterial(dataFlashing.colourMaterial).value
    }`;
    // @ts-ignore
    dataMapped[`folds_${index + 1}`] = getBends(flashings[index]);

    if (dataFlashing.tapered) {
      // @ts-ignore
      dataMapped[`flash_${index + 1}_image`] =
        dataFlashing.tapered.frontImagePreview;
      // @ts-ignore
      dataMapped[`girth_${index + 1}`] = `${getGirth(
        flashings[index],
        'front',
      )} mm`;
      // @ts-ignore
      dataMapped[`girth_${index + 1}_back`] = `${getGirth(
        flashings[index],
        'back',
      )} mm`;
      // @ts-ignore
      dataMapped[`tapered_${index + 1}`] = 'Tapered';
    } else {
      // @ts-ignore
      dataMapped[`girth_${index + 1}`] = `${getGirth(flashings[index])} mm`;
      // @ts-ignore
      dataMapped[`flash_${index + 1}_image`] = dataFlashing.imgPreview;
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
    dataMapped[
      `flash_${numberFlashing}_${index + 1}_length`
    ] = `${dataLengths.length} mm`;
  });

  return dataMapped;
};

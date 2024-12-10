import {
  CreateOrderFormValues,
  DATA_MATERIAL_ORDER,
  FLASHINGS_DATA,
  JOB_DATA,
  NEW_TYPE_SECTIONS_MATERIAL_ORDER,
  RESPONSE_COMPANY_ACCOUNT,
  STORE,
} from '@models';
import {formatDate} from '@shared/utils/formatDate';
import {
  buildDataTapered,
  getBends,
  getGirth,
  getMaterial,
  getSKU,
  mapDataFlashing,
} from '@shared/utils/JobOrders';
import {DATA_BUILD_MATERIAL_ORDER} from '@features/jobs/types';
import {
  formKeysOrders,
  optionsDelivery,
} from '@features/orders/constants/order';
import {formKeys} from '@features/orders/constants';

export const mapDataJobToDataPetition = (
  dataJob: JOB_DATA,
  dataAccountCompany: RESPONSE_COMPANY_ACCOUNT,
  dataOrder: CreateOrderFormValues,
  dataStoreSelected: STORE,
  versionApp: string,
) => {
  const addressOrder =
    dataOrder[formKeysOrders.deliveryOrPickUp] === optionsDelivery[0]
      ? dataOrder[formKeysOrders.address]
      : `${dataStoreSelected.name} Store`;

  const restData = mapDataFlashing(
    dataJob.flashings,
    dataStoreSelected.name,
    versionApp,
    //@ts-ignore
    dataOrder[formKeysOrders.deliveryOrPickUp]?.toUpperCase(),
    addressOrder as string,
  );
  const valueQuoteONly =
    dataOrder[formKeysOrders.quote_only] !== ''
      ? // @ts-ignore
        JSON.parse(dataOrder[formKeysOrders.quote_only])[0]
      : undefined;

  //@ts-ignore
  const [day, month, year] = dataOrder[formKeys.createOrder.date]?.split('/');

  return {
    company_name: dataAccountCompany.company,
    burdens_acount_no: dataAccountCompany.account,
    job_name: dataJob.name,
    site_address: dataJob.address,
    job_number: dataJob.number,
    name: dataJob.contact.name,
    email: dataJob.contact.email,
    phone: dataJob.contact.number,
    order_date: formatDate(new Date(), 'YYYY-MM-DD'),
    required_date: `${year}-${month}-${day}`,
    quote_only: valueQuoteONly ? 'Quote Only' : '',
    //@ts-ignore
    delivery_method: dataOrder[formKeysOrders.deliveryOrPickUp]?.toUpperCase(),
    delivery_address: addressOrder,
    comments: dataOrder[formKeysOrders.comments],
    ...restData,
  };
};

export const buildItemsData = (
  dataFlashing: FLASHINGS_DATA[],
): NEW_TYPE_SECTIONS_MATERIAL_ORDER[] => {
  const getTaperedInfo: NEW_TYPE_SECTIONS_MATERIAL_ORDER[] =
    buildDataTapered(dataFlashing);

  const dataItemsFlashing = dataFlashing
    .filter(itemFlashing => !itemFlashing.tapered)
    .map(dataItemFlashing => ({
      sku: getSKU(dataItemFlashing),
      colour: getMaterial(dataItemFlashing.colourMaterial).id,
      cut_tally: dataItemFlashing.flashingLengths.map(itemLengths => ({
        ...itemLengths,
        length: itemLengths.length / 1000,
      })),
    }));

  console.log(
    '=> buildItemsData::',
    JSON.stringify([...dataItemsFlashing, ...getTaperedInfo]),
  );
  return [...dataItemsFlashing, ...getTaperedInfo];
};

export const buildDataMaterialOrder = (
  data: DATA_BUILD_MATERIAL_ORDER,
  dataFlashing: FLASHINGS_DATA[],
): DATA_MATERIAL_ORDER => {
  const dataItems = buildItemsData(dataFlashing);

  return {
    burdens_data: [],
    ...data,

    status: 'Draft',
    tax_exclusive: true,
    sections: [
      {
        items: dataItems,
      },
    ],
  };
};

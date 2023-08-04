import { JOB_DETAIL, MATERIALS } from '@models';

export const dataJobs: JOB_DETAIL[] = [
  {
    id: 1001,
    name: '6A Pine Cres Ringwood North',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    job_number: '894',
    client_name: 'Ross Jurey',
  },
  {
    id: 1002,
    job_number: '1391',
    name: '20-22 hereford rd Mount Evelyn',
    address: '20-22 Hereford Rd, Mount Evelyn VIC, Australia',
    client_name: 'Barry  Biggin',
  },
  {
    id: 1003,
    job_number: '1392',
    name: '46 Centre way, Croydon South.',
    address: '46 Centre Way, Croydon South VIC, Australia',
    client_name: 'Sharp & Howells',
  },
];

export const dataMaterials: MATERIALS[] = [
  {
    id: 1,
    value: 'stone',
    label: 'Stone',
    bgColor: '#857f76',
    textColor: 'white',
  },
  {
    id: 2,
    value: 'galvanised',
    label: 'Galvanised',
    bgColor: '#a7aaaf',
    textColor: 'black',
  },
  {
    id: 3,
    value: 'zinc',
    label: 'Zinc',
    bgColor: '#b7b5b5',
    textColor: 'black',
  },
  {
    id: 4,
    value: 'basalt',
    label: 'Basalt',
    bgColor: '#6e6c70',
    textColor: 'white',
  },
  {
    id: 5,
    value: 'cream',
    label: 'Cream',
    bgColor: '#e8dec0',
    textColor: '#8F94AE',
  },
  {
    id: 6,
    value: 'cottage_green',
    label: 'Cottage Green',
    bgColor: '#3b4c40',
    textColor: 'white',
  },
  {
    id: 7,
    value: 'deep_ocean',
    label: 'Deep Ocean',
    bgColor: '#3b4252',
    textColor: 'white',
  },
  {
    id: 8,
    value: 'manor_red',
    label: 'Manor Red',
    bgColor: '#532317',
    textColor: 'white',
  },
];

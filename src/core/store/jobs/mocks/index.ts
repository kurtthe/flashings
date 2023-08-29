import { JOB_DATA, MATERIALS } from "@models";

export const dataJobs: JOB_DATA[] = [
  {
    id: 1,
    name: '6A Pine Cres Ringwood North',
    number: '684',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    file_upload: '',
    contact:{
      name: "Ross Jurey",
      number: "0491570159",
      email:"roos@gmail.com"
    },
    flashings: [
      {
        name: "Gutter Flashing",
        colourMaterial: 1,
        qty: 1,
        length: 1500
      },
      {
        name: "Gutter Flashing Tapered",
        colourMaterial: 2,
        qty: 4,
        length: 2500
      }
    ],
    rain_heads: [],
    sumbs: []
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

import { JOB_DATA, MATERIALS } from "@models";
import { getRandomInt } from "@shared/utils";

export const jobsArchive: JOB_DATA[] = [
  {
    id: getRandomInt(10, 600),
    name: ' Ringwood North',
    number: '684',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    file_upload: '',
    contact:{
      name: "Ross Jurey",
      number: "0491570159",
      email:"roos@gmail.com"
    },
    flashings: [],
    rain_heads: [],
    sumbs: []
  },
  {
    id: getRandomInt(10, 600),
    name: 'North Ringwood',
    number: '896',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    file_upload: '',
    contact:{
      name: "Ross Jurey",
      number: "0491570159",
      email:"roos@gmail.com"
    },
    flashings: [],
    rain_heads: [],
    sumbs: []
  },
];
export const dataJobs: JOB_DATA[] = [
  {
    id: getRandomInt(10, 600),
    name: '6A Pine Cres Ringwood North',
    number: '972',
    address: '6a Pine Cres, Ringwood North VIC, Australia',
    file_upload: '',
    contact:{
      name: "Ross Jurey",
      number: "0491570159",
      email:"roos@gmail.com"
    },
    flashings: [
      {
        id: getRandomInt(),
        name: "Gutter Flashing",
        colourMaterial: 2,
        qty: 1,
        length: 1500,
        dataLines:[],
        parallelRight: true
      },
      {
        id: getRandomInt(),
        colourMaterial: 1,
        qty: 1,
        length: 1500,
        dataLines:[],
        parallelRight: true,
        name: "Gutter Flashing Tapered",
      }
    ],
    rain_heads: [],
    sumbs: []
  },
  {
    id: getRandomInt(10, 600),
    name: '26A Molinos North Dosquebradas',
    number: '103',
    address: '26A Provenza Antioquía Medellin, Colombia',
    file_upload: '',
    contact:{
      name: "Dr Foreman",
      number: "0491536169",
      email:"forman@gmail.com"
    },
    flashings: [
      {
        id: getRandomInt(),
        name: "Poblado Flashings",
        colourMaterial: 2,
        qty: 1,
        length: 1500,
        dataLines:[],
        parallelRight: true
      },
      {
        id: getRandomInt(),
        colourMaterial: 3,
        qty: 1,
        length: 1500,
        dataLines:[],
        parallelRight: false,
        name: "Epps Flashings",
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

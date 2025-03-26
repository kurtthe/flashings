import {
  FLASHING_LENGTHS,
  FLASHINGS_DATA,
  RAIN_HEAD,
  SUMB,
} from '@models/flashings';
import {formKeys} from '@features/jobs/constants';

export type JOB_GUTTER = {
  id: number;
  title: string;
  job_flasing: JOB_FLASHING[];
};

type JOB_FLASHING = {
  id: number;
  description: string;
  width: string;
  high: string;
  canAddLength: boolean;
  depth: string;
  img: number;
};

export type MATERIALS = {
  id: number;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
  bold: boolean;
  disabled: boolean;
  material: string | undefined;
};

export type JOB_STATE = {
  jobs: JOB_DATA[];
  jobsArchive: JOB_DATA[];
};

type JOB_DATA_COMMON = {
  name?: string;
  number?: string;
  address?: string;
  file_upload?: string;
  contact: {
    name?: string;
    number?: string;
    email?: string;
  };
};

export type JOB_DATA = JOB_DATA_COMMON & {
  id: number;
  orderData: ORDER_TYPE_STORE | undefined;
  flashings: FLASHINGS_DATA[];
  rain_heads: RAIN_HEAD[];
  sumbs: SUMB[];
  date_created: string;
  date_updated: string;
};

export type JOB_EDIT = JOB_DATA_COMMON;

export type STORE_RESPONSE = {
  id: number;
  name: string;
  locations: STORE[];
};

export const STORE_BURNED = {
  id: 10,
  store_id: 1,
  name: 'Dandenong South VIC 3175',
  lat_lng: '-38.0199584,145.2130819',
  address: '203 Frankston - Dandenong Rd Dandenong South, VIC Australia 3175',
  phone_number: '(03) 9703 8484',
  email: 'dandenong@burdens.com.au',
  manager: 'Brent Murdoch',
  manager_email: 'brent.murdoch@burdens.com.au',
  opening_hours: [
    {
      title: 'Monday-Friday',
      time: '08:00-16:30',
    },
  ],
};

export type STORE = {
  id: number;
  store_id: number;
  name: string;
  lat_lng: string;
  address: string;
  phone_number: string;
  email: string;
  manager: string;
  manager_email: string;
  opening_hours: Array<{
    title: string;
    time: string;
  }>;
};

export type RESPONSE_CREATE_AND_FLASHING = {
  response: {
    id: string;
    url: string;
    status: string;
    file_name: string;
    done: boolean;
    object: string;
  };
  status: string;
};

export type RESPONSE_COMPANY_ACCOUNT = {
  company: string;
  account: string;
};

export type RESPONSE_BALANCE = {
  id: number;
  company_id: number;
  updated: string;
  current: string;
  thirty_day: string;
  sixty_day: string;
  ninety_day: string;
  one_twenty_day: string;
  overdue: string;
  total: string;
  client_number: string;
};

export type SUPPLIER = {
  id: number;
  name: string;
  address_line_2: string;
  suburb: string;
  address_line_1: string;
  postcode: string;
  phone: string;
  fax_number: string;
  email: string;
  store_id: number;
  abn: string;
  bpay_reference: string;
  primary_contact_id: number;
  state: string;
  country: string;
};

type ATTACHMENTS_MATERIAL_ORDER = {
  name: string;
  link: string;
};

type SECTIONS_MATERIAL_ORDER = {
  description: string;
  quantity: string;
  units: string;
  cost: string;
  tax: [
    {
      name: 'GST';
      rate: 10;
    },
  ];
};

export type NEW_TYPE_SECTIONS_MATERIAL_ORDER = {
  sku: string;
  colour?: number;
  cut_tally: FLASHING_LENGTHS[];
};

export type DATA_MATERIAL_ORDER = {
  name: string;
  supplier: number;
  issued_on: string;
  description: string;
  status: string;
  tax_exclusive: boolean;
  attachments: ATTACHMENTS_MATERIAL_ORDER[];
  sections: Array<{items: NEW_TYPE_SECTIONS_MATERIAL_ORDER[]}>;
  burdens_data: Array<{index: number; value: string}>;
  delivery_instructions: {
    delivery: string;
    location: string;
    contact_name: string;
    contact_number: string;
    date: string;
    time: string;
  };
};

export type SHARED_DATA_MATERIAL_ORDER = {
  emails: string[];
  message: string;
};

export type RESPONSE_SHARED_DATA_MATERIAL_ORDER = {
  message: string;
  share_url: string;
};

type ITEM_SECTION_RESPONSE_MATERIAL_ORDER = {
  description: string;
  product_id: null;
  quantity: string;
  units: string;
  unit_price: string;
  sub_total: string;
  tax_total: string;
  tax_data: Array<{
    name: string;
    rate: number;
    total: number;
  }>;
  total: string;
  length: string;
  width: string;
  height: string;
  colour: string;
  discount: string;
  discount_total: string;
  margin: string;
  margin_total: string;
};

type SECTION_RESPONSE_MATERIAL_ORDER = {
  name: string;
  description: string;
  approval_date: string;
  optional: number;
  selected: number;
  hide_section: number;
  hide_section_price: number;
  hide_line_items: number;
  hide_line_quantity: number;
  hide_line_price: number;
  hide_line_subtotal: number;
  hide_line_margin: number;
  hide_line_discount: number;
  hide_line_total: number;
  margin_total: string;
  discount_total: string;
  sub_total: string;
  tax_total: string;
  total: string;
  create_sub_job: number;
  sub_job_type: string;
  sub_job_status: string;
  cost_centre_id: string;
  items: ITEM_SECTION_RESPONSE_MATERIAL_ORDER[];
};

export type RESPONSE_MATERIAL_ORDER = {
  order: {
    id: number;
    type: string;
    order_number: string;
    name: string;
    status: string;
    description: string;
    notes: string;
    job_id: string;
    supplier_id: number;
    created_date: string;
    updated_date: string;
    issued_on: string;
    sub_total: string;
    tax_total: string;
    total_amount: string;
    tax_exclusive: number;
    structure: {
      id: number;
      show_summary: number;
      hide_summary_prices: number;
      hide_total: number;
      hide_links: number;
      show_sku: number;
      show_discount: number;
      margin_total: string;
      discount_total: string;
      sub_total: string;
      tax_total: string;
      total: string;
      sections: SECTION_RESPONSE_MATERIAL_ORDER[];
    };
    expense_total: string;
    burdens_store_location_id: string;
  };
};

export type ORDER_TYPE_STORE = {
  orderNumber: string;
  urlPdf: string;
  store: string;
  date: string;
  id: string;
};

export type ORDER_VALIDATIONS_TYPES = {
  index: number;
  prompt: string;
  mask: string;
  length: string;
  unique: string;
  default: string;
};

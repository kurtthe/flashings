import { FLASHINGS_DATA,  RAIN_HEAD, SUMB } from "@models/flashings";


export type JOB_GUTTER = {
  "id": number,
  "title": string,
  "job_flasing": JOB_FLASHING[],
}

type JOB_FLASHING = {
  id: number;
  description: string;
  width: string;
  high: string;
  canAddLength: boolean;
  depth:string;
  img: number;
}

export type MATERIALS = {
  id: number;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
};

export type JOB_STATE = {
  jobs: JOB_DATA[];
  jobsArchive: JOB_DATA[];
}

type JOB_DATA_COMMON = {
  name?: string;
  number?: string;
  address?: string;
  file_upload?: string;
  contact:{
    name?: string;
    number?: string;
    email?:string
  }
}

export type JOB_DATA= JOB_DATA_COMMON & {
  id: number;
  flashings: FLASHINGS_DATA[];
  rain_heads: RAIN_HEAD[];
  sumbs: SUMB[];
}

export type JOB_EDIT = JOB_DATA_COMMON

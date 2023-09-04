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

export type JOB_DATA= {
  id: number;
  name?: string;
  number?: string;
  address?: string;
  file_upload?: string;
  contact:{
    name?: string;
    number?: string;
    email?:string
  },
  flashings: FLASHINGS_DATA[];
  rain_heads: RAIN_HEAD[];
  sumbs: SUMB[];
}

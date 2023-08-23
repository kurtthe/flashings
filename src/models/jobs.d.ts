export type JOB_DETAIL = {
  id: number;
  name: string;
  address: string;
  job_number: string;
  client_name: string;
};

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

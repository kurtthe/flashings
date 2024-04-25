import { LINE_TYPE, TYPE_END_LINES } from '@models/flashings';

export type TemplateType = {
  dataLines: LINE_TYPE[];
  angles: number[];
  parallelRight: boolean;
  endType: TYPE_END_LINES;
  startType: TYPE_END_LINES;
  name: string;
  id: number;
};

export type TEMPLATE_STATE_TYPE = {
  templates: TemplateType[];
};

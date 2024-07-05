import { LINE_TYPE, TYPE_END_LINES } from '@models/flashings';

export type TemplateType = {
  name: string;
  id: number;
  dataLines: LINE_TYPE[];
  angles: number[];
  parallelRight: boolean;
  endType: TYPE_END_LINES;
  startType: TYPE_END_LINES;
  imgPreview: string | undefined;
  isHide: boolean;
};

export type TEMPLATE_STATE_TYPE = {
  templates: TemplateType[];
  templateSelected: number | null;
};

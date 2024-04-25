import { createAction } from '@reduxjs/toolkit';
import { TemplateType } from '@models/templates';

export const actions = {
  addTemplate: createAction<{ template: TemplateType }>('template/add'),
  removeTemplate: createAction<{ idTemplate: string }>('template/remove'),
  editTemplate: createAction<{ idTemplate: string; data: TemplateType }>(
    'template/edit',
  ),
};

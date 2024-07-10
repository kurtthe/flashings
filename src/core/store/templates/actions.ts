import { createAction } from '@reduxjs/toolkit';
import { TemplateType } from '@models/templates';

export const actions = {
  addTemplate: createAction<{ template: TemplateType }>('template/add'),
  removeTemplate: createAction<{ idTemplate: number }>('template/remove'),
  hideTemplate: createAction<{ idTemplate: number }>('template/hide'),
  showTemplate: createAction<{ idTemplate: number }>('template/show'),
  templateSelected: createAction<{ idTemplate: number | null }>(
    'template/selected',
  ),
  editTemplate: createAction<{ idTemplate: string; data: TemplateType }>(
    'template/edit',
  ),
  renameTemplate: createAction<{ idTemplate: number; newName: string }>(
    'template/rename',
  ),
};

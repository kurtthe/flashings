import { TEMPLATE_STATE_TYPE } from '@models/templates';
import { createReducer } from '@reduxjs/toolkit';
import { actions } from '@store/templates/actions';
import { persistReducer } from 'redux-persist';
import { persistConfigFlashings } from '@store/config';
import { dataTemplate } from '@store/templates/mock/templates';

const INITIAL_STATE: TEMPLATE_STATE_TYPE = {
  templates: [...dataTemplate],
  templateSelected: null,
};

const templateReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.addTemplate, (state, action) => {
    const { template } = action.payload;
    state.templates = [...state.templates, { ...template, isHide: false }];
  });
  builder.addCase(actions.templateSelected, (state, action) => {
    const { idTemplate } = action.payload;
    state.templateSelected = idTemplate;
  });
  builder.addCase(actions.removeTemplate, (state, action) => {
    const { idTemplate } = action.payload;

    state.templates = state.templates.filter(
      templateItem => templateItem.id !== idTemplate,
    );
  });

  builder.addCase(actions.renameTemplate, (state, action) => {
    const { idTemplate, newName } = action.payload;
    state.templates = state.templates.map(templateItem => ({
      ...templateItem,
      name: templateItem.id === idTemplate ? newName : templateItem.name,
    }));
  });
  builder.addCase(actions.hideTemplate, (state, action) => {
    const { idTemplate } = action.payload;
    state.templates = state.templates.map(templateItem => ({
      ...templateItem,
      isHide: templateItem.id === idTemplate ? true : templateItem.isHide,
    }));
  });
  builder.addCase(actions.showTemplate, (state, action) => {
    const { idTemplate } = action.payload;
    state.templates = state.templates.map(templateItem => ({
      ...templateItem,
      isHide: templateItem.id === idTemplate ? false : templateItem.isHide,
    }));
  });
});

export type TemplateState = ReturnType<typeof templateReducer>;
const persistFlashingReducer = persistReducer<TemplateState>(
  persistConfigFlashings,
  templateReducer,
);

export default persistFlashingReducer;

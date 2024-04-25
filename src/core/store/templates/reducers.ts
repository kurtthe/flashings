import { TEMPLATE_STATE_TYPE } from '@models/templates';
import { createReducer } from '@reduxjs/toolkit';
import { actions } from '@store/templates/actions';
import { persistReducer } from 'redux-persist';
import { persistConfigFlashings } from '@store/config';
import { dataTemplate } from '@store/templates/mock/templates';

const INITIAL_STATE: TEMPLATE_STATE_TYPE = {
  templates: [...dataTemplate],
};

const templateReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.addTemplate, (state, action) => {
    const { template } = action.payload;
    state.templates = [...state.templates, template];
  });
});

export type TemplateState = ReturnType<typeof templateReducer>;
const persistFlashingReducer = persistReducer<TemplateState>(
  persistConfigFlashings,
  templateReducer,
);

export default persistFlashingReducer;

import {createAction} from '@reduxjs/toolkit';

export const actions = {
  addInitialData: createAction('addInitialData/board'),
  addPoint: createAction('addPoint/board'),
  removePoint: createAction('removePoint/board'),
  changeEndType: createAction('changeEndType/board'),
  changeStartType: createAction('changeStartType/board'),
  changeMeasurement: createAction('changeMeasurement/board'),
  changeStep: createAction('changeStep/board'),
  sideTapered: createAction('sideTapered/board'),
  clear: createAction('clear/board'),
};

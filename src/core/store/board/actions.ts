import {BOARD_FLASHINGS_DATA, TYPE_END_LINES} from '@models/board';
import {createAction} from '@reduxjs/toolkit';

export const actions = {
  updateDataFlashing: createAction<{
    dataFlashing: Partial<BOARD_FLASHINGS_DATA>;
  }>('addInitialData/board'),
  addPoint: createAction('addPoint/board'),
  removePoint: createAction('removePoint/board'),
  changeEndTypeLine: createAction<{newType: TYPE_END_LINES}>(
    'changeEndType/board',
  ),
  changeStartTypeLine: createAction<{newType: TYPE_END_LINES}>(
    'changeStartType/board',
  ),
  changeMeasurement: createAction('changeMeasurement/board'),
  changeStep: createAction<{step: number}>('changeStep/board'),
  changeSideTapered: createAction<{isFront: boolean}>(
    'changeSideTapered/board',
  ),
  clear: createAction('clear/board'),
};

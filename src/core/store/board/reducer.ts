import {BOARD_FLASHINGS_DATA} from '@models/board';
import {createReducer} from '@reduxjs/toolkit';
import {actions} from './actions';

type initialStateType = {
  flashingData: BOARD_FLASHINGS_DATA | undefined;
  stepIndex: number;
  isEdit: boolean;
  sideTaperedFront: boolean;
  indexLineSelected: number;
  typeSelected: 'line' | 'angle';
};

const INITIAL_STATE: initialStateType = {
  flashingData: undefined,
  sideTaperedFront: false,
  stepIndex: 0,
  isEdit: false,
  indexLineSelected: 0,
  typeSelected: 'line',
};

const boardReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.addDataFlashing, (state, action) => {
    const {dataFlashing, step, isEdit} = action.payload;
    state.flashingData = dataFlashing;
    state.isEdit = isEdit ?? false;
    if (step) {
      state.stepIndex = step;
    }
  });
  builder.addCase(actions.clear, state => {
    state.flashingData = undefined;
    state.isEdit = false;
    state.stepIndex = 0;
    state.typeSelected = 'line';
    state.indexLineSelected = 0;
  });
  builder.addCase(actions.updateDataFlashing, (state, action) => {
    const {dataFlashing} = action.payload;
    const previousState = state.flashingData;
    if (!previousState) return;
    state.flashingData = {...previousState, ...dataFlashing};
  });
  builder.addCase(actions.changeEndTypeLine, (state, action) => {
    const {newType} = action.payload;
    const previousState = state.flashingData;
    if (!previousState) return;
    state.flashingData = {...previousState, endType: newType};
  });
  builder.addCase(actions.changeStartTypeLine, (state, action) => {
    const {newType} = action.payload;
    const previousState = state.flashingData;
    if (!previousState) return;
    state.flashingData = {...previousState, startType: newType};
  });
  builder.addCase(actions.changeStep, (state, action) => {
    const {step} = action.payload;
    state.stepIndex = step;
  });
  builder.addCase(actions.changeSideTapered, (state, action) => {
    const {isFront} = action.payload;
    state.sideTaperedFront = isFront;
  });
  builder.addCase(actions.changeIndexLineSelected, (state, action) => {
    const {newIndex} = action.payload;
    state.indexLineSelected = newIndex;
  });
  builder.addCase(actions.changeTypeSelected, (state, action) => {
    const {newTypeSelected} = action.payload;
    state.typeSelected = newTypeSelected;
  });
});

export default boardReducer;

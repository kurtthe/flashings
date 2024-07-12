import { createReducer } from '@reduxjs/toolkit';
import { actions } from '@store/flashings/actions';
import { FLASHINGS_DATA } from '@models';

export type SIDE_TAPERED_TYPES = 'front' | 'back';

type initialStateType = {
  sideTapered: SIDE_TAPERED_TYPES;
  stepIndex: number;
  flashingDraft: FLASHINGS_DATA | undefined;
};

const INITIAL_STATE: initialStateType = {
  sideTapered: 'front',
  stepIndex: 0,
  flashingDraft: undefined,
};

const flashingsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.changeSideTapered, (state, action) => {
    const { side } = action.payload;
    state.sideTapered = side;
  });
  builder.addCase(actions.changeStep, (state, action) => {
    const { step } = action.payload;
    state.stepIndex = step;
  });

  builder.addCase(actions.addFlashingDraft, (state, action) => {
    const { dataFlashing } = action.payload;
    state.flashingDraft = dataFlashing;
  });

  builder.addCase(actions.updateFlashingDraft, (state, action) => {
    const { dataFlashing } = action.payload;
    state.flashingDraft = { ...state.flashingDraft, ...dataFlashing };
  });
});

export default flashingsReducer;

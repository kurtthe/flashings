import { createReducer } from '@reduxjs/toolkit';
import { actions } from '@store/flashings/actions';
import { FLASHINGS_DATA } from '@models';

export type SIDE_TAPERED_TYPES = 'front' | 'back';

type initialStateType = {
  sideTapered: SIDE_TAPERED_TYPES;
  stepIndex: number;
  flashingDraft: FLASHINGS_DATA | undefined;
  jobId: number | undefined;
};

const INITIAL_STATE: initialStateType = {
  sideTapered: 'front',
  stepIndex: 0,
  flashingDraft: undefined,
  jobId: undefined,
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
    const { dataFlashing, jobId } = action.payload;
    state.flashingDraft = dataFlashing;
    state.jobId = jobId;
  });

  builder.addCase(actions.updateFlashingDraft, (state, action) => {
    const { dataFlashing } = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = { ...previousState, ...dataFlashing };
  });
  builder.addCase(actions.changeEndTypeLine, (state, action) => {
    const { newType } = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = { ...previousState, endType: newType };
  });
  builder.addCase(actions.changeStartTypeLine, (state, action) => {
    const { newType } = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = { ...previousState, startType: newType };
  });
  builder.addCase(actions.clear, (state, action) => {
    state.jobId = undefined;
    state.flashingDraft = undefined;
    state.stepIndex = 0;
    state.sideTapered = 'front';
  });
});

export default flashingsReducer;

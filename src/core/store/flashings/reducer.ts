import {createReducer} from '@reduxjs/toolkit';
import {actions} from '@store/flashings/actions';
import {FLASHINGS_DATA} from '@models';
import {formatDate} from '@shared/utils/formatDate';

type initialStateType = {
  sideTaperedFront: boolean;
  stepIndex: number;
  flashingDraft: FLASHINGS_DATA | undefined;
  jobId: number | undefined;
  isEdit: boolean;
};

const INITIAL_STATE: initialStateType = {
  sideTaperedFront: false,
  stepIndex: 0,
  flashingDraft: undefined,
  jobId: undefined,
  isEdit: false,
};

const flashingsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.changeSideTapered, (state, action) => {
    const {isFront} = action.payload;
    state.sideTaperedFront = isFront;
  });
  builder.addCase(actions.changeStep, (state, action) => {
    const {step} = action.payload;
    state.stepIndex = step;
  });

  builder.addCase(actions.addFlashingDraft, (state, action) => {
    const {dataFlashing, jobId, step, isEdit} = action.payload;
    state.flashingDraft = {
      ...dataFlashing,
      date_created: formatDate(new Date(), 'YYYY-MM-DD'),
      date_updated: formatDate(new Date(), 'YYYY-MM-DD'),
    };
    state.jobId = jobId;
    state.isEdit = isEdit ?? false;
    if (step) {
      state.stepIndex = step;
    }
  });

  builder.addCase(actions.updateFlashingDraft, (state, action) => {
    const {dataFlashing} = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = {
      ...previousState,
      ...dataFlashing,
      date_updated: formatDate(new Date(), 'YYYY-MM-DD'),
    };
  });
  builder.addCase(actions.changeEndTypeLine, (state, action) => {
    const {newType} = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = {...previousState, endType: newType};
  });
  builder.addCase(actions.changeStartTypeLine, (state, action) => {
    const {newType} = action.payload;
    const previousState = state.flashingDraft;
    if (!previousState) return;
    state.flashingDraft = {...previousState, startType: newType};
  });
  builder.addCase(actions.clear, (state, action) => {
    state.jobId = undefined;
    state.flashingDraft = undefined;
    state.stepIndex = 0;
    state.sideTaperedFront = false;
    state.isEdit = false;
  });
});

export default flashingsReducer;

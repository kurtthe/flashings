import {createReducer} from '@reduxjs/toolkit';
import {actions} from '@store/flashings/actions';
import {FLASHINGS_DATA} from '@models';
import {formatDate} from '@shared/utils/formatDate';

type initialStateType = {
  flashingData: FLASHINGS_DATA | undefined;
};

const INITIAL_STATE: initialStateType = {
  flashingData: undefined,
};

const flashingsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.addFlashingDraft, (state, action) => {
    const {dataFlashing} = action.payload;
    state.flashingData = dataFlashing;
  });

  builder.addCase(actions.clear, state => {
    state.flashingData = undefined;
  });
});

export default flashingsReducer;

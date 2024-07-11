import { createReducer } from '@reduxjs/toolkit';
import { actions } from '@store/flashings/actions';

export type SIDE_TAPERED_TYPES = 'front' | 'back';

const INITIAL_STATE = {
  sideTapered: 'front',
};

const flashingsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(actions.changeSideTapered, (state, action) => {
    const { side } = action.payload;
    state.sideTapered = side;
  });
});

export default flashingsReducer;

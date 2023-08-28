import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { FLASHING_STATE } from "@models";
import { actions } from './actions';
import { persistConfigFlashings } from "@store/config";


const INITIAL_STATE: FLASHING_STATE = {
	flashings: []
};

const flashingReducer = createReducer(INITIAL_STATE, builder => {
	builder.addCase(actions.addFlashing, (state, action) => {
		const {data}= action.payload;
		state.flashings = data
	})
})

export type FlashingState = ReturnType<typeof flashingReducer>

const persistFlashingReducer = persistReducer<FlashingState>(persistConfigFlashings, flashingReducer)

export default persistFlashingReducer

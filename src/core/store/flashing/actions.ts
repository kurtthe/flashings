import {createAction} from "@reduxjs/toolkit";
import { FLASHINGS_DATA } from "@models";

export const actions = {
	addFlashing: createAction<{data:FLASHINGS_DATA}>('add/flashing')
}

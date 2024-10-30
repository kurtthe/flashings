import {FLASHINGS_DATA} from '@models/flashings';

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
